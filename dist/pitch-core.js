// YIN dominant monophonic pitch estimation. This is not vocal source separation.
export function analyzePitch(samples, sampleRate=12000, range='voice', onProgress=()=>{}) {
  const limits={voice:[48,84],low:[36,72],wide:[45,96]};
  const [minMidi,maxMidi]=limits[range]||limits.voice;
  const frequency=m=>440*2**((m-69)/12);
  const minTau=Math.max(2,Math.floor(sampleRate/frequency(maxMidi)));
  const maxTau=Math.ceil(sampleRate/frequency(minMidi))+1;
  const window=1024,hop=240,step=hop/sampleRate;
  const total=Math.max(0,Math.floor((samples.length-window-maxTau)/hop)+1);
  const diff=new Float64Array(maxTau+1),frames=[];
  let peak=0;
  for(let i=0;i<samples.length;i++) peak=Math.max(peak,Math.abs(samples[i]));
  let previous=null;
  for(let frame=0;frame<total;frame++) {
    const offset=frame*hop;let energy=0;
    for(let j=0;j<window;j++)energy+=samples[offset+j]**2;
    const rms=Math.sqrt(energy/window);
    if(frame%60===0)onProgress(frame/total*95);
    if(rms<Math.max(.002,peak*.018)){frames.push({midi:null,confidence:0,rms});previous=null;continue;}
    let running=0;diff[0]=1;
    for(let tau=1;tau<=maxTau;tau++){
      let sum=0;
      for(let j=0;j<window;j++){const delta=samples[offset+j]-samples[offset+j+tau];sum+=delta*delta;}
      running+=sum;diff[tau]=running>0?sum*tau/running:1;
    }
    const candidates=[];
    for(let tau=minTau;tau<maxTau;tau++){
      if(diff[tau]<.38&&diff[tau]<=diff[tau-1]&&diff[tau]<diff[tau+1]){
        const denom=2*(2*diff[tau]-diff[tau-1]-diff[tau+1]);
        const refined=tau+(denom?(diff[tau+1]-diff[tau-1])/denom:0);
        const midi=69+12*Math.log2(sampleRate/refined/440);
        if(midi>=minMidi-.5&&midi<=maxMidi+.5)candidates.push({midi:Math.round(midi),confidence:1-diff[tau],tau});
      }
    }
    let chosen=candidates.find(c=>c.confidence>.82)||candidates.reduce((best,c)=>!best||c.confidence>best.confidence?c:best,null);
    if(previous!==null&&chosen){
      const close=candidates.find(c=>Math.abs(c.midi-previous)<=2&&c.confidence>=chosen.confidence-.055);
      if(close)chosen=close;
    }
    frames.push({midi:chosen?.midi??null,confidence:chosen?.confidence??0,rms});previous=chosen?.midi??null;
  }
  const smooth=frames.map((f,i)=>{
    if(f.midi===null)return f;
    const neighbors=frames.slice(Math.max(0,i-2),i+3).filter(n=>n.midi!==null).map(n=>n.midi).sort((a,b)=>a-b);
    return {...f,midi:neighbors[Math.floor(neighbors.length/2)]};
  });
  const segments=[];let current=null;
  const flush=()=>{if(current&&current.end-current.start>=.075)segments.push(current);current=null;};
  for(let i=0;i<smooth.length;i++){
    const f=smooth[i],time=i*step;
    if(f.midi===null){flush();continue;}
    if(current&&current.midi===f.midi){current.end=time+step;current.confidenceSum+=f.confidence;current.frames++;current.rms=Math.max(current.rms,f.rms);}
    else{flush();current={midi:f.midi,start:time,end:time+step,confidenceSum:f.confidence,frames:1,rms:f.rms};}
  }
  flush();const notes=[];
  for(const s of segments){
    const previous=notes.at(-1);
    if(previous&&previous.midi===s.midi&&s.start-previous.end<=.08)previous.end=s.end;
    else notes.push({midi:s.midi,start:+s.start.toFixed(3),end:+s.end.toFixed(3),confidence:+(s.confidenceSum/s.frames).toFixed(3),velocity:Math.max(45,Math.min(110,Math.round(60+s.rms*100)))});
  }
  onProgress(100);
  return {notes,duration:samples.length/sampleRate,range,algorithm:'YIN with median smoothing; dominant monophonic estimate'};
}
