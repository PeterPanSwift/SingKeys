// Vocal f0 tracking: energy/periodicity gate, YIN candidates, Viterbi continuity,
// median smoothing, onset-aware note segmentation. Confidence is not accuracy.
const hz=m=>440*2**((m-69)/12);
export function trackVocalPitch(samples,sr=12000,range='voice',progress=()=>{},mixture=null){
 const [lo,hi]=({voice:[48,84],low:[36,72],wide:[45,96]})[range]||[48,84];
 const win=1024,hop=240,dt=hop/sr,minLag=Math.max(2,Math.floor(sr/hz(hi))),maxLag=Math.ceil(sr/hz(lo))+1;
 const count=Math.max(0,Math.floor((samples.length-win-maxLag)/hop)+1),energy=new Float32Array(count),mixEnergy=new Float32Array(count);
 for(let f=0;f<count;f++){let sum=0,mix=0;for(let i=0;i<win;i++){sum+=samples[f*hop+i]**2;if(mixture)mix+=mixture[f*hop+i]**2;}energy[f]=Math.sqrt(sum/win);mixEnergy[f]=Math.sqrt(mix/win);}
 const sorted=[...energy].sort((a,b)=>a-b),level=sorted[Math.floor(sorted.length*.85)]||0;
 const floor=Math.max(.0012,level*.045);const frames=[],difference=new Float64Array(maxLag+1);
 for(let f=0;f<count;f++){
   if(f%80===0)progress('pitch',f/Math.max(1,count));
   const candidates=[],rms=energy[f],ratio=mixture?rms/(mixEnergy[f]+1e-8):1;
   if(rms>=floor&&ratio>=.065){
     let sum=0;difference[0]=1;const start=f*hop;
     for(let lag=1;lag<=maxLag;lag++){let d=0;for(let i=0;i<win;i++){const delta=samples[start+i]-samples[start+i+lag];d+=delta*delta;}sum+=d;difference[lag]=sum>0?d*lag/sum:1;}
     for(let lag=minLag;lag<maxLag;lag++)if(difference[lag]<.30&&difference[lag]<=difference[lag-1]&&difference[lag]<difference[lag+1]){
       const denom=2*(2*difference[lag]-difference[lag-1]-difference[lag+1]);
       const refined=lag+(denom?(difference[lag+1]-difference[lag-1])/denom:0),pitch=69+12*Math.log2(sr/refined/440);
       if(pitch>=lo-.5&&pitch<=hi+.5)candidates.push({pitch,confidence:1-difference[lag]});
     }
   }
   const best=candidates.reduce((n,c)=>Math.max(n,c.confidence),0);
   frames.push({rms,ratio,candidates:[...candidates.slice(0,6).map((c,i)=>({...c,emission:-Math.log(c.confidence)+i*.12})),{pitch:null,confidence:1-best,emission:best>.8?1.15:0}]});
 }
 const path=traceCandidates(frames);progress('segment',0);
 // Three-frame median removes isolated octave glitches without erasing sustained jumps.
 const pitches=path.map((c,i)=>{if(c.pitch===null)return null;const nearby=path.slice(Math.max(0,i-1),i+2).filter(c=>c.pitch!==null).map(c=>c.pitch).sort((a,b)=>a-b);return nearby[Math.floor(nearby.length/2)];});
 const notes=[];let note=null;
 const flush=()=>{if(note&&note.end-note.start>=.075){note.confidence=+(note.sum/note.frames).toFixed(3);note.velocity=Math.max(45,Math.min(110,Math.round(60+note.peak*100)));delete note.sum;delete note.frames;delete note.peak;notes.push(note);}note=null;};
 for(let i=0;i<pitches.length;i++){
   const p=pitches[i],start=i*dt;
   if(p===null){flush();continue;}
   let midi=Math.round(p);
   if(note&&Math.abs(p-note.midi)<.7)midi=note.midi;
   const attack=note&&start-note.start>.12&&i>1&&energy[i]>energy[i-1]*1.9&&energy[i-1]<level*.35;
   if(note&&note.midi===midi&&!attack){note.end=+(start+dt).toFixed(3);note.sum+=path[i].confidence;note.frames++;note.peak=Math.max(note.peak,energy[i]);}
   else{flush();note={midi,start:+start.toFixed(3),end:+(start+dt).toFixed(3),sum:path[i].confidence,frames:1,peak:energy[i]};}
 }
 flush();progress('segment',1);
 const voicedSeconds=notes.reduce((sum,n)=>sum+n.end-n.start,0);
 return {notes,duration:samples.length/sr,range,algorithm:'Vocal YIN candidates + Viterbi + onset-aware segmentation',voicedSeconds:+voicedSeconds.toFixed(2),uncertainNotes:notes.filter(n=>n.confidence<.85).length};
}
export function traceCandidates(frames){
 if(!frames.length)return [];
 let costs=frames[0].candidates.map(c=>c.emission);const back=[[]];
 for(let i=1;i<frames.length;i++){
   const next=[],links=[];
   for(const c of frames[i].candidates){let best=Infinity,index=0;
     frames[i-1].candidates.forEach((previous,k)=>{
       const distance=c.pitch===null||previous.pitch===null?null:Math.abs(c.pitch-previous.pitch);
       const transition=distance===null?(c.pitch===previous.pitch?0:.32):Math.min(distance*.055,.8)+(Math.abs(distance-12)<.7?.32:0);
       const cost=costs[k]+transition+c.emission;
       if(cost<best){best=cost;index=k;}
     });next.push(best);links.push(index);
   }costs=next;back.push(links);
 }
 let index=costs.indexOf(Math.min(...costs));const result=[];
 for(let i=frames.length-1;i>=0;i--){result[i]=frames[i].candidates[index];index=back[i][index];}
 return result;
}
