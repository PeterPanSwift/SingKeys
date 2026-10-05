// Reference notation only: sixteenth-note quantization in an adjustable 4/4 grid.
export function makeScore(notes,bpm=120){
 const ticksPerSecond=bpm/15,events=[];let cursor=0;
 const add=(from,to,note,index)=>{
  while(from<to){const available=Math.min(to-from,16-from%16);const length=[16,12,8,6,4,3,2,1].find(n=>n<=available);
   events.push({tick:from,length,bar:Math.floor(from/16),midi:note?.midi??null,sourceIndex:index,seek:note?.start??from/ticksPerSecond,tieIn:!!note&&from>Math.max(cursor,Math.round(note.start*ticksPerSecond)),tieOut:!!note&&from+length<to});from+=length;
  }
 };
 notes.forEach((note,index)=>{if(!Number.isFinite(note.start)||!Number.isFinite(note.end)||!Number.isFinite(note.midi)||note.end<=note.start)return;
  const start=Math.max(cursor,Math.round(note.start*ticksPerSecond)),end=Math.max(start+1,Math.round(note.end*ticksPerSecond));
  if(start>cursor)add(cursor,start,null,-1);add(start,end,note,index);cursor=end;
 });
 if(events.length&&cursor%16)add(cursor,Math.ceil(cursor/16)*16,null,-1);
 return {events,bars:events.length?Math.ceil(events.at(-1).tick/16+events.at(-1).length/16):0,ticksPerSecond};
}
export function abcPitch(midi){const names=['=C','^C','=D','^D','=E','=F','^F','=G','^G','=A','^A','=B'];const octave=Math.floor(midi/12)-1;let value=names[(midi%12+12)%12];if(octave>=5)value=value.toLowerCase()+"'".repeat(octave-5);else value+=','.repeat(Math.max(0,4-octave));return value;}
export function numberedPitch(midi,tonic=0){const relative=midi-60-tonic,pc=(relative%12+12)%12;const names=['1','♯1','2','♯2','3','4','♯4','5','♯5','6','♯6','7'];return {number:names[pc],octave:Math.floor(relative/12)};}
export function pageABC(events,bpm){let abc=`X:1\nM:4/4\nL:1/16\nQ:1/4=${bpm}\nK:C\n`;const spans=[];let lastBar=events[0]?.bar??0;
 for(const event of events){if(event.bar!==lastBar){abc+=' | ';if((event.bar-(events[0]?.bar??0))%2===0)abc+='\n';lastBar=event.bar;}
  const start=abc.length;abc+=(event.midi===null?'z':abcPitch(event.midi))+event.length+(event.tieOut?'-':'');spans.push({start,end:abc.length,event});abc+=' ';
 }return {abc:abc+' |]',spans};}
