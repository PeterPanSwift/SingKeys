import * as ort from 'onnxruntime-node';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {separateVocals,MODEL} from '../src/separation-core.js';
import {wavBytes} from '../dist/audio-utils.js';
const bytes=await readFile('.cache/Kim_Vocal_2.onnx');
if(createHash('sha256').update(bytes).digest('hex')!==MODEL.sha256)throw Error('Model hash mismatch');
const raw=await readFile('.cache/iceland-stereo.f32'),audio=new Float32Array(raw.buffer,raw.byteOffset,raw.length/4);
const channels=[new Float32Array(audio.length/2),new Float32Array(audio.length/2)];for(let i=0;i<audio.length/2;i++){channels[0][i]=audio[2*i];channels[1][i]=audio[2*i+1];}
const session=await ort.InferenceSession.create(bytes,{executionProviders:['cpu'],intraOpNumThreads:4});
console.log('Model input:',session.inputNames,'output:',session.outputNames);const started=Date.now();
const vocals=await separateVocals(channels,async data=>{const input=new ort.Tensor('float32',data,[1,4,3072,256]);const out=await session.run({[session.inputNames[0]]:input});const result=new Float32Array(out[session.outputNames[0]].data);input.dispose();Object.values(out).forEach(t=>t.dispose());return result;},(f,n,total)=>console.log(`Separated ${n}/${total} (${Math.round((Date.now()-started)/1000)}s)`));
await writeFile('.cache/iceland-vocals.wav',new Uint8Array(wavBytes(vocals,44100)));await session.release();
console.log('Saved aligned vocal stem:',vocals[0].length/44100,'seconds');
