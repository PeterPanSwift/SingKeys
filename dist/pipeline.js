import {resample} from './audio-utils.js';
function runWorker(url,payload,transfers,onProgress,signal){
 return new Promise((resolve,reject)=>{
  if(signal.aborted){reject(new DOMException('已取消','AbortError'));return;}
  const worker=new Worker(url,{type:'module'});
  const clean=()=>{worker.terminate();signal.removeEventListener('abort',abort);};
  const abort=()=>{clean();reject(new DOMException('已取消','AbortError'));};
  signal.addEventListener('abort',abort,{once:true});
  worker.onmessage=({data})=>{if(data.type==='progress')onProgress(data);else if(data.type==='error'){clean();reject(new Error(data.message));}else{clean();resolve(data);}};
  worker.onerror=e=>{clean();reject(new Error(e.message||'分析程式無法啟動'));};
  worker.postMessage(payload,transfers);
 });
}
export async function analyzeSong(buffer,{range,cleanVocals=false,vocalBuffer=null,signal,onProgress,onVocals}){
 let vocals=vocalBuffer;
 const check=()=>{if(signal.aborted)throw new DOMException('已取消','AbortError');};
 if(!cleanVocals&&!vocals){
   onProgress({stage:'prepare',fraction:0});const stereo=await resample(buffer,44100,2);check();
   const channels=[stereo.getChannelData(0).slice().buffer,stereo.getChannelData(1).slice().buffer];
   const separated=await runWorker('./separation-worker.js',{channels},channels,onProgress,signal);check();
   vocals=new AudioBuffer({length:separated.channels[0].byteLength/4,numberOfChannels:2,sampleRate:44100});
   separated.channels.forEach((b,c)=>vocals.copyToChannel(new Float32Array(b),c));onVocals(vocals,separated);
 }else if(cleanVocals){vocals=buffer;onVocals(vocals,{model:'已提供的人聲',backend:null});}
 onProgress({stage:'gate',fraction:0});check();
 const vocalMono=await resample(vocals,12000,1);check();
 const mixture=cleanVocals?null:await resample(buffer,12000,1);check();
 const samples=vocalMono.getChannelData(0).slice().buffer,mix=mixture?.getChannelData(0).slice().buffer;
 onProgress({stage:'gate',fraction:1});
 const {result}=await runWorker('./pitch-worker.js',{samples,mixture:mix,sampleRate:12000,range},mix?[samples,mix]:[samples],onProgress,signal);
 return {...result,pipelineVersion:2,separation:cleanVocals?'provided-vocals':'Kim Vocal 2',sampleRate:12000};
}
