import {readFile,writeFile} from 'node:fs/promises';import {trackVocalPitch} from '../dist/vocal-pitch.js';
const read=async path=>{const b=await readFile(path);return new Float32Array(b.buffer,b.byteOffset,b.length/4);};
const result=trackVocalPitch(await read('.cache/vocal-mono.f32'),12000,'voice',()=>{},await read('.cache/mix-mono.f32'));
Object.assign(result,{pipelineVersion:2,separation:'Kim Vocal 2',sampleRate:12000});
await writeFile('dist/assets/iceland-v2.json',JSON.stringify(result));
console.log(JSON.stringify({notes:result.notes.length,voicedSeconds:result.voicedSeconds,uncertainNotes:result.uncertainNotes,firstNotes:result.notes.slice(0,8)}));
