import assert from 'node:assert/strict';import {trackVocalPitch,traceCandidates} from '../dist/vocal-pitch.js';
const sr=12000;
const tone=(midi,seconds=1)=>Float32Array.from({length:sr*seconds},(_,i)=>.3*Math.sin(2*Math.PI*440*2**((midi-69)/12)*i/sr));
for(const m of [48,60,69,72,83]){const r=trackVocalPitch(tone(m));assert(r.notes.length);assert(r.notes.every(n=>n.midi===m),`Pitch ${m} detected incorrectly`);}
assert.equal(trackVocalPitch(new Float32Array(sr)).notes.length,0);
const sequence=new Float32Array(sr*4);sequence.set(tone(60),0);sequence.set(tone(64),sr*1.5);sequence.set(tone(67),sr*3);
const result=trackVocalPitch(sequence);assert.deepEqual(result.notes.map(n=>n.midi),[60,64,67]);assert(result.notes[1].start>1.35&&result.notes[1].start<1.55);
const quiet=tone(60).map(v=>v*.025),mix=tone(48);assert.equal(trackVocalPitch(quiet,sr,'voice',()=>{},mix).notes.length,0,'Suppress residual stem too quiet relative to accompaniment');
const frames=Array.from({length:30},(_,i)=>({candidates:[{pitch:60,confidence:.95,emission:i===15?.3:.02},{pitch:72,confidence:.8,emission:i===15?.01:.3}]}));assert(traceCandidates(frames).every(c=>c.pitch===60),'Reject isolated octave excursion');
const twice=new Float32Array(sr*2.5);twice.set(tone(60),0);twice.set(tone(60),sr*1.5);assert.equal(trackVocalPitch(twice).notes.length,2,'Preserve repeated note separated by silence');
console.log('PASS: vocal pitches, silence gate, timed melody, leakage suppression, octave continuity, repeated-note segmentation.');
