import * as ort from 'onnxruntime-web/wasm';
import {separateVocals,MODEL} from './separation-core.js';
const report=(stage,fraction,extra={})=>self.postMessage({type:'progress',stage,fraction,...extra});
async function modelBytes(){
  let cache;
  try{cache=await caches.open('singkeys-model-v2');const hit=await cache.match(MODEL.url);if(hit){report('model',1,{cached:true});return new Uint8Array(await hit.arrayBuffer());}}catch{}
  const response=await fetch(MODEL.url);if(!response.ok)throw new Error('無法下載人聲模型，請檢查網路後重試。');
  const total=Number(response.headers.get('content-length'))||66800000,reader=response.body.getReader(),chunks=[];let received=0;
  for(;;){const {done,value}=await reader.read();if(done)break;chunks.push(value);received+=value.length;report('model',Math.min(.99,received/total),{megabytes:Math.round(received/1e6)});}
  const bytes=new Uint8Array(received);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
  if(hash!==MODEL.sha256)throw new Error('模型完整性檢查失敗，請重試。');
  try{await cache?.put(MODEL.url,new Response(bytes));}catch{}
  report('model',1);return bytes;
}
self.onmessage=async({data})=>{
  let session;
  try{
    ort.env.wasm.numThreads=1;ort.env.wasm.proxy=false;
    ort.env.wasm.wasmPaths=new URL('./runtime/',self.location.href).href;
    report('model',0);const bytes=await modelBytes();report('initialize',0);
    const backend='wasm';
    session=await ort.InferenceSession.create(bytes,{executionProviders:['wasm'],logSeverityLevel:3});
    report('separate',0,{backend});
    const channels=data.channels.map(b=>new Float32Array(b));
    const vocals=await separateVocals(channels,async spectrum=>{
      const input=new ort.Tensor('float32',spectrum,[1,4,MODEL.bins,MODEL.frames]);let result;
      try{result=await session.run({[session.inputNames[0]]:input});return new Float32Array(result[session.outputNames[0]].data);}finally{input.dispose();if(result)for(const tensor of Object.values(result))tensor.dispose();}
    },(fraction,chunk,total)=>report('separate',fraction,{chunk,total,backend}));
    self.postMessage({type:'vocals',channels:vocals.map(c=>c.buffer),sampleRate:44100,model:MODEL.name,backend},vocals.map(c=>c.buffer));
  }catch(error){self.postMessage({type:'error',message:error.message||String(error)});}
  finally{await session?.release();}
};
