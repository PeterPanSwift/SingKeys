import {encodeMidi} from './midi.js';
const $=selector=>document.querySelector(selector);
const noteName=m=>['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'][m%12]+(Math.floor(m/12)-1);
const formatTime=s=>`${Math.floor(Math.max(0,s)/60)}:${String(Math.floor(Math.max(0,s)%60)).padStart(2,'0')}`;
const state={buffer:null,notes:[],wave:[],duration:0,name:'',position:0,playing:false,speed:1,mode:'piano',busy:false,generation:0,worker:null,source:null,voices:new Set(),keyMap:new Map(),manual:new Set(),anchor:0,base:0,next:0,min:48,max:84};
let context,master,originalGain,pianoGain,timer,originalMedia,mediaNode,mediaURL;
function audio(){
  if(context)return context;
  context=new (window.AudioContext||window.webkitAudioContext)();
  master=context.createGain();master.gain.value=Number($('#volume').value);master.connect(context.destination);
  originalGain=context.createGain();originalGain.gain.value=.6;originalGain.connect(master);
  pianoGain=context.createGain();pianoGain.gain.value=.75;pianoGain.connect(master);
  context.addEventListener('statechange',()=>{if(context.state==='suspended'&&state.playing)pause();});
  return context;
}
function status(message,error=false){$('#status').textContent=message;$('#status').classList.toggle('error',error);}
function controls(){
  $('#analyze').disabled=!state.buffer||state.busy;$('#analyze').textContent=state.notes.length?'✧ 重新辨識旋律':'✧ 辨識旋律';
  $('#play').disabled=state.busy||!state.buffer||(state.mode!=='original'&&!state.notes.length);
  $('#restart').disabled=!state.buffer||state.busy;$('#seek').disabled=!state.buffer||state.busy;
  $('#export').disabled=!state.notes.length||state.busy;$('#range').disabled=state.busy;$('#demo').disabled=state.busy;
  $('#analysisProgress').hidden=!state.busy;$('#play').textContent=state.playing?'Ⅱ':'▶';
  $('#play').setAttribute('aria-label',state.playing?'暫停播放':`播放${state.mode==='original'?'原曲':state.mode==='both'?'合奏':'鋼琴旋律'}`);
  $('#readyBadge').textContent=state.busy?'辨識中':state.notes.length?'旋律已就緒':state.buffer?'等待辨識':'尚未分析';
  $('#readyBadge').classList.toggle('ready',!!state.notes.length&&!state.busy);
}
function buildKeyboard(){
  const black=m=>[1,3,6,8,10].includes(m%12);
  let count=0;for(let m=state.min;m<=state.max;m++)if(!black(m))count++;
  $('#keyboard').replaceChildren();state.keyMap.clear();let white=0;
  for(let midi=state.min;midi<=state.max;midi++){
    const isBlack=black(midi),key=document.createElement('button'),left=(isBlack?white-.32:white)/count,width=(isBlack?.64:1)/count;
    key.className=`key ${isBlack?'black':'white'}`;key.textContent=noteName(midi);key.setAttribute('aria-label',`彈奏 ${noteName(midi)}`);
    key.style.left=`${left*100}%`;key.style.width=`${width*100}%`;key.dataset.midi=midi;
    key.addEventListener('click',async()=>{try{await audio().resume();piano(midi,context.currentTime,.5,85);state.manual.add(midi);setTimeout(()=>state.manual.delete(midi),450);}catch{status('瀏覽器無法播放音訊，請重新點擊琴鍵。',true);}});
    $('#keyboard').append(key);state.keyMap.set(midi,{key,left,width,black:isBlack});if(!isBlack)white++;
  }
  $('.piano-surface').style.minWidth=`${Math.max(590,count*27)}px`;
}
// Percussive additive synthesis with slightly inharmonic piano partials.
function piano(midi,when,duration,velocity=80){
  const frequency=440*2**((midi-69)/12),gain=context.createGain();gain.connect(pianoGain);
  const length=Math.min(5,Math.max(.12,duration)),strength=.19*velocity/100;
  gain.gain.setValueAtTime(0,when);gain.gain.linearRampToValueAtTime(strength,when+.007);
  gain.gain.exponentialRampToValueAtTime(Math.max(.001,strength*.23),when+length);
  gain.gain.exponentialRampToValueAtTime(.0001,when+length+.19);
  const voice={gain,oscillators:[],partials:[]};state.voices.add(voice);
  [1,.42,.19,.10,.045,.022].forEach((amplitude,index)=>{
    const harmonic=index+1;if(frequency*harmonic>context.sampleRate*.45)return;
    const osc=context.createOscillator(),partial=context.createGain();
    osc.frequency.value=frequency*harmonic*Math.sqrt(1+.00012*harmonic*harmonic);partial.gain.value=amplitude;
    osc.connect(partial);partial.connect(gain);osc.start(when);osc.stop(when+length+.2);voice.oscillators.push(osc);voice.partials.push(partial);
  });
  const last=voice.oscillators.at(-1);if(last)last.onended=()=>{voice.oscillators.forEach(o=>o.disconnect());voice.partials.forEach(p=>p.disconnect());gain.disconnect();state.voices.delete(voice);};
}
function stopSounds(){
  originalMedia?.pause();
  if(context)for(const voice of state.voices){voice.gain.gain.cancelScheduledValues(context.currentTime);voice.gain.gain.setTargetAtTime(.0001,context.currentTime,.008);for(const osc of voice.oscillators)try{osc.stop(context.currentTime+.04);}catch{}}
  state.voices.clear();clearInterval(timer);
}
function position(){if(!state.playing)return state.position;if(state.mode!=='piano'&&originalMedia)return Math.min(state.duration,originalMedia.currentTime);return Math.min(state.duration,state.base+Math.max(0,context.currentTime-state.anchor)*state.speed);}
function pause(){state.position=position();state.playing=false;stopSounds();controls();}
function schedule(){
  if(!state.playing)return;
  const now=context.currentTime;
  while(state.next<state.notes.length){
    const note=state.notes[state.next],when=state.anchor+(note.start-state.base)/state.speed;
    if(when>now+.15)break;
    if(state.mode!=='original'&&note.end>state.base&&when>=now-.1){
      const actual=Math.max(now,when),end=state.anchor+(note.end-state.base)/state.speed;
      piano(note.midi,actual,Math.max(.06,end-actual),note.velocity);
    }
    state.next++;
  }
}
async function play(){
  if(state.busy||!state.buffer||(state.mode!=='original'&&!state.notes.length))return;
  try{
    await audio().resume();if(state.playing)return;
    if(state.position>=state.duration-.05)state.position=0;
    state.playing=true;state.base=state.position;state.anchor=context.currentTime+.045;
    state.next=state.notes.findIndex(n=>n.end>state.base);if(state.next<0)state.next=state.notes.length;
    if(state.mode!=='piano'){
      originalMedia.currentTime=state.base;originalMedia.playbackRate=state.speed;originalMedia.preservesPitch=true;
      await originalMedia.play();if(!state.playing){originalMedia.pause();return;}state.anchor=context.currentTime-(originalMedia.currentTime-state.base)/state.speed;
    }
    const active=state.notes[state.next];
    if(active&&active.start<state.base&&state.mode!=='original'){piano(active.midi,state.anchor,(active.end-state.base)/state.speed,active.velocity);state.next++;}
    schedule();timer=setInterval(schedule,25);controls();
  }catch(error){pause();status('無法啟動音訊播放，請再按一次播放。',true);}
}
function seek(time){const resume=state.playing;pause();state.position=Math.max(0,Math.min(state.duration,time));if(resume)void play();}
function setMode(mode){const resume=state.playing;pause();state.mode=mode;document.querySelectorAll('[data-mode]').forEach(b=>{b.classList.toggle('active',b.dataset.mode===mode);b.setAttribute('aria-pressed',String(b.dataset.mode===mode));});if(resume)void play();controls();}
function setNotes(notes){
  state.notes=notes;$('#noteCount').textContent=notes.length.toLocaleString();
  if(notes.length){const pitches=notes.map(n=>n.midi),lo=Math.min(...pitches),hi=Math.max(...pitches);$('#pitchRange').textContent=`${noteName(lo)}–${noteName(hi)}`;state.min=Math.min(48,Math.floor(lo/12)*12);state.max=Math.max(84,Math.ceil(hi/12)*12);}
  else{$('#pitchRange').textContent='—';state.min=48;state.max=84;}
  $('#rollEmpty').hidden=notes.length>0;buildKeyboard();controls();
}
function cancelAnalysis(){state.generation++;state.worker?.terminate();state.worker=null;state.busy=false;controls();status('已取消，可重新辨識。');}
async function loadAudio(bytes,name,mime=""){
  pause();if(state.worker)state.worker.terminate();state.worker=null;
  const generation=++state.generation;state.busy=true;controls();$('#progress').value=0;$('#progressText').textContent='正在讀取音訊…';status('正在解碼歌曲…');
  try{
    const audioBlob=new Blob([bytes],{type:mime});
    const decoded=await audio().decodeAudioData(bytes);
    if(generation!==state.generation)return false;
    if(decoded.duration>600)throw new Error('請使用 10 分鐘以內的音訊。');
    if(decoded.duration<.2)throw new Error('音訊過短，請使用至少 0.2 秒的音訊。');
    originalMedia?.pause();mediaNode?.disconnect();if(mediaURL)URL.revokeObjectURL(mediaURL);
    mediaURL=URL.createObjectURL(audioBlob);originalMedia=new Audio(mediaURL);originalMedia.preservesPitch=true;
    mediaNode=context.createMediaElementSource(originalMedia);mediaNode.connect(originalGain);
    originalMedia.addEventListener('ended',()=>{if(state.playing&&state.mode!=='piano'){pause();state.position=state.duration;}});
    state.buffer=decoded;state.duration=decoded.duration;state.name=name;state.position=0;setNotes([]);
    const samples=decoded.getChannelData(0);state.wave=[];
    for(let i=0;i<360;i++){const begin=Math.floor(i*samples.length/360),end=Math.floor((i+1)*samples.length/360);let sum=0,count=0;for(let j=begin;j<end;j+=8){sum+=samples[j]**2;count++;}state.wave.push(Math.sqrt(sum/Math.max(1,count)));}
    const peak=Math.max(...state.wave,.01);state.wave=state.wave.map(v=>v/peak);
    $('#selectedFile').hidden=false;$('#fileName').textContent=name;$('#fileInfo').textContent=`${formatTime(decoded.duration)} · ${decoded.numberOfChannels===2?'立體聲':'單聲道'}`;
    $('#trackTitle').textContent=name.replace(/\.[^.]+$/,'');$('#duration').textContent=formatTime(state.duration);$('#seek').max=state.duration;
    $('#waveEmpty').hidden=true;status('歌曲已載入，按「辨識旋律」生成鋼琴音符。');return true;
  }catch(error){if(generation===state.generation)status(error.message.includes('音訊')?error.message:'無法讀取此檔案，請改用 MP3、WAV 或瀏覽器支援的音訊格式。',true);return false;}
  finally{if(generation===state.generation){state.busy=false;controls();}}
}
async function chooseFile(file){
  if(!file)return;
  if(file.size>50*1024*1024){status('檔案超過 50 MB，請先縮小音訊檔案。',true);return;}
  if(!file.type.startsWith('audio/')&&!/\.(mp3|wav|m4a|aac|ogg|flac|aiff|webm)$/i.test(file.name)){status('請選擇音訊檔案，例如 MP3 或 WAV。',true);return;}
  cancelAnalysis();const generation=state.generation;status('正在讀取檔案…');
  try{const bytes=await file.arrayBuffer();if(generation!==state.generation)return;await loadAudio(bytes,file.name,file.type);}catch{status('無法讀取檔案，請重新選擇。',true);}
}
async function loadDemo(){
  if(state.busy)return;
  state.busy=true;controls();const generation=++state.generation;status('正在載入範例歌曲…');
  try{
    const response=await fetch('./assets/iceland.mp3');if(!response.ok)throw new Error('音訊讀取失敗');
    const bytes=await response.arrayBuffer();if(generation!==state.generation)return;
    if(!await loadAudio(bytes,'把心留在冰島.mp3','audio/mpeg'))return;
    const loaded=state.generation;
    try{const response=await fetch('./assets/iceland-notes.json');if(!response.ok)throw new Error();const data=await response.json();if(loaded!==state.generation)return;$('#range').value=data.range;setNotes(data.notes);status(`範例已辨識出 ${data.notes.length} 個音符，可直接播放或重新辨識。`);}catch{if(loaded===state.generation)await analyze();}
  }catch{if(generation===state.generation){state.busy=false;controls();status('範例載入失敗，請重試或選擇本機音訊檔案。',true);}}
}
async function analyze(){
  if(!state.buffer||state.busy)return;
  pause();state.busy=true;const generation=++state.generation;controls();$('#progress').value=1;$('#progressText').textContent='準備音高分析…';status('正在分析主旋律；你可以隨時取消。');
  try{
    const offline=new OfflineAudioContext(1,Math.ceil(state.buffer.duration*12000),12000);
    const source=offline.createBufferSource();source.buffer=state.buffer;
    const high=offline.createBiquadFilter();high.type='highpass';high.frequency.value=$('#range').value==='low'?60:110;high.Q.value=.707;
    const low=offline.createBiquadFilter();low.type='lowpass';low.frequency.value=2000;low.Q.value=.707;
    source.connect(high);high.connect(low);low.connect(offline.destination);source.start();
    const rendered=await offline.startRendering();if(generation!==state.generation)return;
    const samples=rendered.getChannelData(0).slice(),worker=new Worker('./pitch-worker.js',{type:'module'});state.worker=worker;
    const finish=()=>{worker.terminate();state.worker=null;state.busy=false;controls();};
    worker.onmessage=({data})=>{
      if(generation!==state.generation)return;
      if(data.type==='progress'){$('#progress').value=data.value;$('#progressText').textContent=`辨識音高 ${Math.round(data.value)}%`;}
      if(data.type==='result'){finish();state.position=0;setNotes(data.result.notes);status(data.result.notes.length?`完成！辨識出 ${data.result.notes.length} 個旋律音符。按下播放，跟著琴鍵聆聽。`:'未找到穩定音高。請換一段清唱，或調整辨識音域。',!data.result.notes.length);}
      if(data.type==='error'){finish();status('音高辨識失敗，請重試或使用較短的片段。',true);}
    };
    worker.onerror=()=>{if(generation===state.generation){finish();status('分析程式無法啟動，請重新整理頁面後再試。',true);}};
    worker.postMessage({samples:samples.buffer,sampleRate:12000,range:$('#range').value},[samples.buffer]);
  }catch{if(generation===state.generation){state.busy=false;controls();status('分析音訊失敗，請換一個音訊檔案後再試。',true);}}
}
function canvasSize(canvas){const rect=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);if(canvas.width!==Math.round(rect.width*dpr)||canvas.height!==Math.round(rect.height*dpr)){canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);}const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);return {ctx,width:rect.width,height:rect.height};}
function draw(){
  const time=position();if(state.playing&&time>=state.duration){pause();state.position=state.duration;}
  $('#currentTime').textContent=formatTime(time);$('#seek').value=time;
  const {ctx:w,width:ww,height:wh}=canvasSize($('#waveform'));w.clearRect(0,0,ww,wh);
  if(state.wave.length){const count=Math.floor(ww/4);for(let i=0;i<count;i++){const value=state.wave[Math.floor(i/count*state.wave.length)]||0,h=Math.max(2,value*(wh-16));w.fillStyle=i/count<time/state.duration?'#c5b0f5':'#665680';w.fillRect(i*4,(wh-h)/2,2,h);}w.fillStyle='#d7ffa7';w.fillRect(ww*time/state.duration,5,1,wh-10);}
  const {ctx:r,width:rw,height:rh}=canvasSize($('#roll'));r.clearRect(0,0,rw,rh);
  for(const item of state.keyMap.values()){r.fillStyle=item.black?'#15141c':'#1b1924';r.fillRect(item.left*rw,0,item.width*rw,rh);r.strokeStyle='#2a2636';r.beginPath();r.moveTo(item.left*rw,0);r.lineTo(item.left*rw,rh);r.stroke();}
  const pixelsPerSecond=rh/4;
  r.strokeStyle='#343040';r.fillStyle='#82798f';r.font='10px sans-serif';
  for(let seconds=Math.ceil(time);seconds<time+4;seconds++){const y=rh-(seconds-time)*pixelsPerSecond;r.beginPath();r.moveTo(0,y);r.lineTo(rw,y);r.stroke();if(seconds>=0)r.fillText(formatTime(seconds),7,y-6);}
  const active=new Set(state.manual);
  for(const note of state.notes){
    if(note.start>time+4)break;if(note.end<time-.1)continue;
    const item=state.keyMap.get(note.midi);if(!item)continue;
    const y=rh-(note.end-time)*pixelsPerSecond,h=Math.max(5,(note.end-note.start)*pixelsPerSecond),x=item.left*rw+2,width=item.width*rw-4;
    const sounding=state.playing&&note.start<=time&&note.end>time;
    r.fillStyle=sounding?'#ccff8a':item.black?'#9171c3':'#b7a0e6';r.beginPath();r.roundRect(x,y,width,h,3);r.fill();
    r.fillStyle=sounding?'#364525':'#362a4c';if(h>22&&width>20){r.font='10px sans-serif';r.fillText(noteName(note.midi),x+3,y+14);}
    if(sounding)active.add(note.midi);
  }
  for(const [m,item] of state.keyMap)item.key.classList.toggle('active',active.has(m));
  $('#currentNote').textContent=active.size?[...active].map(noteName).join(' · '):'—';
  requestAnimationFrame(draw);
}
$('#file').addEventListener('change',event=>{void chooseFile(event.target.files[0]);event.target.value='';});
$('#dropzone').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('#file').click();}});
for(const event of ['dragenter','dragover'])$('#dropzone').addEventListener(event,e=>{e.preventDefault();$('#dropzone').classList.add('drag');});
for(const event of ['dragleave','drop'])$('#dropzone').addEventListener(event,e=>{e.preventDefault();$('#dropzone').classList.remove('drag');if(event==='drop')void chooseFile(e.dataTransfer.files[0]);});
window.addEventListener('dragover',e=>e.preventDefault());window.addEventListener('drop',e=>e.preventDefault());
$('#demo').addEventListener('click',loadDemo);$('#analyze').addEventListener('click',analyze);$('#cancel').addEventListener('click',cancelAnalysis);
$('#play').addEventListener('click',()=>state.playing?pause():void play());$('#restart').addEventListener('click',()=>seek(0));
$('#seek').addEventListener('input',e=>seek(Number(e.target.value)));
$('#speed').addEventListener('change',e=>{const resume=state.playing;pause();state.speed=Number(e.target.value);if(resume)void play();});
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
$('#volume').addEventListener('input',e=>{if(master)master.gain.setTargetAtTime(Number(e.target.value),context.currentTime,.02);});
$('#export').addEventListener('click',()=>{if(!state.notes.length)return;const url=URL.createObjectURL(new Blob([encodeMidi(state.notes)],{type:'audio/midi'})),link=document.createElement('a');link.href=url;link.download=state.name.replace(/\.[^.]+$/,'')+'-旋律.mid';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);});
document.addEventListener('keydown',e=>{if(e.code==='Space'&&!['INPUT','SELECT','BUTTON','LABEL'].includes(e.target.tagName)){e.preventDefault();state.playing?pause():void play();}});
window.addEventListener('pagehide',()=>{pause();state.worker?.terminate();});
buildKeyboard();draw();
void loadDemo();
if(document.modelContext?.registerTool){
  const lifecycle=new AbortController();window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  for(const tool of [
    {name:'read_melody_state',title:'讀取旋律狀態',description:'Read the currently loaded song, detected note count, and playback position.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute:()=>({song:state.name,duration:state.duration,noteCount:state.notes.length,position:position(),playing:state.playing,analyzing:state.busy})},
    {name:'seek_melody',title:'移動播放位置',description:'Seek the loaded song to an exact time in seconds, using the visible player timeline.',inputSchema:{type:'object',properties:{seconds:{type:'number',minimum:0}},required:['seconds'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:input=>{if(!state.buffer||state.busy||!Number.isFinite(input?.seconds)||input.seconds<0||input.seconds>state.duration)throw new Error('請指定歌曲範圍內的秒數，且等待分析完成。');seek(input.seconds);return {position:state.position};}}
  ])try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}
}
