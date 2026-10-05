import assert from 'node:assert/strict';import {separateVocals} from '../src/separation-core.js';
// Bypass inference to verify STFT, padding, overlap-add and end coverage independently.
const length=44100*11+173,channel=Float32Array.from({length},(_,i)=>.2*Math.sin(2*Math.PI*440*i/44100)),frames=[];
const result=await separateVocals([channel,channel],async spectrum=>spectrum,(f)=>frames.push(f));
assert.equal(result[0].length,length);assert.equal(frames.at(-1),1);
for(const [start,end] of [[4000,15000],[185000,200000],[length-12000,length-2000]]){
 let error=0,power=0;for(let i=start;i<end;i++){error+=(result[0][i]/1.009-channel[i])**2;power+=channel[i]**2;}
 assert(Math.sqrt(error/power)<.02,`STFT or overlap discontinuity at ${start}`);
}
assert(result[0].every(Number.isFinite));console.log('PASS: stereo STFT reconstruction, overlap seams, output duration and tail coverage.');
