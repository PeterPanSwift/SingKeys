export function encodeMidi(notes){
  const variable=value=>{let bytes=[value&127];while(value>>=7)bytes.unshift((value&127)|128);return bytes;};
  const events=[];
  for(const n of notes){events.push({tick:Math.round(n.start*960),data:[0x90,n.midi,n.velocity||80]});events.push({tick:Math.round(n.end*960),data:[0x80,n.midi,0]});}
  events.sort((a,b)=>a.tick-b.tick||a.data[0]-b.data[0]);
  const track=[0,0xff,0x51,3,7,0xa1,0x20,0,0xc0,0];let last=0;
  for(const event of events){track.push(...variable(event.tick-last),...event.data);last=event.tick;}
  track.push(0,0xff,0x2f,0);const size=track.length;
  return new Uint8Array([77,84,104,100,0,0,0,6,0,0,0,1,1,224,77,84,114,107,(size>>>24)&255,(size>>>16)&255,(size>>>8)&255,size&255,...track]);
}
