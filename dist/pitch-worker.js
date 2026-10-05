import {trackVocalPitch} from './vocal-pitch.js';
self.onmessage=({data})=>{
 try{const result=trackVocalPitch(new Float32Array(data.samples),data.sampleRate,data.range,(stage,fraction)=>self.postMessage({type:'progress',stage,fraction}),data.mixture?new Float32Array(data.mixture):null);self.postMessage({type:'result',result});}
 catch(error){self.postMessage({type:'error',message:error.message});}
};
