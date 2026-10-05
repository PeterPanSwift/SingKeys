export function wavBytes(channels,sampleRate){
 const length=channels[0].length,count=channels.length,size=length*count*2,buffer=new ArrayBuffer(44+size),view=new DataView(buffer);
 const text=(offset,s)=>[...s].forEach((c,i)=>view.setUint8(offset+i,c.charCodeAt(0)));
 text(0,'RIFF');view.setUint32(4,size+36,true);text(8,'WAVE');text(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,count,true);view.setUint32(24,sampleRate,true);view.setUint32(28,sampleRate*count*2,true);view.setUint16(32,count*2,true);view.setUint16(34,16,true);text(36,'data');view.setUint32(40,size,true);
 let offset=44;for(let i=0;i<length;i++)for(let c=0;c<count;c++){view.setInt16(offset,Math.round(Math.max(-1,Math.min(1,channels[c][i]))*32767),true);offset+=2;}return buffer;
}
export async function resample(buffer,sampleRate=12000,channels=1){
 const offline=new OfflineAudioContext(channels,Math.ceil(buffer.duration*sampleRate),sampleRate),source=offline.createBufferSource();source.buffer=buffer;source.connect(offline.destination);source.start();return offline.startRendering();
}
