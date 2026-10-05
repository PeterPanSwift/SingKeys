import {analyzePitch} from './pitch-core.js';
self.onmessage=({data})=>{
  try{
    const result=analyzePitch(new Float32Array(data.samples),data.sampleRate,data.range,value=>self.postMessage({type:'progress',value}));
    self.postMessage({type:'result',result});
  }catch(error){self.postMessage({type:'error',message:error.message});}
};
