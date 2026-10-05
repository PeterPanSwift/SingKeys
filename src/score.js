import ABCJS from 'abcjs';
import {makeScore,pageABC,numberedPitch} from '../dist/score-model.js';
export function createScore(root,onSeek){
 const $=s=>root.querySelector(s);let notes=[],model=makeScore([]),page=0,view='staff',lastActive='',time=0,playing=false;
 let noteElements=[],pageEvents=[];
 const bpm=()=>Number($('#scoreBpm').value),tonic=()=>Number($('#scoreTonic').value);
 const pages=()=>Math.max(1,Math.ceil(model.bars/4));
 function render(){
  page=Math.max(0,Math.min(pages()-1,page));lastActive='';$('#scoreEmpty').hidden=!!notes.length;$('#scoreBody').hidden=!notes.length;
  $('#scorePrev').disabled=!notes.length||page===0;$('#scoreNext').disabled=!notes.length||page>=pages()-1;
  $('#scorePage').textContent=notes.length?`第 ${page*4+1}–${Math.min(model.bars,page*4+4)} 小節 · ${page+1} / ${pages()}`:'尚無樂譜';
  $('#staffScore').hidden=view!=='staff';$('#numberScore').hidden=view!=='number';$('#tonicControl').hidden=view!=='number';
  root.querySelectorAll('[data-score-view]').forEach(b=>{const selected=b.dataset.scoreView===view;b.setAttribute('aria-selected',selected);b.classList.toggle('active',selected);});
  $('#staffScore').replaceChildren();$('#numberScore').replaceChildren();noteElements=[];if(!notes.length)return;
  pageEvents=model.events.filter(e=>e.bar>=page*4&&e.bar<page*4+4);
  if(view==='staff'){
   const {abc,spans}=pageABC(pageEvents,bpm());
   ABCJS.renderAbc($('#staffScore'),abc,{add_classes:true,staffwidth:690,responsive:'resize',paddingright:20,paddingleft:20,paddingtop:20,paddingbottom:20,foregroundColor:'#292633',selectionColor:'#6b43b5',ariaLabel:'辨識旋律五線譜，C 調記譜，4/4 拍',clickListener:element=>{const match=spans.find(s=>element.startChar>=s.start&&element.startChar<s.end);if(match)onSeek(match.event.seek);}});
   $('#staffScore svg')?.setAttribute('role','group');
   noteElements=[...$('#staffScore').querySelectorAll('.abcjs-note,.abcjs-rest')].map((el,i)=>({el,event:pageEvents[i]}));
   noteElements.forEach(({el,event})=>{if(event){el.dataset.source=event.sourceIndex;el.setAttribute('tabindex','0');el.setAttribute('role','button');el.setAttribute('aria-label',event.midi===null?'移至休止符':`移至音符 ${event.midi}，${event.seek.toFixed(1)} 秒`);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();onSeek(event.seek);}});}});
  }else{
   for(let bar=page*4;bar<Math.min(model.bars,page*4+4);bar++){
    const measure=document.createElement('div');measure.className='number-measure';const heading=document.createElement('div');heading.className='measure-label';heading.textContent=`${bar+1}`;measure.append(heading);
    const line=document.createElement('div');line.className='number-line';measure.append(line);
    for(const event of pageEvents.filter(e=>e.bar===bar)){
     const el=document.createElement('button');el.type='button';el.className='number-note';el.style.flexGrow=Math.max(1,event.length/4);const p=event.midi===null?{number:'0',octave:0}:numberedPitch(event.midi,tonic());
     const top=document.createElement('span');top.className='octave top';top.textContent=p.octave>0?'•'.repeat(p.octave):'\u00a0';
     const digit=document.createElement('span');digit.className='number-digit';digit.textContent=p.number;
     const lines=event.length===1?2:[2,3].includes(event.length)?1:0;digit.classList.add('underlines-'+lines);
     if([3,6].includes(event.length)){const dot=document.createElement('span');dot.className='duration-dot';dot.textContent='·';digit.append(dot);}
     const bottom=document.createElement('span');bottom.className='octave bottom';bottom.textContent=p.octave<0?'•'.repeat(-p.octave):'\u00a0';
     el.append(top,digit,bottom);
     if(event.length>=8){const dash=document.createElement('span');dash.className='duration-dashes';dash.textContent=' —'.repeat(event.length/4-1);el.append(dash);}
     el.setAttribute('aria-label',`${p.number}${p.octave?`，${p.octave>0?'高':'低'} ${Math.abs(p.octave)} 個八度`:''}，${event.length/4} 拍，${event.tieOut?'延音，':''}移至 ${event.seek.toFixed(1)} 秒`);
     el.addEventListener('click',()=>onSeek(event.seek));line.append(el);noteElements.push({el,event});
    }$('#numberScore').append(measure);
   }
  }
  if(view==='number')drawTies();
  highlight();
 }
 function drawTies(){
  $('#numberScore').querySelectorAll('.number-tie').forEach(el=>el.remove());
  noteElements.forEach(({el,event},i)=>{
   const next=noteElements[i+1],previous=noteElements[i-1],rect=el.getBoundingClientRect(),line=el.parentElement.getBoundingClientRect();
   const arc=(left,width)=>{const span=document.createElement('span');span.className='number-tie';span.style.left=left+'px';span.style.width=Math.max(10,width)+'px';span.setAttribute('aria-hidden','true');el.append(span);};
   if(event.tieOut){const edge=next?.event.bar===event.bar?next.el.getBoundingClientRect().left+next.el.getBoundingClientRect().width/2:line.right;arc(rect.width/2,edge-rect.left-rect.width/2);}
   if(event.tieIn&&previous?.event.bar!==event.bar)arc(line.left-rect.left,rect.left+rect.width/2-line.left);
  });
 }
 new ResizeObserver(()=>{if(view==='number')drawTies();}).observe($('#scoreBody'));
 function highlight(){const active=notes.findIndex(n=>n.start<=time&&n.end>time),key=`${active}:${page}:${view}`;if(key===lastActive)return;lastActive=key;for(const {el,event} of noteElements)el.classList.toggle('score-active',active>=0&&event?.sourceIndex===active);}
 function update(t,isPlaying){time=t;playing=isPlaying;if(notes.length&&playing&&$('#scoreFollow').checked){const target=Math.min(pages()-1,Math.floor(time*model.ticksPerSecond/64));if(target!==page){page=target;render();return;}}highlight();}
 function rebuild(){model=makeScore(notes,bpm());page=0;render();update(time,playing);}
 let tempoTimer;$('#scoreBpm').addEventListener('input',()=>{clearTimeout(tempoTimer);tempoTimer=setTimeout(()=>{const value=Number($('#scoreBpm').value);if(value>=40&&value<=240)rebuild();},200);});
 $('#scoreBpm').addEventListener('change',()=>{clearTimeout(tempoTimer);const value=Number($('#scoreBpm').value);$('#scoreBpm').value=Number.isFinite(value)&&value>=40?Math.min(240,Math.round(value)):120;rebuild();});
 $('#scoreTonic').addEventListener('change',render);
 $('#scorePrev').addEventListener('click',()=>{page--;if(playing)$('#scoreFollow').checked=false;render();});$('#scoreNext').addEventListener('click',()=>{page++;if(playing)$('#scoreFollow').checked=false;render();});
 root.querySelectorAll('[data-score-view]').forEach(b=>{b.addEventListener('click',()=>{view=b.dataset.scoreView;render();});b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();view=e.key==='Home'?'staff':e.key==='End'?'number':view==='staff'?'number':'staff';render();root.querySelector(`[data-score-view="${view}"]`).focus();}});});
 $('#scoreFollow').addEventListener('change',()=>update(time,playing));
 render();return {setNotes(value){notes=value;rebuild();},update};
}
