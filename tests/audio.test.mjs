import assert from 'node:assert/strict';
import {analyzePitch} from '../dist/pitch-core.js';
import {encodeMidi} from '../dist/midi.js';
const sr=12000;
function tone(midi,seconds=1){const f=440*2**((midi-69)/12);return Float32Array.from({length:sr*seconds},(_,i)=>.3*Math.sin(2*Math.PI*f*i/sr)+.1*Math.sin(4*Math.PI*f*i/sr));}
for(const midi of [48,60,69,72,83]){const {notes}=analyzePitch(tone(midi),sr);assert(notes.length>0);assert(notes.every(n=>n.midi===midi),`Wrong pitch for MIDI ${midi}: ${JSON.stringify(notes)}`);}
assert.equal(analyzePitch(new Float32Array(sr),sr).notes.length,0);
const sequence=new Float32Array(sr*4);sequence.set(tone(60),0);sequence.set(tone(64),sr*1.5);sequence.set(tone(67),sr*3);
const {notes}=analyzePitch(sequence,sr);assert.deepEqual(notes.map(n=>n.midi),[60,64,67]);assert(notes[1].start>=1.4&&notes[1].start<=1.6);assert(notes[0].end<1.1);
const midi=encodeMidi(notes);assert.equal(Buffer.from(midi.subarray(0,4)).toString(),'MThd');assert.equal(Buffer.from(midi).readUInt32BE(18),midi.length-22);assert.deepEqual([...midi.slice(-4)],[0,255,47,0]);
console.log('PASS: five known pitches, silence, separated melody timing, and MIDI file structure.');
