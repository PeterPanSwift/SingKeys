import {PffftSTFT} from 'web-audio-separation';
export const MODEL = {name:'Kim Vocal 2',sampleRate:44100,fft:7680,hop:1024,bins:3072,frames:256,compensate:1.009,
 url:'https://huggingface.co/Politrees/UVR_resources/resolve/83719e1e624d07842f914d856722af6f463e88cb/models/MDXNet/Kim_Vocal_2.onnx',
 sha256:'ce74ef3b6a6024ce44211a07be9cf8bc6d87728cc852a68ab34eb8e58cde9c8b'};
// infer receives [1,4,3072,256] complex stereo spectra and returns the vocal spectrum.
// All samples remain aligned with the original. Leading/trailing context is trimmed.
export async function separateVocals(channels,infer,report=()=>{}) {
  const length=channels[0].length,chunkSize=MODEL.hop*(MODEL.frames-1),trim=MODEL.fft/2;
  const usable=chunkSize-2*trim,stride=Math.floor(usable*.75),overlap=usable-stride;
  const stft=new PffftSTFT(MODEL.fft,MODEL.hop,MODEL.bins);await stft.init();
  const output=[new Float32Array(length),new Float32Array(length)],weights=new Float32Array(length);
  const total=Math.ceil(length/stride);let completed=0;
  for(let start=0;start<length;start+=stride){
    const chunk=new Float32Array(2*chunkSize);
    for(let c=0;c<2;c++){
      const channel=channels[c]||channels[0],from=Math.max(0,start-trim),to=Math.min(length,start-trim+chunkSize);
      chunk.set(channel.subarray(from,to),c*chunkSize+from-(start-trim));
    }
    const prediction=await infer(stft.forward(chunk,1,chunkSize));
    const audio=stft.inverse(prediction,1),valid=Math.min(usable,length-start);
    for(let i=0;i<valid;i++){
      const weight=Math.min(start===0?1:(i+1)/overlap,start+usable>=length?1:(usable-i)/overlap,1);
      weights[start+i]+=weight;
      for(let c=0;c<2;c++)output[c][start+i]+=audio[c*chunkSize+trim+i]*weight*MODEL.compensate;
    }
    report(++completed/total,completed,total);
  }
  for(let c=0;c<2;c++)for(let i=0;i<length;i++){
    output[c][i]/=Math.max(weights[i],1e-8);
    if(!Number.isFinite(output[c][i]))throw new Error('模型產生無效音訊，請重新分析。');
  }
  return output;
}
