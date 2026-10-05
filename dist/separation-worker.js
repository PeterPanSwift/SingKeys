var mt=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var so=Object.defineProperty,Cb=Object.getOwnPropertyDescriptor,zb=Object.getOwnPropertyNames,Bb=Object.prototype.hasOwnProperty,jb=(e=>typeof mt<"u"?mt:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof mt<"u"?mt:t)[r]}):e)(function(e){if(typeof mt<"u")return mt.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),Oe=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(i){throw r=[i],i}},wn=(e,t)=>{for(var r in t)so(e,r,{get:t[r],enumerable:!0})},Ob=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of zb(t))!Bb.call(e,a)&&a!==r&&so(e,a,{get:()=>t[a],enumerable:!(i=Cb(t,a))||i.enumerable});return e},to=e=>Ob(so({},"__esModule",{value:!0}),e),ia,ur,vn,sd,Ad,kd=Oe(()=>{"use strict";ia=new Map,ur=[],vn=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=ia.get(e);if(i===void 0)ia.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let a=ur.indexOf(e);a!==-1&&ur.splice(a,1);for(let s=0;s<ur.length;s++)if(ia.get(ur[s]).priority<=r){ur.splice(s,0,e);return}ur.push(e)}return}throw new TypeError("not a valid backend")},sd=async e=>{let t=ia.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Ad=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),i=r.length===0?ur:r,a,s=[],n=new Set;for(let l of i){let d=await sd(l);typeof d=="string"?s.push({name:l,err:d}):(a||(a=d),a===d&&n.add(l))}if(!a)throw new Error(`no available backend found. ERR: ${s.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:d}of s)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${d}`);let o=t.filter(l=>n.has(typeof l=="string"?l:l.name));return[a,new Proxy(e,{get:(l,d)=>d==="executionProviders"?o:Reflect.get(l,d)})]}}),Rb=Oe(()=>{"use strict";kd()}),Td,Mb=Oe(()=>{"use strict";Td="1.30.0"}),Ps,tt,Sd=Oe(()=>{"use strict";Mb(),Ps="warning",tt={wasm:{},webgl:{},webgpu:{},versions:{common:Td},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Ps=e}},get logLevel(){return Ps}},Object.defineProperty(tt,"logLevel",{enumerable:!0})}),We,Db=Oe(()=>{"use strict";Sd(),We=tt}),Ed,Id,Nb=Oe(()=>{"use strict";Ed=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],s=e.dims[3]):(a=e.dims[3],s=e.dims[2]);let n=t?.format!==void 0?t.format:"RGB",o=t?.norm,l,d;o===void 0||o.mean===void 0?l=[255,255,255,255]:typeof o.mean=="number"?l=[o.mean,o.mean,o.mean,o.mean]:(l=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(l[3]=o.mean[3])),o===void 0||o.bias===void 0?d=[0,0,0,0]:typeof o.bias=="number"?d=[o.bias,o.bias,o.bias,o.bias]:(d=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(d[3]=o.bias[3]));let f=s*a,c=0,h=f,y=f*2,g=-1;n==="RGBA"?(c=0,h=f,y=f*2,g=f*3):n==="RGB"?(c=0,h=f,y=f*2):n==="RBG"&&(c=0,y=f,h=f*2);for(let _=0;_<s;_++)for(let I=0;I<a;I++){let $=(e.data[c++]-d[0])*l[0],w=(e.data[h++]-d[1])*l[1],T=(e.data[y++]-d[2])*l[2],E=g===-1?255:(e.data[g++]-d[3])*l[3];i.fillStyle="rgba("+$+","+w+","+T+","+E+")",i.fillRect(I,_,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Id=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let a,s,n;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],s=e.dims[1],n=e.dims[3]):(a=e.dims[3],s=e.dims[2],n=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,d,f;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?f=[0,0,0,0]:typeof l.bias=="number"?f=[l.bias,l.bias,l.bias,l.bias]:(f=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(f[3]=l.bias[3]));let c=s*a;if(t!==void 0&&(t.format!==void 0&&n===4&&t.format!=="RGBA"||n===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,y=0,g=1,_=2,I=3,$=0,w=c,T=c*2,E=-1;o==="RGBA"?($=0,w=c,T=c*2,E=c*3):o==="RGB"?($=0,w=c,T=c*2):o==="RBG"&&($=0,T=c,w=c*2),i=r.createImageData(a,s);for(let C=0;C<s*a;y+=h,g+=h,_+=h,I+=h,C++)i.data[y]=(e.data[$++]-f[0])*d[0],i.data[g]=(e.data[w++]-f[1])*d[1],i.data[_]=(e.data[T++]-f[2])*d[2],i.data[I]=E===-1?255:(e.data[E++]-f[3])*d[3]}else throw new Error("Can not access image data");return i}}),pn,Cd,zd,Bd,jd,Od,Ub=Oe(()=>{"use strict";oo(),pn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,a=t.norm??{mean:255,bias:0},s,n;typeof a.mean=="number"?s=[a.mean,a.mean,a.mean,a.mean]:s=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?n=[a.bias,a.bias,a.bias,a.bias]:n=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*i,f=l==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),c=4,h=0,y=1,g=2,_=3,I=0,$=d,w=d*2,T=-1;o==="RGB"&&(c=3,h=0,y=1,g=2,_=-1),l==="RGBA"?T=d*3:l==="RBG"?(I=0,w=d,$=d*2):l==="BGR"&&(w=0,$=d,I=d*2);for(let E=0;E<d;E++,h+=c,g+=c,y+=c,_+=c)f[I++]=(e[h]+n[0])/s[0],f[$++]=(e[y]+n[1])/s[1],f[w++]=(e[g]+n[2])/s[2],T!==-1&&_!==-1&&(f[T++]=(e[_]+n[3])/s[3]);return l==="RGBA"?new wt("float32",f,[1,4,r,i]):new wt("float32",f,[1,3,r,i])},Cd=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,s=typeof e=="string",n,o=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(r){let f=l();f.width=e.width,f.height=e.height;let c=d(f);if(c!=null){let h=e.height,y=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(h=t.resizedHeight,y=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=h,o.width=y}else o.tensorFormat="RGBA",o.height=h,o.width=y;c.drawImage(e,0,0),n=c.getImageData(0,0,y,h).data}else throw new Error("Can not access image data")}else if(i){let f,c;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(f=t.resizedHeight,c=t.resizedWidth):(f=e.height,c=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=f,o.width=c,t!==void 0){let h=l();h.width=c,h.height=f;let y=d(h);if(y!=null)y.putImageData(e,0,0),n=y.getImageData(0,0,c,f).data;else throw new Error("Can not access image data")}else n=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=l();f.width=e.width,f.height=e.height;let c=d(f);if(c!=null){let h=e.height,y=e.width;return c.drawImage(e,0,0,y,h),n=c.getImageData(0,0,y,h).data,o.height=h,o.width=y,pn(n,o)}else throw new Error("Can not access image data")}else{if(s)return new Promise((f,c)=>{let h=l(),y=d(h);if(!e||!y)return c();let g=new Image;g.crossOrigin="Anonymous",g.src=e,g.onload=()=>{h.width=g.width,h.height=g.height,y.drawImage(g,0,0,h.width,h.height);let _=y.getImageData(0,0,h.width,h.height);o.height=h.height,o.width=h.width,f(pn(_.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(n!==void 0)return pn(n,o);throw new Error("Input data provided is not supported - aborted tensor creation")},zd=(e,t)=>{let{width:r,height:i,download:a,dispose:s}=t,n=[1,i,r,4];return new wt({location:"texture",type:"float32",texture:e,dims:n,download:a,dispose:s})},Bd=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:s}=t;return new wt({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:a,dispose:s})},jd=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:s}=t;return new wt({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:a,dispose:s})},Od=(e,t,r)=>new wt({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),jr,oa,Ls,Rd,Pb=Oe(()=>{"use strict";jr=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),oa=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Ls=!1,Rd=()=>{if(!Ls){Ls=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(jr.set("int64",BigInt64Array),oa.set(BigInt64Array,"int64")),t&&(jr.set("uint64",BigUint64Array),oa.set(BigUint64Array,"uint64")),i?(jr.set("float16",r),oa.set(r,"float16")):jr.set("float16",Uint16Array)}}}),Md,Dd,Lb=Oe(()=>{"use strict";oo(),Md=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},Dd=(e,t)=>{switch(e.location){case"cpu":return new wt(e.type,e.data,t);case"cpu-pinned":return new wt({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new wt({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new wt({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new wt({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),wt,oo=Oe(()=>{"use strict";Nb(),Ub(),Pb(),Lb(),wt=class{constructor(e,t,r){Rd();let i,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,a=e.dims,e.location){case"cpu-pinned":{let n=jr.get(i);if(!n)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof n))throw new TypeError(`buffer should be of type ${n.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let n,o;if(typeof e=="string")if(i=e,o=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");n=t}else{let l=jr.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?n=l.from(t,BigInt):n=l.from(t)}else if(t instanceof l)n=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")n=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)n=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${l}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")i="string",n=e;else if(l==="boolean")i="bool",n=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",n=Uint8Array.from(e);else{let l=oa.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=l,n=e}if(o===void 0)o=[n.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");a=o,this.cpuData=n,this.dataLocation="cpu"}let s=Md(a);if(this.cpuData&&s!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=a,this.size=s}static async fromImage(e,t){return Cd(e,t)}static fromTexture(e,t){return zd(e,t)}static fromGpuBuffer(e,t){return Bd(e,t)}static fromMLTensor(e,t){return jd(e,t)}static fromPinnedBuffer(e,t,r){return Od(e,t,r)}toDataURL(e){return Ed(this,e)}toImageData(e){return Id(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Dd(this,e)}}}),St,Nd=Oe(()=>{"use strict";oo(),St=wt}),ro,qs,mi,gi,vi,bi,Ud=Oe(()=>{"use strict";Sd(),ro=(e,t)=>{(typeof tt.trace>"u"?!tt.wasm.trace:!tt.trace)||console.timeStamp(`${e}::ORT::${t}`)},qs=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let a=0;a<r.length;a++){if(i&&!r[a].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[a].trim().split(" ")[1]}`;t&&(s+=`::${t}`),ro("CPU",s);return}r[a].includes("TRACE_FUNC")&&(i=!0)}},mi=e=>{(typeof tt.trace>"u"?!tt.wasm.trace:!tt.trace)||qs("BEGIN",e)},gi=e=>{(typeof tt.trace>"u"?!tt.wasm.trace:!tt.trace)||qs("END",e)},vi=e=>{(typeof tt.trace>"u"?!tt.wasm.trace:!tt.trace)||console.time(`ORT::${e}`)},bi=e=>{(typeof tt.trace>"u"?!tt.wasm.trace:!tt.trace)||console.timeEnd(`ORT::${e}`)}}),Pd,qb=Oe(()=>{"use strict";kd(),Nd(),Ud(),Pd=class Ld{constructor(t){this.handler=t}async run(t,r,i){mi(),vi("InferenceSession.run");let a={},s={};if(typeof t!="object"||t===null||t instanceof St||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let n=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof St)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");n=!1;for(let d of r){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);a[d]=null}if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,f=Object.getOwnPropertyNames(r);for(let c of this.outputNames)if(f.indexOf(c)!==-1){let h=r[c];(h===null||h instanceof St)&&(d=!0,n=!1,a[c]=h)}if(d){if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else s=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(n)for(let d of this.outputNames)a[d]=null;let o=await this.handler.run(t,a,s),l={};for(let d in o)if(Object.hasOwnProperty.call(o,d)){let f=o[d];f instanceof St?l[d]=f:l[d]=new St(f.type,f.data,f.dims)}return bi("InferenceSession.run"),gi(),l}async release(){return this.handler.dispose()}static async create(t,r,i,a){mi(),vi("InferenceSession.create");let s,n={};if(typeof t=="string"){if(s=t,typeof r=="object"&&r!==null)n=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,typeof r=="object"&&r!==null)n=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let f=t,c=0,h=t.byteLength;if(typeof r=="object"&&r!==null)n=r;else if(typeof r=="number"){if(c=r,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(h=t.byteLength-c,typeof i=="number"){if(h=i,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||c+h>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-c}].`);if(typeof a=="object"&&a!==null)n=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(f,c,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,l]=await Ad(n),d=await o.createInferenceSessionHandler(s,l);return bi("InferenceSession.create"),gi(),new Ld(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),_n,Fb=Oe(()=>{"use strict";qb(),_n=Pd}),Gb=Oe(()=>{"use strict"}),Wb=Oe(()=>{"use strict"}),Vb=Oe(()=>{"use strict"}),Hb=Oe(()=>{"use strict"}),Kb={};wn(Kb,{InferenceSession:()=>_n,TRACE:()=>ro,TRACE_EVENT_BEGIN:()=>vi,TRACE_EVENT_END:()=>bi,TRACE_FUNC_BEGIN:()=>mi,TRACE_FUNC_END:()=>gi,Tensor:()=>St,env:()=>We,registerBackend:()=>vn});var Or=Oe(()=>{"use strict";Rb(),Db(),Fb(),Nd(),Gb(),Wb(),Ud(),Vb(),Hb()}),uo=Oe(()=>{"use strict"}),qd={};wn(qd,{default:()=>Fd});var Fs,Gs,Fd,Xb=Oe(()=>{"use strict";r0(),yi(),lo(),Fs="ort-wasm-proxy-worker",Gs=globalThis.self?.name===Fs,Gs&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":po(r.wasm).then(()=>{go(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;vo(a,i).then(()=>{postMessage({type:t})},s=>{postMessage({type:t,err:s})});break}case"copy-from":{let{buffer:i}=r,a=yn(i);postMessage({type:t,out:a});break}case"create":{let{model:i,options:a}=r;bo(i,a).then(s=>{postMessage({type:t,out:s})},s=>{postMessage({type:t,err:s})});break}case"release":yo(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:a,inputs:s,outputIndices:n,options:o}=r;wo(i,a,s,n,new Array(n.length).fill(null),o).then(l=>{l.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},xo([...s,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":_o(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),Fd=Gs?null:e=>new Worker(e??yt,{type:"module",name:Fs})}),Gd={};wn(Gd,{default:()=>Wd});async function od(e={}){var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,a=i&&self.name?.startsWith("em-pthread");t.mountExternalData=(v,x)=>{v.startsWith("./")&&(v=v.substring(2)),(t.Tb||(t.Tb=new Map)).set(v,x)},t.unmountExternalData=()=>{delete t.Tb,delete t.mc,delete t.lc,delete t.nc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;var s,n,o=(v,x)=>{throw x},l=import.meta.url,d="";if(r||i){try{d=new URL(".",l).href}catch{}i&&(n=v=>{var x=new XMLHttpRequest;return x.open("GET",v,!1),x.responseType="arraybuffer",x.send(null),new Uint8Array(x.response)}),s=async v=>{if(C(v))return new Promise((B,z)=>{var M=new XMLHttpRequest;M.open("GET",v,!0),M.responseType="arraybuffer",M.onload=()=>{M.status==200||M.status==0&&M.response?B(M.response):z(M.status)},M.onerror=z,M.send(null)});var x=await fetch(v,{credentials:"same-origin"});if(x.ok)return x.arrayBuffer();throw Error(x.status+" : "+x.url)}}var f,c,h,y,g,_,I=console.log.bind(console),$=console.error.bind(console),w=I,T=$,E=!1,C=v=>v.startsWith("file://");function S(){ct.buffer!=P.buffer&&te()}if(a){let v=function(x){try{var B=x.data,z=B.Rb;if(z==="load"){let M=[];self.onmessage=N=>M.push(N),_=()=>{postMessage({Rb:"loaded"});for(let N of M)v(N);self.onmessage=v};for(let N of B.ac)t[N]&&!t[N].proxy||(t[N]=(...Z)=>{postMessage({Rb:"callHandler",$b:N,args:Z})},N=="print"&&(w=t[N]),N=="printErr"&&(T=t[N]));ct=B.fc,te(),c=B.hc,ee(),Er()}else if(z==="run"){(function(M){var N=(S(),H)[M+52>>>2>>>0];M=(S(),H)[M+56>>>2>>>0],Tr(N,N-M),_e(N)})(B.Qb),$r(B.Qb,0,0,1,0,0),st(),ft(B.Qb),A||=!0;try{ka(B.dc,B.Vb)}catch(M){if(M!="unwind")throw M}}else B.target!=="setimmediate"&&(z==="checkMailbox"?A&&ar():z&&(T(`worker: received unknown command ${z}`),T(B)))}catch(M){throw qa(),M}};var R=v,A=!1;self.onunhandledrejection=x=>{throw x.reason||x},self.onmessage=v}var P,K,Y,L,H,me,O,W,ue,ne=!1;function te(){var v=ct.buffer;t.HEAP8=P=new Int8Array(v),Y=new Int16Array(v),t.HEAPU8=K=new Uint8Array(v),new Uint16Array(v),t.HEAP32=L=new Int32Array(v),t.HEAPU32=H=new Uint32Array(v),me=new Float32Array(v),O=new Float64Array(v),W=new BigInt64Array(v),new BigUint64Array(v)}function ie(){ne=!0,a?_():Wt.Va()}function G(v){throw T(v="Aborted("+v+")"),E=!0,v=new WebAssembly.RuntimeError(v+". Build with -sASSERTIONS for more info."),g?.(v),v}function oe(){return{a:{T:fs,f:Yr,w:Hn,e:Ti,k:Si,h:Kn,L:Xn,b:Zn,G:Qn,ua:Ea,j:Ia,M:Ii,La:Ci,qa:Xe,sa:zi,Ma:Bi,Ja:ji,Ca:Oi,Ia:Ri,Z:Mi,ra:Di,oa:Ni,Ka:Ui,pa:Pi,Ra:za,Fa:Ba,ma:Li,va:nr,ja:Bt,U:ja,Ea:ft,Oa:Jn,za:es,Aa:ht,Ba:vt,xa:ai,ya:Oa,ka:Ra,Ta:rs,Qa:is,W:as,V:ns,Pa:Gt,F:ss,Na:os,na:us,u:ts,H:ls,S:sr,la:ui,ba:ds,Ua:ps,Ga:Da,Ha:Na,ta:at,I:wr,wa:Ua,Y:jt,Da:bt,X:_r,$:sn,N:Bs,aa:nn,O:di,v:As,d:Za,m:ms,n:hs,r:ws,ca:li,E:Qt,o:vs,P:an,C:js,J:Cs,da:Is,ea:Es,z:_s,fa:Ts,Q:Ss,ga:ks,y:Yi,D:zs,c:gs,q:Ya,i:Qa,_:on,l:Ja,p:en,s:bs,t:Sr,x:xs,R:rn,A:Ji,K:$s,B:ea,ha:tn,ia:ys,g:Vi,a:ct,Sa:ot}}}async function ee(){function v(z,M){return Wt=z.exports,Wt=(function(){var N=Wt,Z=we=>()=>we()>>>0,ce=we=>be=>we(be)>>>0;return(N=Object.assign({},N)).ub=Z(N.ub),N.wb=ce(N.wb),N.Kb=ce(N.Kb),N.Lb=Z(N.Lb),N.Pb=ce(N.Pb),N})(),He.push(Wt.xb),z=Wt,t._OrtInit=z.Wa,t._OrtGetLastError=z.Xa,t._OrtCreateSessionOptions=z.Ya,t._OrtAppendExecutionProvider=z.Za,t._OrtAddFreeDimensionOverride=z._a,t._OrtAddSessionConfigEntry=z.$a,t._OrtReleaseSessionOptions=z.ab,t._OrtCreateSession=z.bb,t._OrtReleaseSession=z.cb,t._OrtGetInputOutputCount=z.db,t._OrtGetInputOutputMetadata=z.eb,t._OrtFree=z.fb,t._OrtCreateTensor=z.gb,t._OrtGetTensorData=z.hb,t._OrtReleaseTensor=z.ib,t._OrtCreateRunOptions=z.jb,t._OrtAddRunConfigEntry=z.kb,t._OrtReleaseRunOptions=z.lb,t._OrtCreateBinding=z.mb,t._OrtBindInput=z.nb,t._OrtBindOutput=z.ob,t._OrtClearBoundOutputs=z.pb,t._OrtReleaseBinding=z.qb,t._OrtRunWithBinding=z.rb,t._OrtRun=z.sb,t._OrtEndProfiling=z.tb,xr=z.ub,Hi=t._free=z.vb,La=t._malloc=z.wb,$r=z.zb,qa=z.Ab,Ki=z.Bb,Fa=z.Cb,Ar=z.Db,Ga=z.Eb,Wa=z.Fb,ke=z.Gb,kr=z.Hb,Tr=z.Ib,_e=z.Jb,Xi=z.Kb,$e=z.Lb,Va=z.Mb,Zi=z.Nb,Ha=z.Ob,Qi=z.Pb,Ka=z.yb,c=M,Wt}var x,B=oe();return t.instantiateWasm?new Promise(z=>{t.instantiateWasm(B,(M,N)=>{z(v(M,N))})}):a?v(new WebAssembly.Instance(c,oe()),c):(ue??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.wasm",d):d+"ort-wasm-simd-threaded.wasm":new URL("ort-wasm-simd-threaded.wasm",import.meta.url).href,x=await(async function(z){var M=ue;if(!f&&!C(M))try{var N=fetch(M,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(N,z)}catch(Z){T(`wasm streaming compile failed: ${Z}`),T("falling back to ArrayBuffer instantiation")}return(async function(Z,ce){try{var we=await(async function(be){if(!f)try{var Ye=await s(be);return new Uint8Array(Ye)}catch{}if(be==ue&&f)be=new Uint8Array(f);else{if(!n)throw"both async and sync fetching of the wasm failed";be=n(be)}return be})(Z);return await WebAssembly.instantiate(we,ce)}catch(be){T(`failed to asynchronously prepare wasm: ${be}`),G(be)}})(M,z)})(B),v(x.instance,x.module))}class J{name="ExitStatus";constructor(x){this.message=`Program terminated with exit(${x})`,this.status=x}}var Re=v=>{v.terminate(),v.onmessage=()=>{}},Ue=[],Ee=0,Me=null,de=v=>{V.length==0&&(pt(),nt(V[0]));var x=V.pop();if(!x)return 6;ge.push(x),Pe[v.Qb]=x,x.Qb=v.Qb;var B={Rb:"run",dc:v.cc,Vb:v.Vb,Qb:v.Qb};return x.postMessage(B,v.Zb),0},pe=0,he=(v,x,...B)=>{var z,M=16*B.length,N=$e(),Z=Xi(M),ce=Z>>>3;for(z of B)typeof z=="bigint"?((S(),W)[ce++>>>0]=1n,(S(),W)[ce++>>>0]=z):((S(),W)[ce++>>>0]=0n,(S(),O)[ce++>>>0]=z);return v=Ki(v,0,M,Z,x),_e(N),v};function ot(v){if(a)return he(0,1,v);if(h=v,!(0<pe)){for(var x of ge)Re(x);for(x of V)Re(x);V=[],ge=[],Pe={},E=!0}o(0,new J(v))}function Ct(v){if(a)return he(1,0,v);at(v)}var at=v=>{if(h=v,a)throw Ct(v),"unwind";ot(v)},V=[],ge=[],He=[],Pe={},De=v=>{var x=v.Qb;delete Pe[x],V.push(v),ge.splice(ge.indexOf(v),1),v.Qb=0,Fa(x)};function st(){He.forEach(v=>v())}var nt=v=>new Promise(x=>{v.onmessage=M=>{var N=M.data;if(M=N.Rb,N.Ub&&N.Ub!=xr()){var Z=Pe[N.Ub];Z?Z.postMessage(N,N.Zb):T(`Internal error! Worker sent a message "${M}" to target pthread ${N.Ub}, but that thread no longer exists!`)}else M==="checkMailbox"?ar():M==="spawnThread"?de(N):M==="cleanupThread"?ri(()=>{De(Pe[N.ec])}):M==="loaded"?(v.loaded=!0,x(v)):N.target==="setimmediate"?v.postMessage(N):M==="uncaughtException"?v.onerror(N.error):M==="callHandler"?t[N.$b](...N.args):M&&T(`worker sent an unknown command ${M}`)},v.onerror=M=>{throw T(`worker sent an error! ${M.filename}:${M.lineno}: ${M.message}`),M};var B,z=[];for(B of[])t.propertyIsEnumerable(B)&&z.push(B);v.postMessage({Rb:"load",ac:z,fc:ct,hc:c})});function pt(){var v=new Worker((()=>{let x=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new x("ort.wasm.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});V.push(v)}var ct,ir=[],Ae=v=>{var x=ir[v];return x||(ir[v]=x=Ka.get(v)),x},ka=(v,x)=>{pe=0,v=Ae(v)(x),0<pe?h=v:Ar(v)},gt=[],Qr=0;function Yr(v){var x=new Jr(v>>>=0);return(S(),P)[x.Sb+12>>>0]==0&&(Kt(x,!0),Qr--),Ta(x,!1),gt.push(x),Qi(v)}var zt=0,Hn=()=>{ke(0,0);var v=gt.pop();Va(v.Wb),zt=0};function Kt(v,x){x=x?1:0,(S(),P)[v.Sb+12>>>0]=x}function Ta(v,x){x=x?1:0,(S(),P)[v.Sb+13>>>0]=x}class Jr{constructor(x){this.Wb=x,this.Sb=x-24}}var ei=v=>{var x=zt;if(!x)return kr(0),0;var B=new Jr(x);(S(),H)[B.Sb+16>>>2>>>0]=x;var z=(S(),H)[B.Sb+4>>>2>>>0];if(!z)return kr(0),x;for(var M of v){if(M===0||M===z)break;if(Ha(M,z,B.Sb+16))return kr(M),x}return kr(z),x};function Ti(){return ei([])}function Si(v){return ei([v>>>0])}function Kn(v,x,B,z){return ei([v>>>0,x>>>0,B>>>0,z>>>0])}var Xn=()=>{var v=gt.pop();v||G("no exception to throw");var x=v.Wb;throw(S(),P)[v.Sb+13>>>0]==0&&(gt.push(v),Ta(v,!0),Kt(v,!1),Qr++),Zi(x),zt=x};function Zn(v,x,B){var z=new Jr(v>>>=0);throw x>>>=0,B>>>=0,(S(),H)[z.Sb+16>>>2>>>0]=0,(S(),H)[z.Sb+4>>>2>>>0]=x,(S(),H)[z.Sb+8>>>2>>>0]=B,Zi(v),Qr++,zt=v}var Qn=()=>Qr;function Sa(v,x,B,z){return a?he(2,1,v,x,B,z):Ea(v,x,B,z)}function Ea(v,x,B,z){if(v>>>=0,x>>>=0,B>>>=0,z>>>=0,!globalThis.SharedArrayBuffer)return 6;var M=[];return a&&M.length===0?Sa(v,x,B,z):(v={cc:B,Qb:v,Vb:z,Zb:M},a?(v.Rb="spawnThread",postMessage(v,M),0):de(v))}function Ia(v){throw zt||=v>>>0,zt}var Ei=globalThis.TextDecoder&&new TextDecoder,Ca=(v,x=0,B,z)=>{var M=x>>>=0;if(B=M+B,z)z=B;else{for(;v[M]&&!(M>=B);)++M;z=M}if(16<z-x&&v.buffer&&Ei)return Ei.decode(v.buffer instanceof ArrayBuffer?v.subarray(x,z):v.slice(x,z));for(M="";x<z;)if(128&(B=v[x++])){var N=63&v[x++];if((224&B)==192)M+=String.fromCharCode((31&B)<<6|N);else{var Z=63&v[x++];65536>(B=(240&B)==224?(15&B)<<12|N<<6|Z:(7&B)<<18|N<<12|Z<<6|63&v[x++])?M+=String.fromCharCode(B):(B-=65536,M+=String.fromCharCode(55296|B>>10,56320|1023&B))}}else M+=String.fromCharCode(B);return M},ti=(v,x,B)=>(v>>>=0)?Ca((S(),K),v,x,B):"";function Ii(v,x,B){return a?he(3,1,v,x,B):0}function Ci(v,x){if(a)return he(4,1,v,x)}function Xe(v,x){if(a)return he(5,1,v,x)}function zi(v,x,B){if(a)return he(6,1,v,x,B)}function Bi(v,x,B){return a?he(7,1,v,x,B):0}function ji(v,x){if(a)return he(8,1,v,x)}function Oi(v,x,B){if(a)return he(9,1,v,x,B)}function Ri(v,x,B,z){if(a)return he(10,1,v,x,B,z)}function Mi(v,x,B,z){if(a)return he(11,1,v,x,B,z)}function Di(v,x,B,z){if(a)return he(12,1,v,x,B,z)}function Ni(v){if(a)return he(13,1,v)}function Ui(v,x){if(a)return he(14,1,v,x)}function Pi(v,x,B){if(a)return he(15,1,v,x,B)}var za=()=>G("");function Ba(v){$r(v>>>0,!i,1,!r,131072,!1),st()}var ri=v=>{if(!E)try{if(v(),!(0<pe))try{a?xr()&&Ar(h):at(h)}catch(x){x instanceof J||x=="unwind"||o(0,x)}}catch(x){x instanceof J||x=="unwind"||o(0,x)}},Yn=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function ft(v){v>>>=0,Yn||(Atomics.waitAsync((S(),L),v>>>2,v).value.then(ar),v+=128,Atomics.store((S(),L),v>>>2,1))}var ar=()=>ri(()=>{var v=xr();v&&(ft(v),Wa())});function Li(v,x){(v>>>=0)==x>>>0?setTimeout(ar):a?postMessage({Ub:v,Rb:"checkMailbox"}):(v=Pe[v])&&v.postMessage({Rb:"checkMailbox"})}var qi=[];function nr(v,x,B,z,M){for(x>>>=0,M>>>=0,qi.length=0,B=M>>>3,z=M+z>>>3;B<z;){var N;N=(S(),W)[B++>>>0]?(S(),W)[B++>>>0]:(S(),O)[B++>>>0],qi.push(N)}return(x?Xa[x]:cs[v])(...qi)}var Bt=()=>{pe=0};function ja(v){v>>>=0,a?postMessage({Rb:"cleanupThread",ec:v}):De(Pe[v])}function Jn(v){}function es(v,x){v=-9007199254740992>v||9007199254740992<v?NaN:Number(v),x>>>=0,v=new Date(1e3*v),(S(),L)[x>>>2>>>0]=v.getUTCSeconds(),(S(),L)[x+4>>>2>>>0]=v.getUTCMinutes(),(S(),L)[x+8>>>2>>>0]=v.getUTCHours(),(S(),L)[x+12>>>2>>>0]=v.getUTCDate(),(S(),L)[x+16>>>2>>>0]=v.getUTCMonth(),(S(),L)[x+20>>>2>>>0]=v.getUTCFullYear()-1900,(S(),L)[x+24>>>2>>>0]=v.getUTCDay(),v=(v.getTime()-Date.UTC(v.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(S(),L)[x+28>>>2>>>0]=v}var Fi=v=>v%4==0&&(v%100!=0||v%400==0),Ft=[0,31,60,91,121,152,182,213,244,274,305,335],ii=[0,31,59,90,120,151,181,212,243,273,304,334];function ht(v,x){v=-9007199254740992>v||9007199254740992<v?NaN:Number(v),x>>>=0,v=new Date(1e3*v),(S(),L)[x>>>2>>>0]=v.getSeconds(),(S(),L)[x+4>>>2>>>0]=v.getMinutes(),(S(),L)[x+8>>>2>>>0]=v.getHours(),(S(),L)[x+12>>>2>>>0]=v.getDate(),(S(),L)[x+16>>>2>>>0]=v.getMonth(),(S(),L)[x+20>>>2>>>0]=v.getFullYear()-1900,(S(),L)[x+24>>>2>>>0]=v.getDay();var B=(Fi(v.getFullYear())?Ft:ii)[v.getMonth()]+v.getDate()-1|0;(S(),L)[x+28>>>2>>>0]=B,(S(),L)[x+36>>>2>>>0]=-60*v.getTimezoneOffset(),B=new Date(v.getFullYear(),6,1).getTimezoneOffset();var z=new Date(v.getFullYear(),0,1).getTimezoneOffset();v=0|(B!=z&&v.getTimezoneOffset()==Math.min(z,B)),(S(),L)[x+32>>>2>>>0]=v}function vt(v){v>>>=0;var x=new Date((S(),L)[v+20>>>2>>>0]+1900,(S(),L)[v+16>>>2>>>0],(S(),L)[v+12>>>2>>>0],(S(),L)[v+8>>>2>>>0],(S(),L)[v+4>>>2>>>0],(S(),L)[v>>>2>>>0],0),B=(S(),L)[v+32>>>2>>>0],z=x.getTimezoneOffset(),M=new Date(x.getFullYear(),6,1).getTimezoneOffset(),N=new Date(x.getFullYear(),0,1).getTimezoneOffset(),Z=Math.min(N,M);return 0>B?(S(),L)[v+32>>>2>>>0]=+(M!=N&&Z==z):0<B!=(Z==z)&&(M=Math.max(N,M),x.setTime(x.getTime()+6e4*((0<B?Z:M)-z))),(S(),L)[v+24>>>2>>>0]=x.getDay(),B=(Fi(x.getFullYear())?Ft:ii)[x.getMonth()]+x.getDate()-1|0,(S(),L)[v+28>>>2>>>0]=B,(S(),L)[v>>>2>>>0]=x.getSeconds(),(S(),L)[v+4>>>2>>>0]=x.getMinutes(),(S(),L)[v+8>>>2>>>0]=x.getHours(),(S(),L)[v+12>>>2>>>0]=x.getDate(),(S(),L)[v+16>>>2>>>0]=x.getMonth(),(S(),L)[v+20>>>2>>>0]=x.getYear(),v=x.getTime(),BigInt(isNaN(v)?-1:v/1e3)}function ai(v,x,B,z,M,N,Z){return a?he(16,1,v,x,B,z,M,N,Z):-52}function Oa(v,x,B,z,M,N){if(a)return he(17,1,v,x,B,z,M,N)}var vr={},ts=()=>performance.timeOrigin+performance.now();function Ra(v,x){if(a)return he(18,1,v,x);if(vr[v]&&(clearTimeout(vr[v].id),delete vr[v]),!x)return 0;var B=setTimeout(()=>{delete vr[v],ri(()=>Ga(v,performance.timeOrigin+performance.now()))},x);return vr[v]={id:B,oc:x},0}var Xt=(v,x,B)=>{var z=(S(),K);if(x>>>=0,0<B){var M=x;B=x+B-1;for(var N=0;N<v.length;++N){var Z=v.codePointAt(N);if(127>=Z){if(x>=B)break;z[x++>>>0]=Z}else if(2047>=Z){if(x+1>=B)break;z[x++>>>0]=192|Z>>6,z[x++>>>0]=128|63&Z}else if(65535>=Z){if(x+2>=B)break;z[x++>>>0]=224|Z>>12,z[x++>>>0]=128|Z>>6&63,z[x++>>>0]=128|63&Z}else{if(x+3>=B)break;z[x++>>>0]=240|Z>>18,z[x++>>>0]=128|Z>>12&63,z[x++>>>0]=128|Z>>6&63,z[x++>>>0]=128|63&Z,N++}}z[x>>>0]=0,v=x-M}else v=0;return v};function rs(v,x,B,z){v>>>=0,x>>>=0,B>>>=0,z>>>=0;var M=new Date().getFullYear(),N=new Date(M,0,1).getTimezoneOffset();M=new Date(M,6,1).getTimezoneOffset();var Z=Math.max(N,M);(S(),H)[v>>>2>>>0]=60*Z,(S(),L)[x>>>2>>>0]=+(N!=M),v=(x=ce=>{var we=Math.abs(ce);return`UTC${0<=ce?"-":"+"}${String(Math.floor(we/60)).padStart(2,"0")}${String(we%60).padStart(2,"0")}`})(N),x=x(M),M<N?(Xt(v,B,17),Xt(x,z,17)):(Xt(v,z,17),Xt(x,B,17))}var Gt=()=>Date.now(),ni=1;function is(v,x,B){if(B>>>=0,!(0<=v&&3>=v))return 28;if(v===0)v=Date.now();else{if(!ni)return 52;v=performance.timeOrigin+performance.now()}return v=Math.round(1e6*v),(S(),W)[B>>>3>>>0]=BigInt(v),0}var si=[];function as(v,x,B){v>>>=0,x>>>=0,B>>>=0,si.length=0;for(var z;z=(S(),K)[x++>>>0];){var M=z!=105;B+=(M&=z!=112)&&B%8?4:0,si.push(z==112?(S(),H)[B>>>2>>>0]:z==106?(S(),W)[B>>>3>>>0]:z==105?(S(),L)[B>>>2>>>0]:(S(),O)[B>>>3>>>0]),B+=M?8:4}return Xa[v](...si)}var ns=()=>{};function ss(v,x){return T(ti(v>>>0,x>>>0))}var os=()=>{throw pe+=1,"unwind"};function us(){return 4294901760}var ls=()=>navigator.hardwareConcurrency,Zt={},Gi=v=>{for(var x=0,B=0;B<v.length;++B){var z=v.charCodeAt(B);127>=z?x++:2047>=z?x+=2:55296<=z&&57343>=z?(x+=4,++B):x+=3}return x},oi=v=>{var x;return(x=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(v))?+x[1]:(x=/:(\d+):\d+(?:\)|$)/.exec(v))?2147483648|+x[1]:0},br=v=>{for(var x of v)(v=oi(x))&&(Zt[v]=x)};function ds(){var v=Error().stack.toString().split(`
`);return v[0]=="Error"&&v.shift(),br(v),Zt.Xb=oi(v[3]),Zt.bc=v,Zt.Xb}function sr(v){if(!(v=Zt[v>>>0]))return 0;var x;if(x=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(v))v=x[1];else if(x=/^\s+at (.*) \(.*\)$/.exec(v))v=x[1];else{if(!(x=/^(.+?)@/.exec(v)))return 0;v=x[1]}Hi(sr.Yb??0),x=Gi(v)+1;var B=La(x);return B&&Xt(v,B,x),sr.Yb=B,sr.Yb}function ui(v){v>>>=0;var x=(S(),K).length;if(v<=x||4294901760<v)return!1;for(var B=1;4>=B;B*=2){var z=x*(1+.2/B);z=Math.min(z,v+100663296);e:{z=(Math.min(4294901760,65536*Math.ceil(Math.max(v,z)/65536))-ct.buffer.byteLength+65535)/65536|0;try{ct.grow(z),te();var M=1;break e}catch{}M=void 0}if(M)return!0}return!1}function ps(v,x,B){if(v>>>=0,x>>>=0,Zt.Xb==v)var z=Zt.bc;else(z=Error().stack.toString().split(`
`))[0]=="Error"&&z.shift(),br(z);for(var M=3;z[M]&&oi(z[M])!=v;)++M;for(v=0;v<B&&z[v+M];++v)(S(),L)[x+4*v>>>2>>>0]=oi(z[v+M]);return v}var yr,Wi={},Ma=()=>{if(!yr){var v,x={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(v in Wi)Wi[v]===void 0?delete x[v]:x[v]=Wi[v];var B=[];for(v in x)B.push(`${v}=${x[v]}`);yr=B}return yr};function Da(v,x){if(a)return he(19,1,v,x);v>>>=0,x>>>=0;var B,z=0,M=0;for(B of Ma()){var N=x+z;(S(),H)[v+M>>>2>>>0]=N,z+=Xt(B,N,1/0)+1,M+=4}return 0}function Na(v,x){if(a)return he(20,1,v,x);v>>>=0,x>>>=0;var B=Ma();for(var z of((S(),H)[v>>>2>>>0]=B.length,v=0,B))v+=Gi(z)+1;return(S(),H)[x>>>2>>>0]=v,0}function wr(v){return a?he(21,1,v):52}function Ua(v,x,B,z,M){return a?he(22,1,v,x,B,z,M):52}function jt(v,x,B,z){return a?he(23,1,v,x,B,z):52}function bt(v,x,B,z){return a?he(24,1,v,x,B,z):70}var Pa=[null,[],[]];function _r(v,x,B,z){if(a)return he(25,1,v,x,B,z);x>>>=0,B>>>=0,z>>>=0;for(var M=0,N=0;N<B;N++){var Z=(S(),H)[x>>>2>>>0],ce=(S(),H)[x+4>>>2>>>0];x+=8;for(var we=0;we<ce;we++){var be=v,Ye=(S(),K)[Z+we>>>0],ut=Pa[be];Ye===0||Ye===10?((be===1?w:T)(Ca(ut)),ut.length=0):ut.push(Ye)}M+=ce}return(S(),H)[z>>>2>>>0]=M,0}function Vi(v){return v>>>0}a||(function(){for(var v=t.numThreads-1;v--;)pt();Ue.push(async()=>{var x=(async function(){if(!a)return Promise.all(V.map(nt))})();Ee++,await x,--Ee==0&&Me&&(x=Me,Me=null,x())})})(),a||(ct=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),te()),t.wasmBinary&&(f=t.wasmBinary),t.stackSave=()=>$e(),t.stackRestore=v=>_e(v),t.stackAlloc=v=>Xi(v),t.setValue=function(v,x,B="i8"){switch(B.endsWith("*")&&(B="*"),B){case"i1":case"i8":(S(),P)[v>>>0]=x;break;case"i16":(S(),Y)[v>>>1>>>0]=x;break;case"i32":(S(),L)[v>>>2>>>0]=x;break;case"i64":(S(),W)[v>>>3>>>0]=BigInt(x);break;case"float":(S(),me)[v>>>2>>>0]=x;break;case"double":(S(),O)[v>>>3>>>0]=x;break;case"*":(S(),H)[v>>>2>>>0]=x;break;default:G(`invalid type for setValue: ${B}`)}},t.getValue=function(v,x="i8"){switch(x.endsWith("*")&&(x="*"),x){case"i1":case"i8":return(S(),P)[v>>>0];case"i16":return(S(),Y)[v>>>1>>>0];case"i32":return(S(),L)[v>>>2>>>0];case"i64":return(S(),W)[v>>>3>>>0];case"float":return(S(),me)[v>>>2>>>0];case"double":return(S(),O)[v>>>3>>>0];case"*":return(S(),H)[v>>>2>>>0];default:G(`invalid type for getValue: ${x}`)}},t.UTF8ToString=ti,t.stringToUTF8=Xt,t.lengthBytesUTF8=Gi;var xr,Hi,La,$r,qa,Ki,Fa,Ar,Ga,Wa,ke,kr,Tr,_e,Xi,$e,Va,Zi,Ha,Qi,Ka,Wt,cs=[ot,Ct,Sa,Ii,Ci,Xe,zi,Bi,ji,Oi,Ri,Mi,Di,Ni,Ui,Pi,ai,Oa,Ra,Da,Na,wr,Ua,jt,bt,_r],Xa={1042604:(v,x,B,z,M)=>{if(t===void 0||!t.Tb)return 1;if((v=ti(Number(v>>>0))).startsWith("./")&&(v=v.substring(2)),!(v=t.Tb.get(v)))return 2;if(x=Number(x>>>0),B=Number(B>>>0),z=Number(z>>>0),x+B>v.byteLength)return 3;try{let N=v.subarray(x,x+B);switch(M){case 0:(S(),K).set(N,z>>>0);break;case 1:t.ic?t.ic(z,N):t.kc(z,N);break;default:return 4}return 0}catch{return 4}},1043428:()=>typeof wasmOffsetConverter<"u"};function fs(){return typeof wasmOffsetConverter<"u"}function hs(v,x,B,z){var M=$e();try{return Ae(v)(x,B,z)}catch(N){if(_e(M),N!==N+0)throw N;ke(1,0)}}function ms(v,x,B){var z=$e();try{return Ae(v)(x,B)}catch(M){if(_e(z),M!==M+0)throw M;ke(1,0)}}function gs(v){var x=$e();try{Ae(v)()}catch(B){if(_e(x),B!==B+0)throw B;ke(1,0)}}function Za(v,x){var B=$e();try{return Ae(v)(x)}catch(z){if(_e(B),z!==z+0)throw z;ke(1,0)}}function Qa(v,x,B){var z=$e();try{Ae(v)(x,B)}catch(M){if(_e(z),M!==M+0)throw M;ke(1,0)}}function Ya(v,x){var B=$e();try{Ae(v)(x)}catch(z){if(_e(B),z!==z+0)throw z;ke(1,0)}}function vs(v,x,B,z,M,N,Z){var ce=$e();try{return Ae(v)(x,B,z,M,N,Z)}catch(we){if(_e(ce),we!==we+0)throw we;ke(1,0)}}function bs(v,x,B,z,M,N){var Z=$e();try{Ae(v)(x,B,z,M,N)}catch(ce){if(_e(Z),ce!==ce+0)throw ce;ke(1,0)}}function Ja(v,x,B,z){var M=$e();try{Ae(v)(x,B,z)}catch(N){if(_e(M),N!==N+0)throw N;ke(1,0)}}function en(v,x,B,z,M){var N=$e();try{Ae(v)(x,B,z,M)}catch(Z){if(_e(N),Z!==Z+0)throw Z;ke(1,0)}}function Sr(v,x,B,z,M,N,Z){var ce=$e();try{Ae(v)(x,B,z,M,N,Z)}catch(we){if(_e(ce),we!==we+0)throw we;ke(1,0)}}function ys(v,x,B,z,M,N,Z){var ce=$e();try{Ae(v)(x,B,z,M,N,Z)}catch(we){if(_e(ce),we!==we+0)throw we;ke(1,0)}}function tn(v,x,B,z,M,N,Z,ce){var we=$e();try{Ae(v)(x,B,z,M,N,Z,ce)}catch(be){if(_e(we),be!==be+0)throw be;ke(1,0)}}function ws(v,x,B,z,M){var N=$e();try{return Ae(v)(x,B,z,M)}catch(Z){if(_e(N),Z!==Z+0)throw Z;ke(1,0)}}function _s(v,x,B){var z=$e();try{return Ae(v)(x,B)}catch(M){if(_e(z),M!==M+0)throw M;ke(1,0)}}function xs(v,x,B,z,M,N,Z,ce){var we=$e();try{Ae(v)(x,B,z,M,N,Z,ce)}catch(be){if(_e(we),be!==be+0)throw be;ke(1,0)}}function $s(v,x,B,z,M,N,Z,ce,we,be,Ye,ut){var At=$e();try{Ae(v)(x,B,z,M,N,Z,ce,we,be,Ye,ut)}catch(kt){if(_e(At),kt!==kt+0)throw kt;ke(1,0)}}function Yi(v,x,B){var z=$e();try{return Ae(v)(x,B)}catch(M){if(_e(z),M!==M+0)throw M;return ke(1,0),0n}}function rn(v,x,B,z,M,N,Z,ce,we){var be=$e();try{Ae(v)(x,B,z,M,N,Z,ce,we)}catch(Ye){if(_e(be),Ye!==Ye+0)throw Ye;ke(1,0)}}function As(v){var x=$e();try{return Ae(v)()}catch(B){if(_e(x),B!==B+0)throw B;ke(1,0)}}function ks(v,x){var B=$e();try{return Ae(v)(x)}catch(z){if(_e(B),z!==z+0)throw z;return ke(1,0),0n}}function Ts(v,x,B,z){var M=$e();try{return Ae(v)(x,B,z)}catch(N){if(_e(M),N!==N+0)throw N;ke(1,0)}}function Ss(v){var x=$e();try{return Ae(v)()}catch(B){if(_e(x),B!==B+0)throw B;return ke(1,0),0n}}function Es(v,x,B,z){var M=$e();try{return Ae(v)(x,B,z)}catch(N){if(_e(M),N!==N+0)throw N;ke(1,0)}}function Is(v,x,B,z,M){var N=$e();try{return Ae(v)(x,B,z,M)}catch(Z){if(_e(N),Z!==Z+0)throw Z;ke(1,0)}}function Cs(v,x,B,z,M,N){var Z=$e();try{return Ae(v)(x,B,z,M,N)}catch(ce){if(_e(Z),ce!==ce+0)throw ce;ke(1,0)}}function Qt(v,x,B,z,M,N){var Z=$e();try{return Ae(v)(x,B,z,M,N)}catch(ce){if(_e(Z),ce!==ce+0)throw ce;ke(1,0)}}function li(v,x,B,z,M,N){var Z=$e();try{return Ae(v)(x,B,z,M,N)}catch(ce){if(_e(Z),ce!==ce+0)throw ce;ke(1,0)}}function an(v,x,B,z,M,N,Z,ce){var we=$e();try{return Ae(v)(x,B,z,M,N,Z,ce)}catch(be){if(_e(we),be!==be+0)throw be;ke(1,0)}}function zs(v,x,B,z,M){var N=$e();try{return Ae(v)(x,B,z,M)}catch(Z){if(_e(N),Z!==Z+0)throw Z;return ke(1,0),0n}}function di(v,x,B,z){var M=$e();try{return Ae(v)(x,B,z)}catch(N){if(_e(M),N!==N+0)throw N;ke(1,0)}}function Bs(v,x,B,z){var M=$e();try{return Ae(v)(x,B,z)}catch(N){if(_e(M),N!==N+0)throw N;ke(1,0)}}function js(v,x,B,z,M,N,Z,ce,we,be,Ye,ut){var At=$e();try{return Ae(v)(x,B,z,M,N,Z,ce,we,be,Ye,ut)}catch(kt){if(_e(At),kt!==kt+0)throw kt;ke(1,0)}}function Ji(v,x,B,z,M,N,Z,ce,we,be,Ye){var ut=$e();try{Ae(v)(x,B,z,M,N,Z,ce,we,be,Ye)}catch(At){if(_e(ut),At!==At+0)throw At;ke(1,0)}}function ea(v,x,B,z,M,N,Z,ce,we,be,Ye,ut,At,kt,un,ta){var ln=$e();try{Ae(v)(x,B,z,M,N,Z,ce,we,be,Ye,ut,At,kt,un,ta)}catch(pi){if(_e(ln),pi!==pi+0)throw pi;ke(1,0)}}function nn(v,x,B){var z=$e();try{return Ae(v)(x,B)}catch(M){if(_e(z),M!==M+0)throw M;ke(1,0)}}function sn(v,x,B){var z=$e();try{return Ae(v)(x,B)}catch(M){if(_e(z),M!==M+0)throw M;ke(1,0)}}function on(v,x,B,z){var M=$e();try{Ae(v)(x,B,z)}catch(N){if(_e(M),N!==N+0)throw N;ke(1,0)}}function Er(){if(0<Ee)Me=Er;else if(a)y?.(t),ie();else{for(var v=Ue;0<v.length;)v.shift()(t);0<Ee?Me=Er:(t.calledRun=!0,E||(ie(),y?.(t)))}}return a||(Wt=await ee(),Er()),t.PTR_SIZE=4,ne?t:new Promise((v,x)=>{y=v,g=x})}var Wd,ud,Zb=Oe(()=>{"use strict";Wd=od,ud=globalThis.self?.name?.startsWith("em-pthread"),ud&&od()}),Ws,io,ld,yt,Vd,cn,dd,pd,Vs,cd,Hs,Hd,Ks,Kd,lo=Oe(()=>{"use strict";uo(),Ws=typeof location>"u"?void 0:location.origin,io=import.meta.url>"file:"&&import.meta.url<"file;",ld=()=>{if(io){let e=URL;return new URL(new e("ort.wasm.bundle.min.mjs",import.meta.url).href,Ws).href}return import.meta.url},yt=ld(),Vd=()=>{if(yt&&!yt.startsWith("blob:"))return yt.substring(0,yt.lastIndexOf("/")+1)},cn=(e,t)=>{try{let r=t??yt;return(r?new URL(e,r):new URL(e)).origin===Ws}catch{return!1}},dd=(e,t)=>{let r=t??yt;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},pd=(e,t)=>`${t??"./"}${e}`,Vs=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},cd=async e=>(await import(e)).default,Hs=(Xb(),to(qd)).default,Hd=async()=>{if(!yt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(cn(yt))return[void 0,Hs()];let e=await Vs(yt);return[e,Hs(e)]},Ks=(Zb(),to(Gd)).default,Kd=async(e,t,r,i)=>{let a=Ks&&!(e||t);if(a)if(yt)a=cn(yt)||i&&!r;else if(i&&!r)a=!0;else throw new Error("cannot determine the script source URL.");if(a)return[void 0,Ks];{let s="ort-wasm-simd-threaded.mjs",n=e??dd(s,t),o=r&&n&&!cn(n,t),l=o?await Vs(n):n??pd(s,t);return[o?l:void 0,await cd(l)]}}}),Xs,fn,aa,Zs,fd,hd,md,po,Ke,yi=Oe(()=>{"use strict";lo(),fn=!1,aa=!1,Zs=!1,fd=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},hd=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},md=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},po=async e=>{if(fn)return Promise.resolve();if(aa)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Zs)throw new Error("previous call to 'initializeWebAssembly()' failed.");aa=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!md())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!hd())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=fd();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,s=typeof a=="string"?a:void 0,n=a?.mjs,o=n?.href??n,l=a?.wasm,d=l?.href??l,f=e.wasmBinary,[c,h]=await Kd(o,s,r>1,!!f||!!d),y=!1,g=[];if(t>0&&g.push(new Promise(_=>{setTimeout(()=>{y=!0,_()},t)})),g.push(new Promise((_,I)=>{let $={numThreads:r};if(f)$.wasmBinary=f,$.locateFile=w=>w;else if(d||s)$.locateFile=w=>d??s+w;else if(o&&o.indexOf("blob:")!==0)$.locateFile=w=>new URL(w,o).href;else if(c){let w=Vd();w&&($.locateFile=T=>w+T)}h($).then(w=>{aa=!1,fn=!0,Xs=w,_(),c&&URL.revokeObjectURL(c)},w=>{aa=!1,Zs=!0,I(w)})})),await Promise.race(g),y)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ke=()=>{if(fn&&Xs)return Xs;throw new Error("WebAssembly is not initialized yet.")}}),Ot,bn,qe,co=Oe(()=>{"use strict";yi(),Ot=(e,t)=>{let r=Ke(),i=r.lengthBytesUTF8(e)+1,a=r._malloc(i);return r.stringToUTF8(e,a,i),t.push(a),a},bn=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([a,s])=>{let n=t?t+a:a;if(typeof s=="object")bn(s,n+".",r,i);else if(typeof s=="string"||typeof s=="number")i(n,s.toString());else if(typeof s=="boolean")i(n,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},qe=e=>{let t=Ke(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetLastError(a,a+i);let s=Number(t.getValue(a,i===4?"i32":"i64")),n=t.getValue(a+i,"*"),o=n?t.UTF8ToString(n):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(r)}}}),Xd,Qb=Oe(()=>{"use strict";yi(),co(),Xd=e=>{let t=Ke(),r=0,i=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let s=0;return e?.tag!==void 0&&(s=Ot(e.tag,i)),r=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,s),r===0&&qe("Can't create run options."),e?.extra!==void 0&&bn(e.extra,"",new WeakSet,(n,o)=>{let l=Ot(n,i),d=Ot(o,i);t._OrtAddRunConfigEntry(r,l,d)!==0&&qe(`Can't set a run config entry: ${n} - ${o}.`)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(n=>t._free(n)),s}}}),gd,vd,bd,Ir,yd,Zd,Yb=Oe(()=>{"use strict";yi(),co(),gd=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},vd=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},bd=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Ir=(e,t,r,i)=>{let a=Ot(t,i),s=Ot(r,i);Ke()._OrtAddSessionConfigEntry(e,a,s)!==0&&qe(`Can't set a session config entry: ${t} - ${r}.`)},yd=async(e,t,r)=>{let i=t.executionProviders;for(let a of i){let s=typeof a=="string"?a:a.name,n=[];switch(s){case"webnn":if(s="WEBNN",Ir(e,"session.disable_quant_qdq","1",r),Ir(e,"session.disable_qdq_constant_folding","1",r),typeof a!="string"){let c=a?.deviceType;c&&Ir(e,"deviceType",c,r)}break;case"webgpu":if(s="JS",typeof a!="string"){let c=a;if(c?.preferredLayout){if(c.preferredLayout!=="NCHW"&&c.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${c.preferredLayout}`);Ir(e,"preferredLayout",c.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${s}`)}let o=Ot(s,r),l=n.length,d=0,f=0;if(l>0){d=Ke()._malloc(l*Ke().PTR_SIZE),r.push(d),f=Ke()._malloc(l*Ke().PTR_SIZE),r.push(f);for(let c=0;c<l;c++)Ke().setValue(d+c*Ke().PTR_SIZE,n[c][0],"*"),Ke().setValue(f+c*Ke().PTR_SIZE,n[c][1],"*")}await Ke()._OrtAppendExecutionProvider(e,o,d,f,l)!==0&&qe(`Can't append execution provider: ${s}.`)}},Zd=async e=>{let t=Ke(),r=0,i=[],a=e||{};bd(a);try{let s=gd(a.graphOptimizationLevel??"all"),n=vd(a.executionMode??"sequential"),o=typeof a.logId=="string"?Ot(a.logId,i):0,l=a.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let d=a.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let f=typeof a.optimizedModelFilePath=="string"?Ot(a.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(s,!!a.enableCpuMemArena,!!a.enableMemPattern,n,!!a.enableProfiling,0,o,l,d,f),r===0&&qe("Can't create session options."),a.executionProviders&&await yd(r,a,i),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);Ir(r,"enableGraphCapture",a.enableGraphCapture.toString(),i)}if(a.freeDimensionOverrides)for(let[c,h]of Object.entries(a.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let y=Ot(c,i);t._OrtAddFreeDimensionOverride(r,y,h)!==0&&qe(`Can't set a free dimension override: ${c} - ${h}.`)}return a.extra!==void 0&&bn(a.extra,"",new WeakSet,(c,h)=>{Ir(r,c,h,i)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&qe("Can't release session options."),i.forEach(n=>t._free(n)),s}}}),fi,gn,hi,Qd,Yd,fo,ho,Jd,e0=Oe(()=>{"use strict";fi=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},gn=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},hi=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((a,s)=>a*s,1);return r>0?Math.ceil(i*r):void 0},Qd=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Yd=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},fo=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",ho=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Jd=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),mo,t0=Oe(()=>{"use strict";uo(),mo=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),s;try{s=new ArrayBuffer(i)}catch(o){if(o instanceof RangeError){let l=Math.ceil(i/65536);s=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw o}let n=0;for(;;){let{done:o,value:l}=await a.read();if(o)break;let d=l.byteLength;new Uint8Array(s,n,d).set(l),n+=d}return new Uint8Array(s,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),wd,go,vo,Cr,_d,Qs,yn,bo,yo,Ys,wo,_o,xo,r0=Oe(()=>{"use strict";Or(),Qb(),Yb(),e0(),yi(),co(),t0(),wd=(e,t)=>{Ke()._OrtInit(e,t)!==0&&qe("Can't initialize onnxruntime.")},go=async e=>{wd(e.wasm.numThreads,Yd(e.logLevel))},vo=async(e,t)=>{Ke().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:a}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment")},Cr=new Map,_d=e=>{let t=Ke(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,a,a+i)!==0&&qe("Can't get session input/output count.");let s=i===4?"i32":"i64";return[Number(t.getValue(a,s)),Number(t.getValue(a+i,s))]}finally{t.stackRestore(r)}},Qs=(e,t)=>{let r=Ke(),i=r.stackSave(),a=0;try{let s=r.PTR_SIZE,n=r.stackAlloc(2*s);r._OrtGetInputOutputMetadata(e,t,n,n+s)!==0&&qe("Can't get session input/output metadata.");let o=Number(r.getValue(n,"*"));a=Number(r.getValue(n+s,"*"));let l=r.HEAP32[a/4];if(l===0)return[o,0];let d=r.HEAPU32[a/4+1],f=[];for(let c=0;c<d;c++){let h=Number(r.getValue(a+8+c*s,"*"));f.push(h!==0?r.UTF8ToString(h):Number(r.getValue(a+8+(c+d)*s,"*")))}return[o,l,f]}finally{r.stackRestore(i),a!==0&&r._OrtFree(a)}},yn=e=>{let t=Ke(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},bo=async(e,t)=>{let r,i,a=Ke();Array.isArray(e)?[r,i]=e:e.buffer===a.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=yn(e);let s=0,n=0,o=0,l=[],d=[],f=[];try{if([n,l]=await Zd(t),t?.externalData&&a.mountExternalData){let T=[];for(let E of t.externalData){let C=typeof E=="string"?E:E.path,S=typeof E=="string"?E:E.data;T.push(mo(S).then(R=>{a.mountExternalData(C,R)}))}await Promise.all(T)}for(let T of t?.executionProviders??[])if((typeof T=="string"?T:T.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof T!="string"){let E=T,C=E?.context,S=E?.gpuDevice,R=E?.deviceType,A=E?.powerPreference;C?a.currentContext=C:S?a.currentContext=await a.webnnCreateMLContext(S):a.currentContext=await a.webnnCreateMLContext({deviceType:R,powerPreference:A})}else a.currentContext=await a.webnnCreateMLContext();break}s=await a._OrtCreateSession(r,i,n),a.webgpuOnCreateSession?.(s),s===0&&qe("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.webnnRegisterMLContext(s,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[c,h]=_d(s),y=!!t?.enableGraphCapture,g=[],_=[],I=[],$=[],w=[];for(let T=0;T<c;T++){let[E,C,S]=Qs(s,T);E===0&&qe("Can't get an input name."),d.push(E);let R=a.UTF8ToString(E);g.push(R),I.push(C===0?{name:R,isTensor:!1}:{name:R,isTensor:!0,type:gn(C),shape:S})}for(let T=0;T<h;T++){let[E,C,S]=Qs(s,T+c);E===0&&qe("Can't get an output name."),f.push(E);let R=a.UTF8ToString(E);_.push(R),$.push(C===0?{name:R,isTensor:!1}:{name:R,isTensor:!0,type:gn(C),shape:S})}return Cr.set(s,[s,d,f,null,y,!1]),[s,g,_,I,$]}catch(c){throw d.forEach(h=>a._OrtFree(h)),f.forEach(h=>a._OrtFree(h)),o!==0&&a._OrtReleaseBinding(o)!==0&&qe("Can't release IO binding."),s!==0&&a._OrtReleaseSession(s)!==0&&qe("Can't release session."),c}finally{a._free(r),n!==0&&a._OrtReleaseSessionOptions(n)!==0&&qe("Can't release session options."),l.forEach(c=>a._free(c)),a.unmountExternalData?.()}},yo=e=>{let t=Ke(),r=Cr.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,a,s,n,o]=r;n&&(o&&t._OrtClearBoundOutputs(n.handle)!==0&&qe("Can't clear bound outputs."),t._OrtReleaseBinding(n.handle)!==0&&qe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),a.forEach(l=>t._OrtFree(l)),s.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(i)!==0&&qe("Can't release session."),Cr.delete(e)},Ys=async(e,t,r,i,a,s,n=!1)=>{if(!e){t.push(0);return}let o=Ke(),l=o.PTR_SIZE,d=e[0],f=e[1],c=e[3],h=c,y,g;if(d==="string"&&(c==="gpu-buffer"||c==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(n&&c!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(c==="gpu-buffer"){let $=e[2].gpuBuffer;g=hi(fi(d),f);{let w=o.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=w(i,s,$,g)}}else if(c==="ml-tensor"){let $=e[2].mlTensor;g=hi(fi(d),f);let w=o.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=w(i,$,fi(d),f)}else{let $=e[2];if(Array.isArray($)){g=l*$.length,y=o._malloc(g),r.push(y);for(let w=0;w<$.length;w++){if(typeof $[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);o.setValue(y+w*l,Ot($[w],r),"*")}}else{let w=o.webnnIsGraphInput,T=o.webnnIsGraphOutput;if(d!=="string"&&w&&T){let E=o.UTF8ToString(a);if(w(i,E)||T(i,E)){let C=fi(d);g=hi(C,f),h="ml-tensor";let S=o.webnnCreateTemporaryTensor,R=o.webnnUploadTensor;if(!S||!R)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let A=await S(i,C,f);R(A,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),y=A}else g=$.byteLength,y=o._malloc(g),r.push(y),o.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,g),y)}else g=$.byteLength,y=o._malloc(g),r.push(y),o.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,g),y)}}let _=o.stackSave(),I=o.stackAlloc(4*f.length);try{f.forEach((w,T)=>o.setValue(I+T*l,w,l===4?"i32":"i64"));let $=o._OrtCreateTensor(fi(d),y,g,I,f.length,Jd(h));$===0&&qe(`Can't create tensor for input/output. session=${i}, index=${s}.`),t.push($)}finally{o.stackRestore(_)}},wo=async(e,t,r,i,a,s)=>{let n=Ke(),o=n.PTR_SIZE,l=Cr.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],f=l[1],c=l[2],h=l[3],y=l[4],g=l[5],_=t.length,I=i.length,$=0,w=[],T=[],E=[],C=[],S=[],R=n.stackSave(),A=n.stackAlloc(_*o),P=n.stackAlloc(_*o),K=n.stackAlloc(I*o),Y=n.stackAlloc(I*o);try{[$,w]=Xd(s),vi("wasm prepareInputOutputTensor");for(let O=0;O<_;O++)await Ys(r[O],T,C,e,f[t[O]],t[O],y);for(let O=0;O<I;O++)await Ys(a[O],E,C,e,c[i[O]],_+i[O],y);bi("wasm prepareInputOutputTensor");for(let O=0;O<_;O++)n.setValue(A+O*o,T[O],"*"),n.setValue(P+O*o,f[t[O]],"*");for(let O=0;O<I;O++)n.setValue(K+O*o,E[O],"*"),n.setValue(Y+O*o,c[i[O]],"*");n.jsepOnRunStart?.(d),n.webnnOnRunStart?.(d);let L;L=await n._OrtRun(d,P,A,_,Y,I,K,$),L!==0&&qe("failed to call OrtRun().");let H=[],me=[];vi("wasm ProcessOutputTensor");for(let O=0;O<I;O++){let W=Number(n.getValue(K+O*o,"*"));if(W===E[O]||S.includes(E[O])){H.push(a[O]),W!==E[O]&&n._OrtReleaseTensor(W)!==0&&qe("Can't release tensor.");continue}let ue=n.stackSave(),ne=n.stackAlloc(4*o),te=!1,ie,G=0;try{n._OrtGetTensorData(W,ne,ne+o,ne+2*o,ne+3*o)!==0&&qe(`Can't access output tensor data on index ${O}.`);let oe=o===4?"i32":"i64",ee=Number(n.getValue(ne,oe));G=n.getValue(ne+o,"*");let J=n.getValue(ne+o*2,"*"),Re=Number(n.getValue(ne+o*3,oe)),Ue=[];for(let de=0;de<Re;de++)Ue.push(Number(n.getValue(J+de*o,oe)));n._OrtFree(J)!==0&&qe("Can't free memory for tensor dims.");let Ee=Ue.reduce((de,pe)=>de*pe,1);ie=gn(ee);let Me=h?.outputPreferredLocations[i[O]];if(ie==="string"){if(Me==="gpu-buffer"||Me==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let de=[];for(let pe=0;pe<Ee;pe++){let he=n.getValue(G+pe*o,"*"),ot=n.getValue(G+(pe+1)*o,"*"),Ct=pe===Ee-1?void 0:ot-he;de.push(n.UTF8ToString(he,Ct))}H.push([ie,Ue,de,"cpu"])}else if(Me==="gpu-buffer"&&Ee>0){let de=n.jsepGetBuffer;if(!de)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let pe=de(G),he=hi(ee,Ee);if(he===void 0||!fo(ie))throw new Error(`Unsupported data type: ${ie}`);te=!0,H.push([ie,Ue,{gpuBuffer:pe,download:n.jsepCreateDownloader(pe,he,ie),dispose:()=>{n._OrtReleaseTensor(W)!==0&&qe("Can't release tensor.")}},"gpu-buffer"])}else if(Me==="ml-tensor"&&Ee>0){let de=n.webnnEnsureTensor,pe=n.webnnIsGraphInputOutputTypeSupported;if(!de||!pe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(hi(ee,Ee)===void 0||!ho(ie))throw new Error(`Unsupported data type: ${ie}`);if(!pe(e,ie,!1))throw new Error(`preferredLocation "ml-tensor" for ${ie} output is not supported by current WebNN Context.`);let he=await de(e,G,ee,Ue,!1);te=!0,H.push([ie,Ue,{mlTensor:he,download:n.webnnCreateMLTensorDownloader(G,ie),dispose:()=>{n.webnnReleaseTensorId(G),n._OrtReleaseTensor(W)}},"ml-tensor"])}else if(Me==="ml-tensor-cpu-output"&&Ee>0){let de=n.webnnCreateMLTensorDownloader(G,ie)(),pe=H.length;te=!0,me.push((async()=>{let he=[pe,await de];return n.webnnReleaseTensorId(G),n._OrtReleaseTensor(W),he})()),H.push([ie,Ue,[],"cpu"])}else{let de=Qd(ie),pe=new de(Ee);new Uint8Array(pe.buffer,pe.byteOffset,pe.byteLength).set(n.HEAPU8.subarray(G,G+pe.byteLength)),H.push([ie,Ue,pe,"cpu"])}}finally{n.stackRestore(ue),ie==="string"&&G&&n._free(G),te||n._OrtReleaseTensor(W)}}h&&!y&&(n._OrtClearBoundOutputs(h.handle)!==0&&qe("Can't clear bound outputs."),Cr.set(e,[d,f,c,h,y,!1]));for(let[O,W]of await Promise.all(me))H[O][2]=W;return bi("wasm ProcessOutputTensor"),H}finally{n.webnnOnRunEnd?.(d),n.stackRestore(R),T.forEach(L=>n._OrtReleaseTensor(L)),E.forEach(L=>n._OrtReleaseTensor(L)),C.forEach(L=>n._free(L)),$!==0&&n._OrtReleaseRunOptions($),w.forEach(L=>n._free(L))}},_o=e=>{let t=Ke(),r=Cr.get(e);if(!r)throw new Error("invalid session id");let i=r[0],a=t._OrtEndProfiling(i);a===0&&qe("Can't get an profile file name."),t._OrtFree(a)},xo=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),lr,Tt,ci,na,sa,hn,Js,mn,zr,Br,xd,i0,a0,n0,s0,o0,u0,l0,d0=Oe(()=>{"use strict";Or(),r0(),yi(),lo(),lr=()=>!!We.wasm.proxy&&typeof document<"u",ci=!1,na=!1,sa=!1,mn=new Map,zr=(e,t)=>{let r=mn.get(e);r?r.push(t):mn.set(e,[t])},Br=()=>{if(ci||!na||sa||!Tt)throw new Error("worker not ready")},xd=e=>{switch(e.data.type){case"init-wasm":ci=!1,e.data.err?(sa=!0,Js[1](e.data.err)):(na=!0,Js[0]()),hn&&(URL.revokeObjectURL(hn),hn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=mn.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},i0=async()=>{if(!na){if(ci)throw new Error("multiple calls to 'initWasm()' detected.");if(sa)throw new Error("previous call to 'initWasm()' failed.");if(ci=!0,lr())return new Promise((e,t)=>{Tt?.terminate(),Hd().then(([r,i])=>{try{Tt=i,Tt.onerror=s=>t(s),Tt.onmessage=xd,Js=[e,t];let a={type:"init-wasm",in:We};!a.in.wasm.wasmPaths&&(r||io)&&(a.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.wasm",import.meta.url).href}),Tt.postMessage(a),hn=r}catch(a){t(a)}},t)});try{await po(We.wasm),await go(We),na=!0}catch(e){throw sa=!0,e}finally{ci=!1}}},a0=async e=>{if(lr())return Br(),new Promise((t,r)=>{zr("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:We}};Tt.postMessage(i)});await vo(We,e)},n0=async e=>lr()?(Br(),new Promise((t,r)=>{zr("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};Tt.postMessage(i,[e.buffer])})):yn(e),s0=async(e,t)=>{if(lr()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Br(),new Promise((r,i)=>{zr("create",[r,i]);let a={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),Tt.postMessage(a,s)})}else return bo(e,t)},o0=async e=>{if(lr())return Br(),new Promise((t,r)=>{zr("release",[t,r]);let i={type:"release",in:e};Tt.postMessage(i)});yo(e)},u0=async(e,t,r,i,a,s)=>{if(lr()){if(r.some(n=>n[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(n=>n))throw new Error("pre-allocated output tensor is not supported for proxy.");return Br(),new Promise((n,o)=>{zr("run",[n,o]);let l=r,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:i,options:s}};Tt.postMessage(d,xo(l))})}else return wo(e,t,r,i,a,s)},l0=async e=>{if(lr())return Br(),new Promise((t,r)=>{zr("end-profiling",[t,r]);let i={type:"end-profiling",in:e};Tt.postMessage(i)});_o(e)}}),eo,$d,p0,Jb=Oe(()=>{"use strict";Or(),d0(),e0(),uo(),t0(),eo=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},$d=e=>{switch(e[3]){case"cpu":return new St(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!fo(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:a}=e[2];return St.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:a})}case"ml-tensor":{let t=e[0];if(!ho(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:a}=e[2];return St.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},p0=class{async fetchModelAndCopyToWasmMemory(e){return n0(await mo(e))}async loadModel(e,t){mi();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await s0(r,t),gi()}async dispose(){return o0(this.sessionId)}async run(e,t,r){mi();let i=[],a=[];Object.entries(e).forEach(c=>{let h=c[0],y=c[1],g=this.inputNames.indexOf(h);if(g===-1)throw new Error(`invalid input '${h}'`);i.push(y),a.push(g)});let s=[],n=[];Object.entries(t).forEach(c=>{let h=c[0],y=c[1],g=this.outputNames.indexOf(h);if(g===-1)throw new Error(`invalid output '${h}'`);s.push(y),n.push(g)});let o=i.map((c,h)=>eo(c,()=>`input "${this.inputNames[a[h]]}"`)),l=s.map((c,h)=>c?eo(c,()=>`output "${this.outputNames[n[h]]}"`):null),d=await u0(this.sessionId,a,o,n,l,r),f={};for(let c=0;c<d.length;c++)f[this.outputNames[n[c]]]=s[c]??$d(d[c]);return gi(),f}startProfiling(){}endProfiling(){l0(this.sessionId)}}}),c0={};wn(c0,{OnnxruntimeWebAssemblyBackend:()=>no,initializeFlags:()=>ao,wasmBackend:()=>f0});var ao,no,f0,ey=Oe(()=>{"use strict";Or(),d0(),Jb(),ao=()=>{(typeof We.wasm.initTimeout!="number"||We.wasm.initTimeout<0)&&(We.wasm.initTimeout=0);let e=We.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),We.wasm.simd=!1),typeof We.wasm.proxy!="boolean"&&(We.wasm.proxy=!1),typeof We.wasm.trace!="boolean"&&(We.wasm.trace=!1),typeof We.wasm.numThreads!="number"||!Number.isInteger(We.wasm.numThreads)||We.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)We.wasm.numThreads=1;else{let t=typeof navigator>"u"?jb("node:os").cpus().length:navigator.hardwareConcurrency;We.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},no=class{async init(e){ao(),await i0(),await a0(e)}async createInferenceSessionHandler(e,t){let r=new p0;return await r.loadModel(e,t),r}},f0=new no});Or();Or();Or();var ty="1.30.0";{let e=(ey(),to(c0)).wasmBackend;vn("cpu",e,10),vn("wasm",e,10)}Object.defineProperty(We.versions,"web",{value:ty,enumerable:!0});var Uu=Object.defineProperty,iy=Object.getOwnPropertyDescriptor,ay=Object.getOwnPropertyNames,ny=Object.prototype.hasOwnProperty,sy=(e=>typeof mt<"u"?mt:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof mt<"u"?mt:t)[r]}):e)(function(e){if(typeof mt<"u")return mt.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),X=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(i){throw r=[i],i}},ki=(e,t)=>{for(var r in t)Uu(e,r,{get:t[r],enumerable:!0})},oy=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of ay(t))!ny.call(e,a)&&a!==r&&Uu(e,a,{get:()=>t[a],enumerable:!(i=iy(t,a))||i.enumerable});return e},$a=e=>oy(Uu({},"__esModule",{value:!0}),e),ua,dr,_i,h0,th,rh=X(()=>{"use strict";ua=new Map,dr=[],_i=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=ua.get(e);if(i===void 0)ua.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let a=dr.indexOf(e);a!==-1&&dr.splice(a,1);for(let s=0;s<dr.length;s++)if(ua.get(dr[s]).priority<=r){dr.splice(s,0,e);return}dr.push(e)}return}throw new TypeError("not a valid backend")},h0=async e=>{let t=ua.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},th=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),i=r.length===0?dr:r,a,s=[],n=new Set;for(let l of i){let d=await h0(l);typeof d=="string"?s.push({name:l,err:d}):(a||(a=d),a===d&&n.add(l))}if(!a)throw new Error(`no available backend found. ERR: ${s.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:d}of s)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${d}`);let o=t.filter(l=>n.has(typeof l=="string"?l:l.name));return[a,new Proxy(e,{get:(l,d)=>d==="executionProviders"?o:Reflect.get(l,d)})]}}),uy=X(()=>{"use strict";rh()}),ih,ly=X(()=>{"use strict";ih="1.30.0"}),$o,rt,ah=X(()=>{"use strict";ly(),$o="warning",rt={wasm:{},webgl:{},webgpu:{},versions:{common:ih},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);$o=e}},get logLevel(){return $o}},Object.defineProperty(rt,"logLevel",{enumerable:!0})}),Ve,dy=X(()=>{"use strict";ah(),Ve=rt}),nh,sh,py=X(()=>{"use strict";nh=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],s=e.dims[3]):(a=e.dims[3],s=e.dims[2]);let n=t?.format!==void 0?t.format:"RGB",o=t?.norm,l,d;o===void 0||o.mean===void 0?l=[255,255,255,255]:typeof o.mean=="number"?l=[o.mean,o.mean,o.mean,o.mean]:(l=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(l[3]=o.mean[3])),o===void 0||o.bias===void 0?d=[0,0,0,0]:typeof o.bias=="number"?d=[o.bias,o.bias,o.bias,o.bias]:(d=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(d[3]=o.bias[3]));let f=s*a,c=0,h=f,y=f*2,g=-1;n==="RGBA"?(c=0,h=f,y=f*2,g=f*3):n==="RGB"?(c=0,h=f,y=f*2):n==="RBG"&&(c=0,y=f,h=f*2);for(let _=0;_<s;_++)for(let I=0;I<a;I++){let $=(e.data[c++]-d[0])*l[0],w=(e.data[h++]-d[1])*l[1],T=(e.data[y++]-d[2])*l[2],E=g===-1?255:(e.data[g++]-d[3])*l[3];i.fillStyle="rgba("+$+","+w+","+T+","+E+")",i.fillRect(I,_,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},sh=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let a,s,n;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],s=e.dims[1],n=e.dims[3]):(a=e.dims[3],s=e.dims[2],n=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,d,f;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?f=[0,0,0,0]:typeof l.bias=="number"?f=[l.bias,l.bias,l.bias,l.bias]:(f=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(f[3]=l.bias[3]));let c=s*a;if(t!==void 0&&(t.format!==void 0&&n===4&&t.format!=="RGBA"||n===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,y=0,g=1,_=2,I=3,$=0,w=c,T=c*2,E=-1;o==="RGBA"?($=0,w=c,T=c*2,E=c*3):o==="RGB"?($=0,w=c,T=c*2):o==="RBG"&&($=0,T=c,w=c*2),i=r.createImageData(a,s);for(let C=0;C<s*a;y+=h,g+=h,_+=h,I+=h,C++)i.data[y]=(e.data[$++]-f[0])*d[0],i.data[g]=(e.data[w++]-f[1])*d[1],i.data[_]=(e.data[T++]-f[2])*d[2],i.data[I]=E===-1?255:(e.data[E++]-f[3])*d[3]}else throw new Error("Can not access image data");return i}}),xn,oh,uh,lh,dh,ph,cy=X(()=>{"use strict";Pu(),xn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,a=t.norm??{mean:255,bias:0},s,n;typeof a.mean=="number"?s=[a.mean,a.mean,a.mean,a.mean]:s=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?n=[a.bias,a.bias,a.bias,a.bias]:n=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*i,f=l==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),c=4,h=0,y=1,g=2,_=3,I=0,$=d,w=d*2,T=-1;o==="RGB"&&(c=3,h=0,y=1,g=2,_=-1),l==="RGBA"?T=d*3:l==="RBG"?(I=0,w=d,$=d*2):l==="BGR"&&(w=0,$=d,I=d*2);for(let E=0;E<d;E++,h+=c,g+=c,y+=c,_+=c)f[I++]=(e[h]+n[0])/s[0],f[$++]=(e[y]+n[1])/s[1],f[w++]=(e[g]+n[2])/s[2],T!==-1&&_!==-1&&(f[T++]=(e[_]+n[3])/s[3]);return l==="RGBA"?new xt("float32",f,[1,4,r,i]):new xt("float32",f,[1,3,r,i])},oh=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,s=typeof e=="string",n,o=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(r){let f=l();f.width=e.width,f.height=e.height;let c=d(f);if(c!=null){let h=e.height,y=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(h=t.resizedHeight,y=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=h,o.width=y}else o.tensorFormat="RGBA",o.height=h,o.width=y;c.drawImage(e,0,0),n=c.getImageData(0,0,y,h).data}else throw new Error("Can not access image data")}else if(i){let f,c;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(f=t.resizedHeight,c=t.resizedWidth):(f=e.height,c=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=f,o.width=c,t!==void 0){let h=l();h.width=c,h.height=f;let y=d(h);if(y!=null)y.putImageData(e,0,0),n=y.getImageData(0,0,c,f).data;else throw new Error("Can not access image data")}else n=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=l();f.width=e.width,f.height=e.height;let c=d(f);if(c!=null){let h=e.height,y=e.width;return c.drawImage(e,0,0,y,h),n=c.getImageData(0,0,y,h).data,o.height=h,o.width=y,xn(n,o)}else throw new Error("Can not access image data")}else{if(s)return new Promise((f,c)=>{let h=l(),y=d(h);if(!e||!y)return c();let g=new Image;g.crossOrigin="Anonymous",g.src=e,g.onload=()=>{h.width=g.width,h.height=g.height,y.drawImage(g,0,0,h.width,h.height);let _=y.getImageData(0,0,h.width,h.height);o.height=h.height,o.width=h.width,f(xn(_.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(n!==void 0)return xn(n,o);throw new Error("Input data provided is not supported - aborted tensor creation")},uh=(e,t)=>{let{width:r,height:i,download:a,dispose:s}=t,n=[1,i,r,4];return new xt({location:"texture",type:"float32",texture:e,dims:n,download:a,dispose:s})},lh=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:s}=t;return new xt({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:a,dispose:s})},dh=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:s}=t;return new xt({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:a,dispose:s})},ph=(e,t,r)=>new xt({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Pr,ya,Ao,ch,fy=X(()=>{"use strict";Pr=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),ya=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Ao=!1,ch=()=>{if(!Ao){Ao=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(Pr.set("int64",BigInt64Array),ya.set(BigInt64Array,"int64")),t&&(Pr.set("uint64",BigUint64Array),ya.set(BigUint64Array,"uint64")),i?(Pr.set("float16",r),ya.set(r,"float16")):Pr.set("float16",Uint16Array)}}}),fh,hh,hy=X(()=>{"use strict";Pu(),fh=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},hh=(e,t)=>{switch(e.location){case"cpu":return new xt(e.type,e.data,t);case"cpu-pinned":return new xt({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new xt({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new xt({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new xt({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),xt,Pu=X(()=>{"use strict";py(),cy(),fy(),hy(),xt=class{constructor(e,t,r){ch();let i,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,a=e.dims,e.location){case"cpu-pinned":{let n=Pr.get(i);if(!n)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof n))throw new TypeError(`buffer should be of type ${n.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let n,o;if(typeof e=="string")if(i=e,o=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");n=t}else{let l=Pr.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?n=l.from(t,BigInt):n=l.from(t)}else if(t instanceof l)n=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")n=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)n=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${l}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")i="string",n=e;else if(l==="boolean")i="bool",n=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",n=Uint8Array.from(e);else{let l=ya.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=l,n=e}if(o===void 0)o=[n.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");a=o,this.cpuData=n,this.dataLocation="cpu"}let s=fh(a);if(this.cpuData&&s!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=a,this.size=s}static async fromImage(e,t){return oh(e,t)}static fromTexture(e,t){return uh(e,t)}static fromGpuBuffer(e,t){return lh(e,t)}static fromMLTensor(e,t){return dh(e,t)}static fromPinnedBuffer(e,t,r){return ph(e,t,r)}toDataURL(e){return nh(this,e)}toImageData(e){return sh(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return hh(this,e)}}}),Lt,mh=X(()=>{"use strict";Pu(),Lt=xt}),Nn,ko,Ht,qt,Fr,Gr,gh=X(()=>{"use strict";ah(),Nn=(e,t)=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||console.timeStamp(`${e}::ORT::${t}`)},ko=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let a=0;a<r.length;a++){if(i&&!r[a].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[a].trim().split(" ")[1]}`;t&&(s+=`::${t}`),Nn("CPU",s);return}r[a].includes("TRACE_FUNC")&&(i=!0)}},Ht=e=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||ko("BEGIN",e)},qt=e=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||ko("END",e)},Fr=e=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||console.time(`ORT::${e}`)},Gr=e=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||console.timeEnd(`ORT::${e}`)}}),vh,my=X(()=>{"use strict";rh(),mh(),gh(),vh=class bh{constructor(t){this.handler=t}async run(t,r,i){Ht(),Fr("InferenceSession.run");let a={},s={};if(typeof t!="object"||t===null||t instanceof Lt||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let n=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Lt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");n=!1;for(let d of r){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);a[d]=null}if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,f=Object.getOwnPropertyNames(r);for(let c of this.outputNames)if(f.indexOf(c)!==-1){let h=r[c];(h===null||h instanceof Lt)&&(d=!0,n=!1,a[c]=h)}if(d){if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else s=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(n)for(let d of this.outputNames)a[d]=null;let o=await this.handler.run(t,a,s),l={};for(let d in o)if(Object.hasOwnProperty.call(o,d)){let f=o[d];f instanceof Lt?l[d]=f:l[d]=new Lt(f.type,f.data,f.dims)}return Gr("InferenceSession.run"),qt(),l}async release(){return this.handler.dispose()}static async create(t,r,i,a){Ht(),Fr("InferenceSession.create");let s,n={};if(typeof t=="string"){if(s=t,typeof r=="object"&&r!==null)n=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,typeof r=="object"&&r!==null)n=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let f=t,c=0,h=t.byteLength;if(typeof r=="object"&&r!==null)n=r;else if(typeof r=="number"){if(c=r,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(h=t.byteLength-c,typeof i=="number"){if(h=i,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||c+h>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-c}].`);if(typeof a=="object"&&a!==null)n=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(f,c,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,l]=await th(n),d=await o.createInferenceSessionHandler(s,l);return Gr("InferenceSession.create"),qt(),new bh(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Lu,gy=X(()=>{"use strict";my(),Lu=vh}),vy=X(()=>{"use strict"}),by=X(()=>{"use strict"}),yy=X(()=>{"use strict"}),wy=X(()=>{"use strict"}),_y={};ki(_y,{InferenceSession:()=>Lu,TRACE:()=>Nn,TRACE_EVENT_BEGIN:()=>Fr,TRACE_EVENT_END:()=>Gr,TRACE_FUNC_BEGIN:()=>Ht,TRACE_FUNC_END:()=>qt,Tensor:()=>Lt,env:()=>Ve,registerBackend:()=>_i});var It=X(()=>{"use strict";uy(),dy(),gy(),mh(),vy(),by(),gh(),yy(),wy()}),qu=X(()=>{"use strict"}),yh={};ki(yh,{default:()=>wh});var To,So,wh,xy=X(()=>{"use strict";Ev(),Kr(),Fu(),To="ort-wasm-proxy-worker",So=globalThis.self?.name===To,So&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Gu(r.wasm).then(()=>{ol(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;ul(a,i).then(()=>{postMessage({type:t})},s=>{postMessage({type:t,err:s})});break}case"copy-from":{let{buffer:i}=r,a=Wn(i);postMessage({type:t,out:a});break}case"create":{let{model:i,options:a}=r;ll(i,a).then(s=>{postMessage({type:t,out:s})},s=>{postMessage({type:t,err:s})});break}case"release":dl(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:a,inputs:s,outputIndices:n,options:o}=r;pl(i,a,s,n,new Array(n.length).fill(null),o).then(l=>{l.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},fl([...s,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":cl(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),wh=So?null:e=>new Worker(e??_t,{type:"module",name:To})}),_h={};ki(_h,{default:()=>xh});async function m0(e={}){var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,a=i&&self.name?.startsWith("em-pthread");t.mountExternalData=(u,p)=>{u.startsWith("./")&&(u=u.substring(2)),(t.ad||(t.ad=new Map)).set(u,p)},t.unmountExternalData=()=>{delete t.ad,delete t.Yd,delete t.Xd,delete t.be},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let s=u=>async(...p)=>{try{if(t.$c)throw Error("Session already started");let b=t.$c={Nd:p[0],errors:[]},m=await u(...p);if(t.$c!==b)throw Error("Session mismatch");t.hd?.flush();let k=b.errors;if(0<k.length){let j=await Promise.all(k);if(j=j.filter(D=>D),0<j.length)throw Error(j.join(`
`))}return m}finally{t.$c=null}};t.jsepInit=(u,p)=>{if(u==="webgpu"){[t.hd,t.Dd,t.Hd,t.jd,t.Gd,t.bc,t.Id,t.Kd,t.Ed,t.Fd,t.Jd]=p;let b=t.hd;t.jsepRegisterBuffer=(m,k,j,D)=>b.registerBuffer(m,k,j,D),t.jsepGetBuffer=m=>b.getBuffer(m),t.jsepCreateDownloader=(m,k,j)=>b.createDownloader(m,k,j),t.jsepOnCreateSession=m=>{b.onCreateSession(m)},t.jsepOnReleaseSession=m=>{b.onReleaseSession(m)},t.jsepOnRunStart=m=>b.onRunStart(m),t.Ld=(m,k)=>{b.upload(m,k)}}else if(u==="webnn"){let b=p[0];[t.Vd,t.vd,t.webnnEnsureTensor,t.wd,t.webnnDownloadTensor,t.Ud,t.webnnEnableTraceEvent]=p.slice(1),t.webnnReleaseTensorId=t.vd,t.webnnUploadTensor=t.wd,t.webnnRegisterMLContext=t.Ud,t.webnnOnRunStart=m=>b.onRunStart(m),t.webnnOnRunEnd=b.onRunEnd.bind(b),t.webnnOnReleaseSession=m=>{b.onReleaseSession(m)},t.webnnCreateMLTensorDownloader=(m,k)=>b.createMLTensorDownloader(m,k),t.webnnRegisterMLTensor=(m,k,j,D)=>b.registerMLTensor(m,k,j,D),t.webnnCreateMLContext=m=>b.createMLContext(m),t.webnnRegisterGraphInput=b.registerGraphInput.bind(b),t.webnnIsGraphInput=b.isGraphInput.bind(b),t.webnnRegisterGraphOutput=b.registerGraphOutput.bind(b),t.webnnIsGraphOutput=b.isGraphOutput.bind(b),t.webnnCreateTemporaryTensor=b.createTemporaryTensor.bind(b),t.webnnIsGraphInputOutputTypeSupported=b.isGraphInputOutputTypeSupported.bind(b)}};let n=()=>{let u=p=>(...b)=>{let m=bt;return b=p(...b),bt!=m?new Promise((k,j)=>{$r={resolve:k,reject:j}}):b};(()=>{for(let p of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[p]=u(t[p])})(),s!==void 0&&(t._OrtRun=s(t._OrtRun),t._OrtRunWithBinding=s(t._OrtRunWithBinding)),n=void 0};t.asyncInit=()=>{n?.()};var o,l,d=(u,p)=>{throw p},f=import.meta.url,c="";if(r||i){try{c=new URL(".",f).href}catch{}i&&(l=u=>{var p=new XMLHttpRequest;return p.open("GET",u,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),o=async u=>{if(R(u))return new Promise((b,m)=>{var k=new XMLHttpRequest;k.open("GET",u,!0),k.responseType="arraybuffer",k.onload=()=>{k.status==200||k.status==0&&k.response?b(k.response):m(k.status)},k.onerror=m,k.send(null)});var p=await fetch(u,{credentials:"same-origin"});if(p.ok)return p.arrayBuffer();throw Error(p.status+" : "+p.url)}}var h,y,g,_,I,$,w=console.log.bind(console),T=console.error.bind(console),E=w,C=T,S=!1,R=u=>u.startsWith("file://");function A(){gt.buffer!=Y.buffer&&ee()}if(a){let u=function(p){try{var b=p.data,m=b.Vc;if(m==="load"){let k=[];self.onmessage=j=>k.push(j),$=()=>{postMessage({Vc:"loaded"});for(let j of k)u(j);self.onmessage=u};for(let j of b.Ad)t[j]&&!t[j].proxy||(t[j]=(...D)=>{postMessage({Vc:"callHandler",yd:j,args:D})},j=="print"&&(E=t[j]),j=="printErr"&&(C=t[j]));gt=b.Rd,ee(),y=b.Sd,Ee(),dn()}else if(m==="run"){(function(k){var j=(A(),W)[k+52>>>2>>>0];k=(A(),W)[k+56>>>2>>>0],ml(j,j-k),Te(j)})(b.Uc),ut(b.Uc,0,0,1,0,0),ir(),sr(b.Uc),K||(ce(),K=!0);try{Qr(b.Pd,b.ed)}catch(k){if(k!="unwind")throw k}}else b.target!=="setimmediate"&&(m==="checkMailbox"?K&&ui():m&&(C(`worker: received unknown command ${m}`),C(b)))}catch(k){throw At(),k}};var P=u,K=!1;self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=u}var Y,L,H,me,O,W,ue,ne,te,ie,G,oe=!1;function ee(){var u=gt.buffer;t.HEAP8=Y=new Int8Array(u),H=new Int16Array(u),t.HEAPU8=L=new Uint8Array(u),me=new Uint16Array(u),t.HEAP32=O=new Int32Array(u),t.HEAPU32=W=new Uint32Array(u),ue=new Float32Array(u),ne=new Float64Array(u),te=new BigInt64Array(u),ie=new BigUint64Array(u)}function J(){oe=!0,a?$():Yt.ub()}function Re(u){throw C(u="Aborted("+u+")"),S=!0,u=new WebAssembly.RuntimeError(u+". Build with -sASSERTIONS for more info."),I?.(u),u}function Ue(){return{a:{ma:Gv,hb:Fv,g:Hn,J:Ta,f:Kn,o:Xn,i:Zn,$:Qn,b:Sa,S:Ea,Ha:Ei,n:Ca,aa:zi,Ya:Bi,Da:ji,Fa:Oi,Za:Ri,Wa:Mi,Pa:Di,Va:Ni,ka:Ui,Ea:Pi,Ba:za,Xa:Ba,Ca:ri,cb:Yn,fa:Jn,wa:es,ua:vr,ea:Ra,N:Xt,H:rs,va:is,_:Zt,xa:Gi,Sa:oi,za:ps,Ia:Wi,sa:Ma,ga:Da,Ra:sr,$a:Na,Q:Fa,r:_e,c:ii,ib:Xi,y:$e,M:Va,D:Zi,l:Ha,s:Qi,jb:Ka,I:Wt,R:cs,j:Xa,u:fs,q:hs,k:ms,Ma:gs,Na:vs,Oa:bs,Ka:Ja,La:en,ta:tn,eb:ws,bb:$s,v:As,ba:ks,ha:Ts,ab:_s,V:Ss,_a:Es,Aa:Is,F:ys,U:Cs,la:di,ya:Bs,gb:zs,fb:js,Ta:sn,Ua:on,Ga:Pe,T:Er,Ja:v,ja:x,Qa:B,ia:M,lb:Sb,na:xb,mb:Tb,oa:_b,G:db,e:Kv,t:Vv,w:Wv,B:ab,nb:bb,Z:vb,x:Qv,pa:yb,X:$b,ca:gb,ob:mb,pb:hb,O:nb,qb:cb,qa:fb,rb:pb,L:ub,Y:wb,d:Hv,A:Zv,m:Xv,kb:Eb,p:Jv,z:eb,C:Yv,E:tb,K:sb,ra:lb,P:Ab,da:ob,W:kb,sb:ib,tb:rb,h:N,a:gt,db:ge}}}async function Ee(){function u(m,k){var j=Yt=m.exports;m={};for(let[D,F]of Object.entries(j))typeof F=="function"?(j=Ua(F),m[D]=j):m[D]=F;return Yt=m,Yt=(function(){var D=Yt,F=re=>xe=>re(xe)>>>0,Q=re=>()=>re()>>>0;return(D=Object.assign({},D)).vb=F(D.vb),D.Zb=Q(D.Zb),D.$b=F(D.$b),D.nc=F(D.nc),D.oc=Q(D.oc),D.sc=F(D.sc),D})(),nt.push(Yt.ac),Z=(m=Yt).vb,ce=m.wb,t._OrtInit=m.xb,t._OrtGetLastError=m.yb,t._OrtCreateSessionOptions=m.zb,t._OrtAppendExecutionProvider=m.Ab,t._OrtAddFreeDimensionOverride=m.Bb,t._OrtAddSessionConfigEntry=m.Cb,t._OrtReleaseSessionOptions=m.Db,t._OrtCreateSession=m.Eb,t._OrtReleaseSession=m.Fb,t._OrtGetInputOutputCount=m.Gb,t._OrtGetInputOutputMetadata=m.Hb,t._OrtFree=m.Ib,t._OrtCreateTensor=m.Jb,t._OrtGetTensorData=m.Kb,t._OrtReleaseTensor=m.Lb,t._OrtCreateRunOptions=m.Mb,t._OrtAddRunConfigEntry=m.Nb,t._OrtReleaseRunOptions=m.Ob,t._OrtCreateBinding=m.Pb,t._OrtBindInput=m.Qb,t._OrtBindOutput=m.Rb,t._OrtClearBoundOutputs=m.Sb,t._OrtReleaseBinding=m.Tb,t._OrtRunWithBinding=m.Ub,t._OrtRun=m.Vb,t._OrtEndProfiling=m.Wb,t._JsepOutput=m.Xb,t._JsepGetNodeName=m.Yb,we=m.Zb,be=t._free=m._b,Ye=t._malloc=m.$b,ut=m.cc,At=m.dc,kt=m.ec,un=m.fc,ta=m.gc,ln=m.hc,pi=m.ic,Ie=m.jc,ra=m.kc,ml=m.lc,Te=m.mc,Os=m.nc,Se=m.oc,gl=m.pc,Rs=m.qc,vl=m.rc,bl=m.sc,yl=m.tc,Ms=m.uc,wl=m.vc,_l=m.wc,xl=m.xc,$l=m.yc,Al=m.zc,kl=m.Ac,Tl=m.Bc,Sl=m.Cc,El=m.Dc,Il=m.Ec,Cl=m.Fc,zl=m.Gc,Bl=m.Hc,jl=m.Ic,Ol=m.Jc,Rl=m.Kc,Ml=m.Lc,Dl=m.Mc,Nl=m.Nc,Ul=m.Oc,Pl=m.Pc,Ll=m.Qc,ql=m.Sc,Fl=m.Tc,Gl=m.cd,Wl=m.dd,Vl=m.id,Hl=m.nd,Kl=m.od,Xl=m.pd,Zl=m.qd,Ql=m.rd,Yl=m.sd,Jl=m.td,ed=m.ud,td=m.zd,rd=m.Zd,id=m._d,ad=m.$d,nd=m.ae,y=k,Yt}var p,b=Ue();return t.instantiateWasm?new Promise(m=>{t.instantiateWasm(b,(k,j)=>{m(u(k,j))})}):a?u(new WebAssembly.Instance(y,Ue()),y):(G??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",c):c+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,p=await(async function(m){var k=G;if(!h&&!R(k))try{var j=fetch(k,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(j,m)}catch(D){C(`wasm streaming compile failed: ${D}`),C("falling back to ArrayBuffer instantiation")}return(async function(D,F){try{var Q=await(async function(re){if(!h)try{var xe=await o(re);return new Uint8Array(xe)}catch{}if(re==G&&h)re=new Uint8Array(h);else{if(!l)throw"both async and sync fetching of the wasm failed";re=l(re)}return re})(D);return await WebAssembly.instantiate(Q,F)}catch(re){C(`failed to asynchronously prepare wasm: ${re}`),Re(re)}})(k,m)})(b),u(p.instance,p.module))}class Me{name="ExitStatus";constructor(p){this.message=`Program terminated with exit(${p})`,this.status=p}}var de=u=>{u.terminate(),u.onmessage=()=>{}},pe=[],he=0,ot=null,Ct=u=>{De.length==0&&(ka(),Ae(De[0]));var p=De.pop();if(!p)return 6;st.push(p),pt[u.Uc]=p,p.Uc=u.Uc;var b={Vc:"run",Pd:u.Od,ed:u.ed,Uc:u.Uc};return p.postMessage(b,u.md),0},at=0,V=(u,p,...b)=>{var m,k=16*b.length,j=Se(),D=Os(k),F=D>>>3;for(m of b)typeof m=="bigint"?((A(),te)[F++>>>0]=1n,(A(),te)[F++>>>0]=m):((A(),te)[F++>>>0]=0n,(A(),ne)[F++>>>0]=m);return u=kt(u,0,k,D,p),Te(j),u};function ge(u){if(a)return V(0,1,u);if(g=u,!(0<at)){for(var p of st)de(p);for(p of De)de(p);De=[],st=[],pt={},S=!0}d(0,new Me(u))}function He(u){if(a)return V(1,0,u);Pe(u)}var Pe=u=>{if(g=u,a)throw He(u),"unwind";ge(u)},De=[],st=[],nt=[],pt={},ct=u=>{var p=u.Uc;delete pt[p],De.push(u),st.splice(st.indexOf(u),1),u.Uc=0,un(p)};function ir(){nt.forEach(u=>u())}var Ae=u=>new Promise(p=>{u.onmessage=k=>{var j=k.data;if(k=j.Vc,j.bd&&j.bd!=we()){var D=pt[j.bd];D?D.postMessage(j,j.md):C(`Internal error! Worker sent a message "${k}" to target pthread ${j.bd}, but that thread no longer exists!`)}else k==="checkMailbox"?ui():k==="spawnThread"?Ct(j):k==="cleanupThread"?br(()=>{ct(pt[j.Qd])}):k==="loaded"?(u.loaded=!0,p(u)):j.target==="setimmediate"?u.postMessage(j):k==="uncaughtException"?u.onerror(j.error):k==="callHandler"?t[j.yd](...j.args):k&&C(`worker sent an unknown command ${k}`)},u.onerror=k=>{throw C(`worker sent an error! ${k.filename}:${k.lineno}: ${k.message}`),k};var b,m=[];for(b of[])t.propertyIsEnumerable(b)&&m.push(b);u.postMessage({Vc:"load",Ad:m,Rd:gt,Sd:y})});function ka(){var u=new Worker((()=>{let p=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new p("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});De.push(u)}var gt,Qr=(u,p)=>{at=0,u=Ms(u,p),0<at?g=u:ta(u)},Yr=[],zt=0;function Hn(u){var p=new Ti(u>>>=0);return(A(),Y)[p.Wc+12>>>0]==0&&(Jr(p,!0),zt--),ei(p,!1),Yr.push(p),bl(u)}var Kt=0,Ta=()=>{Ie(0,0);var u=Yr.pop();gl(u.gd),Kt=0};function Jr(u,p){p=p?1:0,(A(),Y)[u.Wc+12>>>0]=p}function ei(u,p){p=p?1:0,(A(),Y)[u.Wc+13>>>0]=p}class Ti{constructor(p){this.gd=p,this.Wc=p-24}}var Si=u=>{var p=Kt;if(!p)return ra(0),0;var b=new Ti(p);(A(),W)[b.Wc+16>>>2>>>0]=p;var m=(A(),W)[b.Wc+4>>>2>>>0];if(!m)return ra(0),p;for(var k of u){if(k===0||k===m)break;if(vl(k,m,b.Wc+16))return ra(k),p}return ra(m),p};function Kn(){return Si([])}function Xn(u){return Si([u>>>0])}function Zn(u,p,b,m){return Si([u>>>0,p>>>0,b>>>0,m>>>0])}var Qn=()=>{var u=Yr.pop();u||Re("no exception to throw");var p=u.gd;throw(A(),Y)[u.Wc+13>>>0]==0&&(Yr.push(u),ei(u,!0),Jr(u,!1),zt++),Rs(p),Kt=p};function Sa(u,p,b){var m=new Ti(u>>>=0);throw p>>>=0,b>>>=0,(A(),W)[m.Wc+16>>>2>>>0]=0,(A(),W)[m.Wc+4>>>2>>>0]=p,(A(),W)[m.Wc+8>>>2>>>0]=b,Rs(u),zt++,Kt=u}var Ea=()=>zt;function Ia(u,p,b,m){return a?V(2,1,u,p,b,m):Ei(u,p,b,m)}function Ei(u,p,b,m){if(u>>>=0,p>>>=0,b>>>=0,m>>>=0,!globalThis.SharedArrayBuffer)return 6;var k=[];return a&&k.length===0?Ia(u,p,b,m):(u={Od:b,Uc:u,ed:m,md:k},a?(u.Vc="spawnThread",postMessage(u,k),0):Ct(u))}function Ca(u){throw Kt||=u>>>0,Kt}var ti=globalThis.TextDecoder&&new TextDecoder,Ii=(u,p,b,m)=>{if(b=p+b,m)return b;for(;u[p]&&!(p>=b);)++p;return p},Ci=(u,p=0,b,m)=>{if(16<(b=Ii(u,p>>>=0,b,m))-p&&u.buffer&&ti)return ti.decode(u.buffer instanceof ArrayBuffer?u.subarray(p,b):u.slice(p,b));for(m="";p<b;){var k=u[p++];if(128&k){var j=63&u[p++];if((224&k)==192)m+=String.fromCharCode((31&k)<<6|j);else{var D=63&u[p++];65536>(k=(240&k)==224?(15&k)<<12|j<<6|D:(7&k)<<18|j<<12|D<<6|63&u[p++])?m+=String.fromCharCode(k):(k-=65536,m+=String.fromCharCode(55296|k>>10,56320|1023&k))}}else m+=String.fromCharCode(k)}return m},Xe=(u,p,b)=>(u>>>=0)?Ci((A(),L),u,p,b):"";function zi(u,p,b){return a?V(3,1,u,p,b):0}function Bi(u,p){if(a)return V(4,1,u,p)}function ji(u,p){if(a)return V(5,1,u,p)}function Oi(u,p,b){if(a)return V(6,1,u,p,b)}function Ri(u,p,b){return a?V(7,1,u,p,b):0}function Mi(u,p){if(a)return V(8,1,u,p)}function Di(u,p,b){if(a)return V(9,1,u,p,b)}function Ni(u,p,b,m){if(a)return V(10,1,u,p,b,m)}function Ui(u,p,b,m){if(a)return V(11,1,u,p,b,m)}function Pi(u,p,b,m){if(a)return V(12,1,u,p,b,m)}function za(u){if(a)return V(13,1,u)}function Ba(u,p){if(a)return V(14,1,u,p)}function ri(u,p,b){if(a)return V(15,1,u,p,b)}var Yn=()=>Re(""),ft=u=>{u>>>=0;for(var p="";;){var b=(A(),L)[u++>>>0];if(!b)return p;p+=String.fromCharCode(b)}},ar={},Li={},qi={},nr=class extends Error{constructor(u){super(u),this.name="BindingError"}};function Bt(u,p,b={}){return(function(m,k,j={}){var D=k.name;if(!m)throw new nr(`type "${D}" must have a positive integer typeid pointer`);if(Li.hasOwnProperty(m)){if(j.Bd)return;throw new nr(`Cannot register type '${D}' twice`)}Li[m]=k,delete qi[m],ar.hasOwnProperty(m)&&(k=ar[m],delete ar[m],k.forEach(F=>F()))})(u,p,b)}var ja=(u,p,b)=>{switch(p){case 1:return b?m=>(A(),Y)[m>>>0]:m=>(A(),L)[m>>>0];case 2:return b?m=>(A(),H)[m>>>1>>>0]:m=>(A(),me)[m>>>1>>>0];case 4:return b?m=>(A(),O)[m>>>2>>>0]:m=>(A(),W)[m>>>2>>>0];case 8:return b?m=>(A(),te)[m>>>3>>>0]:m=>(A(),ie)[m>>>3>>>0];default:throw new TypeError(`invalid integer width (${p}): ${u}`)}};function Jn(u,p,b,m,k){u>>>=0,b>>>=0,p=ft(p>>>0);let j=D=>D;if(m=m===0n){let D=8*b;j=F=>BigInt.asUintN(D,F),k=j(k)}Bt(u,{name:p,Rc:j,Yc:(D,F)=>(typeof F=="number"&&(F=BigInt(F)),F),Xc:ja(p,b,!m),Zc:null})}function es(u,p,b,m){Bt(u>>>=0,{name:p=ft(p>>>0),Rc:function(k){return!!k},Yc:function(k,j){return j?b:m},Xc:function(k){return this.Rc((A(),L)[k>>>0])},Zc:null})}var Fi=[],Ft=[0,1,,1,null,1,!0,1,!1,1];function ii(u){9<(u>>>=0)&&--Ft[u+1]===0&&(Ft[u]=void 0,Fi.push(u))}var ht=u=>{if(!u)throw new nr(`Cannot use deleted val. handle = ${u}`);return Ft[u]},vt=u=>{switch(u){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=Fi.pop()||Ft.length;return Ft[p]=u,Ft[p+1]=1,p}};function ai(u){return this.Rc((A(),W)[u>>>2>>>0])}var Oa={name:"emscripten::val",Rc:u=>{var p=ht(u);return ii(u),p},Yc:(u,p)=>vt(p),Xc:ai,Zc:null};function vr(u){return Bt(u>>>0,Oa)}var ts=(u,p)=>{switch(p){case 4:return function(b){return this.Rc((A(),ue)[b>>>2>>>0])};case 8:return function(b){return this.Rc((A(),ne)[b>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${u}`)}};function Ra(u,p,b){b>>>=0,Bt(u>>>=0,{name:p=ft(p>>>0),Rc:m=>m,Yc:(m,k)=>k,Xc:ts(p,b),Zc:null})}function Xt(u,p,b,m,k){u>>>=0,b>>>=0,p=ft(p>>>0);let j=F=>F;if(m===0){var D=32-8*b;j=F=>F<<D>>>D,k=j(k)}Bt(u,{name:p,Rc:j,Yc:(F,Q)=>Q,Xc:ja(p,b,m!==0),Zc:null})}function rs(u,p,b){function m(j){var D=(A(),W)[j>>>2>>>0];return j=(A(),W)[j+4>>>2>>>0],new k((A(),Y).buffer,j,D)}var k=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];Bt(u>>>=0,{name:b=ft(b>>>0),Rc:m,Xc:m},{Bd:!0})}var Gt=(u,p,b)=>{var m=(A(),L);if(p>>>=0,0<b){var k=p;b=p+b-1;for(var j=0;j<u.length;++j){var D=u.codePointAt(j);if(127>=D){if(p>=b)break;m[p++>>>0]=D}else if(2047>=D){if(p+1>=b)break;m[p++>>>0]=192|D>>6,m[p++>>>0]=128|63&D}else if(65535>=D){if(p+2>=b)break;m[p++>>>0]=224|D>>12,m[p++>>>0]=128|D>>6&63,m[p++>>>0]=128|63&D}else{if(p+3>=b)break;m[p++>>>0]=240|D>>18,m[p++>>>0]=128|D>>12&63,m[p++>>>0]=128|D>>6&63,m[p++>>>0]=128|63&D,j++}}m[p>>>0]=0,u=p-k}else u=0;return u},ni=u=>{for(var p=0,b=0;b<u.length;++b){var m=u.charCodeAt(b);127>=m?p++:2047>=m?p+=2:55296<=m&&57343>=m?(p+=4,++b):p+=3}return p};function is(u,p){Bt(u>>>=0,{name:p=ft(p>>>0),Rc(b){var m=(A(),W)[b>>>2>>>0];return m=Xe(b+4,m,!0),be(b),m},Yc(b,m){m instanceof ArrayBuffer&&(m=new Uint8Array(m));var k=typeof m=="string";if(!(k||ArrayBuffer.isView(m)&&m.BYTES_PER_ELEMENT==1))throw new nr("Cannot pass non-string to std::string");var j=k?ni(m):m.length,D=Ye(4+j+1),F=D+4;return(A(),W)[D>>>2>>>0]=j,k?Gt(m,F,j+1):(A(),L).set(m,F>>>0),b!==null&&b.push(be,D),D},Xc:ai,Zc(b){be(b)}})}var si=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,as=(u,p,b)=>{if(u>>>=1,16<(p=Ii((A(),me),u,p/2,b))-u&&si)return si.decode((A(),me).slice(u,p));for(b="";u<p;++u){var m=(A(),me)[u>>>0];b+=String.fromCharCode(m)}return b},ns=(u,p,b)=>{if(b??=2147483647,2>b)return 0;var m=p;b=(b-=2)<2*u.length?b/2:u.length;for(var k=0;k<b;++k){var j=u.charCodeAt(k);(A(),H)[p>>>1>>>0]=j,p+=2}return(A(),H)[p>>>1>>>0]=0,p-m},ss=u=>2*u.length,os=(u,p,b)=>{var m="";u>>>=2;for(var k=0;!(k>=p/4);k++){var j=(A(),W)[u+k>>>0];if(!j&&!b)break;m+=String.fromCodePoint(j)}return m},us=(u,p,b)=>{if(p>>>=0,b??=2147483647,4>b)return 0;var m=p;b=m+b-4;for(var k=0;k<u.length;++k){var j=u.codePointAt(k);if(65535<j&&k++,(A(),O)[p>>>2>>>0]=j,(p+=4)+4>b)break}return(A(),O)[p>>>2>>>0]=0,p-m},ls=u=>{for(var p=0,b=0;b<u.length;++b)65535<u.codePointAt(b)&&b++,p+=4;return p};function Zt(u,p,b){if(u>>>=0,p>>>=0,b=ft(b>>>=0),p===2)var m=as,k=ns,j=ss;else m=os,k=us,j=ls;Bt(u,{name:b,Rc:D=>{var F=(A(),W)[D>>>2>>>0];return F=m(D+4,F*p,!0),be(D),F},Yc:(D,F)=>{if(typeof F!="string")throw new nr(`Cannot pass non-string to C++ string type ${b}`);var Q=j(F),re=Ye(4+Q+p);return(A(),W)[re>>>2>>>0]=Q/p,k(F,re+4,Q+p),D!==null&&D.push(be,re),re},Xc:ai,Zc(D){be(D)}})}function Gi(u,p){Bt(u>>>=0,{Cd:!0,name:p=ft(p>>>0),Rc:()=>{},Yc:()=>{}})}function oi(u){ut(u>>>0,!i,1,!r,131072,!1),ir()}var br=u=>{if(!S)try{if(u(),!(0<at))try{a?we()&&ta(g):Pe(g)}catch(p){p instanceof Me||p=="unwind"||d(0,p)}}catch(p){p instanceof Me||p=="unwind"||d(0,p)}},ds=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function sr(u){u>>>=0,ds||(Atomics.waitAsync((A(),O),u>>>2,u).value.then(ui),u+=128,Atomics.store((A(),O),u>>>2,1))}var ui=()=>br(()=>{var u=we();u&&(sr(u),pi())});function ps(u,p){(u>>>=0)==p>>>0?setTimeout(ui):a?postMessage({bd:u,Vc:"checkMailbox"}):(u=pt[u])&&u.postMessage({Vc:"checkMailbox"})}var yr=[];function Wi(u,p,b,m,k){for(p>>>=0,k>>>=0,yr.length=0,b=k>>>3,m=k+m>>>3;b<m;){var j;j=(A(),te)[b++>>>0]?(A(),te)[b++>>>0]:(A(),ne)[b++>>>0],yr.push(j)}return(p?Ds[p]:qv[u])(...yr)}var Ma=()=>{at=0};function Da(u){u>>>=0,a?postMessage({Vc:"cleanupThread",Qd:u}):ct(pt[u])}function Na(u){}var wr=u=>{try{u()}catch(p){Re(p)}};function Ua(u){var p=(...b)=>{_r.push(u);try{return u(...b)}finally{S||(_r.pop(),bt&&jt===1&&_r.length===0&&(jt=0,at+=1,wr(id),typeof Fibers<"u"&&Fibers.de()))}};return Hi.set(u,p),p}var jt=0,bt=null,Pa=0,_r=[],Vi=new Map,xr=new Map,Hi=new Map,La=0,$r=null,qa=[],Ki=u=>(function(p){if(!S){if(jt===0){var b=!1,m=!1;p((k=0)=>{if(!S&&(Pa=k,b=!0,m)){jt=2,wr(()=>ad(bt)),typeof MainLoop<"u"&&MainLoop.xd&&MainLoop.resume(),k=!1;try{var j=(function(){var Q=(A(),O)[bt+8>>>2>>>0];return Q=xr.get(Q),Q=Hi.get(Q),--at,Q()})()}catch(Q){j=Q,k=!0}var D=!1;if(!bt){var F=$r;F&&($r=null,(k?F.reject:F.resolve)(j),D=!0)}if(k&&!D)throw j}}),m=!0,b||(jt=1,bt=(function(){var k=Ye(65548),j=k+12;if((A(),W)[k>>>2>>>0]=j,(A(),W)[k+4>>>2>>>0]=j+65536,j=_r[0],!Vi.has(j)){var D=La++;Vi.set(j,D),xr.set(D,j)}return j=Vi.get(j),(A(),O)[k+8>>>2>>>0]=j,k})(),typeof MainLoop<"u"&&MainLoop.xd&&MainLoop.pause(),wr(()=>rd(bt)))}else jt===2?(jt=0,wr(nd),be(bt),bt=null,qa.forEach(br)):Re(`invalid state: ${jt}`);return Pa}})(p=>{u().then(p)});function Fa(u){return u>>>=0,Ki(async()=>{var p=await ht(u);return vt(p)})}var Ar=[],Ga=u=>{var p=Ar.length;return Ar.push(u),p},Wa=(u,p)=>{for(var b=Array(u),m=0;m<u;++m){var k=m,j=(A(),W)[p+4*m>>>2>>>0],D=Li[j];if(D===void 0)throw u=`parameter ${m}`,j=Z(j),p=ft(j),be(j),new nr(`${u} has unknown type ${p}`);b[k]=D}return b},ke=(u,p,b)=>{var m=[];return u=u(m,b),m.length&&((A(),W)[p>>>2>>>0]=vt(m)),u},kr={},Tr=u=>{var p=kr[u];return p===void 0?ft(u):p};function _e(u,p,b){var[m,...k]=Wa(u,p>>>0);p=m.Yc.bind(m);var j=k.map(Q=>Q.Xc.bind(Q));u--;var D={toValue:ht};switch(u=j.map((Q,re)=>{var xe=`argFromPtr${re}`;return D[xe]=Q,`${xe}(args${re?"+"+8*re:""})`}),b){case 0:var F="toValue(handle)";break;case 2:F="new (toValue(handle))";break;case 3:F="";break;case 1:D.getStringOrSymbol=Tr,F="toValue(handle)[getStringOrSymbol(methodName)]"}return F+=`(${u})`,m.Cd||(D.toReturnWire=p,D.emval_returnValue=ke,F=`return emval_returnValue(toReturnWire, destructorsRef, ${F})`),F=`return function (handle, methodName, destructorsRef, args) {
  ${F}
  }`,b=new Function(Object.keys(D),F)(...Object.values(D)),F=`methodCaller<(${k.map(Q=>Q.name)}) => ${m.name}>`,Ga(Object.defineProperty(b,"name",{value:F}))}function Xi(u,p){return p>>>=0,(u=ht(u>>>0))==ht(p)}function $e(u){return(u>>>=0)?(u=Tr(u),vt(globalThis[u])):vt(globalThis)}function Va(u){return u=Tr(u>>>0),vt(t[u])}function Zi(u,p){return p>>>=0,u=ht(u>>>0),p=ht(p),vt(u[p])}function Ha(u){9<(u>>>=0)&&(Ft[u+1]+=1)}function Qi(u,p,b,m,k){return Ar[u>>>0](p>>>0,b>>>0,m>>>0,k>>>0)}function Ka(u,p,b,m,k){return Qi(u>>>0,p>>>0,b>>>0,m>>>0,k>>>0)}function Wt(){return vt([])}function cs(u){u=ht(u>>>0);for(var p=Array(u.length),b=0;b<u.length;b++)p[b]=u[b];return vt(p)}function Xa(u){return vt(Tr(u>>>0))}function fs(){return vt({})}function hs(u){for(var p=ht(u>>>=0);p.length;){var b=p.pop();p.pop()(b)}ii(u)}function ms(u,p,b){p>>>=0,b>>>=0,u=ht(u>>>0),p=ht(p),b=ht(b),u[p]=b}function gs(u,p){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),p>>>=0,u=new Date(1e3*u),(A(),O)[p>>>2>>>0]=u.getUTCSeconds(),(A(),O)[p+4>>>2>>>0]=u.getUTCMinutes(),(A(),O)[p+8>>>2>>>0]=u.getUTCHours(),(A(),O)[p+12>>>2>>>0]=u.getUTCDate(),(A(),O)[p+16>>>2>>>0]=u.getUTCMonth(),(A(),O)[p+20>>>2>>>0]=u.getUTCFullYear()-1900,(A(),O)[p+24>>>2>>>0]=u.getUTCDay(),u=(u.getTime()-Date.UTC(u.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(A(),O)[p+28>>>2>>>0]=u}var Za=u=>u%4==0&&(u%100!=0||u%400==0),Qa=[0,31,60,91,121,152,182,213,244,274,305,335],Ya=[0,31,59,90,120,151,181,212,243,273,304,334];function vs(u,p){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u),p>>>=0,u=new Date(1e3*u),(A(),O)[p>>>2>>>0]=u.getSeconds(),(A(),O)[p+4>>>2>>>0]=u.getMinutes(),(A(),O)[p+8>>>2>>>0]=u.getHours(),(A(),O)[p+12>>>2>>>0]=u.getDate(),(A(),O)[p+16>>>2>>>0]=u.getMonth(),(A(),O)[p+20>>>2>>>0]=u.getFullYear()-1900,(A(),O)[p+24>>>2>>>0]=u.getDay();var b=(Za(u.getFullYear())?Qa:Ya)[u.getMonth()]+u.getDate()-1|0;(A(),O)[p+28>>>2>>>0]=b,(A(),O)[p+36>>>2>>>0]=-60*u.getTimezoneOffset(),b=new Date(u.getFullYear(),6,1).getTimezoneOffset();var m=new Date(u.getFullYear(),0,1).getTimezoneOffset();u=0|(b!=m&&u.getTimezoneOffset()==Math.min(m,b)),(A(),O)[p+32>>>2>>>0]=u}function bs(u){u>>>=0;var p=new Date((A(),O)[u+20>>>2>>>0]+1900,(A(),O)[u+16>>>2>>>0],(A(),O)[u+12>>>2>>>0],(A(),O)[u+8>>>2>>>0],(A(),O)[u+4>>>2>>>0],(A(),O)[u>>>2>>>0],0),b=(A(),O)[u+32>>>2>>>0],m=p.getTimezoneOffset(),k=new Date(p.getFullYear(),6,1).getTimezoneOffset(),j=new Date(p.getFullYear(),0,1).getTimezoneOffset(),D=Math.min(j,k);return 0>b?(A(),O)[u+32>>>2>>>0]=+(k!=j&&D==m):0<b!=(D==m)&&(k=Math.max(j,k),p.setTime(p.getTime()+6e4*((0<b?D:k)-m))),(A(),O)[u+24>>>2>>>0]=p.getDay(),b=(Za(p.getFullYear())?Qa:Ya)[p.getMonth()]+p.getDate()-1|0,(A(),O)[u+28>>>2>>>0]=b,(A(),O)[u>>>2>>>0]=p.getSeconds(),(A(),O)[u+4>>>2>>>0]=p.getMinutes(),(A(),O)[u+8>>>2>>>0]=p.getHours(),(A(),O)[u+12>>>2>>>0]=p.getDate(),(A(),O)[u+16>>>2>>>0]=p.getMonth(),(A(),O)[u+20>>>2>>>0]=p.getYear(),u=p.getTime(),BigInt(isNaN(u)?-1:u/1e3)}function Ja(u,p,b,m,k,j,D){return a?V(16,1,u,p,b,m,k,j,D):-52}function en(u,p,b,m,k,j){if(a)return V(17,1,u,p,b,m,k,j)}var Sr={},ys=()=>performance.timeOrigin+performance.now();function tn(u,p){if(a)return V(18,1,u,p);if(Sr[u]&&(clearTimeout(Sr[u].id),delete Sr[u]),!p)return 0;var b=setTimeout(()=>{delete Sr[u],br(()=>ln(u,performance.timeOrigin+performance.now()))},p);return Sr[u]={id:b,ce:p},0}function ws(u,p,b,m){u>>>=0,p>>>=0,b>>>=0,m>>>=0;var k=new Date().getFullYear(),j=new Date(k,0,1).getTimezoneOffset();k=new Date(k,6,1).getTimezoneOffset();var D=Math.max(j,k);(A(),W)[u>>>2>>>0]=60*D,(A(),O)[p>>>2>>>0]=+(j!=k),u=(p=F=>{var Q=Math.abs(F);return`UTC${0<=F?"-":"+"}${String(Math.floor(Q/60)).padStart(2,"0")}${String(Q%60).padStart(2,"0")}`})(j),p=p(k),k<j?(Gt(u,b,17),Gt(p,m,17)):(Gt(u,m,17),Gt(p,b,17))}var _s=()=>Date.now(),xs=1;function $s(u,p,b){if(b>>>=0,!(0<=u&&3>=u))return 28;if(u===0)u=Date.now();else{if(!xs)return 52;u=performance.timeOrigin+performance.now()}return u=Math.round(1e6*u),(A(),te)[b>>>3>>>0]=BigInt(u),0}var Yi=[],rn=(u,p)=>{Yi.length=0;for(var b;b=(A(),L)[u++>>>0];){var m=b!=105;p+=(m&=b!=112)&&p%8?4:0,Yi.push(b==112?(A(),W)[p>>>2>>>0]:b==106?(A(),te)[p>>>3>>>0]:b==105?(A(),O)[p>>>2>>>0]:(A(),ne)[p>>>3>>>0]),p+=m?8:4}return Yi};function As(u,p,b){return u>>>=0,p=rn(p>>>0,b>>>0),Ds[u](...p)}function ks(u,p,b){return u>>>=0,p=rn(p>>>0,b>>>0),Ds[u](...p)}var Ts=()=>{};function Ss(u,p){return C(Xe(u>>>0,p>>>0))}var Es=()=>{throw at+=1,"unwind"};function Is(){return 4294901760}var Cs=()=>navigator.hardwareConcurrency,Qt={},li=u=>{var p;return(p=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(u))?+p[1]:(p=/:(\d+):\d+(?:\)|$)/.exec(u))?2147483648|+p[1]:0},an=u=>{for(var p of u)(u=li(p))&&(Qt[u]=p)};function zs(){var u=Error().stack.toString().split(`
`);return u[0]=="Error"&&u.shift(),an(u),Qt.kd=li(u[3]),Qt.Md=u,Qt.kd}function di(u){if(!(u=Qt[u>>>0]))return 0;var p;if(p=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(u))u=p[1];else if(p=/^\s+at (.*) \(.*\)$/.exec(u))u=p[1];else{if(!(p=/^(.+?)@/.exec(u)))return 0;u=p[1]}be(di.ld??0),p=ni(u)+1;var b=Ye(p);return b&&Gt(u,b,p),di.ld=b,di.ld}function Bs(u){u>>>=0;var p=(A(),L).length;if(u<=p||4294901760<u)return!1;for(var b=1;4>=b;b*=2){var m=p*(1+.2/b);m=Math.min(m,u+100663296);e:{m=(Math.min(4294901760,65536*Math.ceil(Math.max(u,m)/65536))-gt.buffer.byteLength+65535)/65536|0;try{gt.grow(m),ee();var k=1;break e}catch{}k=void 0}if(k)return!0}return!1}function js(u,p,b){if(u>>>=0,p>>>=0,Qt.kd==u)var m=Qt.Md;else(m=Error().stack.toString().split(`
`))[0]=="Error"&&m.shift(),an(m);for(var k=3;m[k]&&li(m[k])!=u;)++k;for(u=0;u<b&&m[u+k];++u)(A(),O)[p+4*u>>>2>>>0]=li(m[u+k]);return u}var Ji,ea={},nn=()=>{if(!Ji){var u,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(u in ea)ea[u]===void 0?delete p[u]:p[u]=ea[u];var b=[];for(u in p)b.push(`${u}=${p[u]}`);Ji=b}return Ji};function sn(u,p){if(a)return V(19,1,u,p);u>>>=0,p>>>=0;var b,m=0,k=0;for(b of nn()){var j=p+m;(A(),W)[u+k>>>2>>>0]=j,m+=Gt(b,j,1/0)+1,k+=4}return 0}function on(u,p){if(a)return V(20,1,u,p);u>>>=0,p>>>=0;var b=nn();for(var m of((A(),W)[u>>>2>>>0]=b.length,u=0,b))u+=ni(m)+1;return(A(),W)[p>>>2>>>0]=u,0}function Er(u){return a?V(21,1,u):52}function v(u,p,b,m,k){return a?V(22,1,u,p,b,m,k):52}function x(u,p,b,m){return a?V(23,1,u,p,b,m):52}function B(u,p,b,m){return a?V(24,1,u,p,b,m):70}var z=[null,[],[]];function M(u,p,b,m){if(a)return V(25,1,u,p,b,m);p>>>=0,b>>>=0,m>>>=0;for(var k=0,j=0;j<b;j++){var D=(A(),W)[p>>>2>>>0],F=(A(),W)[p+4>>>2>>>0];p+=8;for(var Q=0;Q<F;Q++){var re=u,xe=(A(),L)[D+Q>>>0],ze=z[re];xe===0||xe===10?((re===1?E:C)(Ci(ze)),ze.length=0):ze.push(xe)}k+=F}return(A(),W)[m>>>2>>>0]=k,0}function N(u){return u>>>0}a||(function(){for(var u=t.numThreads-1;u--;)ka();pe.push(async()=>{var p=(async function(){if(!a)return Promise.all(De.map(Ae))})();he++,await p,--he==0&&ot&&(p=ot,ot=null,p())})})(),a||(gt=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),ee()),t.wasmBinary&&(h=t.wasmBinary),t.stackSave=()=>Se(),t.stackRestore=u=>Te(u),t.stackAlloc=u=>Os(u),t.setValue=function(u,p,b="i8"){switch(b.endsWith("*")&&(b="*"),b){case"i1":case"i8":(A(),Y)[u>>>0]=p;break;case"i16":(A(),H)[u>>>1>>>0]=p;break;case"i32":(A(),O)[u>>>2>>>0]=p;break;case"i64":(A(),te)[u>>>3>>>0]=BigInt(p);break;case"float":(A(),ue)[u>>>2>>>0]=p;break;case"double":(A(),ne)[u>>>3>>>0]=p;break;case"*":(A(),W)[u>>>2>>>0]=p;break;default:Re(`invalid type for setValue: ${b}`)}},t.getValue=function(u,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return(A(),Y)[u>>>0];case"i16":return(A(),H)[u>>>1>>>0];case"i32":return(A(),O)[u>>>2>>>0];case"i64":return(A(),te)[u>>>3>>>0];case"float":return(A(),ue)[u>>>2>>>0];case"double":return(A(),ne)[u>>>3>>>0];case"*":return(A(),W)[u>>>2>>>0];default:Re(`invalid type for getValue: ${p}`)}},t.UTF8ToString=Xe,t.stringToUTF8=Gt,t.lengthBytesUTF8=ni;var Z,ce,we,be,Ye,ut,At,kt,un,ta,ln,pi,Ie,ra,ml,Te,Os,Se,gl,Rs,vl,bl,yl,Ms,wl,_l,xl,$l,Al,kl,Tl,Sl,El,Il,Cl,zl,Bl,jl,Ol,Rl,Ml,Dl,Nl,Ul,Pl,Ll,ql,Fl,Gl,Wl,Vl,Hl,Kl,Xl,Zl,Ql,Yl,Jl,ed,td,rd,id,ad,nd,Yt,qv=[ge,He,Ia,zi,Bi,ji,Oi,Ri,Mi,Di,Ni,Ui,Pi,za,Ba,ri,Ja,en,tn,sn,on,Er,v,x,B,M],Ds={1086876:(u,p,b,m,k)=>{if(t===void 0||!t.ad)return 1;if((u=Xe(Number(u>>>0))).startsWith("./")&&(u=u.substring(2)),!(u=t.ad.get(u)))return 2;if(p=Number(p>>>0),b=Number(b>>>0),m=Number(m>>>0),p+b>u.byteLength)return 3;try{let j=u.subarray(p,p+b);switch(k){case 0:(A(),L).set(j,m>>>0);break;case 1:t.Td?t.Td(m,j):t.Ld(m,j);break;default:return 4}return 0}catch{return 4}},1087700:(u,p,b)=>{t.wd(u,(A(),L).subarray(p>>>0,p+b>>>0))},1087764:()=>t.Vd(),1087806:u=>{t.vd(u)},1087843:()=>{t.Ed()},1087874:()=>{t.Fd()},1087903:()=>{t.Jd()},1087928:u=>t.Dd(u),1087961:u=>t.Hd(u),1087993:(u,p,b)=>{t.jd(Number(u),Number(p),Number(b),!0)},1088056:(u,p,b)=>{t.jd(Number(u),Number(p),Number(b))},1088113:()=>typeof wasmOffsetConverter<"u",1088170:u=>{t.bc("Abs",u,void 0)},1088221:u=>{t.bc("Neg",u,void 0)},1088272:u=>{t.bc("Floor",u,void 0)},1088325:u=>{t.bc("Ceil",u,void 0)},1088377:u=>{t.bc("Reciprocal",u,void 0)},1088435:u=>{t.bc("Sqrt",u,void 0)},1088487:u=>{t.bc("Exp",u,void 0)},1088538:u=>{t.bc("Erf",u,void 0)},1088589:u=>{t.bc("Sigmoid",u,void 0)},1088644:(u,p,b)=>{t.bc("HardSigmoid",u,{alpha:p,beta:b})},1088723:u=>{t.bc("HardSwish",u,void 0)},1088780:u=>{t.bc("Log",u,void 0)},1088831:u=>{t.bc("Sin",u,void 0)},1088882:u=>{t.bc("Cos",u,void 0)},1088933:u=>{t.bc("Tan",u,void 0)},1088984:u=>{t.bc("Asin",u,void 0)},1089036:u=>{t.bc("Acos",u,void 0)},1089088:u=>{t.bc("Atan",u,void 0)},1089140:u=>{t.bc("Sinh",u,void 0)},1089192:u=>{t.bc("Cosh",u,void 0)},1089244:u=>{t.bc("Asinh",u,void 0)},1089297:u=>{t.bc("Acosh",u,void 0)},1089350:u=>{t.bc("Atanh",u,void 0)},1089403:u=>{t.bc("Tanh",u,void 0)},1089455:u=>{t.bc("Not",u,void 0)},1089506:(u,p,b)=>{t.bc("Clip",u,{min:p,max:b})},1089575:u=>{t.bc("Clip",u,void 0)},1089627:(u,p)=>{t.bc("Elu",u,{alpha:p})},1089685:u=>{t.bc("Gelu",u,void 0)},1089737:u=>{t.bc("Relu",u,void 0)},1089789:(u,p)=>{t.bc("LeakyRelu",u,{alpha:p})},1089853:(u,p)=>{t.bc("ThresholdedRelu",u,{alpha:p})},1089923:(u,p)=>{t.bc("Cast",u,{to:p})},1089981:u=>{t.bc("Add",u,void 0)},1090032:u=>{t.bc("Sub",u,void 0)},1090083:u=>{t.bc("Mul",u,void 0)},1090134:u=>{t.bc("Div",u,void 0)},1090185:u=>{t.bc("Pow",u,void 0)},1090236:u=>{t.bc("Equal",u,void 0)},1090289:u=>{t.bc("Greater",u,void 0)},1090344:u=>{t.bc("GreaterOrEqual",u,void 0)},1090406:u=>{t.bc("Less",u,void 0)},1090458:u=>{t.bc("LessOrEqual",u,void 0)},1090517:(u,p,b,m,k)=>{t.bc("ReduceMean",u,{keepDims:!!p,noopWithEmptyAxes:!!b,axes:m?Array.from((A(),O).subarray(Number(m)>>>0,Number(k)>>>0)):[]})},1090692:(u,p,b,m,k)=>{t.bc("ReduceMax",u,{keepDims:!!p,noopWithEmptyAxes:!!b,axes:m?Array.from((A(),O).subarray(Number(m)>>>0,Number(k)>>>0)):[]})},1090866:(u,p,b,m,k)=>{t.bc("ReduceMin",u,{keepDims:!!p,noopWithEmptyAxes:!!b,axes:m?Array.from((A(),O).subarray(Number(m)>>>0,Number(k)>>>0)):[]})},1091040:(u,p,b,m,k)=>{t.bc("ReduceProd",u,{keepDims:!!p,noopWithEmptyAxes:!!b,axes:m?Array.from((A(),O).subarray(Number(m)>>>0,Number(k)>>>0)):[]})},1091215:(u,p,b,m,k)=>{t.bc("ReduceSum",u,{keepDims:!!p,noopWithEmptyAxes:!!b,axes:m?Array.from((A(),O).subarray(Number(m)>>>0,Number(k)>>>0)):[]})},1091389:(u,p,b,m,k)=>{t.bc("ReduceL1",u,{keepDims:!!p,noopWithEmptyAxes:!!b,axes:m?Array.from((A(),O).subarray(Number(m)>>>0,Number(k)>>>0)):[]})},1091562:(u,p,b,m,k)=>{t.bc("ReduceL2",u,{keepDims:!!p,noopWithEmptyAxes:!!b,axes:m?Array.from((A(),O).subarray(Number(m)>>>0,Number(k)>>>0)):[]})},1091735:(u,p,b,m,k)=>{t.bc("ReduceLogSum",u,{keepDims:!!p,noopWithEmptyAxes:!!b,axes:m?Array.from((A(),O).subarray(Number(m)>>>0,Number(k)>>>0)):[]})},1091912:(u,p,b,m,k)=>{t.bc("ReduceSumSquare",u,{keepDims:!!p,noopWithEmptyAxes:!!b,axes:m?Array.from((A(),O).subarray(Number(m)>>>0,Number(k)>>>0)):[]})},1092092:(u,p,b,m,k)=>{t.bc("ReduceLogSumExp",u,{keepDims:!!p,noopWithEmptyAxes:!!b,axes:m?Array.from((A(),O).subarray(Number(m)>>>0,Number(k)>>>0)):[]})},1092272:u=>{t.bc("Where",u,void 0)},1092325:(u,p,b)=>{t.bc("Transpose",u,{perm:p?Array.from((A(),O).subarray(Number(p)>>>0,Number(b)>>>0)):[]})},1092449:(u,p,b,m)=>{t.bc("DepthToSpace",u,{blocksize:p,mode:Xe(b),format:m?"NHWC":"NCHW"})},1092582:(u,p,b,m)=>{t.bc("DepthToSpace",u,{blocksize:p,mode:Xe(b),format:m?"NHWC":"NCHW"})},1092715:(u,p,b,m)=>{t.bc("DFT",u,{axis:p,inverse:b,onesided:m})},1092807:(u,p,b,m,k,j,D,F,Q,re,xe,ze,Le,Ge,or)=>{t.bc("ConvTranspose",u,{format:Q?"NHWC":"NCHW",autoPad:p,dilations:[b],group:m,kernelShape:[k],pads:[j,D],strides:[F],wIsConst:()=>!!(A(),Y)[re>>>0],outputPadding:xe?Array.from((A(),O).subarray(Number(xe)>>>0,Number(ze)>>>0)):[],outputShape:Le?Array.from((A(),O).subarray(Number(Le)>>>0,Number(Ge)>>>0)):[],activation:Xe(or)})},1093240:(u,p,b,m,k,j,D,F,Q,re,xe,ze,Le,Ge)=>{t.bc("ConvTranspose",u,{format:F?"NHWC":"NCHW",autoPad:p,dilations:Array.from((A(),O).subarray(Number(b)>>>0,(Number(b)>>>0)+2>>>0)),group:m,kernelShape:Array.from((A(),O).subarray(Number(k)>>>0,(Number(k)>>>0)+2>>>0)),pads:Array.from((A(),O).subarray(Number(j)>>>0,(Number(j)>>>0)+4>>>0)),strides:Array.from((A(),O).subarray(Number(D)>>>0,(Number(D)>>>0)+2>>>0)),wIsConst:()=>!!(A(),Y)[Q>>>0],outputPadding:re?Array.from((A(),O).subarray(Number(re)>>>0,Number(xe)>>>0)):[],outputShape:ze?Array.from((A(),O).subarray(Number(ze)>>>0,Number(Le)>>>0)):[],activation:Xe(Ge)})},1093901:(u,p,b,m,k,j,D,F,Q,re,xe,ze,Le,Ge,or)=>{t.bc("ConvTranspose",u,{format:Q?"NHWC":"NCHW",autoPad:p,dilations:[b],group:m,kernelShape:[k],pads:[j,D],strides:[F],wIsConst:()=>!!(A(),Y)[re>>>0],outputPadding:xe?Array.from((A(),O).subarray(Number(xe)>>>0,Number(ze)>>>0)):[],outputShape:Le?Array.from((A(),O).subarray(Number(Le)>>>0,Number(Ge)>>>0)):[],activation:Xe(or)})},1094334:(u,p,b,m,k,j,D,F,Q,re,xe,ze,Le,Ge)=>{t.bc("ConvTranspose",u,{format:F?"NHWC":"NCHW",autoPad:p,dilations:Array.from((A(),O).subarray(Number(b)>>>0,(Number(b)>>>0)+2>>>0)),group:m,kernelShape:Array.from((A(),O).subarray(Number(k)>>>0,(Number(k)>>>0)+2>>>0)),pads:Array.from((A(),O).subarray(Number(j)>>>0,(Number(j)>>>0)+4>>>0)),strides:Array.from((A(),O).subarray(Number(D)>>>0,(Number(D)>>>0)+2>>>0)),wIsConst:()=>!!(A(),Y)[Q>>>0],outputPadding:re?Array.from((A(),O).subarray(Number(re)>>>0,Number(xe)>>>0)):[],outputShape:ze?Array.from((A(),O).subarray(Number(ze)>>>0,Number(Le)>>>0)):[],activation:Xe(Ge)})},1094995:(u,p)=>{t.bc("GlobalAveragePool",u,{format:p?"NHWC":"NCHW"})},1095086:(u,p,b,m,k,j,D,F,Q,re,xe,ze,Le,Ge)=>{t.bc("AveragePool",u,{format:Ge?"NHWC":"NCHW",auto_pad:p,ceil_mode:b,count_include_pad:m,storage_order:k,dilations:j?Array.from((A(),O).subarray(Number(j)>>>0,Number(D)>>>0)):[],kernel_shape:F?Array.from((A(),O).subarray(Number(F)>>>0,Number(Q)>>>0)):[],pads:re?Array.from((A(),O).subarray(Number(re)>>>0,Number(xe)>>>0)):[],strides:ze?Array.from((A(),O).subarray(Number(ze)>>>0,Number(Le)>>>0)):[]})},1095565:(u,p)=>{t.bc("GlobalAveragePool",u,{format:p?"NHWC":"NCHW"})},1095656:(u,p,b,m,k,j,D,F,Q,re,xe,ze,Le,Ge)=>{t.bc("AveragePool",u,{format:Ge?"NHWC":"NCHW",auto_pad:p,ceil_mode:b,count_include_pad:m,storage_order:k,dilations:j?Array.from((A(),O).subarray(Number(j)>>>0,Number(D)>>>0)):[],kernel_shape:F?Array.from((A(),O).subarray(Number(F)>>>0,Number(Q)>>>0)):[],pads:re?Array.from((A(),O).subarray(Number(re)>>>0,Number(xe)>>>0)):[],strides:ze?Array.from((A(),O).subarray(Number(ze)>>>0,Number(Le)>>>0)):[]})},1096135:(u,p)=>{t.bc("GlobalMaxPool",u,{format:p?"NHWC":"NCHW"})},1096222:(u,p,b,m,k,j,D,F,Q,re,xe,ze,Le,Ge)=>{t.bc("MaxPool",u,{format:Ge?"NHWC":"NCHW",auto_pad:p,ceil_mode:b,count_include_pad:m,storage_order:k,dilations:j?Array.from((A(),O).subarray(Number(j)>>>0,Number(D)>>>0)):[],kernel_shape:F?Array.from((A(),O).subarray(Number(F)>>>0,Number(Q)>>>0)):[],pads:re?Array.from((A(),O).subarray(Number(re)>>>0,Number(xe)>>>0)):[],strides:ze?Array.from((A(),O).subarray(Number(ze)>>>0,Number(Le)>>>0)):[]})},1096697:(u,p)=>{t.bc("GlobalMaxPool",u,{format:p?"NHWC":"NCHW"})},1096784:(u,p,b,m,k,j,D,F,Q,re,xe,ze,Le,Ge)=>{t.bc("MaxPool",u,{format:Ge?"NHWC":"NCHW",auto_pad:p,ceil_mode:b,count_include_pad:m,storage_order:k,dilations:j?Array.from((A(),O).subarray(Number(j)>>>0,Number(D)>>>0)):[],kernel_shape:F?Array.from((A(),O).subarray(Number(F)>>>0,Number(Q)>>>0)):[],pads:re?Array.from((A(),O).subarray(Number(re)>>>0,Number(xe)>>>0)):[],strides:ze?Array.from((A(),O).subarray(Number(ze)>>>0,Number(Le)>>>0)):[]})},1097259:(u,p,b,m,k)=>{t.bc("Gemm",u,{alpha:p,beta:b,transA:m,transB:k})},1097363:u=>{t.bc("MatMul",u,void 0)},1097417:(u,p,b,m)=>{t.bc("ArgMax",u,{keepDims:!!p,selectLastIndex:!!b,axis:m})},1097525:(u,p,b,m)=>{t.bc("ArgMin",u,{keepDims:!!p,selectLastIndex:!!b,axis:m})},1097633:(u,p)=>{t.bc("Softmax",u,{axis:p})},1097696:(u,p)=>{t.bc("Concat",u,{axis:p})},1097756:(u,p,b,m,k)=>{t.bc("Split",u,{axis:p,numOutputs:b,splitSizes:m?Array.from((A(),O).subarray(Number(m)>>>0,Number(k)>>>0)):[]})},1097912:u=>{t.bc("Expand",u,void 0)},1097966:(u,p)=>{t.bc("Gather",u,{axis:Number(p)})},1098037:(u,p)=>{t.bc("GatherElements",u,{axis:Number(p)})},1098116:(u,p)=>{t.bc("GatherND",u,{batch_dims:Number(p)})},1098195:(u,p,b,m,k,j,D,F,Q,re,xe)=>{t.bc("Resize",u,{antialias:p,axes:b?Array.from((A(),O).subarray(Number(b)>>>0,Number(m)>>>0)):[],coordinateTransformMode:Xe(k),cubicCoeffA:j,excludeOutside:D,extrapolationValue:F,keepAspectRatioPolicy:Xe(Q),mode:Xe(re),nearestMode:Xe(xe)})},1098557:(u,p,b,m,k,j,D)=>{t.bc("Slice",u,{starts:p?Array.from((A(),O).subarray(Number(p)>>>0,Number(b)>>>0)):[],ends:m?Array.from((A(),O).subarray(Number(m)>>>0,Number(k)>>>0)):[],axes:j?Array.from((A(),O).subarray(Number(j)>>>0,Number(D)>>>0)):[]})},1098821:u=>{t.bc("Tile",u,void 0)},1098873:(u,p,b)=>{t.bc("InstanceNormalization",u,{epsilon:p,format:b?"NHWC":"NCHW"})},1098987:(u,p,b)=>{t.bc("InstanceNormalization",u,{epsilon:p,format:b?"NHWC":"NCHW"})},1099101:u=>{t.bc("Range",u,void 0)},1099154:(u,p)=>{t.bc("Einsum",u,{equation:Xe(p)})},1099235:(u,p,b,m,k)=>{t.bc("Pad",u,{mode:p,value:b,pads:m?Array.from((A(),O).subarray(Number(m)>>>0,Number(k)>>>0)):[]})},1099378:(u,p,b,m,k,j)=>{t.bc("BatchNormalization",u,{epsilon:p,momentum:b,spatial:!!k,trainingMode:!!m,format:j?"NHWC":"NCHW"})},1099547:(u,p,b,m,k,j)=>{t.bc("BatchNormalization",u,{epsilon:p,momentum:b,spatial:!!k,trainingMode:!!m,format:j?"NHWC":"NCHW"})},1099716:(u,p,b)=>{t.bc("CumSum",u,{exclusive:Number(p),reverse:Number(b)})},1099813:(u,p,b)=>{t.bc("DequantizeLinear",u,{axis:p,blockSize:b})},1099903:(u,p,b,m,k)=>{t.bc("GridSample",u,{align_corners:p,mode:Xe(b),padding_mode:Xe(m),format:k?"NHWC":"NCHW"})},1100073:(u,p,b,m,k)=>{t.bc("GridSample",u,{align_corners:p,mode:Xe(b),padding_mode:Xe(m),format:k?"NHWC":"NCHW"})},1100243:(u,p)=>{t.bc("ScatterND",u,{reduction:Xe(p)})},1100328:(u,p,b,m,k,j,D,F,Q)=>{t.bc("Attention",u,{numHeads:p,isUnidirectional:b,maskFilterValue:m,scale:k,doRotary:j,qkvHiddenSizes:D?Array.from((A(),O).subarray(Number(F)>>>0,Number(F)+D>>>0)):[],pastPresentShareBuffer:!!Q})},1100600:u=>{t.bc("BiasAdd",u,void 0)},1100655:u=>{t.bc("BiasSplitGelu",u,void 0)},1100716:u=>{t.bc("FastGelu",u,void 0)},1100772:(u,p,b,m,k,j,D,F,Q,re,xe,ze,Le,Ge,or,Ns)=>{t.bc("Conv",u,{format:ze?"NHWC":"NCHW",auto_pad:p,dilations:b?Array.from((A(),O).subarray(Number(b)>>>0,Number(m)>>>0)):[],group:k,kernel_shape:j?Array.from((A(),O).subarray(Number(j)>>>0,Number(D)>>>0)):[],pads:F?Array.from((A(),O).subarray(Number(F)>>>0,Number(Q)>>>0)):[],strides:re?Array.from((A(),O).subarray(Number(re)>>>0,Number(xe)>>>0)):[],w_is_const:()=>!!(A(),Y)[Number(Le)>>>0],activation:Xe(Ge),activation_params:or?Array.from((A(),ue).subarray(Number(or)>>>0,Number(Ns)>>>0)):[]})},1101356:u=>{t.bc("Gelu",u,void 0)},1101408:(u,p,b,m,k,j,D,F,Q)=>{t.bc("GroupQueryAttention",u,{numHeads:p,kvNumHeads:b,scale:m,softcap:k,doRotary:j,rotaryInterleaved:D,smoothSoftmax:F,localWindowSize:Q})},1101625:(u,p,b,m)=>{t.bc("LayerNormalization",u,{axis:p,epsilon:b,simplified:!!m})},1101736:(u,p,b,m)=>{t.bc("LayerNormalization",u,{axis:p,epsilon:b,simplified:!!m})},1101847:(u,p,b,m,k,j)=>{t.bc("MatMulNBits",u,{k:p,n:b,accuracyLevel:m,bits:k,blockSize:j})},1101974:(u,p,b,m,k,j)=>{t.bc("MultiHeadAttention",u,{numHeads:p,isUnidirectional:b,maskFilterValue:m,scale:k,doRotary:j})},1102133:(u,p)=>{t.bc("QuickGelu",u,{alpha:p})},1102197:(u,p,b,m,k)=>{t.bc("RotaryEmbedding",u,{interleaved:!!p,numHeads:b,rotaryEmbeddingDim:m,scale:k})},1102336:(u,p,b)=>{t.bc("SkipLayerNormalization",u,{epsilon:p,simplified:!!b})},1102438:(u,p,b)=>{t.bc("SkipLayerNormalization",u,{epsilon:p,simplified:!!b})},1102540:(u,p,b,m)=>{t.bc("GatherBlockQuantized",u,{gatherAxis:p,quantizeAxis:b,blockSize:m})},1102661:u=>{t.Id(u)},1102695:(u,p)=>t.Kd(Number(u),Number(p),t.$c.Nd,t.$c.errors)};function Fv(u,p,b){return Ki(async()=>{await t.Gd(Number(u),Number(p),Number(b))})}function Gv(){return typeof wasmOffsetConverter<"u"}function Wv(u,p,b,m){var k=Se();try{return Sl(u,p,b,m)}catch(j){if(Te(k),j!==j+0)throw j;Ie(1,0)}}function Vv(u,p,b){var m=Se();try{return $l(u,p,b)}catch(k){if(Te(m),k!==k+0)throw k;Ie(1,0)}}function Hv(u){var p=Se();try{wl(u)}catch(b){if(Te(p),b!==b+0)throw b;Ie(1,0)}}function Kv(u,p){var b=Se();try{return Ms(u,p)}catch(m){if(Te(b),m!==m+0)throw m;Ie(1,0)}}function Xv(u,p,b){var m=Se();try{yl(u,p,b)}catch(k){if(Te(m),k!==k+0)throw k;Ie(1,0)}}function Zv(u,p){var b=Se();try{El(u,p)}catch(m){if(Te(b),m!==m+0)throw m;Ie(1,0)}}function Qv(u,p,b,m,k,j,D){var F=Se();try{return kl(u,p,b,m,k,j,D)}catch(Q){if(Te(F),Q!==Q+0)throw Q;Ie(1,0)}}function Yv(u,p,b,m,k,j){var D=Se();try{_l(u,p,b,m,k,j)}catch(F){if(Te(D),F!==F+0)throw F;Ie(1,0)}}function Jv(u,p,b,m){var k=Se();try{Tl(u,p,b,m)}catch(j){if(Te(k),j!==j+0)throw j;Ie(1,0)}}function eb(u,p,b,m,k){var j=Se();try{xl(u,p,b,m,k)}catch(D){if(Te(j),D!==D+0)throw D;Ie(1,0)}}function tb(u,p,b,m,k,j,D){var F=Se();try{Cl(u,p,b,m,k,j,D)}catch(Q){if(Te(F),Q!==Q+0)throw Q;Ie(1,0)}}function rb(u,p,b,m,k,j,D){var F=Se();try{zl(u,p,b,m,k,j,D)}catch(Q){if(Te(F),Q!==Q+0)throw Q;Ie(1,0)}}function ib(u,p,b,m,k,j,D,F){var Q=Se();try{Rl(u,p,b,m,k,j,D,F)}catch(re){if(Te(Q),re!==re+0)throw re;Ie(1,0)}}function ab(u,p,b,m,k){var j=Se();try{return Il(u,p,b,m,k)}catch(D){if(Te(j),D!==D+0)throw D;Ie(1,0)}}function nb(u,p,b){var m=Se();try{return Ml(u,p,b)}catch(k){if(Te(m),k!==k+0)throw k;Ie(1,0)}}function sb(u,p,b,m,k,j,D,F){var Q=Se();try{Dl(u,p,b,m,k,j,D,F)}catch(re){if(Te(Q),re!==re+0)throw re;Ie(1,0)}}function ob(u,p,b,m,k,j,D,F,Q,re,xe,ze){var Le=Se();try{Bl(u,p,b,m,k,j,D,F,Q,re,xe,ze)}catch(Ge){if(Te(Le),Ge!==Ge+0)throw Ge;Ie(1,0)}}function ub(u,p,b){var m=Se();try{return Nl(u,p,b)}catch(k){if(Te(m),k!==k+0)throw k;return Ie(1,0),0n}}function lb(u,p,b,m,k,j,D,F,Q){var re=Se();try{Al(u,p,b,m,k,j,D,F,Q)}catch(xe){if(Te(re),xe!==xe+0)throw xe;Ie(1,0)}}function db(u){var p=Se();try{return Ul(u)}catch(b){if(Te(p),b!==b+0)throw b;Ie(1,0)}}function pb(u,p){var b=Se();try{return td(u,p)}catch(m){if(Te(b),m!==m+0)throw m;return Ie(1,0),0n}}function cb(u,p,b,m){var k=Se();try{return Pl(u,p,b,m)}catch(j){if(Te(k),j!==j+0)throw j;Ie(1,0)}}function fb(u){var p=Se();try{return Ll(u)}catch(b){if(Te(p),b!==b+0)throw b;return Ie(1,0),0n}}function hb(u,p,b,m){var k=Se();try{return Hl(u,p,b,m)}catch(j){if(Te(k),j!==j+0)throw j;Ie(1,0)}}function mb(u,p,b,m,k){var j=Se();try{return Kl(u,p,b,m,k)}catch(D){if(Te(j),D!==D+0)throw D;Ie(1,0)}}function gb(u,p,b,m,k,j){var D=Se();try{return Xl(u,p,b,m,k,j)}catch(F){if(Te(D),F!==F+0)throw F;Ie(1,0)}}function vb(u,p,b,m,k,j){var D=Se();try{return jl(u,p,b,m,k,j)}catch(F){if(Te(D),F!==F+0)throw F;Ie(1,0)}}function bb(u,p,b,m,k,j){var D=Se();try{return Zl(u,p,b,m,k,j)}catch(F){if(Te(D),F!==F+0)throw F;Ie(1,0)}}function yb(u,p,b,m,k,j,D,F){var Q=Se();try{return Ol(u,p,b,m,k,j,D,F)}catch(re){if(Te(Q),re!==re+0)throw re;Ie(1,0)}}function wb(u,p,b,m,k){var j=Se();try{return Ql(u,p,b,m,k)}catch(D){if(Te(j),D!==D+0)throw D;return Ie(1,0),0n}}function _b(u,p,b,m){var k=Se();try{return Yl(u,p,b,m)}catch(j){if(Te(k),j!==j+0)throw j;Ie(1,0)}}function xb(u,p,b,m){var k=Se();try{return Jl(u,p,b,m)}catch(j){if(Te(k),j!==j+0)throw j;Ie(1,0)}}function $b(u,p,b,m,k,j,D,F,Q,re,xe,ze){var Le=Se();try{return ed(u,p,b,m,k,j,D,F,Q,re,xe,ze)}catch(Ge){if(Te(Le),Ge!==Ge+0)throw Ge;Ie(1,0)}}function Ab(u,p,b,m,k,j,D,F,Q,re,xe){var ze=Se();try{Wl(u,p,b,m,k,j,D,F,Q,re,xe)}catch(Le){if(Te(ze),Le!==Le+0)throw Le;Ie(1,0)}}function kb(u,p,b,m,k,j,D,F,Q,re,xe,ze,Le,Ge,or,Ns){var Ib=Se();try{Vl(u,p,b,m,k,j,D,F,Q,re,xe,ze,Le,Ge,or,Ns)}catch(Us){if(Te(Ib),Us!==Us+0)throw Us;Ie(1,0)}}function Tb(u,p,b){var m=Se();try{return ql(u,p,b)}catch(k){if(Te(m),k!==k+0)throw k;Ie(1,0)}}function Sb(u,p,b){var m=Se();try{return Fl(u,p,b)}catch(k){if(Te(m),k!==k+0)throw k;Ie(1,0)}}function Eb(u,p,b,m){var k=Se();try{Gl(u,p,b,m)}catch(j){if(Te(k),j!==j+0)throw j;Ie(1,0)}}function dn(){if(0<he)ot=dn;else if(a)_?.(t),J();else{for(var u=pe;0<u.length;)u.shift()(t);0<he?ot=dn:(t.calledRun=!0,S||(J(),_?.(t)))}}return a||(Yt=await Ee(),dn()),t.PTR_SIZE=4,oe?t:new Promise((u,p)=>{_=u,I=p})}var xh,g0,$y=X(()=>{"use strict";xh=m0,g0=globalThis.self?.name?.startsWith("em-pthread"),g0&&m0()}),Eo,Au,v0,_t,$h,$n,b0,y0,Io,w0,Co,Ah,zo,kh,Fu=X(()=>{"use strict";qu(),Eo=typeof location>"u"?void 0:location.origin,Au=import.meta.url>"file:"&&import.meta.url<"file;",v0=()=>{if(Au){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Eo).href}return import.meta.url},_t=v0(),$h=()=>{if(_t&&!_t.startsWith("blob:"))return _t.substring(0,_t.lastIndexOf("/")+1)},$n=(e,t)=>{try{let r=t??_t;return(r?new URL(e,r):new URL(e)).origin===Eo}catch{return!1}},b0=(e,t)=>{let r=t??_t;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},y0=(e,t)=>`${t??"./"}${e}`,Io=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},w0=async e=>(await import(e)).default,Co=(xy(),$a(yh)).default,Ah=async()=>{if(!_t)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if($n(_t))return[void 0,Co()];let e=await Io(_t);return[e,Co(e)]},zo=($y(),$a(_h)).default,kh=async(e,t,r,i)=>{let a=zo&&!(e||t);if(a)if(_t)a=$n(_t)||i&&!r;else if(i&&!r)a=!0;else throw new Error("cannot determine the script source URL.");if(a)return[void 0,zo];{let s="ort-wasm-simd-threaded.jsep.mjs",n=e??b0(s,t),o=r&&n&&!$n(n,t),l=o?await Io(n):n??y0(s,t);return[o?l:void 0,await w0(l)]}}}),Bo,An,la,jo,_0,x0,$0,Gu,Fe,Kr=X(()=>{"use strict";Fu(),An=!1,la=!1,jo=!1,_0=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},x0=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},$0=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Gu=async e=>{if(An)return Promise.resolve();if(la)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(jo)throw new Error("previous call to 'initializeWebAssembly()' failed.");la=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!$0())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!x0())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=_0();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,s=typeof a=="string"?a:void 0,n=a?.mjs,o=n?.href??n,l=a?.wasm,d=l?.href??l,f=e.wasmBinary,[c,h]=await kh(o,s,r>1,!!f||!!d),y=!1,g=[];if(t>0&&g.push(new Promise(_=>{setTimeout(()=>{y=!0,_()},t)})),g.push(new Promise((_,I)=>{let $={numThreads:r};if(f)$.wasmBinary=f,$.locateFile=w=>w;else if(d||s)$.locateFile=w=>d??s+w;else if(o&&o.indexOf("blob:")!==0)$.locateFile=w=>new URL(w,o).href;else if(c){let w=$h();w&&($.locateFile=T=>w+T)}h($).then(w=>{la=!1,An=!0,Bo=w,_(),c&&URL.revokeObjectURL(c)},w=>{la=!1,jo=!0,I(w)})})),await Promise.race(g),y)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Fe=()=>{if(An&&Bo)return Bo;throw new Error("WebAssembly is not initialized yet.")}}),Pt,Un,Ne,Wu=X(()=>{"use strict";Kr(),Pt=(e,t)=>{let r=Fe(),i=r.lengthBytesUTF8(e)+1,a=r._malloc(i);return r.stringToUTF8(e,a,i),t.push(a),a},Un=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([a,s])=>{let n=t?t+a:a;if(typeof s=="object")Un(s,n+".",r,i);else if(typeof s=="string"||typeof s=="number")i(n,s.toString());else if(typeof s=="boolean")i(n,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},Ne=e=>{let t=Fe(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetLastError(a,a+i);let s=Number(t.getValue(a,i===4?"i32":"i64")),n=t.getValue(a+i,"*"),o=n?t.UTF8ToString(n):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(r)}}}),Th,Ay=X(()=>{"use strict";Kr(),Wu(),Th=e=>{let t=Fe(),r=0,i=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let s=0;return e?.tag!==void 0&&(s=Pt(e.tag,i)),r=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,s),r===0&&Ne("Can't create run options."),e?.extra!==void 0&&Un(e.extra,"",new WeakSet,(n,o)=>{let l=Pt(n,i),d=Pt(o,i);t._OrtAddRunConfigEntry(r,l,d)!==0&&Ne(`Can't set a run config entry: ${n} - ${o}.`)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(n=>t._free(n)),s}}}),A0,k0,T0,Rr,S0,Sh,ky=X(()=>{"use strict";Kr(),Wu(),A0=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},k0=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},T0=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Rr=(e,t,r,i)=>{let a=Pt(t,i),s=Pt(r,i);Fe()._OrtAddSessionConfigEntry(e,a,s)!==0&&Ne(`Can't set a session config entry: ${t} - ${r}.`)},S0=async(e,t,r)=>{let i=t.executionProviders;for(let a of i){let s=typeof a=="string"?a:a.name,n=[];switch(s){case"webnn":if(s="WEBNN",Rr(e,"session.disable_quant_qdq","1",r),Rr(e,"session.disable_qdq_constant_folding","1",r),typeof a!="string"){let c=a?.deviceType;c&&Rr(e,"deviceType",c,r)}break;case"webgpu":if(s="JS",typeof a!="string"){let c=a;if(c?.preferredLayout){if(c.preferredLayout!=="NCHW"&&c.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${c.preferredLayout}`);Rr(e,"preferredLayout",c.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${s}`)}let o=Pt(s,r),l=n.length,d=0,f=0;if(l>0){d=Fe()._malloc(l*Fe().PTR_SIZE),r.push(d),f=Fe()._malloc(l*Fe().PTR_SIZE),r.push(f);for(let c=0;c<l;c++)Fe().setValue(d+c*Fe().PTR_SIZE,n[c][0],"*"),Fe().setValue(f+c*Fe().PTR_SIZE,n[c][1],"*")}await Fe()._OrtAppendExecutionProvider(e,o,d,f,l)!==0&&Ne(`Can't append execution provider: ${s}.`)}},Sh=async e=>{let t=Fe(),r=0,i=[],a=e||{};T0(a);try{let s=A0(a.graphOptimizationLevel??"all"),n=k0(a.executionMode??"sequential"),o=typeof a.logId=="string"?Pt(a.logId,i):0,l=a.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let d=a.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let f=typeof a.optimizedModelFilePath=="string"?Pt(a.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(s,!!a.enableCpuMemArena,!!a.enableMemPattern,n,!!a.enableProfiling,0,o,l,d,f),r===0&&Ne("Can't create session options."),a.executionProviders&&await S0(r,a,i),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);Rr(r,"enableGraphCapture",a.enableGraphCapture.toString(),i)}if(a.freeDimensionOverrides)for(let[c,h]of Object.entries(a.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let y=Pt(c,i);t._OrtAddFreeDimensionOverride(r,y,h)!==0&&Ne(`Can't set a free dimension override: ${c} - ${h}.`)}return a.extra!==void 0&&Un(a.extra,"",new WeakSet,(c,h)=>{Rr(r,c,h,i)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&Ne("Can't release session options."),i.forEach(n=>t._free(n)),s}}}),Lr,tr,qr,Vn,Pn,Vu,Hu,ku,fe=X(()=>{"use strict";Lr=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},tr=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},qr=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((a,s)=>a*s,1);return r>0?Math.ceil(i*r):void 0},Vn=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Pn=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Vu=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Hu=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",ku=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Ku,Eh=X(()=>{"use strict";qu(),Ku=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),s;try{s=new ArrayBuffer(i)}catch(o){if(o instanceof RangeError){let l=Math.ceil(i/65536);s=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw o}let n=0;for(;;){let{done:o,value:l}=await a.read();if(o)break;let d=l.byteLength;new Uint8Array(s,n,d).set(l),n+=d}return new Uint8Array(s,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),E0,I0,C0,z0,Xu,B0,Ce,rr=X(()=>{"use strict";fe(),E0=["V","I","W","E","F"],I0=(e,t)=>{console.log(`[${E0[e]},${new Date().toISOString()}]${t}`)},Xu=(e,t)=>{C0=e,z0=t},B0=(e,t)=>{let r=Pn(e),i=Pn(C0);r>=i&&I0(r,typeof t=="function"?t():t)},Ce=(...e)=>{z0&&B0(...e)}}),j0,$i,U,Ln,Ih,Ch,zh,ve=X(()=>{"use strict";j0=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},$i=class{static calcShape(e,t,r=!1){let i=e.length,a=t.length;if(i===0)return t;if(a===0)return e;let s=Math.max(e.length,t.length),n=new Array(s);if(r){if(i<2||a<2)return;let o=j0.calcMatMulShape([e[i-2],e[i-1]],[t[a-2],t[a-1]]);if(o===void 0)return;[n[s-2],n[s-1]]=o}for(let o=r?3:1;o<=s;o++){let l=i-o<0?1:e[i-o],d=a-o<0?1:t[a-o];if(l!==d&&l>1&&d>1)return;let f=Math.max(l,d);if(l&&d)n[s-o]=Math.max(l,d);else{if(f>1)return;n[s-o]=0}}return n}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let a=1;a<=r;a++)if(e[r-a]!==1&&e[r-a]!==t[i-a])return!1;return!0}},U=class Mn{static size(t){return Mn.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let a=new Array(i),s=i-1;for(;s>=0;){if(t[s]%r===0){a[s]=t[s]/r;break}if(r%t[s]!==0)throw new Error("cannot convert shape");a[s]=1,r/=t[s],s--}for(s--;s>=0;s--)a[s]=t[s];return a}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Mn.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Mn.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let a=1;for(let s=r;s<i;s++){if(t[s]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[s])}return a}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let a=r-3;a>=0;--a)i[a]=i[a+1]*t[a+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((a,s)=>a+r[s]+r[s+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,a)=>i===r[a])}},Ln=class hr{static adjustPoolAttributes(t,r,i,a,s,n){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<r.length-2;o++)o>=i.length?i.push(r[o+2]):i[o]=r[o+2];for(let o=0;o<i.length;o++)if(o<a.length){if(a[o]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let o=0;o<i.length;o++)if(o<s.length){if(s[o]<0)throw new Error("dilations should be greater than or equal to 1")}else s.push(1);for(let o=0;o<i.length*2;o++)if(o<n.length){if(n[o]<0)throw new Error("pad should be greater than or equal to 1")}else n.push(0);for(let o=0;o<i.length;o++){if(i[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(n[o]>=i[o]||n[o+i.length]>=i[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,a,s,n,o){if(o){if(s.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)hr.adjustPadAndReturnShape(t[l+(n?1:2)],r[l],i[l],a[l],s,l,l+t.length-2,o)}}static computePoolOutputShape(t,r,i,a,s,n,o,l=0){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return hr.computeShapeHelper(t,r,d,i,a,s,n,o,l),d}static computeConvOutputShape(t,r,i,a,s,n,o){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return hr.computeShapeHelper(!1,t,l,i,a,s,n,o),l}static computeShapeHelper(t,r,i,a,s,n,o,l,d=0){if(t)for(let f=0;f<r.length-2;f++)i.push(1);else for(let f=0;f<r.length-2;f++)i.push(hr.adjustPadAndReturnShape(r[f+2],a[f],s[f],n[f],o,f,f+r.length-2,l,d))}static computeOutputSize(t,r,i,a,s){let n=Math.floor(t/r)+1;return s===1&&(n=Math.ceil(t/r)+1,(n-1)*r>=i+a&&(n-=1)),n}static adjustPadAndReturnShape(t,r,i,a,s,n,o,l,d=0){let f=i*(a-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return s[n]=0,s[o]=0,hr.computeOutputSize(t-f,r,t,0,d);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=(Math.floor((t+r-1)/r)-1)*r+a-t;return s[n]=Math.floor(l==="SAME_LOWER"?(c+1)/2:c/2),s[o]=c-s[n],hr.computeOutputSize(t+s[n]+s[o]-f,r,t,s[n],d)}default:throw new Error("Unsupported AutoPad type")}else return hr.computeOutputSize(t+s[n]+s[o]-f,r,t,s[n],d)}},Ih=class{static getShapeOfGemmResult(e,t,r,i,a){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,n,o;t?(s=e[1],n=e[0]):(s=e[0],n=e[1]);let l=-1;if(i?(o=r[0],l=1):(o=r[1],l=0),r[l]!==n)throw new Error("dimension mismatch");if(s<=0||o<=0||n<=0)throw new Error("invalid shape specified");if(a&&!$i.isValidBroadcast(a,[s,o]))throw new Error("gemm: invalid bias shape for broadcast");return[s,o,n]}},Ch=-34028234663852886e22,zh=34028234663852886e22}),Zu,Bh=X(()=>{"use strict";fe(),Zu=(e,t)=>new(Vn(t))(e)}),Oo,O0,Ro,R0,Mo,M0,Do,No,Uo,D0,jh,Ty=X(()=>{"use strict";fe(),rr(),Oo=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),O0=(e,t)=>{if(t==="int32")return e;let r=Oo.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let a=e.byteLength/i,s=new(Vn(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let n=new Int32Array(a);for(let o=0;o<a;o++){let l=s[o];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");n[o]=Number(l)}return new Uint8Array(n.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&s.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let n=Int32Array.from(s,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Ro=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let a=BigInt64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"uint64":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let a=BigUint64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"int8":{if(i.some(s=>s<-128||s>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let a=Int8Array.from(i,Number);return new Uint8Array(a.buffer)}case"uint8":{if(i.some(a=>a<0||a>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let a=Uint32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},R0=1,Mo=()=>R0++,M0=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Do=(e,t)=>{let r=Oo.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,a)=>i*a)*r/8):0},No=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:a,shape:s,fallbackDataType:n}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=a,this.tensorShape=s,this.fallbackDataType=n}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Do(this.dataType,this.tensorShape)}destroy(){Ce("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Ro(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return new Uint8Array(r).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,a)=>i===r[a])}setIsDataConverted(e){this.isDataConverted=e}},Uo=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let a=this.tensorManager.getMLContext(e),s=this.tensorManager.getMLOpSupportLimits(e),n;if(!s?.input.dataTypes.includes(t)){if(n=M0.get(t),!n||!s?.input.dataTypes.includes(n))throw new Error(`WebNN backend does not support data type: ${t}`);Ce("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${n}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==Do(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,o,!0,!0,n),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=O0(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else Ce("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Ro(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},D0=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Mo();return this.tensorTrackersById.set(e,new Uo(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,a){Ce("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${a}}`);let s=this.tensorTrackersById.get(t);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(e,r,i,a)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){Ce("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let a=this.getMLContext(e),s=Mo(),n=new No({sessionId:e,context:a,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(s,new Uo(this,n)),this.externalTensors.add(n),s}async getCachedTensor(e,t,r,i,a,s,n){let o=this.getMLContext(e);for(let[d,f]of this.freeTensors.entries())if(f.canReuseTensor(o,t,r)){Ce("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${n?`fallbackDataType: ${n},`:""} shape: ${r}`);let c=this.freeTensors.splice(d,1)[0];return c.sessionId=e,c}Ce("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${n?`fallbackDataType: ${n},`:""} shape: ${r}}`);let l=await o.createTensor({dataType:n??t,shape:r,dimensions:r,usage:i,writable:a,readable:s});return new No({sessionId:e,context:o,tensor:l,dataType:t,shape:r,fallbackDataType:n})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},jh=(...e)=>new D0(...e)}),da,N0,Oh,Sy=X(()=>{"use strict";fe(),Kr(),Bh(),Ty(),rr(),da=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),N0=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((a,s)=>a===i[s]&&e[a]===t[a])},Oh=class{constructor(e){this.tensorManager=jh(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,Xu(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){Ce("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){Ce("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)Ce("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>N0(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(a=>a.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){Ce("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,a){let s=da.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,s,i,a)}async createTemporaryTensor(e,t,r){Ce("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=da.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,i,r,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!Fe().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");Ce("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return Zu(r,t)}}registerMLTensor(e,t,r,i){let a=da.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(e,t,a,i);return Ce("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${i}} -> {tensorId: ${s}}`),s}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=da.get(Lr(t)),a=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!a?.input.dataTypes.includes(i):!!a?.output.dataTypes.includes(i)}flush(){}}}),Qu=X(()=>{"use strict"}),Po,kn,Tn,U0,P0,Lo,Tu,L0,Rh,Ey=X(()=>{"use strict";rr(),Qu(),Po=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),kn=[],Tn=e=>Math.ceil(Number(e)/16)*16,U0=e=>{for(let t=0;t<kn.length;t++){let r=kn[t];if(e<=r)return r}return Math.ceil(e/16)*16},P0=1,Lo=()=>P0++,Tu=async(e,t,r,i)=>{let a=Tn(r),s=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let n=e.getCommandEncoder();e.endComputePass(),n.copyBufferToBuffer(t,0,s,0,a),e.flush(),await s.mapAsync(GPUMapMode.READ);let o=s.getMappedRange();if(i){let l=i();return l.set(new Uint8Array(o,0,r)),l}else return new Uint8Array(o.slice(0,r))}finally{s.destroy()}},L0=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Po)kn.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,a=t.byteLength,s=Tn(a),n=this.storageCache.get(e);if(!n)throw new Error("gpu data for uploading does not exist");if(Number(n.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${n.originalSize}, data size=${a}`);if(s===a&&i%4===0)this.backend.device.queue.writeBuffer(n.gpuData.buffer,0,r,i,a);else{let o=new Uint8Array(s);o.set(t),this.backend.device.queue.writeBuffer(n.gpuData.buffer,0,o,0,s)}Ce("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=Tn(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,a)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return Ce("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=Lo();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),Ce("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),Ce("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=U0(e),i,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||s){let o=(a?this.freeBuffers:this.freeUniformBuffers).get(r);o?o.length>0?i=o.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let n={id:Lo(),type:0,buffer:i};return this.storageCache.set(n.id,{gpuData:n,originalSize:Number(e)}),Ce("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${n.id}`),n}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return Ce("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Tu(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Po.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(Ce("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Rh=(...e)=>new L0(...e)}),q0,je,Qe=X(()=>{"use strict";q0=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},je=e=>new q0(e)}),Ai,Sn,et,Je,le,Ze,Su,xi,mr,se,pa,q,ae,Mh,Yu,F0,Dh,ye=X(()=>{"use strict";fe(),ve(),Ai=64,Sn=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},et=(e,t=1)=>{let r=Sn(e,t);return typeof r=="string"?r:r[0]},Je=(e,t=1)=>{let r=Sn(e,t);return typeof r=="string"?r:r[1]},le=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:U.computeStrides(r)})}),t},Ze=e=>e%4===0?4:e%2===0?2:1,Su=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,xi=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,mr=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,se=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,pa=(e,t,r,i,a)=>{let s=typeof r=="number",n=s?r:r.length,o=[...new Array(n).keys()],l=n<2?"u32":n<=4?`vec${n}<u32>`:`array<u32, ${n}>`,d=Sn(t,a),f=typeof d=="string"?d:d[1],c=typeof d=="string"?d:d[0],h={indices:l,value:f,storage:c,tensor:t},y=G=>typeof G=="string"?G:`${G}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=s?"uniforms.":"",I=`${_}${e}_shape`,$=`${_}${e}_strides`,w="";for(let G=0;G<n-1;G++)w+=`
    let dim${G} = current / ${se($,G,n)};
    let rest${G} = current % ${se($,G,n)};
    indices[${G}] = dim${G};
    current = rest${G};
    `;w+=`indices[${n-1}] = current;`;let T=n<2?"":`
  fn o2i_${e}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${w}
    return indices;
  }`,E=G=>(g.offsetToIndices=!0,n<2?G:`o2i_${e}(${G})`),C=[];if(n>=2)for(let G=n-1;G>=0;G--)C.push(`${se($,G,n)} * (indices[${G}])`);let S=n<2?"":`
  fn i2o_${e}(indices: ${h.indices}) -> u32 {
    return ${C.join("+")};
  }`,R=G=>(g.indicesToOffset=!0,n<2?G:`i2o_${e}(${G})`),A=(...G)=>n===0?"0u":`${h.indices}(${G.map(y).join(",")})`,P=(G,oe)=>n<2?`${G}`:`${se(G,oe,n)}`,K=(G,oe,ee)=>n<2?`${G}=${ee};`:`${se(G,oe,n)}=${ee};`,Y={},L=(G,oe)=>{g.broadcastedIndicesToOffset=!0;let ee=`${oe.name}broadcastedIndicesTo${e}Offset`;if(ee in Y)return`${ee}(${G})`;let J=[];for(let Re=n-1;Re>=0;Re--){let Ue=oe.indicesGet("outputIndices",Re+oe.rank-n);J.push(`${P($,Re)} * (${Ue} % ${P(I,Re)})`)}return Y[ee]=`fn ${ee}(outputIndices: ${oe.type.indices}) -> u32 {
             return ${J.length>0?J.join("+"):"0u"};
           }`,`${ee}(${G})`},H=(G,oe)=>(()=>{if(h.storage===h.value)return`${e}[${G}]=${oe};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${e}[${G}]=vec2<u32>(u32(${oe}), select(0u, 0xFFFFFFFFu, ${oe} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${e}[${G}]=vec2<u32>(u32(${oe}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${e}[${G}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${oe}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),me=G=>(()=>{if(h.storage===h.value)return`${e}[${G}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${e}[${G}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${e}[${G}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${G}] & 0xFFu), bool(${e}[${G}] & 0xFF00u), bool(${e}[${G}] & 0xFF0000u), bool(${e}[${G}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),O=n<2?"":`
  fn get_${e}ByIndices(indices: ${h.indices}) -> ${f} {
    return ${me(`i2o_${e}(indices)`)};
  }`,W=n<2?"":(()=>{let G=o.map(ee=>`d${ee}: u32`).join(", "),oe=o.map(ee=>`d${ee}`).join(", ");return`
  fn get_${e}(${G}) -> ${f} {
    return get_${e}ByIndices(${A(oe)});
  }`})(),ue=(...G)=>{if(G.length!==n)throw new Error(`indices length must be ${n}`);let oe=G.map(y).join(",");return n===0?me("0u"):n===1?me(oe[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}(${oe})`)},ne=G=>n<2?me(G):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}ByIndices(${G})`),te=n<2?"":`
  fn set_${e}ByIndices(indices: ${h.indices}, value: ${f}) {
    ${H(`i2o_${e}(indices)`,"value")}
  }`,ie=n<2?"":(()=>{let G=o.map(ee=>`d${ee}: u32`).join(", "),oe=o.map(ee=>`d${ee}`).join(", ");return`
  fn set_${e}(${G}, value: ${f}) {
    set_${e}ByIndices(${A(oe)}, value);
  }`})();return{impl:()=>{let G=[],oe=!1;return g.offsetToIndices&&(G.push(T),oe=!0),g.indicesToOffset&&(G.push(S),oe=!0),g.broadcastedIndicesToOffset&&(Object.values(Y).forEach(ee=>G.push(ee)),oe=!0),g.set&&(G.push(ie),oe=!0),g.setByIndices&&(G.push(te),oe=!0),g.get&&(G.push(W),oe=!0),g.getByIndices&&(G.push(O),oe=!0),!s&&oe&&G.unshift(`const ${I} = ${h.indices}(${r.join(",")});`,`const ${$} = ${h.indices}(${U.computeStrides(r).join(",")});`),G.join(`
`)},type:h,offsetToIndices:E,indicesToOffset:R,broadcastedIndicesToOffset:L,indices:A,indicesGet:P,indicesSet:K,set:(...G)=>{if(G.length!==n+1)throw new Error(`indices length must be ${n}`);let oe=G[n];if(typeof oe!="string")throw new Error("value must be string");let ee=G.slice(0,n).map(y).join(",");return n===0?H("0u",oe):n===1?H(ee[0],oe):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}(${ee}, ${oe})`)},setByOffset:H,setByIndices:(G,oe)=>n<2?H(G,oe):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}ByIndices(${G}, ${oe});`),get:ue,getByOffset:me,getByIndices:ne,usage:i,name:e,strides:$,shape:I,rank:n}},q=(e,t,r,i=1)=>pa(e,t,r,"input",i),ae=(e,t,r,i=1)=>pa(e,t,r,"output",i),Mh=(e,t,r)=>pa(e,t,r,"atomicOutput",1),Yu=(e,t,r,i=1)=>pa(e,t,r,"internal",i),F0=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Ai){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,n=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${s}) {
    ${n}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let a=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Dh=(e,t)=>new F0(e,t)}),G0,qo,W0,V0,H0,K0,$t,Nh,Uh,gr=X(()=>{"use strict";fe(),ve(),Qe(),ye(),G0=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},qo=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),W0=(e,t)=>U.sortBasedOnPerm(e,qo(e.length,t)),V0=(e,t,r,i)=>{let a=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let s=0;s<t;++s)a+=`a[${e[s]}]=i[${s}];`;return a+="return a;}"},H0=(e,t)=>{let r=[],i=[];for(let a=0;a<e.length;++a)e[a]!==1&&r.push(e[a]),e[t[a]]!==1&&i.push(t[a]);return{newShape:r,newPerm:i}},K0=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},$t=(e,t)=>{let r=e.dataType,i=e.dims.length,a=qo(i,t),s=W0(e.dims,a),n=e.dims,o=s,l=i<2||K0(a,e.dims),d;if(l)return d=g=>{let _=q("input",r,n,4),I=ae("output",r,o,4);return`
  ${g.registerUniform("output_size","u32").declareVariables(_,I)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let g=U.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64/4)},programUniforms:[{type:12,data:Math.ceil(g/4)}]}},getShaderSource:d};let{newShape:f,newPerm:c}=H0(e.dims,a),h=U.areEqual(c,[2,3,1]),y=U.areEqual(c,[3,1,2]);if(f.length===2||h||y){n=h?[f[0],f[1]*f[2]]:y?[f[0]*f[1],f[2]]:f,o=[n[1],n[0]];let g=16;return d=_=>{let I=q("a",r,n.length),$=ae("output",r,o.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(I,$)}
  var<workgroup> tile : array<array<${$.type.value}, ${g+1}>, ${g}>;
  ${_.mainStart([g,g,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${g} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${g}u + local_id.x;
    let input_row = workgroup_id_x * ${g}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${I.getByIndices(`${I.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${g}u + local_id.x;
    let output_row = workgroup_id_y * ${g}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${$.setByIndices(`${$.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=U.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/g),y:Math.ceil(o[0]/g)},programUniforms:[{type:12,data:_},...le(n,o)]}},getShaderSource:d}}return d=g=>{let _=q("a",r,n.length),I=ae("output",r,o.length);return`
  ${g.registerUniform("output_size","u32").declareVariables(_,I)}

  ${V0(a,i,_,I)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${I.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${I.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let g=U.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...le(n,o)]}},getShaderSource:d}},Nh=(e,t)=>{G0(e.inputs,t.perm),e.compute($t(e.inputs[0],t.perm))},Uh=e=>je({perm:e.perm})}),X0,Z0,Q0,Y0,J0,ep,tp,rp,ip,ap,Rt,Ph,Lh,qh,Fh,Gh,Wh,Vh,Hh,Kh,Xh,Iy=X(()=>{"use strict";fe(),ve(),ye(),Ju(),gr(),X0={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Z0={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Q0={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Y0={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},J0=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},ep=(e,t)=>{let r=[],i=e.length;for(let s=0;s<i;s++)t.indexOf(s)===-1&&r.push(e[s]);let a=t.map(s=>e[s]);return[r,a]},tp=(e,t)=>{let r=e.length+t.length,i=[],a=0;for(let s=0;s<r;s++)t.indexOf(s)===-1?i.push(e[a++]):i.push(1);return i},rp=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},ip=(e,t)=>{let r=[];if(!rp(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},ap=(e,t,r,i,a,s,n)=>{let o=r[0].dims,l=U.size(s),d=U.size(n),f=q("_A",r[0].dataType,o),c=ae("output",a,s),h=64;l===1&&(h=256);let y=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,g=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(f,c)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Q0[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${X0[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Z0[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${i==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${Y0[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${h}`,inputDependencies:["type"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:l},programUniforms:[{type:12,data:d}]})}},Rt=(e,t,r,i)=>{let a=e.inputs.length===1?r:Eu(e.inputs,r),s=a.axes;s.length===0&&!a.noopWithEmptyAxes&&(s=e.inputs[0].dims.map((y,g)=>g));let n=U.normalizeAxes(s,e.inputs[0].dims.length),o=n,l=e.inputs[0],d=ip(o,e.inputs[0].dims.length);d.length>0&&(l=e.compute($t(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],o=J0(o.length,l.dims.length));let[f,c]=ep(l.dims,o),h=f;a.keepDims&&(h=tp(f,n)),e.compute(ap(t,a.cacheKey,[l],i,e.inputs[0].dataType,h,c),{inputs:[l]})},Ph=(e,t)=>{Rt(e,"ReduceMeanShared",t,"mean")},Lh=(e,t)=>{Rt(e,"ReduceL1Shared",t,"l1")},qh=(e,t)=>{Rt(e,"ReduceL2Shared",t,"l2")},Fh=(e,t)=>{Rt(e,"ReduceLogSumExpShared",t,"logSumExp")},Gh=(e,t)=>{Rt(e,"ReduceMaxShared",t,"max")},Wh=(e,t)=>{Rt(e,"ReduceMinShared",t,"min")},Vh=(e,t)=>{Rt(e,"ReduceProdShared",t,"prod")},Hh=(e,t)=>{Rt(e,"ReduceSumShared",t,"sum")},Kh=(e,t)=>{Rt(e,"ReduceSumSquareShared",t,"sumSquare")},Xh=(e,t)=>{Rt(e,"ReduceLogSumShared",t,"logSum")}}),Mt,np,qn,Eu,Dt,sp,op,up,lp,dp,pp,cp,fp,hp,mp,Nt,Zh,Qh,Yh,Jh,em,tm,rm,im,am,nm,Ju=X(()=>{"use strict";fe(),ve(),Qe(),ye(),Iy(),Mt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},np=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],qn=(e,t,r,i,a,s,n=!1,o=!1)=>{let l=[],d=r[0].dims,f=d.length,c=U.normalizeAxes(a,f),h=!o&&c.length===0;d.forEach((_,I)=>{h||c.indexOf(I)>=0?n&&l.push(1):l.push(_)});let y=l.length,g=U.size(l);return{name:e,shaderCache:t,getShaderSource:_=>{let I=[],$=q("_A",r[0].dataType,f),w=ae("output",s,y),T=i($,w,c),E=T[2];for(let C=0,S=0;C<f;C++)h||c.indexOf(C)>=0?(n&&S++,E=`for(var j${C}: u32 = 0; j${C} < ${d[C]}; j${C}++) {
                  ${T[2].includes("last_index")?`let last_index = j${C};`:""}
                  ${$.indicesSet("input_indices",C,`j${C}`)}
                  ${E}
                }`):(I.push(`${$.indicesSet("input_indices",C,w.indicesGet("output_indices",S))};`),S++);return`

        ${_.registerUniform("output_size","u32").declareVariables($,w)}

        ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${$.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${I.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${E}
          ${T[3]}
          ${T.length===4?w.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:s}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...le(d,l)]})}},Eu=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),je({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Dt=(e,t,r,i)=>{let a=e.inputs,s=a.length===1?r:Eu(a,r);e.compute(qn(t,{hint:s.cacheKey,inputDependencies:["rank"]},[a[0]],s.noopWithEmptyAxes&&s.axes.length===0?np:i,s.axes,a[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},sp=(e,t)=>{Mt(e.inputs),Dt(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},op=(e,t)=>{Mt(e.inputs),Dt(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},up=(e,t)=>{Mt(e.inputs),Dt(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},lp=(e,t)=>{Mt(e.inputs),Dt(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},dp=(e,t)=>{Mt(e.inputs),Dt(e,"ReduceMax",t,(r,i,a)=>{let s=[];for(let n=0;n<r.rank;n++)(a.indexOf(n)>=0||a.length===0)&&s.push(r.indicesSet("input_indices",n,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},pp=(e,t)=>{Mt(e.inputs),Dt(e,"ReduceMean",t,(r,i,a)=>{let s=1;for(let n=0;n<r.rank;n++)(a.indexOf(n)>=0||a.length===0)&&(s*=e.inputs[0].dims[n]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${s});`]})},cp=(e,t)=>{Mt(e.inputs),Dt(e,"ReduceMin",t,(r,i,a)=>{let s=[];for(let n=0;n<r.rank;n++)(a.indexOf(n)>=0||a.length===0)&&s.push(`input_indices[${n}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},fp=(e,t)=>{Mt(e.inputs),Dt(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},hp=(e,t)=>{Mt(e.inputs),Dt(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},mp=(e,t)=>{Mt(e.inputs),Dt(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Nt=(e,t,r)=>{if(t.length===0)return r;let i=1,a=1;for(let s=0;s<t.length;s++)t.indexOf(s)===-1?i*=e[s]:a*=e[s];return a<32&&i>1024},Zh=(e,t)=>{Nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?pp(e,t):Ph(e,t)},Qh=(e,t)=>{Nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?op(e,t):Lh(e,t)},Yh=(e,t)=>{Nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?up(e,t):qh(e,t)},Jh=(e,t)=>{Nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?lp(e,t):Fh(e,t)},em=(e,t)=>{Nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?dp(e,t):Gh(e,t)},tm=(e,t)=>{Nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?cp(e,t):Wh(e,t)},rm=(e,t)=>{Nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fp(e,t):Vh(e,t)},im=(e,t)=>{Nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hp(e,t):Hh(e,t)},am=(e,t)=>{Nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mp(e,t):Kh(e,t)},nm=(e,t)=>{Nt(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?sp(e,t):Xh(e,t)}}),Fo,sm,om,Iu,Cy=X(()=>{"use strict";fe(),Qe(),Ju(),Fo=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},sm=(e,t)=>{Fo(e.inputs);let r=(i,a,s)=>{let n=[];for(let o=0;o<i.rank;o++)(s.indexOf(o)>=0||s.length===0)&&n.push(`input_indices[${o}] = 0;`);return[`${n.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(qn("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},om=(e,t)=>{Fo(e.inputs);let r=(i,a,s)=>{let n=[];for(let o=0;o<i.rank;o++)(s.indexOf(o)>=0||s.length===0)&&n.push(`input_indices[${o}] = 0;`);return[`${n.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(qn("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Iu=e=>je(e)}),gp,En,vp,bp,yp,Aa,wp,um,el=X(()=>{"use strict";fe(),ve(),Qu(),ye(),gp=(e,t)=>{let r=e[0],i=e[1],a=e[2],s=e[3],n=e[4],o=e[5];if(n&&o)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],d=r.dims[1],f=r.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=a.dims[0]/3,h=c,y=h;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],y=t.qkvHiddenSizes[2]}let g=d;if(c!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==c+h+y)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(n){if(h!==y)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(n.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(n.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(n.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(n.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(n.dims[4]!==h/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(_=n.dims[3])}let I=g+_,$=-1,w=0;if(s)throw new Error("Mask not supported");if(n)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==l||o.dims[1]!==t.numHeads||o.dims[2]!==d||o.dims[3]!==I)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:_,kvSequenceLength:g,totalSequenceLength:I,maxSequenceLength:$,inputHiddenSize:f,hiddenSize:c,vHiddenSize:y,headSize:Math.floor(c/t.numHeads),vHeadSize:Math.floor(y/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},En=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,vp=(e,t,r,i,a,s,n,o)=>{let l=Ze(n?1:s),d=64,f=s/l;f<d&&(d=32);let c=Math.ceil(s/l/d),h=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:f},{type:12,data:c}],y=et(e.dataType,l),g=Je(1,l),_=["type"];n&&_.push("type"),o&&_.push("type");let I=$=>{let w=ae("x",e.dataType,e.dims,l),T=[w],E=n?q("seq_lens",n.dataType,n.dims):void 0;E&&T.push(E);let C=o?q("total_sequence_length_input",o.dataType,o.dims):void 0;C&&T.push(C);let S=Je(e.dataType),R=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${$.registerUniforms(R).declareVariables(...T)}
  ${$.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${En(E,C,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${n?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${g}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${g}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${g}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${g}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${S}(1.0) / ${S}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${g}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${n?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${S}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${y};${l}`,inputDependencies:_},getShaderSource:I,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*r},programUniforms:h})}},bp=(e,t,r,i,a,s,n,o,l)=>{let d=n+s.kvSequenceLength,f=[s.batchSize,s.numHeads,s.sequenceLength,d],c=e>1&&i,h=s.kvNumHeads?s.kvNumHeads:s.numHeads,y=c?[s.batchSize,h,d,s.headSize]:void 0,g=s.nReps?s.nReps:1,_=s.scale===0?1/Math.sqrt(s.headSize):s.scale,I=Ze(s.headSize),$=s.headSize/I,w=12,T={x:Math.ceil(d/w),y:Math.ceil(s.sequenceLength/w),z:s.batchSize*s.numHeads},E=[{type:12,data:s.sequenceLength},{type:12,data:$},{type:12,data:d},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:_},{type:12,data:n},{type:12,data:s.kvSequenceLength},{type:12,data:g}],C=c&&i&&U.size(i.dims)>0,S=["type","type"];C&&S.push("type"),a&&S.push("type"),o&&S.push("type"),l&&S.push("type");let R=[{dims:f,dataType:t.dataType,gpuDataType:0}];c&&R.push({dims:y,dataType:t.dataType,gpuDataType:0});let A=P=>{let K=q("q",t.dataType,t.dims,I),Y=q("key",r.dataType,r.dims,I),L=[K,Y];if(C){let te=q("past_key",i.dataType,i.dims,I);L.push(te)}a&&L.push(q("attention_bias",a.dataType,a.dims));let H=o?q("seq_lens",o.dataType,o.dims):void 0;H&&L.push(H);let me=l?q("total_sequence_length_input",l.dataType,l.dims):void 0;me&&L.push(me);let O=ae("output",t.dataType,f),W=[O];c&&W.push(ae("present_key",t.dataType,y,I));let ue=Je(1,I),ne=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${K.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${K.type.storage}, ${w*w}>;
  ${P.registerUniforms(ne).declareVariables(...L,...W)}
  ${P.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${g===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${g===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${En(H,me,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${C&&c?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${c?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${ue}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${C&&c?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${c?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${ue}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(I){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${I}`)}})()};
        output[outputIdx] = ${O.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${I};${a!==void 0};${i!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:R,dispatchGroup:T,programUniforms:E}),getShaderSource:A}},yp=(e,t,r,i,a,s,n=void 0,o=void 0)=>{let l=s+a.kvSequenceLength,d=a.nReps?a.nReps:1,f=a.vHiddenSize*d,c=e>1&&i,h=a.kvNumHeads?a.kvNumHeads:a.numHeads,y=c?[a.batchSize,h,l,a.headSize]:void 0,g=[a.batchSize,a.sequenceLength,f],_=12,I={x:Math.ceil(a.vHeadSize/_),y:Math.ceil(a.sequenceLength/_),z:a.batchSize*a.numHeads},$=[{type:12,data:a.sequenceLength},{type:12,data:l},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:f},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:d}],w=c&&i&&U.size(i.dims)>0,T=["type","type"];w&&T.push("type"),n&&T.push("type"),o&&T.push("type");let E=[{dims:g,dataType:t.dataType,gpuDataType:0}];c&&E.push({dims:y,dataType:t.dataType,gpuDataType:0});let C=S=>{let R=q("probs",t.dataType,t.dims),A=q("v",r.dataType,r.dims),P=[R,A];w&&P.push(q("past_value",i.dataType,i.dims));let K=n?q("seq_lens",n.dataType,n.dims):void 0;n&&P.push(K);let Y=o?q("total_sequence_length_input",o.dataType,o.dims):void 0;o&&P.push(Y);let L=[ae("output",t.dataType,g)];c&&L.push(ae("present_value",t.dataType,y));let H=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${R.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${R.type.value}, ${_*_}>;
  ${S.registerUniforms(H).declareVariables(...P,...L)}
  ${S.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${En(K,Y,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&c?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${c?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${R.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&c?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${c?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:E,dispatchGroup:I,programUniforms:$}),getShaderSource:C}},Aa=(e,t,r,i,a,s,n,o,l,d,f=void 0,c=void 0)=>{let h=Math.min(e.outputCount,1+(n?1:0)+(o?1:0)),y=h>1?n:void 0,g=h>1?o:void 0,_=h>1?d.pastSequenceLength:0,I=_+d.kvSequenceLength,$=l&&U.size(l.dims)>0?l:void 0,w=[t,r];y&&U.size(y.dims)>0&&w.push(y),$&&w.push($),f&&w.push(f),c&&w.push(c);let T=e.compute(bp(h,t,r,y,$,d,_,f,c),{inputs:w,outputs:h>1?[-1,1]:[-1]})[0];e.compute(vp(T,d.batchSize,d.numHeads,_,d.sequenceLength,I,f,c),{inputs:f&&c?[T,f,c]:[T],outputs:[]});let E=[T,i];g&&U.size(g.dims)>0&&E.push(g),f&&E.push(f),c&&E.push(c),e.compute(yp(h,T,i,g,d,_,f,c),{inputs:E,outputs:h>1?[0,2]:[0]})},wp=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,a=t.inputHiddenSize,s=t.headSize,n=12,o={x:Math.ceil(t.headSize/n),y:Math.ceil(t.sequenceLength/n),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:i},{type:12,data:a},{type:12,data:s},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],f=c=>{let h=ae("output_q",l[0].dataType,r),y=ae("output_k",l[0].dataType,r),g=ae("output_v",l[0].dataType,r),_=q("input",l[0].dataType,l[0].dims),I=q("weight",l[1].dataType,l[1].dims),$=q("bias",l[2].dataType,l[2].dims),w=_.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${n}u;
  var<workgroup> tileInput: array<${w}, ${n*n}>;
  var<workgroup> tileWeightQ: array<${w}, ${n*n}>;
  var<workgroup> tileWeightK: array<${w}, ${n*n}>;
  var<workgroup> tileWeightV: array<${w}, ${n*n}>;
  ${c.registerUniforms(T).declareVariables(_,I,$,h,y,g)}
  ${c.mainStart([n,n,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:d}),getShaderSource:f},{inputs:l,outputs:[-1,-1,-1]})},um=(e,t)=>{let r=gp(e.inputs,t),[i,a,s]=wp(e,r);return Aa(e,i,a,s,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),_p,xp,$p,lm,zy=X(()=>{"use strict";It(),fe(),ve(),Qe(),ye(),_p=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,a,s)=>{let n=a.length;if(n!==i.length)throw new Error(`${s}: num dimensions != ${n}`);a.forEach((o,l)=>{if(o!==i[l])throw new Error(`${s}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},xp=(e,t)=>{let{epsilon:r,spatial:i,format:a}=t,s=e[0].dims,n=i?Ze(s[s.length-1]):1,o=a==="NHWC"&&s.length>1?n:1,l=U.size(s)/n,d=i,f=d?s.length:s,c=q("x",e[0].dataType,e[0].dims,n),h=q("scale",e[1].dataType,e[1].dims,o),y=q("bias",e[2].dataType,e[2].dims,o),g=q("inputMean",e[3].dataType,e[3].dims,o),_=q("inputVar",e[4].dataType,e[4].dims,o),I=ae("y",e[0].dataType,f,n),$=()=>{let T="";if(i)T=`let cOffset = ${s.length===1?"0u":a==="NHWC"?`outputIndices[${s.length-1}] / ${n}`:"outputIndices[1]"};`;else if(a==="NCHW")T=`
            ${I.indicesSet("outputIndices","0","0")}
            let cOffset = ${I.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let E=1;E<h.rank;E++)T+=`cIndices[${E}] = outputIndices[${E}];`;T+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return T},w=T=>`
  const epsilon = ${r};
  ${T.registerUniform("outputSize","u32").declareVariables(c,h,y,g,_,I)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${I.offsetToIndices(`global_idx * ${n}`)};
    ${$()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${y.getByOffset("cOffset")};
    let inputMean = ${g.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${I.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${n}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d?[{type:12,data:l},...le(s)]:[{type:12,data:l}]})}},$p=e=>je(e),lm=(e,t)=>{let{inputs:r,outputCount:i}=e,a=$p({...t,outputCount:i});if(Ve.webgpu.validateInputContent&&_p(r,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(xp(r,a))}}),Ap,kp,dm,By=X(()=>{"use strict";ve(),ye(),Ap=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},kp=e=>{let t=e[0].dims,r=e[0].dims[2],i=U.size(t)/4,a=e[0].dataType,s=q("input",a,t,4),n=q("bias",a,[r],4),o=q("residual",a,t,4),l=ae("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const channels = ${r}u / 4;
  ${d.declareVariables(s,n,o,l)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${s.getByOffset("global_idx")}
      + ${n.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},dm=e=>{Ap(e.inputs),e.compute(kp(e.inputs))}}),Tp,Be,pm,cm,fm,hm,mm,gm,vm,bm,ym,Sp,wm,_m,xm,$m,wa,Am,Dn,km,Tm,Sm,Em,Im,Cm,zm,Bm,jm,Om,Rm,Mm,Dm,Nm,Um,Pm,Lm,Go,qm,Cu,zu,Fm,Gm,Wm,Ep,Ip,Vm,tl=X(()=>{"use strict";fe(),ve(),Qe(),ye(),Tp=(e,t,r,i,a,s,n)=>{let o=Math.ceil(t/4),l="";typeof a=="string"?l=`${a}(a)`:l=a("a");let d=q("inputData",r,[o],4),f=ae("outputData",i,[o],4),c=[{name:"vec_size",type:"u32"}];return n&&c.push(...n),`
      ${e.registerUniforms(c).declareVariables(d,f)}

  ${s??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",l)}
  }`},Be=(e,t,r,i,a,s=e.dataType,n,o)=>{let l=[{type:12,data:Math.ceil(U.size(e.dims)/4)}];return n&&l.push(...n),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:d=>Tp(d,U.size(e.dims),e.dataType,s,r,i,o),getRunData:d=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(U.size(d[0].dims)/64/4)},programUniforms:l})}},pm=e=>{e.compute(Be(e.inputs[0],"Abs","abs"))},cm=e=>{e.compute(Be(e.inputs[0],"Acos","acos"))},fm=e=>{e.compute(Be(e.inputs[0],"Acosh","acosh"))},hm=e=>{e.compute(Be(e.inputs[0],"Asin","asin"))},mm=e=>{e.compute(Be(e.inputs[0],"Asinh","asinh"))},gm=e=>{e.compute(Be(e.inputs[0],"Atan","atan"))},vm=e=>{e.compute(Be(e.inputs[0],"Atanh","atanh"))},bm=e=>je(e),ym=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(Be(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Sp=e=>{let t,r,i=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return je({min:t,max:r})},wm=(e,t)=>{let r=t||Sp(e.inputs),i=Je(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},_m=e=>{e.compute(Be(e.inputs[0],"Ceil","ceil"))},xm=e=>{e.compute(Be(e.inputs[0],"Cos","cos"))},$m=e=>{e.compute(Be(e.inputs[0],"Cosh","cosh"))},wa=e=>je(e),Am=(e,t)=>{let r=Je(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Dn=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,km=e=>{let t=Je(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Dn(t)))},Tm=e=>{e.compute(Be(e.inputs[0],"Exp","exp"))},Sm=e=>{e.compute(Be(e.inputs[0],"Floor","floor"))},Em=e=>{let t=Je(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Dn(t)))},Im=(e,t)=>{let r=Je(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Cm=e=>{e.compute(Be(e.inputs[0],"Not",t=>`!${t}`))},zm=e=>{e.compute(Be(e.inputs[0],"Neg",t=>`-${t}`))},Bm=e=>{e.compute(Be(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},jm=e=>{let t=Je(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Om=e=>{e.compute(Be(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Rm=e=>je(e),Mm=(e,t)=>{let r=Je(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Dm=e=>{let t=Je(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"HardSwish",r=>`${r} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${r} + vec4<${t}>(0.5)))`))},Nm=e=>{e.compute(Be(e.inputs[0],"Sin","sin"))},Um=e=>{e.compute(Be(e.inputs[0],"Sinh","sinh"))},Pm=e=>{e.compute(Be(e.inputs[0],"Sqrt","sqrt"))},Lm=e=>{e.compute(Be(e.inputs[0],"Tan","tan"))},Go=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,qm=e=>{e.compute(Be(e.inputs[0],"Tanh",Go))},Cu=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Go("v")};
}
`,zu=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Fm=e=>{let t=Je(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"FastGelu",zu,Cu(t),void 0,e.inputs[0].dataType))},Gm=(e,t)=>{let r=Je(e.inputs[0].dataType);return e.compute(Be(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Wm=e=>{e.compute(Be(e.inputs[0],"Log","log"))},Ep=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Ip=e=>`quick_gelu_impl(${e})`,Vm=(e,t)=>{let r=Je(e.inputs[0].dataType);e.compute(Be(e.inputs[0],"QuickGelu",Ip,Ep(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Cp,zp,Hm,jy=X(()=>{"use strict";ve(),ye(),tl(),Cp=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},zp=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=q("input",e[0].dataType,e[0].dims,4),i=q("bias",e[0].dataType,[e[0].dims[2]],4),a=ae("output",e[0].dataType,t,4),s=U.size(t)/4,n=et(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(r,i,a)}

  ${Dn(n)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Hm=e=>{Cp(e.inputs),e.compute(zp(e.inputs))}}),Bp,jp,Ut,Km,Xm,Zm,Qm,Ym,Jm,eg,tg,rg,ig,Oy=X(()=>{"use strict";fe(),ve(),ye(),Bp=(e,t,r,i,a,s,n,o,l,d,f,c)=>{let h,y;typeof o=="string"?h=y=(w,T)=>`${o}((${w}),(${T}))`:typeof o=="function"?h=y=o:(h=o.scalar,y=o.vector);let g=ae("outputData",f,i.length,4),_=q("aData",l,t.length,4),I=q("bData",d,r.length,4),$;if(a)if(s){let w=U.size(t)===1,T=U.size(r)===1,E=t.length>0&&t[t.length-1]%4===0,C=r.length>0&&r[r.length-1]%4===0;w||T?$=g.setByOffset("global_idx",y(w?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),T?`${I.type.value}(${I.getByOffset("0")}.x)`:I.getByOffset("global_idx"))):$=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${I.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",y(n||E?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,n||C?I.getByOffset("offsetB / 4u"):`${I.type.value}(${I.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=g.setByOffset("global_idx",y(_.getByOffset("global_idx"),I.getByOffset("global_idx")));else{if(!s)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(T,E,C="")=>{let S=`aData[indexA${E}][componentA${E}]`,R=`bData[indexB${E}][componentB${E}]`;return`
            let outputIndices${E} = ${g.offsetToIndices(`global_idx * 4u + ${E}u`)};
            let offsetA${E} = ${_.broadcastedIndicesToOffset(`outputIndices${E}`,g)};
            let offsetB${E} = ${I.broadcastedIndicesToOffset(`outputIndices${E}`,g)};
            let indexA${E} = offsetA${E} / 4u;
            let indexB${E} = offsetB${E} / 4u;
            let componentA${E} = offsetA${E} % 4u;
            let componentB${E} = offsetB${E} % 4u;
            ${T}[${E}] = ${C}(${h(S,R)});
          `};f===9?$=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:$=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(_,I,g)}

        ${c??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},jp=(e,t,r,i,a,s,n=r.dataType)=>{let o=r.dims.map(Number),l=i.dims.map(Number),d=!U.areEqual(o,l),f=o,c=U.size(o),h=!1,y=!1,g=[d];if(d){let _=$i.calcShape(o,l,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");f=_.slice(),c=U.size(f);let I=U.size(o)===1,$=U.size(l)===1,w=o.length>0&&o[o.length-1]%4===0,T=l.length>0&&l[l.length-1]%4===0;g.push(I),g.push($),g.push(w),g.push(T);let E=1;for(let C=1;C<f.length;C++){let S=o[o.length-C],R=l[l.length-C];if(S===R)E*=S;else break}E%4===0?(y=!0,h=!0):(I||$||w||T)&&(h=!0)}else h=!0;return g.push(h),{name:e,shaderCache:{hint:t+g.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>Bp(_,o,l,f,h,d,y,a,r.dataType,i.dataType,n,s),getRunData:()=>({outputs:[{dims:f,dataType:n}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(U.size(f)/4)},...le(o,l,f)]})}},Ut=(e,t,r,i,a,s)=>{e.compute(jp(t,a??"",e.inputs[0],e.inputs[1],r,i,s))},Km=e=>{Ut(e,"Add",(t,r)=>`${t}+${r}`)},Xm=e=>{Ut(e,"Div",(t,r)=>`${t}/${r}`)},Zm=e=>{Ut(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Qm=e=>{Ut(e,"Mul",(t,r)=>`${t}*${r}`)},Ym=e=>{let t=q("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ut(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Jm=e=>{Ut(e,"Sub",(t,r)=>`${t}-${r}`)},eg=e=>{Ut(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},tg=e=>{Ut(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},rg=e=>{Ut(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},ig=e=>{Ut(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Op,Rp,Mp,Dp,ag,ng,Ry=X(()=>{"use strict";fe(),ve(),Qe(),ye(),Op=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],a=i.dataType,s=i.dims.length;e.forEach((n,o)=>{if(o!==r){if(n.dataType!==a)throw new Error("input tensors should be one type");if(n.dims.length!==s)throw new Error("input tensors should have the same shape");n.dims.forEach((l,d)=>{if(d!==t&&l!==i.dims[d])throw new Error("non concat dimensions must match")})}})},Rp=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Mp=(e,t)=>{let r=e.length,i=[];for(let a=0;a<r;++a){let s=t.setByOffset("global_idx",e[a].getByIndices("indices"));r===1?i.push(s):a===0?i.push(`if (inputIndex == ${a}u) { ${s} }`):a===r-1?i.push(`else { ${s} }`):i.push(`else if (inputIndex == ${a}) { ${s} }`)}return i.join(`
`)},Dp=(e,t,r,i)=>{let a=U.size(r),s=new Array(e.length),n=new Array(e.length),o=0,l=[],d=[],f=[{type:12,data:a}];for(let _=0;_<e.length;++_)o+=e[_].dims[t],s[_]=o,d.push(e[_].dims.length),n[_]=q(`input${_}`,i,d[_]),l.push("rank"),f.push({type:12,data:s[_]});for(let _=0;_<e.length;++_)f.push(...le(e[_].dims));f.push(...le(r));let c=ae("output",i,r.length),h=c.indicesGet("indices",t),y=Array.from(Array(s.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),g=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let I=0;I<e.length;I++)_.registerUniform(`sizeInConcatAxis${I}`,"u32");return _.declareVariables(...n,c)})()}

  ${Rp(s.length,y)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${y});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Mp(n,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:f}),getShaderSource:g}},ag=(e,t)=>{let r=e.inputs,i=r[0].dims,a=U.normalizeAxis(t.axis,i.length);Op(r,a);let s=i.slice();s[a]=r.reduce((o,l)=>o+(l.dims.length>a?l.dims[a]:0),0);let n=r.filter(o=>U.size(o.dims)>0);e.compute(Dp(n,a,s,r[0].dataType),{inputs:n})},ng=e=>je({axis:e.axis})}),Wr,Vr,Hr,rl,Xr=X(()=>{"use strict";fe(),ve(),Wr=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Vr=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Hr=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},rl=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[Ch,zh];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),it,sg,il=X(()=>{"use strict";it=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},sg=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),og,My=X(()=>{"use strict";og=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),xa,al,nl=X(()=>{"use strict";fe(),ve(),ye(),Xr(),xa=(e,t,r,i,a)=>{let s=i-r;return`
      ${Array.from({length:r}).map((n,o)=>`
      if (${se(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,se(a,o+s,i))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},al=(e,t,r,i,a=!1,s)=>{let n=e[0].dims,o=e[1].dims,l=n[n.length-2],d=o[o.length-1],f=n[n.length-1],c=Ze(d),h=Ze(f),y=Ze(l),g=U.size(r)/c/y,_=e.length>2,I=i?i.slice(0,-2):r.slice(0,-2),$=[U.size(I),l,d],w=[{type:12,data:g},{type:12,data:l},{type:12,data:d},{type:12,data:f}];Vr(t,w),w.push(...le(I,n,o)),_&&w.push(...le(e[2].dims)),w.push(...le($));let T=E=>{let C=Yu("batch_dims",e[0].dataType,I.length),S=q("a",e[0].dataType,n.length,h),R=q("b",e[1].dataType,o.length,c),A=ae("output",e[0].dataType,$.length,c),P=et(A.type.tensor),K=Wr(t,A.type.value,P),Y=[S,R],L="";if(_){let O=a?c:1;Y.push(q("bias",e[2].dataType,e[2].dims.length,O)),L=`${a?`value += bias[col / ${O}];`:`value += ${A.type.value}(bias[row + i]);`}`}let H=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Hr(t,H);let me=()=>{let O=`var a_data: ${S.type.value};`;for(let W=0;W<h;W++)O+=`
              let b_data${W} = b[(b_offset + (k + ${W}) * uniforms.N + col) / ${c}];`;for(let W=0;W<y;W++){O+=`a_data = a[(a_offset + (row + ${W}) * uniforms.K + k) / ${h}];`;for(let ue=0;ue<h;ue++)O+=`
            values[${W}] = fma(${R.type.value}(a_data${h===1?"":`[${ue}]`}), b_data${ue}, values[${W}]);
`}return O};return`
  ${E.registerUniforms(H).registerInternalVariables(C).declareVariables(...Y,A)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${y};
    let row = (index1 % stride1) * ${y};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${C.offsetToIndices("batch")};`}

    var a_indices: ${S.type.indices};
    ${xa("a_indices",S,S.rank-2,C.rank,"batch_indices")}
    ${S.indicesSet("a_indices",S.rank-2,0)}
    ${S.indicesSet("a_indices",S.rank-1,0)}
    let a_offset = ${S.indicesToOffset("a_indices")};

    var b_indices: ${R.type.indices};
    ${xa("b_indices",R,R.rank-2,C.rank,"batch_indices")}
    ${R.indicesSet("b_indices",R.rank-2,0)}
    ${R.indicesSet("b_indices",R.rank-1,0)}
    let b_offset = ${R.indicesToOffset("b_indices")};
    var values: array<${A.type.value}, ${y}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${me()}
    }
    for (var i = 0u; i < ${y}u; i++) {
      var value = values[i];
      ${L}
      ${K}
      let cur_indices = ${A.type.indices}(batch, row + i, col);
      let offset = ${A.indicesToOffset("cur_indices")};
      ${A.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${c};${h};${y};${a}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:w}),getShaderSource:T}}}),Np,Up,Bu,Wo,Pp,ju,Lp,Fn,sl=X(()=>{"use strict";fe(),ve(),ye(),Xr(),nl(),il(),Np=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Up=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Bu=(e,t,r="f32",i,a=!1,s=32,n=!1,o=32)=>{let l=t[1]*e[1],d=t[0]*e[0],f=a?l:s,c=a?s:l,h=f/t[0],y=s/t[1];if(!((a&&h===4&&e[1]===4||!a&&(h===3||h===4))&&f%t[0]===0&&s%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${h} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${r}>, ${f/h}>, ${c}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${d/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${h};
const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${n?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${n?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${n?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Np(a,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${h===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Up(a,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Wo=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Pp=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",ju=(e,t,r="f32",i,a=!1,s=32,n=!1,o=32,l=!1)=>{let d=e[1]*t[1],f=e[0]*t[0],c=a?d:s,h=a?s:d;if(!(h%t[1]===0&&c%t[0]===0&&s%t[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let y=h/t[1],g=c/t[0],_=s/t[1],I=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          ${Wo(a,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${y};
let tileColA = i32(localId.x) * ${g};
let tileRowB = i32(localId.y) * ${_};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${g}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Wo(a,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Pp(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${c}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${f}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${n?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${n?`${Math.ceil(o/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${n?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${I}
  }
`},Lp=(e,t,r,i,a=!1)=>{let[s,n,o,l]=i,d=et(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${it(e,d)} {
      var value = ${it(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${n.type.indices};
        ${xa("aIndices",n,n.rank-2,s.rank,"batchIndices")}
        ${n.indicesSet("aIndices",n.rank-2,"u32(row)")}
        ${n.indicesSet("aIndices",n.rank-1,"u32(colIn)")}
        value = ${n.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${it(e,d)} {
      var value = ${it(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${xa("bIndices",o,o.rank-2,s.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${it(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${it(e,d)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Fn=(e,t,r,i,a=!1,s)=>{let n=e[0].dims,o=e[1].dims,l=n.slice(0,-2),d=o.slice(0,-2),f=i?i.slice(0,-2):r.slice(0,-2),c=U.size(f),h=n[n.length-2],y=n[n.length-1],g=o[o.length-1],_=y%4===0&&g%4===0,I=h<=8?[4,1,1]:[4,4,1],$=[8,8,1],w=[Math.ceil(g/$[0]/I[0]),Math.ceil(h/$[1]/I[1]),Math.ceil(c/$[2]/I[2])],T=_?4:1,E=[...l,h,y/T],C=E.length,S=[...d,y,g/T],R=S.length,A=[c,h,g/T],P=[{type:6,data:h},{type:6,data:g},{type:6,data:y}];Vr(t,P),P.push(...le(f,E,S));let K=["rank","rank"],Y=e.length>2;Y&&(P.push(...le(e[2].dims)),K.push("rank")),P.push(...le(A));let L=H=>{let me=f.length,O=Yu("batchDims",e[0].dataType,me,1),W=et(e[0].dataType),ue=q("a",e[0].dataType,C,T),ne=q("b",e[1].dataType,R,T),te=ae("result",e[0].dataType,A.length,T),ie=[ue,ne];if(Y){let Re=a?T:1;ie.push(q("bias",e[2].dataType,e[2].dims.length,Re))}let G=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Hr(t,G);let oe=et(te.type.tensor),ee=Wr(t,te.type.value,oe),J=Lp(T,Y,ee,[O,ue,ne,te],a);return`
  ${H.registerUniforms(G).registerInternalVariables(O).declareVariables(...ie,te)}
  ${J}
  ${_?Bu(I,$,W,O):ju(I,$,W,O)}
                   `};return{name:"MatMul",shaderCache:{hint:`${I};${t.activation};${_};${a}`,inputDependencies:K},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:P}),getShaderSource:L}}}),qp,ug,Dy=X(()=>{"use strict";fe(),rr(),ye(),Xr(),il(),My(),sl(),qp=(e,t,r,i,a=!1,s,n=4,o=4,l=4,d="f32")=>{let f=P=>{switch(P){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},c=P=>{switch(P){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},h=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,y=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,g=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",I=e?"row":"col",$=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${I} / outWidth;
    let outCol = ${I} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${it(n,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${g} && xCol >= 0 && xCol < ${_}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(n)}
    }
    return resData;`,T=e?t&&i?`
    let col = colIn * ${n};
    ${w}`:`
    let col = colIn * ${n};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${it(n,d)}(0.0);`:i&&r?`
    let col = colIn * ${n};
    ${w}`:`
    let col = colIn * ${n};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${it(n,d)}(0.0);`,E=e?i&&r?c(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${c(o)}
    }
    return ${it(o,d)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${c(o)}
    }
    return ${it(o,d)}(0.0);`,C=it(l,d),S=it(e?n:o,d),R=it(e?o:n,d),A=Wr(s,C,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${S} {
      ${e?T:E}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${R} {
      ${e?E:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${C}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${y}
      ${sg(a)}
      ${A}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},ug=(e,t,r,i,a,s,n,o,l)=>{let d=t.format==="NHWC",f=d?e[0].dims[3]:e[0].dims[1],c=r[0],h=d?r[2]:r[3],y=d?r[1]:r[2],g=d?r[3]:r[1],_=d&&(f%4===0||f%3===0)&&g%4===0,I=d?g:h*y,$=d?h*y:g,w=[8,8,1],T=i<=8?[4,1,1]:[4,4,1],E=[Math.ceil(I/w[0]/T[0]),Math.ceil($/w[1]/T[1]),Math.ceil(c/w[2]/T[2])];Ce("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${E}`);let C=_?d&&f%4!==0?3:4:1,S=w[1]*T[1],R=w[0]*T[0],A=Math.max(w[0]*C,w[1]),P=i%S===0,K=a%R===0,Y=s%A===0,L=_?[C,4,4]:[1,1,1],H=[{type:6,data:i},{type:6,data:a},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Vr(t,H),H.push(...le(e[0].dims,e[1].dims));let me=["rank","rank"];n&&(H.push(...le(e[2].dims)),me.push("rank")),H.push(...le(r));let O=W=>{let ue=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Hr(t,ue);let ne=_?4:1,te=et(e[0].dataType),ie=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${te}>`:te}) {
        result[flatIndex] = ${_?`vec4<${te}>`:te}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${te}>`:te}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,G=q("x",e[0].dataType,e[0].dims.length,C===3?1:C),oe=q("w",e[1].dataType,e[1].dims.length,ne),ee=[G,oe],J=ae("result",e[0].dataType,r.length,ne);if(n){let Re=q("bias",e[2].dataType,e[2].dims.length,ne);ee.push(Re),ie+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${te}>`:te} {
          return bias[coords.${d?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${og("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${W.registerUniforms(ue).declareVariables(...ee,J)}
        ${ie}
        ${qp(d,P,K,Y,n,t,L[0],L[1],L[2],te)}
        ${_?Bu(T,w,te,void 0,!d,A):ju(T,w,te,void 0,!d,A,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${C};${_};${P};${K};${Y};${S};${R};${A}`,inputDependencies:me},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:E[0],y:E[1],z:E[2]},programUniforms:H}),getShaderSource:O}}}),Fp,Vo,ca,Gp,Ho,Wp,lg,dg,Ny=X(()=>{"use strict";fe(),rr(),ve(),ye(),Xr(),il(),Fp=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Vo=e=>typeof e=="number"?[e,e,e]:e,ca=(e,t)=>t<=1?e:e+(e-1)*(t-1),Gp=(e,t,r,i=1)=>{let a=ca(t,i);return Math.floor((e[0]*(r-1)-r+a)/2)},Ho=(e,t,r,i,a)=>{a==null&&(a=Gp(e,t[0],i[0]));let s=[0,0,0,r];for(let n=0;n<3;n++)e[n]+2*a>=t[n]&&(s[n]=Math.trunc((e[n]-t[n]+2*a)/i[n]+1));return s},Wp=(e,t,r,i,a,s,n,o,l,d)=>{let f,c,h,y;if(e==="VALID"&&(e=0),typeof e=="number"){f={top:e,bottom:e,left:e,right:e,front:e,back:e};let g=Ho([t,r,i,1],[o,l,d],1,[a,s,n],e);c=g[0],h=g[1],y=g[2]}else if(Array.isArray(e)){if(!e.every((_,I,$)=>_===$[0]))throw Error(`Unsupported padding parameter: ${e}`);f={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let g=Ho([t,r,i,1],[o,l,d],1,[a,s,n],e[0]);c=g[0],h=g[1],y=g[2]}else if(e==="SAME_UPPER"){c=Math.ceil(t/a),h=Math.ceil(r/s),y=Math.ceil(i/n);let g=(c-1)*a+o-t,_=(h-1)*s+l-r,I=(y-1)*n+d-i,$=Math.floor(g/2),w=g-$,T=Math.floor(_/2),E=_-T,C=Math.floor(I/2),S=I-C;f={top:T,bottom:E,left:C,right:S,front:$,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:f,outDepth:c,outHeight:h,outWidth:y}},lg=(e,t,r,i,a,s=!1,n="channelsLast")=>{let o,l,d,f,c;if(n==="channelsLast")[o,l,d,f,c]=e;else if(n==="channelsFirst")[o,c,l,d,f]=e;else throw new Error(`Unknown dataFormat ${n}`);let[h,,y,g,_]=t,[I,$,w]=Vo(r),[T,E,C]=Vo(i),S=ca(y,T),R=ca(g,E),A=ca(_,C),{padInfo:P,outDepth:K,outHeight:Y,outWidth:L}=Wp(a,l,d,f,I,$,w,S,R,A),H=s?h*c:h,me=[0,0,0,0,0];return n==="channelsFirst"?me=[o,H,K,Y,L]:n==="channelsLast"&&(me=[o,K,Y,L,H]),{batchSize:o,dataFormat:n,inDepth:l,inHeight:d,inWidth:f,inChannels:c,outDepth:K,outHeight:Y,outWidth:L,outChannels:H,padInfo:P,strideDepth:I,strideHeight:$,strideWidth:w,filterDepth:y,filterHeight:g,filterWidth:_,effectiveFilterDepth:S,effectiveFilterHeight:R,effectiveFilterWidth:A,dilationDepth:T,dilationHeight:E,dilationWidth:C,inShape:e,outShape:me,filterShape:t}},dg=(e,t,r,i,a,s)=>{let n=s==="channelsLast",o=n?e[0].dims[3]:e[0].dims[1],l=!1,d=[64,1,1],f={x:r.map((w,T)=>T)},c=[Math.ceil(Fp(f.x.map(w=>r[w]))/d[0]),1,1];Ce("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${c}`);let h=l?n&&o%4!==0?3:4:1,y=U.size(r),g=[{type:12,data:y},{type:12,data:i},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];Vr(t,g),g.push(...le(e[0].dims,e[1].dims));let _=["rank","rank"],I=e.length===3;I&&(g.push(...le(e[2].dims)),_.push("rank")),g.push(...le(r));let $=w=>{let T=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Hr(t,T);let E=l?4:1,C=et(e[0].dataType),S=q("x",e[0].dataType,e[0].dims.length,h===3?1:h),R=q("W",e[1].dataType,e[1].dims.length,E),A=[S,R],P=ae("result",e[0].dataType,r.length,E),K="";if(I){let H=q("bias",e[2].dataType,e[2].dims.length,E);A.push(H),K+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${C}>`:C} {
          return bias[${n?se("coords",4,5):se("coords",1,5)}${l?"/ 4":""}];
        }`}let Y=it(h,C),L=Wr(t,Y,C);return`
            ${K}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${C} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${S.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> ${C} {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${R.getByIndices("aIndices")};
            }
          ${w.registerUniforms(T).declareVariables(...A,P)}
          ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${P.offsetToIndices("global_idx")};
              let batch = ${se("coords",0,S.rank)};
              let d2 = ${n?se("coords",S.rank-1,S.rank):se("coords",1,S.rank)};
              let xFRCCorner = vec3<u32>(${n?se("coords",1,S.rank):se("coords",2,S.rank)},
              ${n?se("coords",2,S.rank):se("coords",3,S.rank)},
              ${n?se("coords",3,S.rank):se("coords",4,S.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${n?se("uniforms.x_shape",1,S.rank):se("uniforms.x_shape",2,S.rank)};
              let xShapeZ = ${n?se("uniforms.x_shape",2,S.rank):se("uniforms.x_shape",3,S.rank)};
              let xShapeW = ${n?se("uniforms.x_shape",3,S.rank):se("uniforms.x_shape",4,S.rank)};
              let xShapeU = ${n?se("uniforms.x_shape",4,S.rank):se("uniforms.x_shape",1,S.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = ${C}(0);
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${n?`let xValues = vec4<${C}>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<${C}>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<${C}>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${n?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${n?`let xValues = vec2<${C}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<${C}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<${C}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${n?`let xValues = vec3<${C}>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<${C}>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<${C}>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${I?"value = value + getBiasByOutputCoords(coords)":""};
              ${L}
              result[global_idx] = ${C}(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${n};${h};${I}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:c[0],y:c[1],z:c[2]},programUniforms:g}),getShaderSource:$}}}),pg,cg,Uy=X(()=>{"use strict";fe(),ve(),ye(),Xr(),pg=(e,t,r,i)=>{let a=e.length>2,s=a?"value += b[output_channel];":"",n=e[0].dims,o=e[1].dims,l=t.format==="NHWC",d=l?r[3]:r[1],f=d/t.group,c=l&&f>=4?Ze(d):1,h=U.size(r)/c,y=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:f}];Vr(t,y),y.push(...le(n,[o[0],o[1],o[2],o[3]/c]));let g=a?["rank","rank","rank"]:["rank","rank"];y.push(...le([r[0],r[1],r[2],r[3]/c]));let _=I=>{let $=ae("output",e[0].dataType,r.length,c),w=et($.type.tensor),T=Wr(t,$.type.value,w),E=q("x",e[0].dataType,n.length),C=q("w",e[1].dataType,o.length,c),S=[E,C];a&&S.push(q("b",e[2].dataType,e[2].dims,c));let R=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Hr(t,R);let A=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${E.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${C.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${E.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${C.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${I.registerUniforms(R).declareVariables(...S,$)}

  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${A}
    ${s}
    ${T}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${c}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:y}),getShaderSource:_}},cg=(e,t,r,i)=>{let a=e.length>2,s=Ze(r[3]),n=Ze(r[2]),o=U.size(r)/s/n,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],f=[r[0],r[1],r[2],r[3]/s],c=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Vr(t,c),c.push(...le(l,d,f));let h=(n-1)*t.strides[1]+d[1],y=g=>{let _=ae("output",e[0].dataType,f.length,s),I=et(_.type.tensor),$=Wr(t,_.type.value,I),w=q("x",e[0].dataType,l.length,s),T=q("w",e[1].dataType,d.length,s),E=[w,T];a&&E.push(q("b",e[2].dataType,e[2].dims,s));let C=a?"value += b[output_channel];":"",S=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Hr(t,S),`
  ${g.registerUniforms(S).declareVariables(...E,_)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${n}u;
    let col = (index1 % width1) * ${n}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${h}>;
    var values: array<${_.type.value}, ${n}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${T.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${n}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${n}u; i++) {
      var value = values[i];
      ${C}
      ${$}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${n};${h};${d[0]};${d[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:c}),getShaderSource:y}}}),Vp,In,Hp,Cn,Ou,Ko,Kp,Xp,Ru,Py=X(()=>{"use strict";ve(),Dy(),Ny(),sl(),Uy(),Xr(),nl(),gr(),Vp=(e,t,r,i,a,s)=>{let n=e[0],o=e.slice(s?1:2,s?3:4),l=o.length,d=t[0],f=t.slice(2).map((h,y)=>h+(h-1)*(r[y]-1)),c=o.map((h,y)=>h+i[y]+i[y+l]).map((h,y)=>Math.floor((h-f[y]+a[y])/a[y]));return c.splice(0,0,n),c.splice(s?3:1,0,d),c},In=[2,3,1,0],Hp=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Cn=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let s=2;s<t[1].dims.length;++s)r[s-2]===0&&(r[s-2]=t[1].dims[s]);let i=e.pads.slice();Ln.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:r,pads:i}),a},Ou=e=>{let t=rl(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,s=e.group,n=e.kernel_shape,o=e.pads,l=e.strides,d=e.w_is_const();return{autoPad:i,format:r,dilations:a,group:s,kernelShape:n,pads:o,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Ko=(e,t,r,i)=>{let a=r.format==="NHWC",s=Vp(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,a);if(r.group!==1){let S=[t[0]];if(a){let R=e.kernelCustomData.wT??e.compute($t(t[1],In),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=R),S.push(R)}else S.push(t[1]);t.length===3&&S.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(cg(S,r,s,i),{inputs:S}):e.compute(pg(S,r,s,i),{inputs:S});return}let n=t.length===3,o=t[0].dims[a?1:2],l=t[0].dims[a?2:3],d=t[0].dims[a?3:1],f=t[1].dims[2],c=t[1].dims[3],h=s[a?1:2],y=s[a?2:3],g=s[a?3:1],_=a&&f===o&&c===l&&r.pads[0]===0&&r.pads[1]===0;if(_||f===1&&c===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let S=s[0],R,A,P,K=[];if(a){let H=e.kernelCustomData.wT??e.compute($t(t[1],In),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=H),_){let me=o*l*d;R=t[0].reshape([1,S,me]),A=H.reshape([1,me,g]),P=[1,S,g]}else R=t[0].reshape([S,o*l,d]),A=H.reshape([1,d,g]),P=[S,h*y,g];K.push(R),K.push(A)}else R=t[0].reshape([S,d,o*l]),A=t[1].reshape([1,g,d]),P=[S,g,h*y],K.push(A),K.push(R);n&&K.push(t[2]);let Y=P[2],L=K[0].dims[K[0].dims.length-1];Y<8&&L<8?e.compute(al(K,r,s,P,a,i),{inputs:K}):e.compute(Fn(K,r,s,P,a,i),{inputs:K});return}let I=!0,$=e.kernelCustomData.wT??e.compute($t(t[1],In),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let w=[t[0],$];n&&w.push(t[2]);let T=a?h*y:g,E=a?g:h*y,C=f*c*d;e.compute(ug(w,r,s,T,E,C,n,I,i),{inputs:w})},Kp=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),n=[1].concat(t.dilations),o=[1].concat(t.kernelShape),l=Cn({...t,pads:a,strides:s,dilations:n,kernelShape:o},i);Ko(e,i,l,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},Xp=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",a=Cn(r,t),s=r.autoPad==="NOTSET"?r.pads:r.autoPad,n=lg(t[0].dims,t[1].dims,r.strides,r.dilations,s,!1,i);e.compute(dg(t,a,n.outShape,[n.filterDepth,n.filterHeight,n.filterWidth],[n.padInfo.front,n.padInfo.top,n.padInfo.left],i))},Ru=(e,t)=>{if(Hp(e.inputs,t),e.inputs[0].dims.length===3)Kp(e,t);else if(e.inputs[0].dims.length===5)Xp(e,e.inputs,t);else{let r=Cn(t,e.inputs);Ko(e,e.inputs,r)}}}),fg,Ly=X(()=>{"use strict";fe(),rr(),ve(),ye(),fg=(e,t,r)=>{let i=e.length>2,a=t.outputShape,s=t.format==="NHWC",n=t.group,o=e[1].dims,l=o[2]/n,d=o[3],f=s?Ze(l):1,c=s&&d===1&&l>=4,h=c?Math.floor(l/4)*4:Math.floor(l/f)*f,y=l-h,g=s?Ze(d):1,_=s?d===1?f:g:1,I=U.size(a)/g,$=[Math.ceil(I/64),1,1];Ce("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let w=["rank","rank"],T=[t.strides[0],t.strides[1]],E=[t.kernelShape[s?1:2],t.kernelShape[s?2:3]],C=[t.dilations[0],t.dilations[1]],S=[E[0]+(t.dilations[0]<=1?0:(t.kernelShape[s?1:2]-1)*(t.dilations[0]-1)),E[1]+(t.dilations[1]<=1?0:(t.kernelShape[s?2:3]-1)*(t.dilations[1]-1))],R=[S[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),S[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],A=[{type:12,data:I},{type:12,data:T},{type:12,data:E},{type:12,data:C},{type:12,data:S},{type:6,data:R},{type:12,data:h},{type:12,data:l},{type:12,data:d},...le(e[0].dims,e[1].dims)];i&&(A.push(...le(e[2].dims)),w.push("rank")),A.push(...le(a));let P=K=>{let Y=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:T.length},{name:"filter_dims",type:"u32",length:E.length},{name:"dilations",type:"u32",length:E.length},{name:"effective_filter_dims",type:"u32",length:S.length},{name:"pads",type:"i32",length:R.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],L=et(e[0].dataType),H=s?1:2,me=s?2:3,O=s?3:1,W=q("W",e[1].dataType,e[1].dims.length,_),ue=q("Dy",e[0].dataType,e[0].dims.length,f),ne=[ue,W];i&&ne.push(q("bias",e[2].dataType,[a[O]].length,g));let te=ae("result",e[0].dataType,a.length,g),ie=()=>{let ee="";if(c)f===4?ee+=`
        let xValue = ${ue.getByOffset("x_offset")};
        let wValue = ${W.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:f===2?ee+=`
          dotProd = dotProd + dot(vec4<${L}>(${ue.getByOffset("x_offset")}, ${ue.getByOffset("x_offset + 1u")}), vec4<${L}>(${W.getByOffset("w_offset")}, ${W.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:f===1&&(ee+=`
          dotProd = dotProd + dot(vec4<${L}>(${ue.getByOffset("x_offset")}, ${ue.getByOffset("x_offset + 1u")}, ${ue.getByOffset("x_offset + 2u")}, ${ue.getByOffset("x_offset + 3u")}), vec4<${L}>(${W.getByOffset("w_offset")}, ${W.getByOffset("w_offset + 1u")}, ${W.getByOffset("w_offset + 2u")}, ${W.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(ee+=`
                  let xValue = ${s?ue.getByOffset(`${ue.indicesToOffset(`${ue.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`):ue.get("batch","inputChannel","idyR","idyC")};
        `,f===1)ee+=`
          let w_offset = ${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${W.getByOffset(`w_offset / ${_}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let J=0;J<f;J++)ee+=`
            let wValue${J} = ${W.getByOffset(`${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${J}, wOutChannel)`)} / ${_}`)};
            dotProd = dotProd + xValue[${J}] * wValue${J};`;return ee},G=()=>{if(y===0)return"";if(!c)throw new Error(`packInputAs4 ${c} is not true.`);let ee="";if(f===1){ee+="dotProd = dotProd";for(let J=0;J<y;J++)ee+=`
            + ${ue.getByOffset(`x_offset + ${J}`)} * ${W.getByOffset(`w_offset + ${J}`)}`;ee+=";"}else if(f===2){if(y!==2)throw new Error(`Invalid inputChannelsRemainder ${y}.`);ee+=`
          let xValue = ${ue.getByOffset("x_offset")};
          let wValue = ${W.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return ee},oe=`
            let outputIndices = ${te.offsetToIndices(`global_idx * ${g}`)};
            let batch = ${te.indicesGet("outputIndices",0)};
            let d1 = ${te.indicesGet("outputIndices",O)};
            let r = ${te.indicesGet("outputIndices",H)};
            let c = ${te.indicesGet("outputIndices",me)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${te.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${L}(dyRCorner) + ${L}(wR)) / ${L}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${L}(uniforms.Dy_shape[${H}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${L}(dyCCorner) + ${L}(wC)) / ${L}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${L}(uniforms.Dy_shape[${me}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${c?`
                var x_offset = ${ue.indicesToOffset(`${ue.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f};
                var w_offset = ${W.indicesToOffset(`${W.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${c?4:f}) {
                  ${ie()}
                  inputChannel = inputChannel + ${c?4:f};
                }
                ${G()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${g}]`:""};
            ${te.setByOffset("global_idx","value")};
          `;return`
    ${K.registerUniforms(Y).declareVariables(...ne,te)}
      ${K.mainStart()}
      ${K.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${oe}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${f}${_}${g}${c}${y}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:r?r(a):a,dataType:e[0].dataType}],programUniforms:A}),getShaderSource:P}}}),Zp,Qp,Yp,Xo,hg,Jp,Zo,ec,mg,qy=X(()=>{"use strict";Ly(),Xr(),gr(),Zp=(e,t,r,i,a,s)=>(e-1)*t+r+(i-1)*a+1-s,Qp=(e,t,r,i,a)=>{let s=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=s,r[a]=e-s):t==="SAME_LOWER"&&(r[i]=e-s,r[a]=s)},Yp=(e,t,r,i,a,s,n,o,l,d)=>{let f=e.length-2,c=d.length===0;l.length<f&&l.push(...Array(f-l.length).fill(0));let h=e[0],y=t[o?3:1]*a;for(let g=0,_=e.length-f-(o?1:0);g<f;++g,++_){let I=e[_],$=c?I*n[g]:d[g],w=Zp(I,n[g],s[g],t[_],r[g],$);Qp(w,i,s,g,g+f),c&&d.push(n[g]*(I-1)+l[g]+(t[_]-1)*r[g]+1-s[g]-s[g+f])}d.splice(0,0,h),d.splice(o?3:1,0,y)},Xo=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((c,h)=>c*h,1)===0){r.length=0;for(let c=2;c<t[1].dims.length;++c)r.push(t[1].dims[c])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let a=e.pads.slice(),s=e.outputShape.slice(),n=e.outputPadding.slice(),o=t[0].dims,l=e.dilations.slice();if(l.reduce((c,h)=>c+h,0)===0){let c=t[0].dims.length-2;l=new Array(c).fill(1)}let d=e.strides.slice();if(d.reduce((c,h)=>c+h,0)===0){let c=t[0].dims.length-2;d=new Array(c).fill(1)}Yp(o,r,l,e.autoPad,e.group,a,d,i,n,s);let f=Object.assign({},e);return Object.assign(f,{kernelShape:r,pads:a,outputPadding:n,outputShape:s,dilations:l,strides:d}),f},hg=e=>{let t=rl(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,s=e.group??1,n=e.kernelShape,o=e.pads,l=e.strides,d=e.wIsConst(),f=e.outputPadding,c=e.outputShape;return{autoPad:i,format:r,dilations:a,group:s,kernelShape:n,outputPadding:f,outputShape:c,pads:o,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Jp=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.reduce((n,o)=>n+o,0)>0&&t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.reduce((n,o)=>n+o,0)>0&&t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.reduce((n,o)=>n+o,0)>0&&t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.outputPadding.length!==s&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${s}D`);if(t.kernelShape.reduce((n,o)=>n+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Zo=(e,t,r,i)=>{let a=e.kernelCustomData.wT??e.compute($t(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let s=[t[0],a];t.length===3&&s.push(t[2]),e.compute(fg(s,r,i),{inputs:s})},ec=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let s=t.dilations;(s.length===0||s[0]===0)&&(s=[1]);let n=t.strides;(n.length===0||n[0]===0)&&(n=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],n=[1].concat(n),s=[1].concat(s),a=[1].concat(a);let l=t.outputPadding;l=[0].concat(l);let d=Xo({...t,pads:o,strides:n,dilations:s,kernelShape:a,outputPadding:l},i);Zo(e,i,d,f=>r?[f[0],f[2],f[3]]:[f[0],f[1],f[3]])},mg=(e,t)=>{if(Jp(e.inputs,t),e.inputs[0].dims.length===3)ec(e,t);else{let r=Xo(t,e.inputs);Zo(e,e.inputs,r)}}}),tc,gg,vg,Fy=X(()=>{"use strict";fe(),ve(),Qe(),ye(),tc=(e,t,r,i)=>{let a=U.size(t),s=t.length,n=q("input",e,s),o=ae("output",e,s),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),d=U.normalizeAxis(l,s),f=c=>{let h=` i32(${n.indicesGet("inputIndices","uniforms.axis")}) `,y=se("uniforms.input_shape","uniforms.axis",s),g=i.reverse?h+(i.exclusive?" + 1":""):"0",_=i.reverse?y:h+(i.exclusive?"":" + 1");return`
                ${c.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(n,o)}
                ${c.mainStart()}
                  ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${g};
                  let last : i32 = ${_};
                  for (var i : i32 = first; i < last; i++) {
                    ${n.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${n.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:d},...le(t,t)]}),getShaderSource:f}},gg=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,a=e.inputs[1];e.compute(tc(i,r,a,t),{inputs:[0]})},vg=e=>{let t=e.exclusive===1,r=e.reverse===1;return je({exclusive:t,reverse:r})}}),rc,ic,ac,bg,yg,Gy=X(()=>{"use strict";fe(),ve(),Qe(),ye(),rc=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},ic=(e,t,r,i)=>{let a=[];a.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let s=0;s<t;++s)a.push(r.indicesSet("a",e[s],`i[${s}]`));return a.push("return a;}"),a.join(`
`)},ac=(e,t)=>{let r,i,a,s,n,o,l=t.format==="NHWC",d=t.blocksize,f=t.mode==="DCR";l?([r,i,a,s]=e.dims,n=f?[r,i,a,d,d,s/d**2]:[r,i,a,s/d**2,d,d],o=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,a,s]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],n=f?[r,d,d,s/d**2,i,a]:[r,s/d**2,d,d,i,a],o=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=e.reshape(n),h=c.dims.length,y=e.dataType,g=q("a",y,h),_=ae("output",y,h),I=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(g,_)}

  ${ic(o,h,g,_)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let w=l?[r,i*d,a*d,s/d**2]:[r,s/d**2,i*d,a*d],T=U.size(w),E=c.dims,C=U.sortBasedOnPerm(E,o);return{outputs:[{dims:w,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...le(E,C)]}},getShaderSource:I}},bg=(e,t)=>{rc(e.inputs),e.compute(ac(e.inputs[0],t))},yg=e=>je({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Jt,fa,zn,Qo,pr,nc,sc,oc,Yo,Jo,eu,uc,lc,tu,dc,wg,_g,Wy=X(()=>{"use strict";fe(),ve(),Qe(),ye(),Jt=256,fa=512,zn=2*Math.PI,Qo=e=>{let t=[],r=e;for(let i of[4,2,3,5])for(;r%i===0;)t.push(i),r/=i;return r===1?t:void 0},pr=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},nc=(e,t,r,i,a)=>{let s=r/e,n=fa-i,o=d=>`smem[${n}u + base + ${d*t}u]`,l=`  for (var t = local_idx; t < ${s}u; t += ${Jt}u) {
`;l+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,l+=`    var leg: array<vec2<f32>, 5>;
`;for(let d=0;d<e;d++){let f=`${i}u + t + ${d*s}u`;if(d===0)l+=`    leg[0] = smem[${f}];
`;else{let c=a*zn*d/(e*t);l+=`    { let a = ${pr(c)} * angleUnit; leg[${d}] = cmul(smem[${f}], vec2<f32>(cos(a), sin(a))); }
`}}if(l+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,e===2)l+=`    ${o(0)} = leg[0] + leg[1];
    ${o(1)} = leg[0] - leg[1];
`;else if(e===4){let d=a<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)";l+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,l+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,l+=`    let oddRot = ${d};
`,l+=`    ${o(0)} = evenSum + oddSum;
    ${o(1)} = evenDiff + oddRot;
`,l+=`    ${o(2)} = evenSum - oddSum;
    ${o(3)} = evenDiff - oddRot;
`}else for(let d=0;d<e;d++){let f=["leg[0]"];for(let c=1;c<e;c++){let h=a*zn*(c*d)/e,y=pr(Math.cos(h)),g=pr(Math.sin(h));f.push(`vec2<f32>(leg[${c}].x*${y} - leg[${c}].y*${g}, leg[${c}].x*${g} + leg[${c}].y*${y})`)}l+=`    ${o(d)} = ${f.join(" + ")};
`}return`${l}  }
  workgroupBarrier();
`},sc=(e,t,r)=>{let i="",a=1,s=0;for(let n of e)i+=nc(n,a,t,s,r),a*=n,s=fa-s;return{code:i,resultOffset:s}},oc=(e,t,r,i,a)=>{let s=e.dims,n=s.length,o=s[n-1],l=s[t],d=r&&i?(l-1)*2:l;a!==void 0&&(d=a);let f=r&&i?1:2,c=i&&!r?Math.floor(d/2)+1:d,h=s.slice();h[t]=c,h[n-1]=f;let y=1;for(let _=t+1;_<n-1;_++)y*=s[_];let g=U.size(s)/o/l;return{dataType:e.dataType,outputDims:h,length:d,signalLength:l,inner:y,batch:g,inputComponents:o,outputComponents:f,outputLength:c,inverse:r,onesided:i}},Yo=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),Jo=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],eu=(e,t,r)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,r),uc=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:a,inverse:s,onesided:n}=e,o=Je(t),l=s?1:-1,d=s?1/r:1,f=Qo(r),c=h=>{let y=q("x",t,[1]),g=ae("y",t,[1]),_=C=>{let S=`inBase + (${C}) * uniforms.inner * ${i}u`,R=`f32(${y.getByOffset(S)})`,A=i===2?`f32(${y.getByOffset(`${S} + 1u`)})`:"0.0";return`vec2<f32>(${R}, ${A})`},I;if(s&&n){let C=Math.floor(r/2)+1,S=r%2===0?`select(provided, provided - 1u, provided == ${C}u)`:"provided";I=`
    let provided = min(uniforms.signalLength, ${C}u);
    for (var i = local_idx; i < ${r}u; i += ${Jt}u) {
      if (i < provided) { smem[i] = ${_("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${S}; k += ${Jt}u) {
      let h = smem[k];
      smem[${r}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else I=`
    let loadCount = min(uniforms.signalLength, ${r}u);
    for (var i = local_idx; i < ${r}u; i += ${Jt}u) {
      if (i < loadCount) { smem[i] = ${_("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:$,resultOffset:w}=sc(f,r,l),T=d===1?`smem[${w}u + i]`:`smem[${w}u + i] * ${pr(d)}`,E=a===2?g.setByOffset("off + 1u",`${o}(v.y)`):"";return`
  ${eu(h,y,g)}
  var<workgroup> smem: array<vec2<f32>, ${2*fa}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${h.mainStart(Jt)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${a}u;
    ${I}
${$}    for (var i = local_idx; i < uniforms.outputLength; i += ${Jt}u) {
      let v = ${T};
      let off = outBase + i * uniforms.inner * ${a}u;
      ${g.setByOffset("off",`${o}(v.x)`)}
      ${E}
    }
  }`};return{name:"DFT",shaderCache:{hint:Yo(e,"fft"),inputDependencies:["type"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:Jo(e),dispatchGroup:{x:e.batch}})}},lc=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:a,inverse:s,onesided:n}=e,o=Je(t),l=s?1:-1,d=s?1/r:1,f=c=>{let h=q("x",t,[1]),y=ae("y",t,[1]),g=T=>{let E=`inBase + (${T}) * uniforms.inner * ${i}u`,C=`f32(${h.getByOffset(E)})`,S=i===2?`f32(${h.getByOffset(`${E} + 1u`)})`:"0.0";return`vec2<f32>(${C}, ${S})`},_=s&&n?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(r/2)+1}u);
    if (k < provided) { return ${g("k")}; }
    let m = ${r}u - k;
    if (m < provided) {
      let h = ${g("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${g("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,I=`
      let angle = ${pr(l*zn)} * f32(knMod) / ${pr(r)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${r}u) { knMod -= ${r}u; }`,$=a===2?y.setByOffset("off + 1u",`${o}(v.y)`):"",w=d===1?"acc":`acc * ${pr(d)}`;return`
  ${eu(c,h,y)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${_}
  ${c.mainStart(Jt)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${a}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${Jt}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${r}u; n++) {${I}
      }
      let v = ${w};
      let off = outBase + k * uniforms.inner * ${a}u;
      ${y.setByOffset("off",`${o}(v.x)`)}
      ${$}
    }
  }`};return{name:"DFT",shaderCache:{hint:Yo(e,"direct"),inputDependencies:["type"]},getShaderSource:f,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:Jo(e),dispatchGroup:{x:e.batch}})}},tu=e=>{if(!e||e.dataType===0)return;if(U.size(e.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},dc=e=>{if(!e||e.length<1)throw new Error("DFT requires at least 1 input.");let t=e[0].dims;if(t.length<2)throw new Error("DFT input must have at least 2 dimensions.");let r=t[t.length-1];if(r!==1&&r!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},wg=(e,t)=>{dc(e.inputs);let r=e.inputs[0],i=r.dims.length,a=t.inverse!==0,s=t.onesided!==0,n=tu(e.inputs[1]);if(n!==void 0&&n<=0)throw new Error("dft_length must be greater than zero.");let o=U.normalizeAxis(tu(e.inputs[2])??t.axis,i);if(o===i-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(a&&s&&r.dims[i-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let l=oc(r,o,a,s,n);if(l.length<=0)throw new Error(`Invalid DFT length: ${l.length}`);let d=l.length<=fa&&Qo(l.length)!==void 0?uc(l):lc(l);e.compute(d,{inputs:[0]})},_g=e=>je({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),Bn,ha,ru,pc,cc,fc,hc,iu,mc,xg,$g,Vy=X(()=>{"use strict";fe(),ve(),Qe(),ye(),Bn="[a-zA-Z]|\\.\\.\\.",ha="("+Bn+")+",ru="^"+ha+"$",pc="("+ha+",)*"+ha,cc="^"+pc+"$",fc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},hc=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(cc)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,s)=>{let n=e[s].dims.slice();if(!a.match(RegExp(ru)))throw new Error("Invalid LHS term");let o=this.processTerm(a,!0,n,s);this.lhs.push(o)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([a,s])=>s.count===1||a==="...").map(([a])=>a).join("");else if(!i.match(RegExp(ha)))throw new Error("Invalid RHS");i.match(RegExp(Bn,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(a);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let a=r.length,s=!1,n=[],o=0;if(!e.match(RegExp(ru))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Bn,"g")),d=new fc(i);return l?.forEach((f,c)=>{if(f==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let h=a-l.length+1;if(h<0)throw new Error("Ellipsis out of bounds");if(n=r.slice(o,o+h),this.hasEllipsis){if(this.ellipsisDims.length!==n.length||this.ellipsisDims.toString()!==n.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=n;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<n.length;y++){let g=String.fromCharCode(48+y);d.addSymbol(g,c+y),this.addSymbol(g,r[o++],i)}}else d.addSymbol(f,c+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,r[o++],i)}),d}},iu=e=>e+"_max",mc=(e,t,r,i)=>{let a=e.map(d=>d.length).map((d,f)=>q(`input${f}`,t,d)),s=U.size(i),n=ae("output",t,i.length),o=[...r.symbolToInfo.keys()].filter(d=>!r.rhs.symbolToIndices.has(d)),l=d=>{let f=[],c="var prod = 1.0;",h="var sum = 0.0;",y="sum += prod;",g=[],_=[],I=[],$=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((E,C)=>{if(r.rhs.symbolToIndices.has(C)){let S=r.rhs.symbolToIndices.get(C)?.[0];S!==void 0&&r.lhs.forEach((R,A)=>{if(E.inputIndices.includes(A)){let P=R.symbolToIndices.get(C);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(K=>{f.push(`${a[A].indicesSet(`input${A}Indices`,K,n.indicesGet("outputIndices",S))}`)})}})}else r.lhs.forEach((S,R)=>{if(E.inputIndices.includes(R)){let A=S.symbolToIndices.get(C);if(A===void 0)throw new Error("Invalid symbol error");A.forEach(P=>{g.push(`${a[R].indicesSet(`input${R}Indices`,P,`${C}`)}`)}),$.push(`prod *= ${a[R].getByIndices(`input${R}Indices`)};`)}}),_.push(`for(var ${C}: u32 = 0; ${C} < uniforms.${iu(C)}; ${C}++) {`),I.push("}")});let T=w?[...f,`let sum = ${a.map((E,C)=>E.getByIndices(`input${C}Indices`)).join(" * ")};`]:[...f,h,..._,...g,c,...$,y,...I];return`
            ${d.registerUniforms(o.map(E=>({name:`${iu(E)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,n)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${n.offsetToIndices("global_idx")};
            ${a.map((E,C)=>`var input${C}Indices: ${a[C].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${n.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=o.filter(c=>r.symbolToInfo.has(c)).map(c=>({type:12,data:r.symbolToInfo.get(c)?.dimValue||0}));d.push({type:12,data:s});let f=e.map((c,h)=>[...le(c)]).reduce((c,h)=>c.concat(h),d);return f.push(...le(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:f}},getShaderSource:l}},xg=(e,t)=>{let r=new hc(e.inputs,t.equation),i=r.outputDims,a=e.inputs.map((s,n)=>s.dims);e.compute(mc(a,e.inputs[0].dataType,r,i))},$g=e=>{let t=e.equation.replace(/\s+/g,"");return je({equation:t})}}),gc,au,vc,bc,Ag,Hy=X(()=>{"use strict";fe(),ve(),ye(),gc=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,a=t.length<r.length?0:t.length-r.length;for(;i<r.length&&a<t.length;++i,++a)if(r[i]!==t[a]&&r[i]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},au=(e,t)=>{let r=e.length-t.length,i=[];for(let a=0;a<r;++a)i.push(e[a]);for(let a=0;a<t.length;++a)i.push(t[a]===1?e[a+r]:t[a]);return i},vc=(e,t)=>e.length>t.length?au(e,t):au(t,e),bc=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=vc(t,r),a=e[0].dataType,s=a===9||U.size(t)===1,n=a===9||t.length>0&&t[t.length-1]%4===0?4:1,o=s||i.length>0&&i[i.length-1]%4===0?4:1,l=Math.ceil(U.size(i)/o),d=c=>{let h=q("input",a,t.length,n),y=ae("output",a,i.length,o),g;if(a===9){let _=(I,$,w="")=>`
          let outputIndices${$} = ${y.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${h.broadcastedIndicesToOffset(`outputIndices${$}`,y)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${I}[${$}] = ${w}(${h.getByOffset(`index${$}`)}[component${$}]);
        `;g=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${_("data",0,"u32")}
        ${_("data",1,"u32")}
        ${_("data",2,"u32")}
        ${_("data",3,"u32")}
        ${y.setByOffset("global_idx","data")}
      }`}else g=`
        let outputIndices = ${y.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",y)};
        let data = ${y.type.value}(${h.getByOffset(`inputOffset / ${n}`)});
        ${y.setByOffset("global_idx","data")}
      }`;return`
    ${c.registerUniform("vec_size","u32").declareVariables(h,y)}
    ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${g}`},f=[{type:12,data:l},...le(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${n}${o}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f})}},Ag=e=>{gc(e.inputs),e.compute(bc(e.inputs),{inputs:[0]})}}),yc,kg,Ky=X(()=>{"use strict";fe(),ve(),ye(),tl(),yc=e=>{let t=e[0].dataType,r=U.size(e[0].dims),i=U.size(e[1].dims),a=i%4===0,s=n=>{let o=q("x",t,[1],4),l=q("bias",t,[1],4),d=ae("y",t,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=y=>`
      let bias${y}_offset: u32 = (global_idx * 4 + ${y}) % uniforms.bias_size;
      let bias${y} = ${l.getByOffset(`bias${y}_offset / 4`)}[bias${y}_offset % 4];`,h=a?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${n.registerUniforms(f).declareVariables(o,l,d)}

    ${Cu(Je(t))}

    ${n.mainStart(Ai)}
      ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",zu("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:n=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/Ai/4)}})}},kg=e=>{e.inputs.length<2||U.size(e.inputs[1].dims)===0?Fm(e):e.compute(yc(e.inputs))}}),wc,_c,Tg,Sg,Xy=X(()=>{"use strict";fe(),ve(),Qe(),ye(),wc=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},_c=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,s=U.normalizeAxis(t.axis,a),n=r.slice(0);n.splice(s,1,...i);let o=r[s],l=e[0].dataType===9?4:1,d=Math.ceil(U.size(n)/l),f=[{type:12,data:d},{type:6,data:o},{type:12,data:s},...le(e[0].dims,e[1].dims,n)],c=h=>{let y=q("data",e[0].dataType,e[0].dims.length,l),g=q("inputIndices",e[1].dataType,e[1].dims.length),_=ae("output",e[0].dataType,n.length,l),I=w=>{let T=i.length,E=`var indicesIndices${w}  = ${g.type.indices}(0);`;for(let C=0;C<T;C++)E+=`${T>1?`indicesIndices${w}[${C}]`:`indicesIndices${w}`} = ${n.length>1?`outputIndices${w}[uniforms.axis + ${C}]`:`outputIndices${w}`};`;E+=`
          var idx${w} = ${g.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${y.type.indices};
        `;for(let C=0,S=0;C<a;C++)C===s?(E+=`${a>1?`dataIndices${w}[${C}]`:`dataIndices${w}`} = u32(idx${w});`,S+=T):(E+=`${a>1?`dataIndices${w}[${C}]`:`dataIndices${w}`} = ${n.length>1?`outputIndices${w}[${S}]`:`outputIndices${w}`};`,S++);return E},$;if(e[0].dataType===9){let w=(T,E,C="")=>`
          let outputIndices${E} = ${_.offsetToIndices(`outputOffset + ${E}u`)};
          ${I(E)};
          let offset${E} = ${y.indicesToOffset(`dataIndices${E}`)};
          let index${E} = offset${E} / 4u;
          let component${E} = offset${E} % 4u;
          ${T}[${E}] = ${C}(${y.getByOffset(`index${E}`)}[component${E}]);
        `;$=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${_.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${_.offsetToIndices("global_idx")};
      ${I("")};
      let value = ${y.getByIndices("dataIndices")};
      ${_.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(y,g,_)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f}),getShaderSource:c}},Tg=e=>je({axis:e.axis}),Sg=(e,t)=>{let r=e.inputs;wc(r),e.compute(_c(e.inputs,t))}}),xc,Eg,Ig,Zy=X(()=>{"use strict";fe(),ve(),ye(),xc=(e,t,r,i,a,s,n,o,l)=>{let d=[{type:12,data:s},{type:12,data:i},{type:12,data:a},{type:12,data:r},{type:12,data:n},{type:12,data:o},{type:12,data:l}],f=[s];d.push(...le(t.dims,f));let c=h=>{let y=q("indices_data",t.dataType,t.dims.length),g=ae("input_slice_offsets_data",12,1,1),_=[y,g],I=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${h.registerUniforms(I).declareVariables(..._)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:c},{inputs:[t],outputs:[-1]})[0]},Eg=(e,t)=>{let r=e.inputs,i=r[0].dims,a=r[0].dataType,s=r[1].dims,n=s[s.length-1],o=U.sizeToDimension(s,s.length-1),l=U.sizeFromDimension(i,t.batchDims+n),d=U.sizeToDimension(i,t.batchDims),f=U.sizeFromDimension(i,t.batchDims),c=o/d,h=new Array(n),y=l;for(let E=0;E<n;++E)h[n-1-E]=y,y*=i[t.batchDims+n-1-E];let g=xc(e,r[1],h,t.batchDims,i,o,c,f,n),_=t.batchDims+n;if(_>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let I=s.slice(0,-1).concat(i.slice(_)),$=U.size(I),w=[{type:12,data:$},{type:12,data:l},...le(r[0].dims,g.dims,I)],T=E=>{let C=q("data",r[0].dataType,r[0].dims.length),S=q("slice_offsets",12,g.dims.length),R=ae("output",r[0].dataType,I.length);return`
          ${E.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(C,S,R)}
            ${E.mainStart()}
            ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:I,dataType:a}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:w}),getShaderSource:T},{inputs:[r[0],g]})},Ig=e=>({batchDims:e.batch_dims,cacheKey:""})}),$c,Ac,Cg,zg,Qy=X(()=>{"use strict";fe(),ve(),Qe(),ye(),$c=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=U.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,a=e[0],s=e[2],n=e.length===4?e[3]:void 0;if(s.dims.length!==a.dims.length||!a.dims.map((o,l)=>l===r?Math.ceil(o/i)===s.dims[l]:o===s.dims[l]).reduce((o,l)=>o&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(n){if(n.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(n.dims.length!==s.dims.length||!n.dims.map((o,l)=>o===s.dims[l]).reduce((o,l)=>o&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Ac=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,s=U.normalizeAxis(t.gatherAxis,a),n=U.normalizeAxis(t.quantizeAxis,a),o=r.slice(0);o.splice(s,1,...i);let l=U.size(o),d=e[2].dataType,f=e[0].dataType===22,c=[{type:12,data:l},{type:12,data:n},{type:12,data:s},{type:12,data:t.blockSize},...le(...e.map((y,g)=>y.dims),o)],h=y=>{let g=q("data",e[0].dataType,e[0].dims.length),_=q("inputIndices",e[1].dataType,e[1].dims.length),I=q("scales",e[2].dataType,e[2].dims.length),$=e.length>3?q("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=ae("output",d,o.length),T=[g,_,I];$&&T.push($);let E=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(E).declareVariables(...T,w)}
        ${y.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${_.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${_.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${g.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${g.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${_.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[s]};
        }
        ${g.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${g.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${g.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${g.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${I.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${I.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${I.getByIndices("scale_indices")};
        ${$?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${$.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${$.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Je(d)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,g)=>g!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,g)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:d}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:h}},Cg=(e,t)=>{let r=e.inputs;$c(r,t),e.compute(Ac(e.inputs,t))},zg=e=>je({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),kc,Tc,Bg,jg,Yy=X(()=>{"use strict";fe(),ve(),Qe(),ye(),kc=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Tc=(e,t)=>{let r=e[0].dims,i=e[0].dataType,a=r.length,s=e[1].dims,n=e[1].dataType,o=U.normalizeAxis(t.axis,a),l=r[o],d=s.slice(0),f=U.size(d),c=q("input",i,a),h=q("indicesInput",n,s.length),y=ae("output",i,d.length),g=[{type:12,data:f},{type:6,data:l},{type:12,data:o}];return g.push(...le(r,s,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:g}),getShaderSource:_=>`
      ${_.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,h,y)}
      ${_.mainStart()}
      ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${y.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${y.setByOffset("global_idx","value")};
  }`}},Bg=e=>je({axis:e.axis}),jg=(e,t)=>{let r=e.inputs;kc(r),e.compute(Tc(e.inputs,t))}}),Sc,Ec,Og,Rg,Jy=X(()=>{"use strict";fe(),ve(),ye(),Sc=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Ec=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[a,s,n]=Ih.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),o=[a,s];if(!o)throw new Error("Can't use gemm on the given tensors");let l=16,d=Math.ceil(s/l),f=Math.ceil(a/l),c=!0,h=U.size(o),y=[{type:12,data:c?d:h},{type:12,data:a},{type:12,data:s},{type:12,data:n},{type:1,data:t.alpha},{type:1,data:t.beta}],g=["type","type"];e.length===3&&(y.push(...le(e[2].dims)),g.push("rank")),y.push(...le(o));let _=$=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",E=q("a",e[0].dataType,e[0].dims),C=q("b",e[1].dataType,e[1].dims),S=E.type.value,R=null,A=[E,C];e.length===3&&(R=q("c",e[2].dataType,e[2].dims.length),A.push(R));let P=ae("output",e[0].dataType,o.length);A.push(P);let K=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(K).declareVariables(...A)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${S}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${T}
    ${R!=null?`let cOffset = ${R.broadcastedIndicesToOffset("vec2(m, n)",P)}; value += ${S}(uniforms.beta) * ${R.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},I=$=>{let w=q("a",e[0].dataType,e[0].dims),T=q("b",e[1].dataType,e[1].dims),E=null,C=[w,T];e.length===3&&(E=q("c",e[2].dataType,e[2].dims.length),C.push(E));let S=ae("output",e[0].dataType,o.length);C.push(S);let R=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],A="",P="";t.transA&&t.transB?(P=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,A="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(P=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,A="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(P=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,A="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(P=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,A="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let K=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(R).declareVariables(...C)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${l}>, ${l}>;
  ${$.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${S.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${P}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${A}
      }
      workgroupBarrier();
    }

    ${K}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${E!=null?`let cOffset = ${E.broadcastedIndicesToOffset("vec2(m, n)",S)}; value += ${S.type.value}(uniforms.beta) * ${E.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return c?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:d*f},programUniforms:y}),getShaderSource:I}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:y}),getShaderSource:_}},Og=e=>{let t=e.transA,r=e.transB,i=e.alpha,a=e.beta;return{transA:t,transB:r,alpha:i,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Rg=(e,t)=>{Sc(e.inputs),e.compute(Ec(e.inputs,t))}}),Vt,er,Mr,Dr,Ic,Cc,zc,Bc,jc,Oc,Rc,Mc,Mg,Dg,ew=X(()=>{"use strict";fe(),ve(),Qe(),ye(),[Vt,er,Mr,Dr]=[0,1,2,3],Ic=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Cc=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,zc=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Bc=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,jc=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Oc=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Vt}] = batch;
     indices[${er}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Mr}] = u32(r);
            indices[${Dr}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Mr}] = u32(clamp(r, 0, H - 1));
          indices[${Dr}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Mr}] = gs_reflect(r, border[1], border[3]);
          indices[${Dr}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Rc=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Vt}], indices[${er}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Vt}], indices[${er}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Vt}], indices[${er}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Vt}], indices[${er}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Vt}], indices[${er}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Vt}], indices[${er}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Mc=(e,t)=>{let r=q("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=q("grid",e[1].dataType,i.length,2),s=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(s=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Vt,er,Mr,Dr]=[0,3,1,2]);let n=ae("output",e[0].dataType,s.length),o=r.type.value,l=U.size(s),d=[{type:12,data:l},...le(e[0].dims,i,s)],f=c=>`
  ${c.registerUniform("output_size","u32").declareVariables(r,a,n)}
  ${Cc}
  ${zc(o)}
  ${Bc(t)}
  ${jc(t)}
  ${Oc(r,o,t)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Mr}]);
      let W_in = i32(uniforms.x_shape[${Dr}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${n.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Vt}], indices[${Mr}], indices[${Dr}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Rc(n,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:c=>{let h=U.size(s);return{outputs:[{dims:s,dataType:c[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:d}},getShaderSource:f}},Mg=(e,t)=>{Ic(e.inputs),e.compute(Mc(e.inputs,t))},Dg=e=>je({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),lt,Dc,Ng,nu,Nc,_a,Ug,Pg=X(()=>{"use strict";fe(),ve(),Qe(),Qu(),el(),ye(),gr(),lt=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Dc=(e,t)=>{let r=e[0],i=lt(e,1),a=lt(e,2),s=lt(e,3),n=lt(e,4),o=lt(e,5),l=lt(e,6),d=lt(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=r.dims[0],c=r.dims[1],h=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],y=c,g=0,_=0,I=Math.floor(h/t.numHeads);if(l&&d&&U.size(l.dims)&&U.size(d.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==f||l.dims[1]!==t.numHeads||l.dims[3]!==I)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==f||d.dims[1]!==t.numHeads||d.dims[3]!==I)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=l.dims[2],_=l.dims[2]}else if(l&&U.size(l.dims)||d&&U.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(i&&U.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,y=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==I)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,y=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==I)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,y=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(s&&U.size(s.dims)>0){if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=g+y,T=0;if(n&&U.size(n.dims)>0){T=8;let R=n.dims;throw R.length===1?R[0]===f?T=1:R[0]===3*f+2&&(T=3):R.length===2&&R[0]===f&&R[1]===w&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let E=!1,C=h;if(a&&U.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(y!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=a.dims[2]}else{if(y!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');C=a.dims[1]*a.dims[3],E=!0}}let S=!1;if(n&&U.size(n.dims)>0)throw new Error("Key padding mask is not supported");if(o&&U.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==f||o.dims[1]!==t.numHeads||o.dims[2]!==c||o.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:c,pastSequenceLength:g,kvSequenceLength:y,totalSequenceLength:w,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:h,vHiddenSize:C,headSize:I,vHeadSize:Math.floor(C/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:S,passPastInKv:E,qkvFormat:$}},Ng=e=>je({...e}),nu=je({perm:[0,2,1,3]}),Nc=(e,t,r,i,a,s,n)=>{let o=[i,a,s],l=U.size(o),d=[{type:12,data:l},{type:12,data:n},{type:12,data:s}],f=c=>{let h=ae("qkv_with_bias",t.dataType,o),y=q("qkv",t.dataType,o),g=q("bias",r.dataType,o),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(_).declareVariables(y,g,h)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:f},{inputs:[t,r],outputs:[-1]})[0]},_a=(e,t,r,i,a,s,n,o)=>{let l=s;if(n&&U.size(n.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Nc(e,s,n,t,i,r*a,o),l=l.reshape([t,i,r,a]),r===1||i===1?l:e.compute($t(l,nu.perm),{inputs:[l],outputs:[-1]})[0]}else return s.dims.length===3&&(l=s.reshape([t,i,r,a])),r===1||i===1?l:e.compute($t(l,nu.perm),{inputs:[l],outputs:[-1]})[0]},Ug=(e,t)=>{let r=Dc(e.inputs,t),i=e.inputs[0],a=lt(e.inputs,1),s=lt(e.inputs,2),n=lt(e.inputs,3),o=lt(e.inputs,4),l=lt(e.inputs,5),d=lt(e.inputs,6),f=lt(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(a?.dims.length===5)throw new Error("Packed KV is not implemented");let c=a&&s&&a.dims.length===4&&s.dims.length===4,h=_a(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,n,0);if(c)return Aa(e,h,a,s,o,void 0,d,f,l,r);if(!a||!s)throw new Error("key and value must be provided");let y=_a(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,a,n,r.hiddenSize),g=_a(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,s,n,2*r.hiddenSize);Aa(e,h,y,g,o,void 0,d,f,l,r)}}),Uc,Pc,Lc,qc,Mu,Lg,qg,Fg=X(()=>{"use strict";fe(),ve(),Qe(),ye(),Uc=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Pc=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),i=r.length),je({numOutputs:i,axis:t.axis,splitSizes:r})},Lc=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${se("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,qc=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let a=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(a):i===0?r.push(`if (output_number == ${i}u) { ${a} }`):i===t-1?r.push(`else { ${a} }`):r.push(`else if (output_number == ${i}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Mu=(e,t)=>{let r=e[0].dims,i=U.size(r),a=e[0].dataType,s=U.normalizeAxis(t.axis,r.length),n=new Array(t.numOutputs),o=q("input",a,r.length),l=new Array(t.numOutputs),d=[],f=[],c=0,h=[{type:12,data:i}];for(let g=0;g<t.numOutputs;g++){c+=t.splitSizes[g],l[g]=c;let _=r.slice();_[s]=t.splitSizes[g],f.push(_),n[g]=ae(`output${g}`,a,_.length),d.push({dims:f[g],dataType:e[0].dataType})}h.push({type:12,data:l},...le(r,...f));let y=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(o,...n)}
  ${Lc(l.length)}
  ${qc(n)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${se("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${o.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:h})}},Lg=(e,t)=>{Uc(e.inputs);let r=e.inputs.length===1?t:Pc(e.inputs,t);e.compute(Mu(e.inputs,r),{inputs:[0]})},qg=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return je({axis:t,numOutputs:i,splitSizes:r})}}),Fc,Gn,Gg,Wg=X(()=>{"use strict";fe(),ve(),Qe(),ye(),Fc=(e,t)=>{let[r,i,a,s]=e,{numHeads:n,rotaryEmbeddingDim:o}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!U.areEqual(i.dims,[])&&!U.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!U.areEqual(a.dims,s.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&n===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],d=r.dims[r.dims.length-2],f=a.dims[0],c=U.sizeFromDimension(r.dims,1)/d,h=o===0?a.dims[1]*2:c/n;if(o>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(l!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(d!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(d>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(h/2!==a.dims[1]&&o/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`)},Gn=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:a,scale:s}=t,n=e[0].dims[0],o=U.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],d=o/l,f=e[2].dims[1],c=a===0?f*2:d/i,h=new Array(n,l,d/c,c-f),y=U.computeStrides(h),g=[{type:1,data:s},{type:12,data:h},{type:12,data:y},...e[0].dims.length===3?new Array({type:12,data:[o,d,c,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,c,l*c,1]}):[],...le(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],_=I=>{let $=q("input",e[0].dataType,e[0].dims.length),w=q("position_ids",e[1].dataType,e[1].dims.length),T=q("cos_cache",e[2].dataType,e[2].dims.length),E=q("sin_cache",e[3].dataType,e[3].dims.length),C=ae("output",e[0].dataType,e[0].dims.length);return I.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:y.length},{name:"input_output_strides",type:"u32",length:y.length}]),`
        ${I.declareVariables($,w,T,E,C)}

        ${I.mainStart(Ai)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${I.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",ae("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${E.get("position_id","bsnh[3]")};
            ${C.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${E.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${C.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${C.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:je({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(U.size(h)/Ai)},programUniforms:g})}},Gg=(e,t)=>{Fc(e.inputs,t),e.compute(Gn(e.inputs,t))}}),Gc,Wc,su,Vc,Vg,tw=X(()=>{"use strict";Qe(),fe(),el(),Pg(),Fg(),gr(),Wg(),ye(),Gc=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],a=e[2],s=e[3],n=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,l=r.dims[0],d=r.dims[1],f=r.dims.length===3?o?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],c=d,h=0,y=!i||i.dims.length===0,g=Math.floor(y?f/(t.numHeads+2*t.kvNumHeads):f/t.numHeads);y&&(f=g*t.numHeads);let _=s&&s.dims.length!==0,I=n&&n.dims.length!==0;if(_&&s.dims.length===4&&s.dims[0]===l&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===g)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&I){if(s.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(n.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=s.dims[2]}else if(_||I)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');c=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');c=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');c=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}let w=0,T=!1,E=t.kvNumHeads?g*t.kvNumHeads:f;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(c!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=a.dims[2]}else{if(c!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');E=a.dims[1]*a.dims[3],T=!0}}let C=e.length>4?e[5]:void 0;if(C){if(C.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let S=C.dims.reduce((R,A)=>R*A,1);if(S!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${S}.`);for(let R=0;R<C.dims.length;R++)if(C.dims[R]!==1&&C.dims[R]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${R}] = ${C.dims[R]}.`)}return{batchSize:l,sequenceLength:d,pastSequenceLength:h,kvSequenceLength:c,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:f,vHiddenSize:E,headSize:g,vHeadSize:Math.floor(E/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:$}},Wc=je({perm:[0,2,1,3]}),su=(e,t,r)=>{let i=t,a=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,a,r.headSize]),i=e.compute($t(i,Wc.perm),{inputs:[i],outputs:[-1]})[0]),i},Vc=(e,t,r,i)=>{let a=7,s=["type","type"],n=[e*t],o=e*t,l=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],d=f=>{let c=q("seq_lens",r.dataType,r.dims),h=q("total_seq_lens",i.dataType,i.dims),y=ae("pos_ids",a,n),g=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${f.registerUniforms(g).declareVariables(c,h,y)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${h.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${c.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${y.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l}),getShaderSource:d}},Vg=(e,t)=>{if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let r=Gc(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,n=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,f=r.kvNumHeads?r.kvNumHeads:r.numHeads,c=je({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,f*r.headSize,f*r.headSize]}),[h,y,g]=!a&&!s?e.compute(Mu([i],c),{inputs:[i],outputs:[-1,-1,-1]}):[i,a,s],_,I;if(t.doRotary){let E=e.compute(Vc(r.batchSize,r.sequenceLength,l,d),{inputs:[l,d],outputs:[-1]})[0],C=e.inputs[7],S=e.inputs[8],R=je({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),A=[h,E,C,S],P=[-1];_=e.compute(Gn(A,R),{inputs:A,outputs:P})[0],A.splice(0,1,y);let K=je({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});I=e.compute(Gn(A,K),{inputs:A,outputs:P})[0]}let $=_a(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?_:h,void 0,0),w=su(e,t.doRotary?I:y,r),T=su(e,g,r);Aa(e,$,w,T,void 0,void 0,n,o,void 0,r,l,d)}}),ou,Hc,Kc,Hg,rw=X(()=>{"use strict";fe(),ve(),gr(),ye(),ou=(e,t,r,i,a,s,n,o)=>{let l=Ze(s),d=l===1?"f32":`vec${l}f`,f=l===1?"vec2f":`mat2x${l}f`,c=a*n,h=64;c===1&&(h=256);let y=[a,n,s/l],g=[a,n,2],_=["rank","type","type"],I=[];I.push(...le(y,g));let $=w=>{let T=q("x",t.dataType,3,l),E=q("scale",r.dataType,r.dims),C=q("bias",i.dataType,i.dims),S=ae("output",1,3,2),R=[T,E,C,S];return`
  var<workgroup> workgroup_shared : array<${f}, ${h}>;
  const workgroup_size = ${h}u;
  ${w.declareVariables(...R)}
  ${w.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${T.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${f}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${mr("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${mr("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${o};${h}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:g,dataType:1}],dispatchGroup:{x:c},programUniforms:I}),getShaderSource:$},{inputs:[t,r,i],outputs:[-1]})[0]},Hc=(e,t,r)=>{let i=t[0].dims,a=i,s=2,n=i[0],o=i[1],l=U.sizeFromDimension(i,s),d=Ze(l),f=U.size(a)/d,c=ou(e,t[0],t[1],t[2],n,l,o,r.epsilon),h=[n,o,l/d],y=[n,o],g=["type","none"],_=I=>{let $=q("x",t[0].dataType,h.length,d),w=q("scale_shift",1,y.length,2),T=ae("output",t[0].dataType,h.length,d),E=[$,w,T];return`
  ${I.registerUniform("output_size","u32").declareVariables(...E)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...le(h,y,h)]}),getShaderSource:_},{inputs:[t[0],c]})},Kc=(e,t,r)=>{let i=t[0].dims,a=i,s=i[0],n=i[i.length-1],o=U.sizeFromDimension(i,1)/n,l=Ze(n),d=U.size(a)/l,f=[{type:12,data:o},{type:12,data:Math.floor(n/l)}],c=["type","type"],h=!1,y=[0,i.length-1];for(let $=0;$<i.length-2;$++)h=h||i[$+1]!==1,y.push($+1);h=h&&i[i.length-1]!==1;let g=h?e.compute($t(e.inputs[0],y),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},($,w)=>i[y[w]])),_=ou(e,g,t[1],t[2],s,o,n,r.epsilon),I=$=>{let w=et(t[0].dataType),T=l===1?"vec2f":`mat${l}x2f`,E=R=>{let A=R===0?"x":"y",P=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${w}(${P}(scale.${A}))`;case 2:return`vec2<${w}>(${P}(scale[0].${A}, scale[1].${A}))`;case 4:return`vec4<${w}>(${P}(scale[0].${A}, scale[1].${A}, scale[2].${A}, scale[3].${A}))`;default:throw new Error(`Not supported compoents ${l}`)}},C=q("input",t[0].dataType,t[0].dims,l),S=ae("output",t[0].dataType,a,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${C.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${S.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${E(0)}, ${E(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f}),getShaderSource:I},{inputs:[t[0],_]})},Hg=(e,t)=>{t.format==="NHWC"?Kc(e,e.inputs,t):Hc(e,e.inputs,t)}}),Xc,Zc,Kg,iw=X(()=>{"use strict";fe(),ve(),ye(),Xc=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Zc=(e,t,r)=>{let i=t.simplified,a=e[0].dims,s=e[1],n=!i&&e[2],o=a,l=U.normalizeAxis(t.axis,a.length),d=U.sizeToDimension(a,l),f=U.sizeFromDimension(a,l),c=U.size(s.dims),h=n?U.size(n.dims):0;if(c!==f||n&&h!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${h}`);let y=[];for(let C=0;C<a.length;++C)C<l?y.push(a[C]):y.push(1);let g=Ze(f),_=["type","type"],I=[{type:12,data:d},{type:1,data:f},{type:12,data:Math.floor(f/g)},{type:1,data:t.epsilon}];n&&_.push("type");let $=r>1,w=r>2,T=C=>{let S=et(e[0].dataType),R=[q("x",e[0].dataType,e[0].dims,g),q("scale",s.dataType,s.dims,g)];n&&R.push(q("bias",n.dataType,n.dims,g)),R.push(ae("output",e[0].dataType,o,g)),$&&R.push(ae("mean_data_output",1,y)),w&&R.push(ae("inv_std_output",1,y));let A=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${C.registerUniforms(A).declareVariables(...R)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Su("f32",g)};
    var mean_square_vector = ${Su("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${xi(S,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${mr("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${mr("mean_square_vector",g)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${xi(S,g,"x[j + offset]")};
      let f32scale = ${xi(S,g,"scale[j]")};
      output[j + offset] = ${R[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${n?`+ ${xi(S,g,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},E=[{dims:o,dataType:e[0].dataType}];return $&&E.push({dims:y,dataType:1}),w&&E.push({dims:y,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${r};${i}`,inputDependencies:_},getRunData:()=>({outputs:E,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:I}),getShaderSource:T}},Kg=(e,t)=>{Xc(e.inputs),e.compute(Zc(e.inputs,t,e.outputCount))}}),Qc,Xg,aw=X(()=>{"use strict";ve(),nl(),sl(),Qc=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Xg=e=>{Qc(e.inputs);let t=$i.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(al(e.inputs,{activation:""},t));else{let a=t[t.length-2],s=U.size(e.inputs[0].dims.slice(0,-2)),n=U.size(e.inputs[1].dims.slice(0,-2));if(s!==1&&a===1&&n===1){let o=e.inputs[0].reshape([1,s,i]),l=e.inputs[1].reshape([1,i,r]),d=[1,s,r],f=[o,l];e.compute(Fn(f,{activation:""},t,d),{inputs:f})}else e.compute(Fn(e.inputs,{activation:""},t))}}}),Yc,Jc,ef,Zg,Qg,nw=X(()=>{"use strict";fe(),ve(),Qe(),ye(),Yc=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,n=e[1];if(!U.areEqual(n.dims,[t.n,a,s]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(U.size(o)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,d=t.n*(t.bits===8?a:Math.floor((a*t.bits+7)/8));if(U.size(l)!==d)throw new Error("zeroPoints input size error.")}},Jc=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],s=t.k,n=t.n,o=r.slice(0,i-2),l=U.size(o),d=e[1].dims[2]/4,f=e[0].dataType,c=Ze(t.k),h=Ze(d),y=Ze(n),g=o.concat([a,n]),_=a>1&&n/y%2===0?2:1,I=U.size(g)/y/_,$=64,w=[],T=[l,a,s/c],E=U.convertShape(e[1].dims).slice();E.splice(-1,1,d/h),w.push(...le(T)),w.push(...le(E)),w.push(...le(e[2].dims)),e.length===4&&w.push(...le(U.convertShape(e[3].dims)));let C=[l,a,n/y];w.push(...le(C));let S=R=>{let A=T.length,P=q("a",e[0].dataType,A,c),K=q("b",12,E.length,h),Y=q("scales",e[2].dataType,e[2].dims.length),L=[P,K,Y],H=e.length===4?q("zero_points",12,e[3].dims.length):void 0;H&&L.push(H);let me=C.length,O=ae("output",e[0].dataType,me,y),W=et(e[0].dataType),ue=(()=>{switch(c){case 1:return`array<${W}, 8>`;case 2:return`mat4x2<${W}>`;case 4:return`mat2x4<${W}>`;default:throw new Error(`${c}-component is not supported.`)}})(),ne=Math.floor(32/t.bits),te=Math.floor(ne/8),ie=()=>{let ee="";for(let J=0;J<te;J++){let Re=J*t.bits*4,Ue=Re+t.bits;ee+=`
          // reuse a data (pass ${J})
            var input_offset${J>0?J:""} = ${J===0?P.indicesToOffset(`${P.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${J>0?J:""}: ${ue};
            for (var j${J>0?J:""}: u32 = 0; j${J>0?J:""} < ${8/c}; j${J>0?J:""}++) {
              a_data${J>0?J:""}[j${J>0?J:""}] = ${P.getByOffset(`input_offset${J>0?J:""}`)};
              input_offset${J>0?J:""}++;
            }
          `;for(let Ee=0;Ee<y*_;Ee++)ee+=`
            b_value = ${h===1?`b${Ee}_data`:`b${Ee}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${J*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${Re}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Ue}u) & b_mask);`}
            b_quantized_values = ${ue}(${Array.from({length:4},(Me,de)=>`${W}(b_value_lower[${de}]), ${W}(b_value_upper[${de}])`).join(", ")});
            b_dequantized_values = ${c===1?`${ue}(${Array.from({length:8},(Me,de)=>`(b_quantized_values[${de}] - ${H?`zero_point${Ee}`:"zero_point"}) * scale${Ee}`).join(", ")});`:`(b_quantized_values - ${ue}(${Array(8).fill(`${H?`zero_point${Ee}`:"zero_point"}`).join(",")})) * scale${Ee};`};
            workgroup_shared[local_id.x * ${_} + ${Math.floor(Ee/y)}]${y>1?`[${Ee%y}]`:""} += ${Array.from({length:8/c},(Me,de)=>`${c===1?`a_data${J>0?J:""}[${de}] * b_dequantized_values[${de}]`:`dot(a_data${J>0?J:""}[${de}], b_dequantized_values[${de}])`}`).join(" + ")};
          `}return ee},G=()=>{let ee=`
            var col_index = col * ${y};
            ${H?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${W}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let J=0;J<y*_;J++)ee+=`
            let scale${J} = ${Y.getByOffset("col_index * nBlocksPerCol + block")};
            ${H?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${H.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${J} = ${W}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return ee},oe=()=>{let ee=`col_index = col * ${y};`;for(let J=0;J<y*_;J++)ee+=`
            let b${J}_data = ${K.getByIndices(`${K.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return ee+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ue};
            var b_dequantized_values: ${ue};`,ee};return`
        var<workgroup> workgroup_shared: array<${O.type.value}, ${_*$}>;
        ${R.declareVariables(...L,O)}
        ${R.mainStart([$,1,1])}
          let output_indices = ${O.offsetToIndices(`(global_idx / ${$}) * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${$}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/c};
            ${G()}
            for (var word: u32 = 0; word < ${d}; word += ${h}) {
              ${oe()}
              for (var i: u32 = 0; i < ${h}; i++) {
                ${ie()}
                word_offset += ${ne/c};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${_}) {
            var output_value: ${O.type.value} = ${O.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${$}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${_};
            }
            ${O.setByIndices(`${O.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${c};${h};${y};${_};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:f}],dispatchGroup:{x:I},programUniforms:w}),getShaderSource:S}},ef=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],s=t.k,n=t.n,o=r.slice(0,i-2),l=U.size(o),d=e[1].dims[2]/4,f=e[0].dataType,c=Ze(t.k),h=Ze(d),y=o.concat([a,n]),g=128,_=n%8===0?8:n%4===0?4:1,I=g/_,$=Math.floor(32/t.bits),w=I*h*$,T=w/c,E=w/t.blockSize,C=U.size(y)/_,S=[],R=[l,a,s/c],A=U.convertShape(e[1].dims).slice();A.splice(-1,1,d/h),S.push(...le(R)),S.push(...le(A)),S.push(...le(e[2].dims)),e.length===4&&S.push(...le(U.convertShape(e[3].dims)));let P=[l,a,n];S.push(...le(P));let K=Y=>{let L=R.length,H=q("a",e[0].dataType,L,c),me=q("b",12,A.length,h),O=q("scales",e[2].dataType,e[2].dims.length),W=[H,me,O],ue=e.length===4?q("zero_points",12,e[3].dims.length):void 0;ue&&W.push(ue);let ne=P.length,te=ae("output",e[0].dataType,ne),ie=et(e[0].dataType),G=()=>{switch(c){case 1:return`
          let a_data0 = vec4<${ie}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ie}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ie}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ie}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${c}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${H.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${te.type.value}, ${I}>, ${_}>;
        ${Y.declareVariables(...W,te)}
        ${Y.mainStart([I,_,1])}
          let output_indices = ${te.offsetToIndices(`workgroup_index * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${E} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${T};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${T}; a_offset += ${g})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${H.getByIndices(`${H.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${H.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${E} + local_id.x;
            ${ue?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${ue.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ie}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${ie}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${O.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${me.getByIndices(`${me.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/c};
            for (var i: u32 = 0; i < ${h}; i++) {
              let b_value = ${h===1?"b_data":"b_data[i]"};
              ${(()=>{let oe=Math.floor($/8),ee="";for(let J=0;J<oe;J++){let Re=J*t.bits*4,Ue=Re+t.bits;ee+=`
              ${G()}
              {${t.bits===2?`
                let half_word = b_value >> ${J*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${Re}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Ue}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${ie}>(${Array.from({length:4},(Ee,Me)=>`${ie}(b_value_lower[${Me}]), ${ie}(b_value_upper[${Me}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${ie}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Ee,Me)=>`${`dot(a_data${Me}, b_dequantized_values[${Me}])`}`).join(" + ")};
              }
              word_offset += ${8/c};`}return ee})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${_}) {
            var output_value: ${te.type.value} = ${te.type.value}(0);
            for (var b = 0u; b < ${I}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${te.setByIndices(`${te.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${c};${h};${I};${_}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:f}],dispatchGroup:{x:C},programUniforms:S}),getShaderSource:K}},Zg=(e,t)=>{Yc(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(ef(e.inputs,t)):e.compute(Jc(e.inputs,t))},Qg=e=>je(e)}),tf,rf,af,nf,sf,of,uf,lf,Yg,sw=X(()=>{"use strict";fe(),ve(),ye(),tf=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},rf=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
            k = i32(${e.indicesGet("indices",a)}) - ${se("uniforms.pads",a,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${se("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${se("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},af=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${se("uniforms.pads",a,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${se("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${se("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${se("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},nf=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${se("uniforms.pads",a,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${se("uniforms.x_shape",a,t)})) {
                  k = i32(${se("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${se("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},sf=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${se("uniforms.pads",a,r)};
                if (k < 0)  {
                  k += i32(${se("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${se("uniforms.x_shape",a,t)})) {
                  k -= i32(${se("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${se("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},of=(e,t,r)=>{switch(r.mode){case 0:return rf(e,t,r.pads.length);case 1:return af(e,t,r.pads.length);case 2:return nf(e,t,r.pads.length);case 3:return sf(e,t,r.pads.length);default:throw new Error("Invalid mode")}},uf=(e,t)=>{let r=U.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,a=U.size(r),s=[{type:12,data:a},{type:6,data:t.pads}],n=e.length>=3&&e[2].data;t.mode===0&&s.push({type:n?e[2].dataType:1,data:t.value}),s.push(...le(e[0].dims,r));let o=["rank"],l=d=>{let f=ae("output",e[0].dataType,r.length),c=q("x",e[0].dataType,i.length),h=c.type.value,y=of(f,i.length,t),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&g.push({name:"constant_value",type:n?h:"f32"}),`
            ${d.registerUniforms(g).declareVariables(c,f)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${y}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${n}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(U.size(r)/64)},programUniforms:s}),getShaderSource:l}},lf=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,s=new Int32Array(2*a).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let l=0;l<o.length;l++)s[Number(o[l])]=Number(r[l]),s[Number(o[l])+a]=Number(r[l+o.length])}else r.forEach((o,l)=>s[Number(l)]=Number(o));let n=[];return s.forEach(o=>n.push(o)),{mode:t.mode,value:i,pads:n}}else return t},Yg=(e,t)=>{tf(e.inputs);let r=lf(e.inputs,t);e.compute(uf(e.inputs,r),{inputs:[0]})}}),ma,uu,lu,du,pu,df,pf,cu,fu,Jg,ev,hu,tv,rv,mu,iv,av,nv,sv,ow=X(()=>{"use strict";It(),fe(),ve(),ye(),ma=e=>{if(Ve.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},uu=(e,t,r)=>{let i=t.format==="NHWC",a=e.dims.slice();i&&a.splice(1,0,a.pop());let s=Object.hasOwnProperty.call(t,"dilations"),n=t.kernelShape.slice(),o=t.strides.slice(),l=s?t.dilations.slice():[],d=t.pads.slice();Ln.adjustPoolAttributes(r,a,n,o,l,d);let f=Ln.computePoolOutputShape(r,a,o,l,n,d,t.autoPad,t.ceilMode),c=Object.assign({},t);s?Object.assign(c,{kernelShape:n,strides:o,pads:d,dilations:l,cacheKey:t.cacheKey}):Object.assign(c,{kernelShape:n,strides:o,pads:d,cacheKey:t.cacheKey});let h=f.slice();return h.push(h.splice(1,1)[0]),[c,i?h:f]},lu=(e,t)=>{let r=t.format==="NHWC",i=U.size(e),a=U.size(t.kernelShape),s=[{type:12,data:i},{type:12,data:a}],n=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],f=t.pads[t.pads.length-1],c=!!(d+f);s.push({type:12,data:o},{type:12,data:l},{type:12,data:d},{type:12,data:f}),n.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(t.kernelShape.length===2){let y=t.kernelShape[t.kernelShape.length-2],g=t.strides[t.strides.length-2],_=t.pads[t.pads.length/2-2],I=t.pads[t.pads.length-2];h=!!(_+I),s.push({type:12,data:y},{type:12,data:g},{type:12,data:_},{type:12,data:I}),n.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[s,n,!0,c,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=U.computeStrides(t.kernelShape);s.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),n.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((d,f)=>d+f);return[s,n,!!l,!1,!1]}},du=(e,t,r,i,a,s,n,o,l,d,f,c)=>{let h=a.format==="NHWC",y=t.type.value,g=ae("output",t.type.tensor,i);if(a.kernelShape.length<=2){let _="",I="",$="",w=r-(h?2:1);if(f?_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`:_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`,a.kernelShape.length===2){let T=r-(h?3:2);c?I=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:I=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,g)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var value = ${y}(${o});
              var pad = 0;
              ${I}
              ${_}
              ${$}
              ${n}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=a.kernelShape.length,I=a.pads.length,$="";return d?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${s}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${e.registerUniforms(l).declareVariables(t,g)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var offsets: array<u32, ${_}>;

              var value = ${y}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${_-1}u; j++) {
                  offsets[j] = offset / ${se("uniforms.kernelStrides","j",_)};
                  offset -= offsets[j] * ${se("uniforms.kernelStrides","j",_)};
                }
                offsets[${_-1}] = offset;

                isPad = false;
                for (var j = ${r-_}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${se("uniforms.strides",`j - ${r-_}u`,_)}
                    + offsets[j - ${r-_}u] - ${se("uniforms.pads","j - 2u",I)};
                  ${$}
              }
              ${n}

              output[global_idx] = value;
            }`}},pu=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,df=e=>`${pu(e)};${e.countIncludePad}`,pf=e=>`${pu(e)};${e.storageOrder};${e.dilations}`,cu=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),fu=(e,t,r,i)=>{let[a,s]=uu(t,i,r),n=q("x",t.dataType,t.dims.length),o=n.type.value,l="value += x_val;",d="";a.countIncludePad?d+=`value /= ${o}(uniforms.kernelSize);`:d+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[f,c,h,y,g]=lu(s,a);f.push(...le(t.dims,s));let _=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${h};${y};${g}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(U.size(s)/64)},programUniforms:f}),getShaderSource:I=>du(I,n,t.dims.length,s.length,a,l,d,0,c,h,y,g)}},Jg=e=>{let t=e.count_include_pad!==0,r=cu(e);if(r.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:df(i)}},ev=(e,t)=>{ma(e.inputs),e.compute(fu("AveragePool",e.inputs[0],!1,t))},hu={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},tv=e=>{let t=e.format;return{format:t,...hu,cacheKey:t}},rv=(e,t)=>{ma(e.inputs),e.compute(fu("GlobalAveragePool",e.inputs[0],!0,t))},mu=(e,t,r,i)=>{let[a,s]=uu(t,i,r),n=`
      value = max(x_val, value);
    `,o="",l=q("x",t.dataType,t.dims.length),d=["rank"],[f,c,h,y,g]=lu(s,a);return f.push(...le(t.dims,s)),{name:e,shaderCache:{hint:`${i.cacheKey};${h};${y};${g}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(U.size(s)/64)},programUniforms:f}),getShaderSource:_=>du(_,l,t.dims.length,s.length,a,n,o,t.dataType===10?-65504:-1e5,c,h,y,g)}},iv=(e,t)=>{ma(e.inputs),e.compute(mu("MaxPool",e.inputs[0],!1,t))},av=e=>{let t=e.storage_order,r=e.dilations,i=cu(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let a={storageOrder:t,dilations:r,...i,cacheKey:""};return{...a,cacheKey:pf(a)}},nv=e=>{let t=e.format;return{format:t,...hu,cacheKey:t}},sv=(e,t)=>{ma(e.inputs),e.compute(mu("GlobalMaxPool",e.inputs[0],!0,t))}}),cf,ff,ov,uv,uw=X(()=>{"use strict";fe(),ve(),Qe(),ye(),cf=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,s)=>s===t.axis||a===e[0].dims[s]).reduce((a,s)=>a&&s,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},ff=(e,t)=>{let r=U.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,a=i===3,s=e[0].dims,n=e[1].dataType,o=U.size(s),l=i===3||i===2,d=l?[Math.ceil(U.size(e[0].dims)/4)]:e[0].dims,f=e[1].dims,c=e.length>2?e[2]:void 0,h=c?l?[Math.ceil(U.size(c.dims)/4)]:c.dims:void 0,y=f.length===0||f.length===1&&f[0]===1,g=y===!1&&f.length===1,_=Ze(o),I=y&&(!l||_===4),$=I?_:1,w=I&&!l?_:1,T=q("input",l?12:i,d.length,w),E=q("scale",n,f.length),C=c?q("zero_point",l?12:i,h.length):void 0,S=ae("output",n,s.length,$),R=[T,E];C&&R.push(C);let A=[d,f];c&&A.push(h);let P=[{type:12,data:o/$},{type:12,data:r},{type:12,data:t.blockSize},...le(...A,s)],K=Y=>{let L=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Y.registerUniforms(L).declareVariables(...R,S)}
      ${Y.mainStart()}
          ${Y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${S.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${y?`let scale_value= ${E.getByOffset("0")}`:g?`
            let scale_index = ${S.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${E.getByOffset("scale_index")};`:`
            var scale_indices: ${E.type.indices} = output_indices;
            let index = ${E.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${E.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${E.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${C?y?l?`
                let zero_point_input = ${C.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${C.getByOffset("0")}`:g?l?`
                let zero_point_index = ${S.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${C.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${S.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${C.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${E.indicesToOffset("scale_indices")};
                let zero_point_input = ${C.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${C.getByIndices("scale_indices")};`:`let zero_point_value = ${l?a?"i32":"u32":T.type.value}(0);`};
      // Compute and write output
      ${S.setByOffset("global_idx",`${S.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:C?["rank","rank","rank"]:["rank","rank"]},getShaderSource:K,getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(o/$/64),y:1,z:1},programUniforms:P})}},ov=(e,t)=>{cf(e.inputs,t),e.compute(ff(e.inputs,t))},uv=e=>je({axis:e.axis,blockSize:e.blockSize})}),hf,mf,lv,lw=X(()=>{"use strict";It(),fe(),ye(),hf=(e,t,r)=>{let i=e===t,a=e<t&&r<0,s=e>t&&r>0;if(i||a||s)throw new Error("Range these inputs' contents are invalid.")},mf=(e,t,r,i)=>{let a=Math.abs(Math.ceil((t-e)/r)),s=[a],n=a,o=[{type:12,data:n},{type:i,data:e},{type:i,data:r},...le(s)],l=d=>{let f=ae("output",i,s.length),c=f.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${d.registerUniforms(h).declareVariables(f)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:o})}},lv=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),Ve.webgpu.validateInputContent&&hf(t,r,i),e.compute(mf(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),gf,vf,dv,pv,dw=X(()=>{"use strict";fe(),ve(),Qe(),ye(),gf=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,s=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${a}bitcast<${i}>(oldValue) + (${r})${s}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${a}max(bitcast<f32>(oldValue), (${r}))${s}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${a}min(bitcast<${i}>(oldValue), (${r}))${s}`;case"mul":return`${a}(bitcast<${i}>(oldValue) * (${r}))${s}`;default:throw new Error(`Reduction ${e} is not supported.`)}},vf=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r,s=1,n=Math.ceil(U.sizeToDimension(i,i.length-1)/s),o=i[i.length-1],l=U.sizeFromDimension(r,o),d=[{type:12,data:n},{type:12,data:o},{type:12,data:l},...le(e[1].dims,e[2].dims,a)],f=c=>{let h=q("indices",e[1].dataType,e[1].dims.length),y=q("updates",e[2].dataType,e[2].dims.length,s),g=t.reduction!=="none"&&t.reduction!==""?Mh("output",e[0].dataType,a.length):ae("output",e[0].dataType,a.length,s);return`
      ${c.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(h,y,g)}
      ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${gf(t.reduction,"output[data_offset + i]","value",g.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:d}),getShaderSource:f}},dv=e=>je({reduction:e.reduction}),pv=(e,t)=>{e.compute(vf(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),bf,yf,wf,gu,_f,xf,$f,Af,kf,Tf,Sf,Ef,vu,If,Cf,zf,Bf,jf,cv,fv,pw=X(()=>{"use strict";fe(),ve(),Qe(),ye(),bf=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},yf=(e,t,r)=>{t.every(a=>a>=0&&a<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((a,s)=>i[a]=e[s]),i},wf=(e,t,r,i,a,s)=>{let[n,o,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(n>0&&e.length>n&&e[n].dims.length>0)e[n].getFloat32Array().forEach(f=>s.push(f));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(f=>i.push(f)),i.length!==0&&i.length!==d&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");bf(i,t),t.axes.length>0&&yf(i,t.axes,d).forEach((f,c)=>i[c]=f)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(f=>a.push(Number(f))),a.length!==0&&a.length!==d&&r>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof a<"u"&&i.length>0&&a.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},gu=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,_f=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${gu("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${gu("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",xf=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",$f=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),a=e.length===0?i:e.slice();return t.length>0?(t.forEach((s,n)=>{i[s]=a[n],i[n+r]=a[t.length+n]}),i):a},Af=(e,t,r,i)=>{let a=[];if(r.length>0)if(i.length>0){if(e.forEach(s=>a.push(s)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((s,n)=>a[s]=r[n])}else r.forEach(s=>a.push(s));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((s,n)=>Math.round(s*t[n]))}return a},kf=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(s=>t[s]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(s=>t[s]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return r.axes.length>0?(r.axes.forEach(s=>t[s]=i),r.axes.forEach(s=>a[s]=Math.round(e[s]*t[s]))):(t.fill(i,0,t.length),a.forEach((s,n)=>a[n]=Math.round(s*t[n]))),a},Tf=(e,t,r,i,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${se("uniforms.scales","i",i)};
        var roi_low = ${se("uniforms.roi","i",a)};
        var roi_hi = ${se("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${se("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${se("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Sf=(e,t,r,i,a,s,n)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${se("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${se("uniforms.roi","i",s)};
          var roi_hi = ${se("uniforms.roi",`i + ${r.length}`,s)};
          var input_shape_i = ${se("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${se("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${n} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Ef=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${se("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,vu=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",If=(e,t,r,i,a)=>{let[s,n,o,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",n,`max(0, min(row, ${r[n]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${r[o]} - 1))`)};
      ${vu(e,l,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${n}];
      var col:${d} = originalIndices[${o}];
      ${i?`if (row < 0 || row > (${r[n]} - 1) || col < 0 || col > (${r[o]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${r[n]} - 1));
      col = max(0, min(col, ${r[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Cf=(e,t,r,i,a,s,n,o,l,d)=>{let f=r.length===2,c=!0,[h,y]=f?[0,1]:c?[2,3]:[1,2],g=e.type.value,_=I=>{let $=I===h?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${g} {
        var output_index = ${t.indicesGet("output_indices",I)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[I]},
        ${i[I]}, ${r[I]}, ${s[I]}, ${s[I]} + ${r.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${r[I]} - 1))) {
          return ${l};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${g} = originalIdx + ${g}(i);
          if (${$} < 0 || ${$} >= ${r[I]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${l};`:`${$} = max(0, min(${$}, ${r[I]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",I,`u32(${$})`)};
          data[i + 1] = ${I===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(h)};
    ${_(y)};
  fn getCubicInterpolationCoefs(s: ${g}) -> array<${g}, 4> {
    var absS = abs(s);
    var coeffs: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${g} = 1.0 - absS;
    var twoMinusAbsS: ${g} = 2.0 - absS;
    var onePlusAbsS: ${g} = 1.0 + absS;
    coeffs[0] = ((${n} * onePlusAbsS - 5 * ${n}) * onePlusAbsS + 8 * ${n}) * onePlusAbsS - 4 * ${n};
    coeffs[1] = ((${n} + 2) * absS - (${n} + 3)) * absS * absS + 1;
    coeffs[2] = ((${n} + 2) * oneMinusAbsS - (${n} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${n} * twoMinusAbsS - 5 * ${n}) * twoMinusAbsS + 8 * ${n}) * twoMinusAbsS - 4 * ${n};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${g}, 4>, coefs: array<${g}, 4>) -> ${g} {
    var coefsSum: ${g} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${g} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},zf=(e,t,r,i,a)=>{let[s,n,o,l,d]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",n,`max(0, min(depth, ${r[n]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${vu(e,d,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${n}];
      var height:${f} = originalIndices[${o}];
      var width:${f} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${r[n]} - 1) || height < 0 || height > (${r[o]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${r[n]} - 1));
      height = max(0, min(height, ${r[o]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${f} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${f} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${f} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${f} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${f} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${f} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${f} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${f} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${f} = abs(depth - ${f}(depth1));
      var dx2: ${f} = abs(${f}(depth2) - depth);
      var dy1: ${f} = abs(height - ${f}(height1));
      var dy2: ${f} = abs(${f}(height2) - height);
      var dz1: ${f} = abs(width - ${f}(width1));
      var dz2: ${f} = abs(${f}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Bf=(e,t,r,i,a,s)=>{let n=e.dims,o=$f(s,t.axes,n.length),l=Af(n,i,a,t.axes),d=i.slice();i.length===0&&(d=n.map((w,T)=>w===0?1:l[T]/w),t.keepAspectRatioPolicy!=="stretch"&&(l=kf(n,d,t)));let f=ae("output",e.dataType,l.length),c=q("input",e.dataType,n.length),h=U.size(l),y=n.length===l.length&&n.every((w,T)=>w===l[T]),g=t.coordinateTransformMode==="tf_crop_and_resize",_=t.extrapolationValue,I=c.type.value,$=w=>`
      ${y?"":`
      ${_f(t.coordinateTransformMode,I)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Ef(c,n)};
              ${xf(t.nearestMode,r,I)};
              ${Sf(c,f,n,l,d.length,o.length,g)};
              `;case"linear":return`
              ${Tf(f,n,l,d.length,o.length)};
              ${(()=>{if(n.length===2||n.length===4)return`${If(c,f,n,g,_)}`;if(n.length===3||n.length===5)return`${zf(c,f,n,g,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(n.length===2||n.length===4)return`${Cf(c,f,n,l,d,o,t.cubicCoeffA,g,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",o.length).declareVariables(c,f)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${y?"output[global_idx] = input[global_idx];":`
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${n.length===2||n.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${a.length>0?a:""}|${o.length>0?o:""}|${y}|${t.mode==="nearest"?n.length:n}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:d},{type:1,data:o},...le(n,l)]})}},jf=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},cv=(e,t)=>{let r=[],i=[],a=[],s=jf(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");wf(e.inputs,t,s,r,i,a),e.compute(Bf(e.inputs[0],t,s,r,i,a),{inputs:[0]})},fv=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,a=e.cubicCoeffA,s=e.excludeOutside!==0,n=e.extrapolationValue,o=e.keepAspectRatioPolicy,l=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return je({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:a,excludeOutside:s,extrapolationValue:n,keepAspectRatioPolicy:o,mode:l,nearestMode:d})}}),Of,Rf,hv,cw=X(()=>{"use strict";fe(),ve(),ye(),Of=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==s)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let n=e[3];if(n.dims.length!==1)throw new Error("Beta must be 1D");if(n.dims[n.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let n=e[4];if(n.dims.length!==1)throw new Error("Bias must be 1D");if(n.dims[n.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},Rf=(e,t,r,i)=>{let a=t.simplified,s=e[0].dims,n=U.size(s),o=s,l=n,d=s.slice(-1)[0],f=i?s.slice(0,-1).concat(1):[],c=!a&&e.length>3,h=e.length>4,y=i&&r>1,g=i&&r>2,_=r>3,I=64,$=Ze(d),w=[{type:12,data:l},{type:12,data:$},{type:12,data:d},{type:1,data:t.epsilon}],T=C=>{let S=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],R=[q("x",e[0].dataType,e[0].dims,$),q("skip",e[1].dataType,e[1].dims,$),q("gamma",e[2].dataType,e[2].dims,$)];c&&R.push(q("beta",e[3].dataType,e[3].dims,$)),h&&R.push(q("bias",e[4].dataType,e[4].dims,$)),R.push(ae("output",e[0].dataType,o,$)),y&&R.push(ae("mean_output",1,f)),g&&R.push(ae("inv_std_output",1,f)),_&&R.push(ae("input_skip_bias_sum",e[0].dataType,o,$));let A=et(e[0].dataType),P=et(1,$);return`

      ${C.registerUniforms(S).declareVariables(...R)}
      var<workgroup> sum_shared : array<${P}, ${I}>;
      var<workgroup> sum_squared_shared : array<${P}, ${I}>;

      ${C.mainStart([I,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${I};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${I};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${I-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":A+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${_?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${xi(A,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${I};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${mr("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${mr("square_sum",$)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${y?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${A}(mean)`}) *
            ${A}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},E=[{dims:o,dataType:e[0].dataType}];return r>1&&E.push({dims:f,dataType:1}),r>2&&E.push({dims:f,dataType:1}),r>3&&E.push({dims:s,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${y};${g};${_}`,inputDependencies:e.map((C,S)=>"type")},getShaderSource:T,getRunData:()=>({outputs:E,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:w})}},hv=(e,t)=>{Of(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Rf(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Mf,ga,Df,bu,Nf,Uf,mv,gv,fw=X(()=>{"use strict";fe(),ve(),Qe(),ye(),Mf=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},ga=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Df=(e,t)=>{if(e.length>1){let r=ga(e,1),i=ga(e,2),a=ga(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),je({starts:r,ends:i,axes:a})}else return t},bu=(e,t,r,i,a)=>{let s=e;return e<0&&(s+=r[i[t]]),a[t]<0?Math.max(0,Math.min(s,r[i[t]]-1)):Math.max(0,Math.min(s,r[i[t]]))},Nf=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${se("uniforms.input_shape","i",r.length)};
            let steps_i = ${se("uniforms.steps","i",r.length)};
            let signs_i = ${se("uniforms.signs","i",r.length)};
            let starts_i = ${se("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Uf=(e,t)=>{let r=e[0].dims,i=U.size(r),a=t.axes.length>0?U.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],s=ga(e,4);s.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),s.length===0&&(s=Array(a.length).fill(1));let n=t.starts.map(($,w)=>bu($,w,r,a,s)),o=t.ends.map(($,w)=>bu($,w,r,a,s));if(a.length!==n.length||a.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==r.length)for(let $=0;$<r.length;++$)a.includes($)||(n.splice($,0,0),o.splice($,0,r[$]),s.splice($,0,1));let l=s.map($=>Math.sign($));s.forEach(($,w,T)=>{if($<0){let E=(o[w]-n[w])/$,C=n[w],S=C+E*s[w];n[w]=S,o[w]=C,T[w]=-$}});let d=r.slice(0);a.forEach(($,w)=>{d[$]=Math.ceil((o[$]-n[$])/s[$])});let f={dims:d,dataType:e[0].dataType},c=ae("output",e[0].dataType,d.length),h=q("input",e[0].dataType,e[0].dims.length),y=U.size(d),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:n.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:s.length}],_=[{type:12,data:y},{type:12,data:n},{type:6,data:l},{type:12,data:s},...le(e[0].dims,d)],I=$=>`
      ${$.registerUniforms(g).declareVariables(h,c)}
        ${Nf(h,c,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${n.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:I,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:_})}},mv=(e,t)=>{Mf(e.inputs,t);let r=Df(e.inputs,t);e.compute(Uf(e.inputs,r),{inputs:[0]})},gv=e=>{let t=e.starts,r=e.ends,i=e.axes;return je({starts:t,ends:r,axes:i})}}),Pf,Lf,vv,bv,hw=X(()=>{"use strict";fe(),ve(),Qe(),gr(),ye(),Pf=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Lf=(e,t)=>{let r=e.inputs[0],i=r.dims,a=U.size(i),s=i.length,n=U.normalizeAxis(t.axis,s),o=n<i.length-1,l,d=[];o?(d=Array.from({length:s},(R,A)=>A),d[n]=s-1,d[s-1]=n,l=e.compute($t(r,d),{inputs:[r],outputs:[-1]})[0]):l=r;let f=l.dims,c=f[s-1],h=a/c,y=Ze(c),g=c/y,_=64;h===1&&(_=256);let I=(R,A)=>A===4?`max(max(${R}.x, ${R}.y), max(${R}.z, ${R}.w))`:A===2?`max(${R}.x, ${R}.y)`:A===3?`max(max(${R}.x, ${R}.y), ${R}.z)`:R,$=q("x",l.dataType,l.dims,y),w=ae("result",l.dataType,l.dims,y),T=$.type.value,E=et(l.dataType)==="f32"?`var threadMax = ${T}(-3.4028234663852886e+38f);`:`var threadMax = ${T}(-65504.0h);`,C=R=>`
      var<workgroup> rowMaxShared : ${T};
      var<workgroup> rowSumShared : ${T};
      var<workgroup> threadShared : array<${T}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${T} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${T}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${R.registerUniform("packedCols","i32").declareVariables($,w)}
      ${R.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${E}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${T}(${I("threadShared[0]",y)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${T}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${T}(${mr("threadShared[0]",y)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${T}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,S=e.compute({name:"Softmax",shaderCache:{hint:`${y};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:f,dataType:l.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:g}]}),getShaderSource:C},{inputs:[l],outputs:[o?-1:0]})[0];o&&e.compute($t(S,d),{inputs:[S]})},vv=(e,t)=>{Pf(e.inputs),Lf(e,t)},bv=e=>je({axis:e.axis})}),yu,qf,Ff,Gf,yv,mw=X(()=>{"use strict";fe(),ve(),ye(),yu=e=>Array.from(e.getBigInt64Array(),Number),qf=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(yu(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Ff=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},Gf=(e,t)=>{let r=e[0].dims,i=t??yu(e[1]),a=Ff(r,i),s=U.size(a),n=e[0].dataType,o=q("input",n,r.length),l=ae("output",n,a.length),d=f=>`
      const inputShape = ${o.indices(...r)};
      ${f.registerUniform("output_size","u32").declareVariables(o,l)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...le(e[0].dims,a)]}),getShaderSource:d}},yv=e=>{qf(e.inputs),e.compute(Gf(e.inputs),{inputs:[0]})}}),Wf,Vf,wv,gw=X(()=>{"use strict";fe(),ve(),ye(),Wf=(e,t,r,i,a)=>{let s=ae("output_data",a,r.length,4),n=q("a_data",t[1].dataType,t[1].dims.length,4),o=q("b_data",t[2].dataType,t[2].dims.length,4),l=q("c_data",t[0].dataType,t[0].dims.length,4),d,f=(c,h,y)=>`select(${h}, ${c}, ${y})`;if(!i)d=s.setByOffset("global_idx",f(n.getByOffset("global_idx"),o.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let c=(h,y,g="")=>{let _=`a_data[index_a${y}][component_a${y}]`,I=`b_data[index_b${y}][component_b${y}]`,$=`bool(c_data[index_c${y}] & (0xffu << (component_c${y} * 8)))`;return`
            let output_indices${y} = ${s.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offset_a${y} = ${n.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let offset_b${y} = ${o.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let offset_c${y} = ${l.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let index_a${y} = offset_a${y} / 4u;
            let index_b${y} = offset_b${y} / 4u;
            let index_c${y} = offset_c${y} / 4u;
            let component_a${y} = offset_a${y} % 4u;
            let component_b${y} = offset_b${y} % 4u;
            let component_c${y} = offset_c${y} % 4u;
            ${h}[${y}] = ${g}(${f(_,I,$)});
          `};a===9?d=`
            var data = vec4<u32>(0);
            ${c("data",0,"u32")}
            ${c("data",1,"u32")}
            ${c("data",2,"u32")}
            ${c("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${c("output_data[global_idx]",0)}
            ${c("output_data[global_idx]",1)}
            ${c("output_data[global_idx]",2)}
            ${c("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,n,o,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},Vf=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,a=e[1].dataType,s=!(U.areEqual(t,r)&&U.areEqual(r,i)),n=t,o=U.size(t);if(s){let d=$i.calcShape($i.calcShape(t,r,!1),i,!1);if(!d)throw new Error("Can't perform where op on the given tensors");n=d,o=U.size(n)}let l=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>Wf(d,e,n,s,a),getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:l},...le(i,t,r,n)]})}},wv=e=>{e.compute(Vf(e.inputs))}}),_v,vw=X(()=>{"use strict";Cy(),el(),zy(),By(),jy(),Oy(),Ry(),Py(),qy(),Fy(),Gy(),Wy(),Vy(),Hy(),Ky(),Xy(),Zy(),Qy(),Yy(),Jy(),ew(),tw(),rw(),iw(),aw(),nw(),Pg(),sw(),ow(),uw(),lw(),dw(),Ju(),pw(),Wg(),cw(),fw(),hw(),Fg(),mw(),gr(),tl(),gw(),_v=new Map([["Abs",[pm]],["Acos",[cm]],["Acosh",[fm]],["Add",[Km]],["ArgMax",[om,Iu]],["ArgMin",[sm,Iu]],["Asin",[hm]],["Asinh",[mm]],["Atan",[gm]],["Atanh",[vm]],["Attention",[um]],["AveragePool",[ev,Jg]],["BatchNormalization",[lm]],["BiasAdd",[dm]],["BiasSplitGelu",[Hm]],["Cast",[ym,bm]],["Ceil",[_m]],["Clip",[wm]],["Concat",[ag,ng]],["Conv",[Ru,Ou]],["ConvTranspose",[mg,hg]],["Cos",[xm]],["Cosh",[$m]],["CumSum",[gg,vg]],["DepthToSpace",[bg,yg]],["DequantizeLinear",[ov,uv]],["DFT",[wg,_g]],["Div",[Xm]],["Einsum",[xg,$g]],["Elu",[Am,wa]],["Equal",[Zm]],["Erf",[km]],["Exp",[Tm]],["Expand",[Ag]],["FastGelu",[kg]],["Floor",[Sm]],["FusedConv",[Ru,Ou]],["Gather",[Sg,Tg]],["GatherElements",[jg,Bg]],["GatherBlockQuantized",[Cg,zg]],["GatherND",[Eg,Ig]],["Gelu",[Em]],["Gemm",[Rg,Og]],["GlobalAveragePool",[rv,tv]],["GlobalMaxPool",[sv,nv]],["Greater",[eg]],["GreaterOrEqual",[rg]],["GridSample",[Mg,Dg]],["GroupQueryAttention",[Vg]],["HardSigmoid",[Mm,Rm]],["HardSwish",[Dm]],["InstanceNormalization",[Hg]],["LayerNormalization",[Kg]],["LeakyRelu",[Im,wa]],["Less",[tg]],["LessOrEqual",[ig]],["Log",[Wm]],["MatMul",[Xg]],["MatMulNBits",[Zg,Qg]],["MaxPool",[iv,av]],["Mul",[Qm]],["MultiHeadAttention",[Ug,Ng]],["Neg",[zm]],["Not",[Cm]],["Pad",[Yg]],["Pow",[Ym]],["QuickGelu",[Vm,wa]],["Range",[lv]],["Reciprocal",[Bm]],["ReduceMin",[tm]],["ReduceMean",[Zh]],["ReduceMax",[em]],["ReduceSum",[im]],["ReduceProd",[rm]],["ReduceL1",[Qh]],["ReduceL2",[Yh]],["ReduceLogSum",[nm]],["ReduceLogSumExp",[Jh]],["ReduceSumSquare",[am]],["Relu",[jm]],["Resize",[cv,fv]],["RotaryEmbedding",[Gg]],["ScatterND",[pv,dv]],["Sigmoid",[Om]],["Sin",[Nm]],["Sinh",[Um]],["Slice",[mv,gv]],["SkipLayerNormalization",[hv]],["Split",[Lg,qg]],["Sqrt",[Pm]],["Softmax",[vv,bv]],["Sub",[Jm]],["Tan",[Lm]],["Tanh",[qm]],["ThresholdedRelu",[Gm,wa]],["Tile",[yv]],["Transpose",[Nh,Uh]],["Where",[wv]]])}),xv,bw=X(()=>{"use strict";It(),rr(),ye(),xv=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,a){Ht(e.programInfo.name);let s=this.backend.device,n=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let d of t)o.push({binding:o.length,resource:{buffer:d.buffer}});for(let d of r)o.push({binding:o.length,resource:{buffer:d.buffer}});a&&o.push({binding:o.length,resource:a});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}n.setPipeline(e.computePipeline),n.setBindGroup(0,l),n.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),qt(e.programInfo.name)}dispose(){}build(e,t){Ht(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{r.features.has(d.feature)&&i.push(`enable ${d.extension};`)});let a=Dh(t,this.backend.device.limits),s=e.getShaderSource(a),n=`${i.join(`
`)}
${a.additionalImplementations}
${s}`,o=r.createShaderModule({code:n,label:e.name});Ce("verbose",()=>`[WebGPU] ${e.name} shader code: ${n}`);let l=r.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return qt(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&r<=a&&i<=a)return[t,r,i];let s=t*r*i,n=Math.ceil(Math.sqrt(s));if(n>a){if(n=Math.ceil(Math.cbrt(s)),n>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[n,n,n]}else return[n,n,1]}}}),$v={};ki($v,{WebGpuBackend:()=>Av});var Hf,Kf,Xf,Av,yw=X(()=>{"use strict";It(),fe(),rr(),Bh(),Ey(),vw(),bw(),Hf=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let a=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${a}`);break}case"rank":{let s=e[i].dims.length;r.push(`${a};${s}`);break}case"dims":{let s=e[i].dims.join(",");r.push(`${a};${s}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Kf=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${Hf(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},Xf=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Av=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=o=>t.features.has(o)&&r.push(o)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(i);let s=t,n=t.info??(typeof s.requestAdapterInfo=="function"?await s.requestAdapterInfo():void 0);this.adapterInfo=new Xf(n),this.gpuDataManager=Rh(this),this.programManager=new xv(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Xu(e.logLevel,!!e.debug),this.device.onuncapturederror=o=>{o.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${o.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ht(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=r[i],s=a.kernelId,n=this.kernels.get(s),o=n.kernelType,l=n.kernelName,d=a.programName,f=a.inputTensorViews,c=a.outputTensorViews,h=t[i*2],y=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=h);let g=Number(h-this.queryTimeBase),_=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(g)||!Number.isSafeInteger(_))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:f.map(I=>({dims:I.dims,dataType:tr(I.dataType)})),outputsMetadata:c.map(I=>({dims:I.dims,dataType:tr(I.dataType)})),kernelId:s,kernelType:o,kernelName:l,programName:d,startTime:g,endTime:_});else{let I="";f.forEach((w,T)=>{I+=`input[${T}]: [${w.dims}] | ${tr(w.dataType)}, `});let $="";c.forEach((w,T)=>{$+=`output[${T}]: [${w.dims}] | ${tr(w.dataType)}, `}),console.log(`[profiling] kernel "${s}|${o}|${l}|${d}" ${I}${$}start time: ${g} ns, execution time: ${_-g} ns`)}Nn("GPU",`${d}::${h}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),qt()}run(e,t,r,i,a,s){Ht(e.name);let n=[];for(let w=0;w<t.length;++w){let T=t[w].data;if(T===0)continue;let E=this.gpuDataManager.get(T);if(!E)throw new Error(`no GPU data for input: ${T}`);n.push(E)}let{outputs:o,dispatchGroup:l,programUniforms:d}=e.getRunData(t),f=r.length===0?o.map((w,T)=>T):r;if(f.length!==o.length)throw new Error(`Output size ${f.length} must be equal to ${o.length}.`);let c=[],h=[];for(let w=0;w<o.length;++w){if(!Number.isInteger(f[w])||f[w]<-3||f[w]>=s)throw new Error(`Invalid output index: ${f[w]}`);if(f[w]===-3)continue;let T=f[w]===-1,E=f[w]===-2,C=T||E?a(o[w].dataType,o[w].dims):i(f[w],o[w].dataType,o[w].dims);if(c.push(C),C.data===0)continue;let S=this.gpuDataManager.get(C.data);if(!S)throw new Error(`no GPU data for output: ${C.data}`);if(T&&this.temporaryData.push(S),E){let R=this.kernelPersistentData.get(this.currentKernelId);R||(R=[],this.kernelPersistentData.set(this.currentKernelId,R)),R.push(S)}h.push(S)}if(n.length!==t.length||h.length!==c.length){if(h.length===0)return qt(e.name),c;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(d){let w=0,T=[];d.forEach(R=>{let A=typeof R.data=="number"?[R.data]:R.data;if(A.length===0)return;let P=R.type===10?2:4,K,Y;R.type===10?(Y=A.length>4?16:A.length>2?8:A.length*P,K=A.length>4?16:P*A.length):(Y=A.length<=2?A.length*P:16,K=16),w=Math.ceil(w/Y)*Y,T.push(w);let L=R.type===10?8:4;w+=A.length>4?Math.ceil(A.length/L)*K:A.length*P});let E=16;w=Math.ceil(w/E)*E;let C=new ArrayBuffer(w);d.forEach((R,A)=>{let P=T[A],K=typeof R.data=="number"?[R.data]:R.data;if(R.type===6)new Int32Array(C,P,K.length).set(K);else if(R.type===12)new Uint32Array(C,P,K.length).set(K);else if(R.type===10)new Uint16Array(C,P,K.length).set(K);else if(R.type===1)new Float32Array(C,P,K.length).set(K);else throw new Error(`Unsupported uniform type: ${tr(R.type)}`)});let S=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(S.buffer,0,C,0,w),this.gpuDataManager.release(S.id),y={offset:0,size:w,buffer:S.buffer}}let g=this.programManager.normalizeDispatchGroupSize(l),_=g[1]===1&&g[2]===1,I=Kf(e,t,_),$=this.programManager.getArtifact(I);if($||($=this.programManager.build(e,g),this.programManager.setArtifact(I,$),Ce("info",()=>`[artifact] key: ${I}, programName: ${e.name}`)),d&&$.uniformVariablesInfo){if(d.length!==$.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${d.length} in program "${$.programInfo.name}".`);for(let w=0;w<d.length;w++){let T=d[w],E=T.type,C=typeof T.data=="number"?1:T.data.length,[S,R]=$.uniformVariablesInfo[w];if(E!==S||C!==R)throw new Error(`Uniform variable ${w} mismatch: expect type ${S} with size ${R}, got type ${E} with size ${C} in program "${$.programInfo.name}".`)}}if(Ce("info",()=>`[ProgramManager] run "${e.name}" (key=${I}) with ${g[0]}x${g[1]}x${g[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:t,outputTensorViews:c};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run($,n,h,g,y),qt(e.name),c}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let a=_v.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:i,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(t,s)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let a=i.kernelType,s=i.kernelName,n=i.kernelEntry,o=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),Ce("info",()=>`[WebGPU] Start to run kernel "[${a}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),n(t,o[1]),0}catch(d){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${s}" failed. ${d}`)),1}finally{l&&r.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${a}] ${s}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let s=a.get(t),n=this.gpuDataManager.registerExternalBuffer(r,i,s);return a.set(t,[n,r]),n}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Tu(this,e,t);return Zu(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){Ce("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){Ce("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){Ce("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let a=this.getComputePassEncoder(),s=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(s.computePipeline),a.setBindGroup(0,s.bindGroup),a.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),kv={};ki(kv,{init:()=>Tv});var jn,Zf,Tv,ww=X(()=>{"use strict";fe(),rr(),ve(),Sy(),jn=class Sv{constructor(t,r,i,a){this.module=t,this.dataType=r,this.data=i,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=U.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=U.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=U.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=U.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(U.size(t)!==U.size(this.dims))throw new Error("Invalid new shape");return new Sv(this.module,this.dataType,this.data,t)}},Zf=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,a=r/e.PTR_SIZE,s=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*a++,s));let n=Number(e.getValue(i*a++,s));this.outputCount=Number(e.getValue(i*a++,s)),this.customDataOffset=Number(e.getValue(i*a++,"*")),this.customDataSize=Number(e.getValue(i*a++,s));let o=[];for(let l=0;l<n;l++){let d=Number(e.getValue(i*a++,s)),f=Number(e.getValue(i*a++,"*")),c=Number(e.getValue(i*a++,s)),h=[];for(let y=0;y<c;y++)h.push(Number(e.getValue(i*a++,s)));o.push(new jn(e,d,f,h))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(n=>typeof n=="number"?this.inputs[n]:n)??this.inputs,i=t?.outputs??[],a=(n,o,l)=>new jn(this.module,o,this.output(n,l),l),s=(n,o)=>{let l=qr(n,o);if(!l)throw new Error(`Unsupported data type: ${n}`);let d=l>0?this.backend.gpuDataManager.create(l).id:0;return new jn(this.module,n,d,o)};return this.backend.run(e,r,i,a,s,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,a=i===4?"i32":"i64",s=this.module.stackAlloc((1+t.length)*i);this.module.setValue(s,t.length,a);for(let n=0;n<t.length;n++)this.module.setValue(s+i*(n+1),t[n],a);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},Tv=async(e,t,r,i)=>{let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let s=(yw(),$a($v)).WebGpuBackend,n=new s;await n.initialize(r,i),a("webgpu",[n,o=>n.alloc(Number(o)),o=>n.free(o),(o,l,d,f=!1)=>{if(f)Ce("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(l)}, size=${Number(d)}`),n.memcpy(Number(o),Number(l));else{Ce("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let c=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(d));n.upload(Number(l),c)}},async(o,l,d)=>{Ce("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${l}, size=${d}`),await n.download(Number(o),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))},(o,l,d)=>n.createKernel(o,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),o=>n.releaseKernel(o),(o,l,d,f)=>{Ce("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${o}, contextDataOffset=${l}`);let c=new Zf(t,n,Number(l));return n.computeKernel(Number(o),c,f)},()=>n.captureBegin(),()=>n.captureEnd(),()=>n.replay()])}else{let s=new Oh(r);a("webnn",[s,()=>s.reserveTensorId(),n=>s.releaseTensorId(n),async(n,o,l,d,f)=>s.ensureTensor(n,o,l,d,f),(n,o)=>{s.uploadTensor(n,o)},async(n,o)=>s.downloadTensor(n,o),(n,o)=>s.registerMLContext(n,o),!!r.trace])}}}),Qf,ol,ul,cr,Yf,wu,Wn,ll,dl,_u,pl,cl,fl,Ev=X(()=>{"use strict";It(),Ay(),ky(),fe(),Kr(),Wu(),Eh(),Qf=(e,t)=>{Fe()._OrtInit(e,t)!==0&&Ne("Can't initialize onnxruntime.")},ol=async e=>{Qf(e.wasm.numThreads,Pn(e.logLevel))},ul=async(e,t)=>{Fe().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:a}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(ww(),$a(kv)).init;t==="webgpu"&&await i("webgpu",Fe(),e,r),t==="webnn"&&await i("webnn",Fe(),e)}},cr=new Map,Yf=e=>{let t=Fe(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,a,a+i)!==0&&Ne("Can't get session input/output count.");let s=i===4?"i32":"i64";return[Number(t.getValue(a,s)),Number(t.getValue(a+i,s))]}finally{t.stackRestore(r)}},wu=(e,t)=>{let r=Fe(),i=r.stackSave(),a=0;try{let s=r.PTR_SIZE,n=r.stackAlloc(2*s);r._OrtGetInputOutputMetadata(e,t,n,n+s)!==0&&Ne("Can't get session input/output metadata.");let o=Number(r.getValue(n,"*"));a=Number(r.getValue(n+s,"*"));let l=r.HEAP32[a/4];if(l===0)return[o,0];let d=r.HEAPU32[a/4+1],f=[];for(let c=0;c<d;c++){let h=Number(r.getValue(a+8+c*s,"*"));f.push(h!==0?r.UTF8ToString(h):Number(r.getValue(a+8+(c+d)*s,"*")))}return[o,l,f]}finally{r.stackRestore(i),a!==0&&r._OrtFree(a)}},Wn=e=>{let t=Fe(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},ll=async(e,t)=>{let r,i,a=Fe();Array.isArray(e)?[r,i]=e:e.buffer===a.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=Wn(e);let s=0,n=0,o=0,l=[],d=[],f=[];try{if([n,l]=await Sh(t),t?.externalData&&a.mountExternalData){let E=[];for(let C of t.externalData){let S=typeof C=="string"?C:C.path,R=typeof C=="string"?C:C.data;E.push(Ku(R).then(A=>{a.mountExternalData(S,A)}))}await Promise.all(E)}for(let E of t?.executionProviders??[])if((typeof E=="string"?E:E.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof E!="string"){let C=E,S=C?.context,R=C?.gpuDevice,A=C?.deviceType,P=C?.powerPreference;S?a.currentContext=S:R?a.currentContext=await a.webnnCreateMLContext(R):a.currentContext=await a.webnnCreateMLContext({deviceType:A,powerPreference:P})}else a.currentContext=await a.webnnCreateMLContext();break}s=await a._OrtCreateSession(r,i,n),a.webgpuOnCreateSession?.(s),s===0&&Ne("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.webnnRegisterMLContext(s,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[c,h]=Yf(s),y=!!t?.enableGraphCapture,g=[],_=[],I=[],$=[],w=[];for(let E=0;E<c;E++){let[C,S,R]=wu(s,E);C===0&&Ne("Can't get an input name."),d.push(C);let A=a.UTF8ToString(C);g.push(A),I.push(S===0?{name:A,isTensor:!1}:{name:A,isTensor:!0,type:tr(S),shape:R})}for(let E=0;E<h;E++){let[C,S,R]=wu(s,E+c);C===0&&Ne("Can't get an output name."),f.push(C);let A=a.UTF8ToString(C);_.push(A),$.push(S===0?{name:A,isTensor:!1}:{name:A,isTensor:!0,type:tr(S),shape:R});{if(y&&t?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let P=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[A]??"cpu",K=a.webnnIsGraphOutput;if(P==="cpu"&&K&&K(s,A)){w.push("ml-tensor-cpu-output");continue}if(P!=="cpu"&&P!=="cpu-pinned"&&P!=="gpu-buffer"&&P!=="ml-tensor")throw new Error(`Not supported preferred output location: ${P}.`);if(y&&P!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${P}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push(P)}}let T=null;return w.some(E=>E==="gpu-buffer"||E==="ml-tensor"||E==="ml-tensor-cpu-output")&&(o=a._OrtCreateBinding(s),o===0&&Ne("Can't create IO binding."),T={handle:o,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(E=>E==="ml-tensor-cpu-output"?"ml-tensor":E).map(E=>ku(E))}),cr.set(s,[s,d,f,T,y,!1]),[s,g,_,I,$]}catch(c){throw d.forEach(h=>a._OrtFree(h)),f.forEach(h=>a._OrtFree(h)),o!==0&&a._OrtReleaseBinding(o)!==0&&Ne("Can't release IO binding."),s!==0&&a._OrtReleaseSession(s)!==0&&Ne("Can't release session."),c}finally{a._free(r),n!==0&&a._OrtReleaseSessionOptions(n)!==0&&Ne("Can't release session options."),l.forEach(c=>a._free(c)),a.unmountExternalData?.()}},dl=e=>{let t=Fe(),r=cr.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,a,s,n,o]=r;n&&(o&&t._OrtClearBoundOutputs(n.handle)!==0&&Ne("Can't clear bound outputs."),t._OrtReleaseBinding(n.handle)!==0&&Ne("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),a.forEach(l=>t._OrtFree(l)),s.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(i)!==0&&Ne("Can't release session."),cr.delete(e)},_u=async(e,t,r,i,a,s,n=!1)=>{if(!e){t.push(0);return}let o=Fe(),l=o.PTR_SIZE,d=e[0],f=e[1],c=e[3],h=c,y,g;if(d==="string"&&(c==="gpu-buffer"||c==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(n&&c!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(c==="gpu-buffer"){let $=e[2].gpuBuffer;g=qr(Lr(d),f);{let w=o.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=w(i,s,$,g)}}else if(c==="ml-tensor"){let $=e[2].mlTensor;g=qr(Lr(d),f);let w=o.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=w(i,$,Lr(d),f)}else{let $=e[2];if(Array.isArray($)){g=l*$.length,y=o._malloc(g),r.push(y);for(let w=0;w<$.length;w++){if(typeof $[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);o.setValue(y+w*l,Pt($[w],r),"*")}}else{let w=o.webnnIsGraphInput,T=o.webnnIsGraphOutput;if(d!=="string"&&w&&T){let E=o.UTF8ToString(a);if(w(i,E)||T(i,E)){let C=Lr(d);g=qr(C,f),h="ml-tensor";let S=o.webnnCreateTemporaryTensor,R=o.webnnUploadTensor;if(!S||!R)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let A=await S(i,C,f);R(A,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),y=A}else g=$.byteLength,y=o._malloc(g),r.push(y),o.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,g),y)}else g=$.byteLength,y=o._malloc(g),r.push(y),o.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,g),y)}}let _=o.stackSave(),I=o.stackAlloc(4*f.length);try{f.forEach((w,T)=>o.setValue(I+T*l,w,l===4?"i32":"i64"));let $=o._OrtCreateTensor(Lr(d),y,g,I,f.length,ku(h));$===0&&Ne(`Can't create tensor for input/output. session=${i}, index=${s}.`),t.push($)}finally{o.stackRestore(_)}},pl=async(e,t,r,i,a,s)=>{let n=Fe(),o=n.PTR_SIZE,l=cr.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],f=l[1],c=l[2],h=l[3],y=l[4],g=l[5],_=t.length,I=i.length,$=0,w=[],T=[],E=[],C=[],S=[],R=n.stackSave(),A=n.stackAlloc(_*o),P=n.stackAlloc(_*o),K=n.stackAlloc(I*o),Y=n.stackAlloc(I*o);try{[$,w]=Th(s),Fr("wasm prepareInputOutputTensor");for(let O=0;O<_;O++)await _u(r[O],T,C,e,f[t[O]],t[O],y);for(let O=0;O<I;O++)await _u(a[O],E,C,e,c[i[O]],_+i[O],y);Gr("wasm prepareInputOutputTensor");for(let O=0;O<_;O++)n.setValue(A+O*o,T[O],"*"),n.setValue(P+O*o,f[t[O]],"*");for(let O=0;O<I;O++)n.setValue(K+O*o,E[O],"*"),n.setValue(Y+O*o,c[i[O]],"*");if(h&&!g){let{handle:O,outputPreferredLocations:W,outputPreferredLocationsEncoded:ue}=h;if(f.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${f.length}).`);Fr("wasm bindInputsOutputs");for(let ne=0;ne<_;ne++){let te=t[ne];await n._OrtBindInput(O,f[te],T[ne])!==0&&Ne(`Can't bind input[${ne}] for session=${e}.`)}for(let ne=0;ne<I;ne++){let te=i[ne];a[ne]?.[3]?(S.push(E[ne]),n._OrtBindOutput(O,c[te],E[ne],0)!==0&&Ne(`Can't bind pre-allocated output[${ne}] for session=${e}.`)):n._OrtBindOutput(O,c[te],0,ue[te])!==0&&Ne(`Can't bind output[${ne}] to ${W[ne]} for session=${e}.`)}Gr("wasm bindInputsOutputs"),cr.set(e,[d,f,c,h,y,!0])}n.jsepOnRunStart?.(d),n.webnnOnRunStart?.(d);let L;h?L=await n._OrtRunWithBinding(d,h.handle,I,K,$):L=await n._OrtRun(d,P,A,_,Y,I,K,$),L!==0&&Ne("failed to call OrtRun().");let H=[],me=[];Fr("wasm ProcessOutputTensor");for(let O=0;O<I;O++){let W=Number(n.getValue(K+O*o,"*"));if(W===E[O]||S.includes(E[O])){H.push(a[O]),W!==E[O]&&n._OrtReleaseTensor(W)!==0&&Ne("Can't release tensor.");continue}let ue=n.stackSave(),ne=n.stackAlloc(4*o),te=!1,ie,G=0;try{n._OrtGetTensorData(W,ne,ne+o,ne+2*o,ne+3*o)!==0&&Ne(`Can't access output tensor data on index ${O}.`);let oe=o===4?"i32":"i64",ee=Number(n.getValue(ne,oe));G=n.getValue(ne+o,"*");let J=n.getValue(ne+o*2,"*"),Re=Number(n.getValue(ne+o*3,oe)),Ue=[];for(let de=0;de<Re;de++)Ue.push(Number(n.getValue(J+de*o,oe)));n._OrtFree(J)!==0&&Ne("Can't free memory for tensor dims.");let Ee=Ue.reduce((de,pe)=>de*pe,1);ie=tr(ee);let Me=h?.outputPreferredLocations[i[O]];if(ie==="string"){if(Me==="gpu-buffer"||Me==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let de=[];for(let pe=0;pe<Ee;pe++){let he=n.getValue(G+pe*o,"*"),ot=n.getValue(G+(pe+1)*o,"*"),Ct=pe===Ee-1?void 0:ot-he;de.push(n.UTF8ToString(he,Ct))}H.push([ie,Ue,de,"cpu"])}else if(Me==="gpu-buffer"&&Ee>0){let de=n.jsepGetBuffer;if(!de)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let pe=de(G),he=qr(ee,Ee);if(he===void 0||!Vu(ie))throw new Error(`Unsupported data type: ${ie}`);te=!0,H.push([ie,Ue,{gpuBuffer:pe,download:n.jsepCreateDownloader(pe,he,ie),dispose:()=>{n._OrtReleaseTensor(W)!==0&&Ne("Can't release tensor.")}},"gpu-buffer"])}else if(Me==="ml-tensor"&&Ee>0){let de=n.webnnEnsureTensor,pe=n.webnnIsGraphInputOutputTypeSupported;if(!de||!pe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(qr(ee,Ee)===void 0||!Hu(ie))throw new Error(`Unsupported data type: ${ie}`);if(!pe(e,ie,!1))throw new Error(`preferredLocation "ml-tensor" for ${ie} output is not supported by current WebNN Context.`);let he=await de(e,G,ee,Ue,!1);te=!0,H.push([ie,Ue,{mlTensor:he,download:n.webnnCreateMLTensorDownloader(G,ie),dispose:()=>{n.webnnReleaseTensorId(G),n._OrtReleaseTensor(W)}},"ml-tensor"])}else if(Me==="ml-tensor-cpu-output"&&Ee>0){let de=n.webnnCreateMLTensorDownloader(G,ie)(),pe=H.length;te=!0,me.push((async()=>{let he=[pe,await de];return n.webnnReleaseTensorId(G),n._OrtReleaseTensor(W),he})()),H.push([ie,Ue,[],"cpu"])}else{let de=Vn(ie),pe=new de(Ee);new Uint8Array(pe.buffer,pe.byteOffset,pe.byteLength).set(n.HEAPU8.subarray(G,G+pe.byteLength)),H.push([ie,Ue,pe,"cpu"])}}finally{n.stackRestore(ue),ie==="string"&&G&&n._free(G),te||n._OrtReleaseTensor(W)}}h&&!y&&(n._OrtClearBoundOutputs(h.handle)!==0&&Ne("Can't clear bound outputs."),cr.set(e,[d,f,c,h,y,!1]));for(let[O,W]of await Promise.all(me))H[O][2]=W;return Gr("wasm ProcessOutputTensor"),H}finally{n.webnnOnRunEnd?.(d),n.stackRestore(R),T.forEach(L=>n._OrtReleaseTensor(L)),E.forEach(L=>n._OrtReleaseTensor(L)),C.forEach(L=>n._free(L)),$!==0&&n._OrtReleaseRunOptions($),w.forEach(L=>n._free(L))}},cl=e=>{let t=Fe(),r=cr.get(e);if(!r)throw new Error("invalid session id");let i=r[0],a=t._OrtEndProfiling(i);a===0&&Ne("Can't get an profile file name."),t._OrtFree(a)},fl=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),fr,Et,wi,va,ba,On,xu,Rn,Nr,Ur,Jf,Iv,Cv,zv,Bv,jv,Ov,Rv,Mv=X(()=>{"use strict";It(),Ev(),Kr(),Fu(),fr=()=>!!Ve.wasm.proxy&&typeof document<"u",wi=!1,va=!1,ba=!1,Rn=new Map,Nr=(e,t)=>{let r=Rn.get(e);r?r.push(t):Rn.set(e,[t])},Ur=()=>{if(wi||!va||ba||!Et)throw new Error("worker not ready")},Jf=e=>{switch(e.data.type){case"init-wasm":wi=!1,e.data.err?(ba=!0,xu[1](e.data.err)):(va=!0,xu[0]()),On&&(URL.revokeObjectURL(On),On=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Rn.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Iv=async()=>{if(!va){if(wi)throw new Error("multiple calls to 'initWasm()' detected.");if(ba)throw new Error("previous call to 'initWasm()' failed.");if(wi=!0,fr())return new Promise((e,t)=>{Et?.terminate(),Ah().then(([r,i])=>{try{Et=i,Et.onerror=s=>t(s),Et.onmessage=Jf,xu=[e,t];let a={type:"init-wasm",in:Ve};!a.in.wasm.wasmPaths&&(r||Au)&&(a.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Et.postMessage(a),On=r}catch(a){t(a)}},t)});try{await Gu(Ve.wasm),await ol(Ve),va=!0}catch(e){throw ba=!0,e}finally{wi=!1}}},Cv=async e=>{if(fr())return Ur(),new Promise((t,r)=>{Nr("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:Ve}};Et.postMessage(i)});await ul(Ve,e)},zv=async e=>fr()?(Ur(),new Promise((t,r)=>{Nr("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};Et.postMessage(i,[e.buffer])})):Wn(e),Bv=async(e,t)=>{if(fr()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ur(),new Promise((r,i)=>{Nr("create",[r,i]);let a={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),Et.postMessage(a,s)})}else return ll(e,t)},jv=async e=>{if(fr())return Ur(),new Promise((t,r)=>{Nr("release",[t,r]);let i={type:"release",in:e};Et.postMessage(i)});dl(e)},Ov=async(e,t,r,i,a,s)=>{if(fr()){if(r.some(n=>n[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(n=>n))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ur(),new Promise((n,o)=>{Nr("run",[n,o]);let l=r,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:i,options:s}};Et.postMessage(d,fl(l))})}else return pl(e,t,r,i,a,s)},Rv=async e=>{if(fr())return Ur(),new Promise((t,r)=>{Nr("end-profiling",[t,r]);let i={type:"end-profiling",in:e};Et.postMessage(i)});cl(e)}}),$u,eh,Dv,_w=X(()=>{"use strict";It(),Mv(),fe(),qu(),Eh(),$u=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},eh=e=>{switch(e[3]){case"cpu":return new Lt(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Vu(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:a}=e[2];return Lt.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:a})}case"ml-tensor":{let t=e[0];if(!Hu(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:a}=e[2];return Lt.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},Dv=class{async fetchModelAndCopyToWasmMemory(e){return zv(await Ku(e))}async loadModel(e,t){Ht();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Bv(r,t),qt()}async dispose(){return jv(this.sessionId)}async run(e,t,r){Ht();let i=[],a=[];Object.entries(e).forEach(c=>{let h=c[0],y=c[1],g=this.inputNames.indexOf(h);if(g===-1)throw new Error(`invalid input '${h}'`);i.push(y),a.push(g)});let s=[],n=[];Object.entries(t).forEach(c=>{let h=c[0],y=c[1],g=this.outputNames.indexOf(h);if(g===-1)throw new Error(`invalid output '${h}'`);s.push(y),n.push(g)});let o=i.map((c,h)=>$u(c,()=>`input "${this.inputNames[a[h]]}"`)),l=s.map((c,h)=>c?$u(c,()=>`output "${this.outputNames[n[h]]}"`):null),d=await Ov(this.sessionId,a,o,n,l,r),f={};for(let c=0;c<d.length;c++)f[this.outputNames[n[c]]]=s[c]??eh(d[c]);return qt(),f}startProfiling(){}endProfiling(){Rv(this.sessionId)}}}),Nv={};ki(Nv,{OnnxruntimeWebAssemblyBackend:()=>Nu,initializeFlags:()=>Du,wasmBackend:()=>Uv});var Du,Nu,Uv,xw=X(()=>{"use strict";It(),Mv(),_w(),Du=()=>{(typeof Ve.wasm.initTimeout!="number"||Ve.wasm.initTimeout<0)&&(Ve.wasm.initTimeout=0);let e=Ve.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),Ve.wasm.simd=!1),typeof Ve.wasm.proxy!="boolean"&&(Ve.wasm.proxy=!1),typeof Ve.wasm.trace!="boolean"&&(Ve.wasm.trace=!1),typeof Ve.wasm.numThreads!="number"||!Number.isInteger(Ve.wasm.numThreads)||Ve.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Ve.wasm.numThreads=1;else{let t=typeof navigator>"u"?sy("node:os").cpus().length:navigator.hardwareConcurrency;Ve.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Nu=class{async init(e){Du(),await Iv(),await Cv(e)}async createInferenceSessionHandler(e,t){let r=new Dv;return await r.loadModel(e,t),r}},Uv=new Nu});It();It();It();var $w="1.30.0";{let e=(xw(),$a(Nv)).wasmBackend;_i("webgpu",e,5),_i("webnn",e,5),_i("cpu",e,10),_i("wasm",e,10)}Object.defineProperty(Ve.versions,"web",{value:$w,enumerable:!0});async function kw(e={}){var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope;globalThis.process?.versions?.node&&globalThis.process?.type;var a=import.meta.url;if(r||i)try{new URL(".",a).href}catch{}console.log.bind(console);var s=console.error.bind(console),n,o=!1;function l(V){for(var ge=0,He=V.length,Pe=new Uint8Array(He),De;ge<He;++ge)De=V.charCodeAt(ge),Pe[ge]=~De>>8&De;return Pe}function d(){try{return pe.toResizableBuffer()}catch{}return pe.buffer}function f(){if(!K?.buffer?.resizable){var V=d();K=new Int8Array(V),R=new Int16Array(V),t.HEAPU8=W=new Uint8Array(V),H=new Uint16Array(V),A=new Int32Array(V),me=new Uint32Array(V),t.HEAPF32=Y=new Float32Array(V),L=new Float64Array(V),P=new BigInt64Array(V),O=new BigUint64Array(V)}}function c(){var V=t.preRun;V&&(typeof V=="function"&&(V=[V]),te.push(...V)),ue(te)}function h(){at.d()}function y(){var V=t.postRun;V&&(typeof V=="function"&&(V=[V]),ne.push(...V)),ue(ne)}function g(V){throw t.onAbort?.(V),V=`Aborted(${V})`,s(V),o=!0,V+=". Build with -sASSERTIONS for more info.",new WebAssembly.RuntimeError(V)}var _;function I(){return l(`\0asm\0\0\0G\f\`\x7F\x7F\`\x7F\0\`\x7F\x7F\x7F\x7F\0\`}}\`|}\`\0\x7F\`|\x7F|\`\x07\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\`}\x7F\x7F\`\x7F\x7F\x7F\x7F\x7F\0\`\x7F\x7F\x7F\`\0\0\raa\0ab\0\0\0\0\0\x07\b	
\v\x07\x82\x80\x80\b\x7FA\xB0\xA5\v\x07-\vc\0d\0e\0f\0g\0h\0
i\0\vj\0	k\0\x07l\0m\0\f
\xF6\x8B\x80|\x7F#\0Ak"$\0@ \0\xBC"A\xFF\xFF\xFF\xFF\x07q"A\xDA\x9F\xA4\xFAM@ A\x80\x80\x80\xCCI\r \0\xBB!\0\f\v A\xD1\xA7\xED\x83M@ \0\xBB! A\xE3\x97\xDB\x80M@ A\0H@ D-DT\xFB!\xF9?\xA0\x8C!\0\f\v D-DT\xFB!\xF9\xBF\xA0!\0\f\vD-DT\xFB!	\xC0D-DT\xFB!	@ A\0N\x1B \xA0\x9A!\0\f\v A\xD5\xE3\x88\x87M@ A\xDF\xDB\xBF\x85M@ \0\xBB! A\0H@ D\xD2!3\x7F|\xD9@\xA0!\0\f\v D\xD2!3\x7F|\xD9\xC0\xA0\x8C!\0\f\vD-DT\xFB!@D-DT\xFB!\xC0 A\0H\x1B \0\xBB\xA0!\0\f\v A\x80\x80\x80\xFC\x07O@ \0 \0\x93!\0\f\v \0 A\bj! +\b!@@@@ AqAk\0\v !\0\f\v !\0\f\v \x9A!\0\f\v \x8C!\0\v Aj$\0 \0\v\xE6\x7F|#\0Ak"$\0} \0\xBC"A\xFF\xFF\xFF\xFF\x07q"A\xDA\x9F\xA4\xFAM@C\0\0\x80? A\x80\x80\x80\xCCI\r \0\xBB\f\v A\xD1\xA7\xED\x83M@ A\xE4\x97\xDB\x80O@D-DT\xFB!	@D-DT\xFB!	\xC0 A\0H\x1B \0\xBB\xA0\x8C\f\v \0\xBB! A\0H@ D-DT\xFB!\xF9?\xA0\f\vD-DT\xFB!\xF9? \xA1\f\v A\xD5\xE3\x88\x87M@ A\xE0\xDB\xBF\x85O@D-DT\xFB!@D-DT\xFB!\xC0 A\0H\x1B \0\xBB\xA0\f\v A\0H@D\xD2!3\x7F|\xD9\xC0 \0\xBB\xA1\f\v \0\xBBD\xD2!3\x7F|\xD9\xC0\xA0\f\v \0 \0\x93 A\x80\x80\x80\xFC\x07O\r\0 \0 A\bj! +\b!@@@@ AqAk\0\v \f\v \x9A\f\v \x8C\f\v \v Aj$\0\vK| \0 \0 \0\xA2"\xA2"  \xA2\xA2 D\xA7F;\x8C\x87\xCD\xC6>\xA2Dt\xE7\xCA\xE2\xF9\0*\xBF\xA0\xA2  D\xB2\xFBn\x89\x81?\xA2Dw\xAC\xCBTUU\xC5\xBF\xA0\xA2 \0\xA0\xA0\xB6\vO| \0 \0\xA2"\0 \0 \0\xA2"\xA2 \0DiP\xEE\xE0B\x93\xF9>\xA2D'\xE8\x87\xC0V\xBF\xA0\xA2 DB:\xE1SU\xA5?\xA2 \0D\x81^\f\xFD\xFF\xFF\xDF\xBF\xA2D\0\0\0\0\0\0\xF0?\xA0\xA0\xA0\xB6\vT\x7F~@A\xB0!(\0"\xAD \0\xADB\x07|B\xF8\xFF\xFF\xFF\x83|"B\xFF\xFF\xFF\xFFX@ \xA7"\0?\0AtM\r \0\r\vA\xB4!A06\0A\x7F\vA\xB0! \x006\0 \v\xDF\v\b\x7F@ \0E\r\0 \0A\bk" \0Ak(\0"Axq"\0j!@ Aq\r\0 AqE\r  (\0"k"A\xC8!(\0I\r \0 j!\0@@@A\xCC!(\0 G@ (\f! A\xFFM@  (\b"G\rA\xB8!A\xB8!(\0A~ Avwq6\0\f\v (!\x07  G@ (\b" 6\f  6\b\f\v ("\x7F Aj ("E\r Aj\v!@ ! "Aj! ("\r\0 Aj! ("\r\0\v A\x006\0\f\v ("AqAG\rA\xC0! \x006\0  A~q6  \0Ar6  \x006\0\v  6\f  6\b\f\vA\0!\v \x07E\r\0@ ("At"(\xE8# F@ A\xE8#j 6\0 \rA\xBC!A\xBC!(\0A~ wq6\0\f\v@  \x07(F@ \x07 6\f\v \x07 6\v E\r\v  \x076 ("@  6  6\v ("E\r\0  6  6\v  O\r\0 ("AqE\r\0@@@@ AqE@A\xD0!(\0 F@A\xD0! 6\0A\xC4!A\xC4!(\0 \0j"\x006\0  \0Ar6 A\xCC!(\0G\rA\xC0!A\x006\0A\xCC!A\x006\0\vA\xCC!(\0"\x07 F@A\xCC! 6\0A\xC0!A\xC0!(\0 \0j"\x006\0  \0Ar6 \0 j \x006\0\v Axq \0j!\0 (\f! A\xFFM@ (\b" F@A\xB8!A\xB8!(\0A~ Avwq6\0\f\v  6\f  6\b\f\v (!\b  G@ (\b" 6\f  6\b\f\v ("\x7F Aj ("E\r Aj\v!@ ! "Aj! ("\r\0 Aj! ("\r\0\v A\x006\0\f\v  A~q6  \0Ar6 \0 j \x006\0\f\vA\0!\v \bE\r\0@ ("At"(\xE8# F@ A\xE8#j 6\0 \rA\xBC!A\xBC!(\0A~ wq6\0\f\v@  \b(F@ \b 6\f\v \b 6\v E\r\v  \b6 ("@  6  6\v ("E\r\0  6  6\v  \0Ar6 \0 j \x006\0  \x07G\r\0A\xC0! \x006\0\v \0A\xFFM@ \0A\xF8qA\xE0!j!\x7FA\xB8!(\0"A \0Avt"\0qE@A\xB8! \0 r6\0 \f\v (\b\v!\0  6\b \0 6\f  6\f  \x006\b\vA! \0A\xFF\xFF\xFF\x07M@ \0A& \0A\bvg"kvAq AtrA>s!\v  6 B\x007 AtA\xE8#j!\x7F@\x7FA\xBC!(\0"A t"qE@A\xBC!  r6\0  6\0A!A\b\f\v \0A AvkA\0 AG\x1Bt! (\0!@ "(Axq \0F\r Av! At!  Aqj"("\r\0\v  6A! !A\b\v!\0 "\f\v (\b" 6\f  6\bA!\0A\b!A\0\v!  j 6\0  6\f \0 j 6\0A\xD8!A\xD8!(\0Ak"\0A\x7F \0\x1B6\0\v\v\xA8\0@ A\x80\bN@ \0D\0\0\0\0\0\0\xE0\x7F\xA2!\0 A\xFFI@ A\xFF\x07k!\f\v \0D\0\0\0\0\0\0\xE0\x7F\xA2!\0A\xFD  A\xFDO\x1BA\xFEk!\f\v A\x81xJ\r\0 \0D\0\0\0\0\0\0\`\xA2!\0 A\xB8pK@ A\xC9\x07j!\f\v \0D\0\0\0\0\0\0\`\xA2!\0A\xF0h  A\xF0hM\x1BA\x92j!\v \0 A\xFF\x07j\xADB4\x86\xBF\xA2\v\0 \0@ \0Ak(\0\x07\v\v\xC1'\v\x7F#\0Ak"
$\0@@@@@@@@@@ \0A\xF4M@A\xB8!(\0"A \0A\vjA\xF8q \0A\vI\x1B"Av"\0v"Aq@@ A\x7FsAq \0j"At"A\xE0!j"\0 (\xE8!"(\b"F@A\xB8! A~ wq6\0\f\v  \x006\f \0 6\b\v A\bj!\0  Ar6  j" (Ar6\f\v\v A\xC0!(\0"\bM\r @@A \0t"A\0 kr  \0tqh"At"A\xE0!j" (\xE8!"\0(\b"F@A\xB8! A~ wq"6\0\f\v  6\f  6\b\v \0 Ar6 \0 j"\x07  k"Ar6 \0 j 6\0 \b@ \bAxqA\xE0!j!A\xCC!(\0!\x7F A \bAvt"qE@A\xB8!  r6\0 \f\v (\b\v!  6\b  6\f  6\f  6\b\v \0A\bj!\0A\xCC! \x076\0A\xC0! 6\0\f\v\vA\xBC!(\0"\vE\r \vhAt(\xE8#"(Axq k! !@@ ("\0E@ ("\0E\r\v \0(Axq k"   I"\x1B! \0  \x1B! \0!\f\v\v (!	  (\f"\0G@ (\b" \x006\f \0 6\b\f
\v ("\x7F Aj ("E\r Aj\v!@ !\x07 "\0Aj! \0("\r\0 \0Aj! \0("\r\0\v \x07A\x006\0\f	\vA\x7F! \0A\xBF\x7FK\r\0 \0A\vj"Axq!A\xBC!(\0"\x07E\r\0A!\bA\0 k! \0A\xF4\xFF\xFF\x07M@ A& A\bvg"\0kvAq \0AtkA>j!\b\v@@@ \bAt(\xE8#"E@A\0!\0\f\vA\0!\0 A \bAvkA\0 \bAG\x1Bt!@@ (Axq k" O\r\0 ! "\r\0A\0! !\0\f\v \0 ("   AvAqj("F\x1B \0 \x1B!\0 At! \r\0\v\v \0 rE@A\0!A \bt"\0A\0 \0kr \x07q"\0E\r \0hAt(\xE8#!\0\v \0E\r\v@ \0(Axq k" I!   \x1B! \0  \x1B! \0("\x7F  \0(\v"\0\r\0\v\v E\r\0 A\xC0!(\0 kO\r\0 (!\b  (\f"\0G@ (\b" \x006\f \0 6\b\f\b\v ("\x7F Aj ("E\r Aj\v!@ ! "\0Aj! \0("\r\0 \0Aj! \0("\r\0\v A\x006\0\f\x07\v A\xC0!(\0"M@A\xCC!(\0!\0@  k"AO@ \0 j" Ar6 \0 j 6\0 \0 Ar6\f\v \0 Ar6 \0 j" (Ar6A\0!A\0!\vA\xC0! 6\0A\xCC! 6\0 \0A\bj!\0\f	\v A\xC4!(\0"I@A\xC4!  k"6\0A\xD0!A\xD0!(\0"\0 j"6\0  Ar6 \0 Ar6 \0A\bj!\0\f	\vA\0!\0 A/j"\x7FA\x90%(\0@A\x98%(\0\f\vA\x9C%B\x7F7\0A\x94%B\x80\xA0\x80\x80\x80\x807\0A\x90% 
A\fjApqA\xD8\xAA\xD5\xAAs6\0A\xA4%A\x006\0A\xF4$A\x006\0A\x80 \v"j"A\0 k"\x07q" M\r\bA\xF0$(\0"@A\xE8$(\0"\b j"	 \bM\r	  	I\r	\v@A\xF4$-\0\0AqE@@@@@A\xD0!(\0"@A\xF8$!\0@ \0(\0"\b M@  \b \0(jI\r\v \0(\b"\0\r\0\v\vA\0"A\x7FF\r !A\x94%(\0"\0Ak" q@  k  jA\0 \0kqj!\v  M\rA\xF0$(\0"\0@A\xE8$(\0" j"\x07 M\r \0 \x07I\r\v "\0 G\r\f\v  k \x07q"" \0(\0 \0(jF\r !\0\v \0A\x7FF\r A0j M@ \0!\f\vA\x98%(\0"  kjA\0 kq"A\x7FF\r  j! \0!\f\v A\x7FG\r\vA\xF4$A\xF4$(\0Ar6\0\v !A\0!\0 A\x7FF\r \0A\x7FF\r \0 M\r \0 k" A(jM\r\vA\xE8$A\xE8$(\0 j"\x006\0A\xEC$(\0 \0I@A\xEC$ \x006\0\v@A\xD0!(\0"@A\xF8$!\0@  \0(\0" \0("jF\r \0(\b"\0\r\0\v\f\vA\xC8!(\0"\0A\0 \0 M\x1BE@A\xC8! 6\0\vA\0!\0A\xFC$ 6\0A\xF8$ 6\0A\xD8!A\x7F6\0A\xDC!A\x90%(\x006\0A\x84%A\x006\0@ \0At" A\xE0!j"6\xE8!  6\xEC! \0Aj"\0A G\r\0\vA\xC4! A(k"\0Ax kA\x07q"k"6\0A\xD0!  j"6\0  Ar6 \0 jA(6A\xD4!A\xA0%(\x006\0\f\v  M\r  K\r \0(\fA\bq\r \0  j6A\xD0! Ax kA\x07q"\0j"6\0A\xC4!A\xC4!(\0 j" \0k"\x006\0  \0Ar6  jA(6A\xD4!A\xA0%(\x006\0\f\vA\0!\0\f\vA\0!\0\f\vA\xC8!(\0 K@A\xC8! 6\0\v  j!A\xF8$!\0@@  \0(\0"G@ \0(\b"\0\r\f\v\v \0-\0\fA\bqE\r\vA\xF8$!\0@@ \0(\0" M@   \0(j"I\r\v \0(\b!\0\f\v\vA\xC4! A(k"\0Ax kA\x07q"k"\x076\0A\xD0!  j"6\0  \x07Ar6 \0 jA(6A\xD4!A\xA0%(\x006\0  A' kA\x07qjA/k"\0 \0 AjI\x1B"A\x1B6 A\x80%)\x007 A\xF8$)\x007\bA\x80% A\bj6\0A\xFC$ 6\0A\xF8$ 6\0A\x84%A\x006\0 Aj!\0@ \0A\x076 \0A\bj \0Aj!\0 I\r\0\v  F\r\0  (A~q6   k"Ar6  6\0\x7F A\xFFM@ A\xF8qA\xE0!j!\0\x7FA\xB8!(\0"A Avt"qE@A\xB8!  r6\0 \0\f\v \0(\b\v! \0 6\b  6\fA\f!A\b\f\vA!\0 A\xFF\xFF\xFF\x07M@ A& A\bvg"\0kvAq \0AtrA>s!\0\v  \x006 B\x007 \0AtA\xE8#j!@@A\xBC!(\0"A \0t"qE@A\xBC!  r6\0  6\0\f\v A \0AvkA\0 \0AG\x1Bt!\0 (\0!@ "(Axq F\r \0Av! \0At!\0  Aqj"("\r\0\v  6\v  6A\b! "!\0A\f\f\v (\b"\0 6\f  6\b  \x006\bA\0!\0A!A\f\v j 6\0  j \x006\0\vA\xC4!(\0"\0 M\r\0A\xC4! \0 k"6\0A\xD0!A\xD0!(\0"\0 j"6\0  Ar6 \0 Ar6 \0A\bj!\0\f\vA\xB4!A06\0A\0!\0\f\v \0 6\0 \0 \0( j6 Ax kA\x07qj"\b Ar6 Ax kA\x07qj"  \bj"k!\x07@A\xD0!(\0 F@A\xD0! 6\0A\xC4!A\xC4!(\0 \x07j"\x006\0  \0Ar6\f\vA\xCC!(\0 F@A\xCC! 6\0A\xC0!A\xC0!(\0 \x07j"\x006\0  \0Ar6 \0 j \x006\0\f\v ("\0AqAF@ \0Axq!	 (\f!@ \0A\xFFM@ (\b" F@A\xB8!A\xB8!(\0A~ \0Avwq6\0\f\v  6\f  6\b\f\v (!@  G@ (\b"\0 6\f  \x006\b\f\v@ ("\0\x7F Aj ("\0E\r Aj\v!@ ! \0"Aj! \0("\0\r\0 Aj! ("\0\r\0\v A\x006\0\f\vA\0!\v E\r\0@ ("\0At"(\xE8# F@ A\xE8#j 6\0 \rA\xBC!A\xBC!(\0A~ \0wq6\0\f\v@  (F@  6\f\v  6\v E\r\v  6 ("\0@  \x006 \0 6\v ("\0E\r\0  \x006 \0 6\v \x07 	j!\x07  	j"(!\0\v  \0A~q6  \x07Ar6  \x07j \x076\0 \x07A\xFFM@ \x07A\xF8qA\xE0!j!\0\x7FA\xB8!(\0"A \x07Avt"qE@A\xB8!  r6\0 \0\f\v \0(\b\v! \0 6\b  6\f  \x006\f  6\b\f\vA! \x07A\xFF\xFF\xFF\x07M@ \x07A& \x07A\bvg"\0kvAq \0AtrA>s!\v  6 B\x007 AtA\xE8#j!\0@@A\xBC!(\0"A t"qE@A\xBC!  r6\0 \0 6\0\f\v \x07A AvkA\0 AG\x1Bt! \0(\0!@ "\0(Axq \x07F\r Av! At! \0 Aqj"("\r\0\v  6\v  \x006  6\f  6\b\f\v \0(\b" 6\f \0 6\b A\x006  \x006\f  6\b\v \bA\bj!\0\f\v@ \bE\r\0@ ("At"(\xE8# F@ A\xE8#j \x006\0 \0\rA\xBC! \x07A~ wq"\x076\0\f\v@  \b(F@ \b \x006\f\v \b \x006\v \0E\r\v \0 \b6 ("@ \0 6  \x006\v ("E\r\0 \0 6  \x006\v@ AM@   j"\0Ar6 \0 j"\0 \0(Ar6\f\v  Ar6  j" Ar6  j 6\0 A\xFFM@ A\xF8qA\xE0!j!\0\x7FA\xB8!(\0"A Avt"qE@A\xB8!  r6\0 \0\f\v \0(\b\v! \0 6\b  6\f  \x006\f  6\b\f\vA!\0 A\xFF\xFF\xFF\x07M@ A& A\bvg"\0kvAq \0AtrA>s!\0\v  \x006 B\x007 \0AtA\xE8#j!@@ \x07A \0t"qE@A\xBC!  \x07r6\0  6\0  6\f\v A \0AvkA\0 \0AG\x1Bt!\0 (\0!@ "(Axq F\r \0Av! \0At!\0  Aqj"\x07("\r\0\v \x07 6  6\v  6\f  6\b\f\v (\b"\0 6\f  6\b A\x006  6\f  \x006\b\v A\bj!\0\f\v@ 	E\r\0@ ("At"(\xE8# F@ A\xE8#j \x006\0 \0\rA\xBC! \vA~ wq6\0\f\v@  	(F@ 	 \x006\f\v 	 \x006\v \0E\r\v \0 	6 ("@ \0 6  \x006\v ("E\r\0 \0 6  \x006\v@ AM@   j"\0Ar6 \0 j"\0 \0(Ar6\f\v  Ar6  j" Ar6  j 6\0 \b@ \bAxqA\xE0!j!\0A\xCC!(\0!\x7FA \bAvt"\x07 qE@A\xB8!  \x07r6\0 \0\f\v \0(\b\v! \0 6\b  6\f  \x006\f  6\b\vA\xCC! 6\0A\xC0! 6\0\v A\bj!\0\v 
Aj$\0 \0\v*\x7F \0A\xC3\0j
"\0E@A\0\v \0A\xC3\0jA@q"Ak \x006\0 \v\x94\x1B&\x7F{}@  F\r\0     F\x1B"F\r\0 ("\bA\0J@ \bAj!' \xB2!DA!A!	@ \0  Atj(\0"& 	l"(mAt!\b@@@@@@ &Ak\0\v !
  Atj"\x07! \x07 \bAt"\vj"\x07!\f \x07 \vj!\rA\0! \b 	l!	@ \bAG@ 	A\0L\r \bAL\r \bAt! 	A0l! 	At! \bA0l! \bAt! \bAk!\x1B D\xFD!2@ 
 j! 
 j!  j!  j! 
 	Atj!  \bAt" j!!A\0!\v@  \vAt"\x07j"\xFD\0!0  \vAr"At"j\xFD\0\0!- \x07 !j""\xFD\0!. \x07 j"#\xFD\0!/ \x07 
j  \x07j\xFD\0\0"3 \xFD\0\0"4\xFD\xE4"5 "\xFD\0\0"6 #\xFD\0\0"7\xFD\xE4"8\xFD\xE4\xFD\v\0 
 j - 0\xFD\xE4"9 / .\xFD\xE4":\xFD\xE4\xFD\v\0 \f At"j*\0!E \f \vAt"j\xFD	\0!1 \x07 j" - 0\xFD\xE5"- 2 6 7\xFD\xE5\xFD\xE6"6\xFD\xE4"0  j\xFD	\0"7\xFD\xE6 3 4\xFD\xE5"3 2 / .\xFD\xE5\xFD\xE6".\xFD\xE4"/ D  j*\0\x94\xFD"4\xFD\xE6\xFD\xE4\xFD\v  / 7\xFD\xE6 0 4\xFD\xE6\xFD\xE5\xFD\v\0 \r j*\0!F \r j\xFD	\0!0 \x07 j" 1 9 :\xFD\xE5"/\xFD\xE6 5 8\xFD\xE5"4 D E\x94\xFD"5\xFD\xE6\xFD\xE4\xFD\v  4 1\xFD\xE6 / 5\xFD\xE6\xFD\xE5\xFD\v\0 \x07 j"\x07 0 - 6\xFD\xE5"-\xFD\xE6 3 .\xFD\xE5". D F\x94\xFD"/\xFD\xE6\xFD\xE4\xFD\v \x07 . 0\xFD\xE6 - /\xFD\xE6\xFD\xE5\xFD\v\0 \vAj"\v \x1BH\r\0\v  j! 
  j!
 \b j" 	H\r\0\v\f\v 	A\0L\r\0 	A0l!\v 	At! D\xFD!2A\0!\x07 	At!\f@ \xFD\0@!0 \xFD\0\0!- \xFD\0\`!. \xFD\0 !/ 
 \xFD\0"1 \xFD\0P"3\xFD\xE4"4 \xFD\0p"5 \xFD\00"6\xFD\xE4"7\xFD\xE4\xFD\v 
 - 0\xFD\xE4"8 / .\xFD\xE4"9\xFD\xE4\xFD\v\0 
 \fj"\r 1 3\xFD\xE5"1 2 / .\xFD\xE5\xFD\xE6".\xFD\xE4\xFD\v \r - 0\xFD\xE5"0 2 5 6\xFD\xE5\xFD\xE6"-\xFD\xE4\xFD\v\0 
 j"\r 4 7\xFD\xE5\xFD\v \r 8 9\xFD\xE5\xFD\v\0 
 \vj"\r 1 .\xFD\xE5\xFD\v \r 0 -\xFD\xE5\xFD\v\0 A\x80j! 
A j!
 \x07Aj"\x07 	H\r\0\v\v\f\v !
  Atj!A\0!\f \b 	l!	@ \bAN@ 	A\0L\r \bAt! \bAk! D\xFD!0@ 
 	Atj!  \bAt"j!A\0!\x07@  \x07Ar"Atj\xFD	\0\0!-  \x07Atj\xFD	\0\0!2  \x07At"\vj"\r\xFD\0!.  At"j"\xFD\0\0!/ 
 \vj  \vj\xFD\0\0"1 \r\xFD\0\0"3\xFD\xE4\xFD\v\0 
 j \xFD\0\0 \r\xFD\0\xFD\xE4\xFD\v\0 \v j"\v 2 / .\xFD\xE5".\xFD\xE6 1 3\xFD\xE5"/ 0 -\xFD\xE6 2\xFD\r\0\0\0\0"-\xFD\xE6\xFD\xE4\xFD\v \v / 2\xFD\xE6 . -\xFD\xE6\xFD\xE5\xFD\v\0 \x07Aj"\x07 H\r\0\v  j! 
 j!
 \b \fj"\f 	H\r\0\v\f\v 	A\0L\r\0 \bAt!A\0!\v@ 
 \xFD\0\0  \bAt"\fj"\x07\xFD\0\0\xFD\xE4\xFD\v\0 
 	Atj"\r \xFD\0\0 \x07\xFD\0\0\xFD\xE5\xFD\v\0 
 \xFD\0 \x07\xFD\0\xFD\xE4\xFD\v \r \xFD\0 \x07\xFD\0\xFD\xE5\xFD\v  j! 
 \fj!
 \b \vj"\v 	H\r\0\v\v\f\v !
  Atj"\x07!\r \x07 \bAtj!A\0!@ \bAN@ \b 	l"\vA\0J@ \bA0l! \vAt! \bAt! \bAk! DC\xD7\xB3]?\x94\xFD!2@ 
 j!  j! 
 \vAtj!\x1B  \bAt"j!A\0!	@ 
 	At"\x07j  \x07j\xFD\0\0"- \x07 j"\xFD\0\0 \x07 j"\f\xFD\0\0\xFD\xE4".\xFD\xE4\xFD\v\0 
 	Ar"At"j  j\xFD\0\0"/ \xFD\0 \f\xFD\0\xFD\xE4"1\xFD\xE4\xFD\v\0  	At"j\xFD	\0!0  At"j*\0!E \x07 \x1Bj" / 1\xFD\f\0\0\0?\0\0\0?\0\0\0?\0\0\0?\xFD\xE6\xFD\xE5"/ 2 \xFD\0\0 \f\xFD\0\0\xFD\xE5\xFD\xE6"1\xFD\xE4"3 \r j\xFD	\0"4\xFD\xE6 - .\xFD\f\0\0\0?\0\0\0?\0\0\0?\0\0\0?\xFD\xE6\xFD\xE5"- 2 \xFD\0 \f\xFD\0\xFD\xE5\xFD\xE6".\xFD\xE5"5 D \r j*\0\x94\xFD"6\xFD\xE6\xFD\xE4\xFD\v  5 4\xFD\xE6 3 6\xFD\xE6\xFD\xE5\xFD\v\0 \x07 j"\x07 0 / 1\xFD\xE5"/\xFD\xE6 - .\xFD\xE4"- D E\x94\xFD".\xFD\xE6\xFD\xE4\xFD\v \x07 - 0\xFD\xE6 / .\xFD\xE6\xFD\xE5\xFD\v\0 	Aj"	 H\r\0\v  j! 
 j!
 \b j" \vH\r\0\v\v\f\vA\xD5
A\xC4	A\x9FA\xE4\b\0\0\v\f\vA\xDD
A\xC4	A\x8C\bA\xF8\b\0\0\v 	!
 !	  Atj"\v! \v \bAt"\x07j"\v! \x07 \vj"\v! \x07 \vj!A\0!@ \bAN@ 
A\0J@ \bA\xD0\0l! \bA0l! \bAt! \bAt!\x1B \bAk! \b 
l"At! A0l! At! DCy?\x94\xFD!2 DCqxs?\x94\xFD!0@ 	 j! 	 j!  	 j!!  j!  j!"  \x1Bj!# 	 Atj!)  \bAt"*j!+A\0!\v@ # \vAt"\x07j"\f\xFD\0!- \x07 +j"\r\xFD\0!. \x07 j"$\xFD\0!/ \x07 "j"%\xFD\0!1 \x07 	j  \x07j",\xFD\0\0 \r\xFD\0\0": \f\xFD\0\0";\xFD\xE4"3 %\xFD\0\0"< $\xFD\0\0"=\xFD\xE4"4\xFD\xE4\xFD\xE4\xFD\v\0 	 \vAr"\rAt"\fj . -\xFD\xE4"5 1 /\xFD\xE4"6\xFD\xE4  \fj"$\xFD\0\0\xFD\xE4\xFD\v\0  \vAt"\fj\xFD	\0!7  \rAt"\rj*\0!E \f j\xFD	\0!8 \r j*\0!F \f j\xFD	\0!9 \r j*\0!G \x07 )j"% 0 : ;\xFD\xE5":\xFD\xE6 2 < =\xFD\xE5";\xFD\xE6\xFD\xE4"< 5\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 6\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5 $\xFD\0\0"=\xFD\xE4">\xFD\xE4"? \f j\xFD	\0"@\xFD\xE6 3\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 4\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5 ,\xFD\0\0"A\xFD\xE4"B 0 . -\xFD\xE5"-\xFD\xE6 2 1 /\xFD\xE5".\xFD\xE6\xFD\xE4"/\xFD\xE5"1 D \r j*\0\x94\xFD"C\xFD\xE6\xFD\xE4\xFD\v % 1 @\xFD\xE6 ? C\xFD\xE6\xFD\xE5\xFD\v\0 \x07 !j"\f 9 2 :\xFD\xE6 0 ;\xFD\xE6\xFD\xE5"1 = 6\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 5\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5\xFD\xE4"5\xFD\xE4"6\xFD\xE6 A 4\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 3\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5\xFD\xE4"3 2 -\xFD\xE6 0 .\xFD\xE6\xFD\xE5"-\xFD\xE5". D G\x94\xFD"4\xFD\xE6\xFD\xE4\xFD\v \f . 9\xFD\xE6 6 4\xFD\xE6\xFD\xE5\xFD\v\0 \x07  j"\f 8 5 1\xFD\xE5".\xFD\xE6 - 3\xFD\xE4"- D F\x94\xFD"1\xFD\xE6\xFD\xE4\xFD\v \f - 8\xFD\xE6 . 1\xFD\xE6\xFD\xE5\xFD\v\0 \x07 j"\x07 7 > <\xFD\xE5"-\xFD\xE6 / B\xFD\xE4". D E\x94\xFD"/\xFD\xE6\xFD\xE4\xFD\v \x07 . 7\xFD\xE6 - /\xFD\xE6\xFD\xE5\xFD\v\0 \vAj"\v H\r\0\v  j! 	 *j!	 Aj" 
G\r\0\v\v\f\vA\xD5
A\xC4	A\x92A\xDA\b\0\0\v\v    F"\x1B!   \x1B! \b &Akl j!  'G Aj! (!	\r\0\v\v \vA\xB9
A\xC4	A\xF2\x07A\xF8\b\0\0\v\xD5{\x7F  G@ \0(lE@ \0(\0"
A m!\f@@ @ 
AJ\r  
AtjA\xE0\0k!  
AmAtj"\vAj!\0 \v\xFD\0\0"!\f\v 
A N@  \fAtj!	A\0!@  At"\vj"\r  A\x07tj"\0\xFD\0\0" \0\xFD\0"\xFD\r\b	
\v\x1B\f\r\xFD\v \r  \xFD\r\0\x07\xFD\v\0 	 \vj"\v \0\xFD\0@" \0\xFD\0P"\xFD\r\b	
\v\x1B\f\r\xFD\v \v  \xFD\r\0\x07\xFD\v\0 Aj" \fG\r\0\v\v  
AmAtjAk"\0 \xFD\0 " \xFD\00"\xFD\r\b	
\v\x1B\f\r"  \xFD\r\0\x07"\xFD\r\0\x07\x1B\xFD\v\0 
A\xC0\0H"\rE@ A j!A!\v@ ! \0"	A k"\0 \xFD\0\x80"\x07 \xFD\0\x90"\b\xFD\r\b	
\v\x1B\f\r" \x07 \b\xFD\r\0\x07"\x07\xFD\r\0\x07\x1B\xFD\v\0 	Ak \x07 \xFD\r\0\x07\x1B\xFD\v\0 A\x80j! \vAj"\v \fG\r\0\v\v \0Ak  \xFD\r\0\x07\x1B\xFD\v\0  
AtjAk" \xFD\0\`" \xFD\0p"\xFD\r\b	
\v\x1B\f\r"  \xFD\r\0\x07"\xFD\r\0\x07\x1B\xFD\v\0 \rE@ A\xE0\0j!A!@ ! "\0A k" \xFD\0\x80"\x07 \xFD\0\x90"\b\xFD\r\b	
\v\x1B\f\r" \x07 \b\xFD\r\0\x07"\x07\xFD\r\0\x07\x1B\xFD\v\0 \0Ak \x07 \xFD\r\0\x07\x1B\xFD\v\0 A\x80j! Aj" \fG\r\0\v\v Ak  \xFD\r\0\x07\x1B\xFD\v\0\v  \fAtj!	A\0!@  A\x07tj"\0  At"\vj"\r\xFD\0\0" \r\xFD\0"\xFD\r\x07\f\r\xFD\v \0  \xFD\r\0\b	
\v\x1B\xFD\v\0 \0 	 \vj"\v\xFD\0\0" \v\xFD\0"\xFD\r\x07\f\r\xFD\vP \0  \xFD\r\0\b	
\v\x1B\xFD\v@ Aj" \fG\r\0\v  
A|qj"	Aj!\0  
AtjA\xE0\0k! 	\xFD\0\0!A\0!	 
A\xC0\0I@ !\f\vA!\v !@ \0\xFD\0\0"\x07 \xFD\r\0\x07\x1B!  \0\xFD\0" \x07\xFD\r\0\x07\x1B"\x07 \xFD\r\x07\f\r\xFD\v  \x07 \xFD\r\0\b	
\v\x1B\xFD\v\0 A\x80k! \0A j!\0A!	 \vAj"\v \fG\r\0\v\v   \0\xFD\0\0"\xFD\r\0\x07\x1B"  \xFD\r\0\x07\x1B"\xFD\r\x07\f\r\xFD\v   \xFD\r\0\b	
\v\x1B\xFD\v\0  
AtjA k!  
AlAmAtj"\0Aj! \0\xFD\0\0!@ 	E@ !\f\vA! !@ \xFD\0\0"\x07 \xFD\r\0\x07\x1B!  \xFD\0" \x07\xFD\r\0\x07\x1B"\x07 \xFD\r\x07\f\r\xFD\v  \x07 \xFD\r\0\b	
\v\x1B\xFD\v\0 A\x80k! A j! Aj" \fG\r\0\v\v   \xFD\0\0"\xFD\r\0\x07\x1B"  \xFD\r\0\x07\x1B"\xFD\r\x07\f\r\xFD\v   \xFD\r\0\b	
\v\x1B\xFD\v\0\v \0(!	@ @ 	A\0L\r 	Av!A\0!\0@  \0Atj"
  \0Aq l \0AvjAtj"\f\xFD\0\0" \f\xFD\0"\xFD\r\x07\f\r\xFD\v 
  \xFD\r\0\b	
\v\x1B\xFD\v\0 \0Aj"\0 	G\r\0\v\f\v 	A\0L\r\0 	Av!A\0!\0@  \0Aq l \0AvjAtj"
  \0Atj"\f\xFD\0\0" \f\xFD\0"\xFD\r\0\x07\xFD\v\0 
  \xFD\r\b	
\v\x1B\f\r\xFD\v \0Aj"\0 	G\r\0\v\v\vA\xA4\bA\xC4	A\x8A	A\x8C	\0\0\v\xBC\x7F|#\0Ak"\v$\0@ \0\xBC"A\xFF\xFF\xFF\xFF\x07q"A\xDA\x9F\xA4\xEEM@  \0\xBB" D\x83\xC8\xC9m0_\xE4?\xA2D\0\0\0\0\0\x008C\xA0D\0\0\0\0\0\x008\xC3\xA0"D\0\0\0P\xFB!\xF9\xBF\xA2\xA0 Dcba\xB4Q\xBE\xA2\xA0"9\0 \xFC! D\0\0\0\`\xFB!\xE9\xBFc@   D\0\0\0\0\0\0\xF0\xBF\xA0"D\0\0\0P\xFB!\xF9\xBF\xA2\xA0 Dcba\xB4Q\xBE\xA2\xA09\0 Ak!\f\v D\0\0\0\`\xFB!\xE9?dE\r   D\0\0\0\0\0\0\xF0?\xA0"D\0\0\0P\xFB!\xF9\xBF\xA2\xA0 Dcba\xB4Q\xBE\xA2\xA09\0 Aj!\f\v A\x80\x80\x80\xFC\x07O@  \0 \0\x93\xBB9\0A\0!\f\v \v  AvA\x96k"Atk\xBE\xBB9\b \vA\bj!
#\0A\xB0k"$\0  AkAm"A\0 A\0J\x1B"Ahlj!	A\x90\v(\0"\bA\0N@ \bAj! !@ A\xC0j Atj A\0H|D\0\0\0\0\0\0\0\0 At(\xA0\v\xB7\v9\0 Aj! Aj" G\r\0\v\v 	Ak!\x07A\0! \bA\0 \bA\0J\x1B!@A\0!D\0\0\0\0\0\0\0\0!@ 
 Atj+\0 A\xC0j  kAtj+\0\xA2 \xA0! Aj"AG\r\0\v  Atj 9\0  F Aj!E\r\0\vA/ 	k!A0 	k! AtA\xA0\vj! \b!@@  Atj+\0!A\0! ! A\0J@@ A\xE0j Atj D\0\0\0\0\0\0p>\xA2\xFC\xB7"D\0\0\0\0\0\0p\xC1\xA2 \xA0\xFC6\0  AtjA\bk+\0 \xA0! Ak! Aj" G\r\0\v\v  \x07\b" D\0\0\0\0\0\0\xC0?\xA2\x9CD\0\0\0\0\0\0 \xC0\xA2\xA0" \xFC"\f\xB7\xA1!@@@\x7F \x07A\0L"E@ At j" (\xDC"  u" tk"6\xDC  \fj!\f  u\f\v \x07\r At j(\xDCAu\v"\rA\0L\r\f\vA!\r D\0\0\0\0\0\0\xE0?f\r\0A\0!\r\f\vA\0!A\0!A! A\0J@@ A\xE0j Atj"(\0!\x7F@  \x7FA\xFF\xFF\xFF\x07 E\rA\x80\x80\x80\b\v k6\0A!A\0\f\vA\0!A\v! Aj" G\r\0\v\v@ \r\0A\xFF\xFF\xFF!@@ \x07Ak\0\vA\xFF\xFF\xFF!\v At j" (\xDC q6\xDC\v \fAj!\f \rAG\r\0D\0\0\0\0\0\0\xF0? \xA1!A!\r \r\0 D\0\0\0\0\0\0\xF0? \x07\b\xA1!\v D\0\0\0\0\0\0\0\0a@A\0! !@  \bL\r\0@ A\xE0j Ak"Atj(\0 r!  \bJ\r\0\v E\r\0@ \x07Ak!\x07 A\xE0j Ak"Atj(\0E\r\0\v\f\vA!@ "Aj! A\xE0j \b kAtj(\0E\r\0\v  j!@ A\xC0j Aj"Atj  Atj(\0\xB79\0A\0!D\0\0\0\0\0\0\0\0!@ 
 Atj+\0 A\xC0j  kAtj+\0\xA2 \xA0! Aj"AG\r\0\v  Atj 9\0  H\r\0\v !\f\v\v@ A 	k\b"D\0\0\0\0\0\0pAf@ A\xE0j Atj D\0\0\0\0\0\0p>\xA2\xFC"\xB7D\0\0\0\0\0\0p\xC1\xA2 \xA0\xFC6\0 Aj! 	!\x07\f\v \xFC!\v A\xE0j Atj 6\0\vD\0\0\0\0\0\0\xF0? \x07\b! A\0N@ !@  "Atj  A\xE0j Atj(\0\xB7\xA29\0 Ak! D\0\0\0\0\0\0p>\xA2! \r\0\v !@@ \b  k"  \bJ\x1B"\x07A\0H@D\0\0\0\0\0\0\0\0!\f\v  Atj!	A\0!D\0\0\0\0\0\0\0\0!@ At"
+\xF0  	 
j+\0\xA2 \xA0!  \x07G Aj!\r\0\v\v A\xA0j Atj 9\0 A\0J Ak!\r\0\v\vD\0\0\0\0\0\0\0\0! A\0N@@ "Ak!  A\xA0j Atj+\0\xA0! \r\0\v\v \v \x9A  \r\x1B9\0 A\xB0j$\0 \fA\x07q! \v+\0! A\0H@  \x9A9\0A\0 k!\f\v  9\0\v \vAj$\0 \v\xF9r*\x7F{	}@#\0Ak"$\0 \0"(\f!\0 A ("At" \x1BAtk""$\0   " \x1B"6\f  "6\b@@@@ "" rAqE@ A\bj!% \0Aq!\0@ E@   \0\x1B!@ (lE@  \x7F (x!@   \0\x1B" F\r\0     F\x1B"F\r\0 %("A\0J@ Ak!A!\0 !@   m" %  \0"\x07kAtj(\b"\0Aklk!  \0m!@@@@@@ \0Ak\0\v A\0L\r  Atj" At"\0j"\f \0j"
 \0j!\r  A\xA0\x7Flj"\bAk!   A\x7FslAtj"Ak! Al!\v At!A!\0 At! Al!@ \b \0Al"	Aj lAtj  \0 j lAtj\xFD\0\0"/  \0 j lAtj\xFD\0\0"1  \0 j lAtj\xFD\0\0"3\xFD\xE4"0  \0 j lAtj\xFD\0\0"4  \0 \vj lAtj\xFD\0\0"6\xFD\xE4"2\xFD\xE4\xFD\xE4\xFD\v\0  	Aj lAt"j / 0\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 2\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5\xFD\xE4\xFD\v\0 \b j 1 3\xFD\xE5"1\xFD\fqxs?qxs?qxs?qxs?\xFD\xE6 4 6\xFD\xE5"3\xFD\fy?y?y?y?\xFD\xE6\xFD\xE4\xFD\v\0  	Aj lAt"	j / 2\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 0\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5\xFD\xE4\xFD\v\0 \b 	j 1\xFD\fy?y?y?y?\xFD\xE6 3\xFD\fqxs?qxs?qxs?qxs?\xFD\xE6\xFD\xE5\xFD\v\0 \0 G \0Aj!\0\r\0\v AF\r AH\r Aj!\x1BA!@   j lAtj!   j lAtj!    j lAtj!!   \vj lAtj!&   j lAtj!'  Al"\0Aj lAtj!(  \0Aj lAtj!)  \0Aj lAtj!*A!\b  \0Aj lAtj!+  \0Aj lAtj!,@ , \bAt"\0j"#Ak \0 j"-Ak\xFD\0\0"/ \f \bAt"A\bk"	j\xFD	\0\0"3 \0 &j"$\xFD\0\0"4\xFD\xE6 \f A\fk"j\xFD	\0\0"6 $Ak\xFD\0\0"5\xFD\xE6\xFD\xE4": 	 
j\xFD	\0\0"7 \0 !j"$\xFD\0\0"8\xFD\xE6 
 j\xFD	\0\0"9 $Ak\xFD\0\0";\xFD\xE6\xFD\xE4"<\xFD\xE4"0 	 j\xFD	\0\0"= \0 'j"$\xFD\0\0">\xFD\xE6  j\xFD	\0\0"? $Ak\xFD\0\0"@\xFD\xE6\xFD\xE4"A 	 \rj\xFD	\0\0"B \0  j"	\xFD\0\0"C\xFD\xE6 \r j\xFD	\0\0"D 	Ak\xFD\0\0"E\xFD\xE6\xFD\xE4"F\xFD\xE4"2\xFD\xE4\xFD\xE4\xFD\v\0 # -\xFD\0\0"1 3 5\xFD\xE6 6 4\xFD\xE6\xFD\xE5"6 7 ;\xFD\xE6 9 8\xFD\xE6\xFD\xE5"5\xFD\xE4"3 = @\xFD\xE6 ? >\xFD\xE6\xFD\xE5"7 B E\xFD\xE6 D C\xFD\xE6\xFD\xE5"8\xFD\xE4"4\xFD\xE4\xFD\xE5\xFD\v\0 \0 +j"	Ak / 2\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 0\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5\xFD\xE4"9 6 5\xFD\xE5"6\xFD\fy?y?y?y?\xFD\xE6 7 8\xFD\xE5"5\xFD\fqxs?qxs?qxs?qxs?\xFD\xE6\xFD\xE4"7\xFD\xE5\xFD\v\0 * \x1B \bkAt"j"#Ak 7 9\xFD\xE4\xFD\v\0 	 < :\xFD\xE5":\xFD\fy?y?y?y?\xFD\xE6 F A\xFD\xE5"7\xFD\fqxs?qxs?qxs?qxs?\xFD\xE6\xFD\xE4"8 1 4\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 3\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5\xFD\xE5"9\xFD\xE4\xFD\v\0 # 8 9\xFD\xE5\xFD\v\0 \0 )j"\0Ak / 0\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 2\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5\xFD\xE4"/ 5\xFD\fy?y?y?y?\xFD\xE6 6\xFD\fqxs?qxs?qxs?qxs?\xFD\xE6\xFD\xE5"0\xFD\xE5\xFD\v\0  (j"	Ak 0 /\xFD\xE4\xFD\v\0 \0 7\xFD\fy?y?y?y?\xFD\xE6 :\xFD\fqxs?qxs?qxs?qxs?\xFD\xE6\xFD\xE5"/ 1 3\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 4\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5\xFD\xE5"0\xFD\xE4\xFD\v\0 	 / 0\xFD\xE5\xFD\v\0 \bAj"\b L\r\0\v  F Aj!E\r\0\v\f\v A\0L\r  Atj" Atj!\b At!	  AtjAk!A\0!\0@  \0Al" lAtj  \0 lAtj\xFD\0\0"/  \0 j lAtj\xFD\0\0"0  \0 	j lAtj\xFD\0\0"2\xFD\xE4"1\xFD\xE4\xFD\v\0  Aj lAtj 2 0\xFD\xE5\xFD\f\xD7\xB3]?\xD7\xB3]?\xD7\xB3]?\xD7\xB3]?\xFD\xE6\xFD\v\0  Aj lAtj / 1\xFD\f\0\0\0\xBF\0\0\0\xBF\0\0\0\xBF\0\0\0\xBF\xFD\xE6\xFD\xE4\xFD\v\0 \0Aj"\0 G\r\0\vA\0! AH\r@A!\0  	j lAt!  j lAt!  lAt!\f Al"
 lAt!\r 
Aj lAt!\v 
Aj lAt!@  \0Ak"At"
j"\x1B \rj  
j"
 \fj\xFD\0\0"/ 
 j\xFD\0\0"0  \0AtA\bk"j\xFD	\0\0"2\xFD\xE6  \0At" j" j\xFD\0\0"1  At"j\xFD	\0\0"3\xFD\xE6\xFD\xE4"4 
 j\xFD\0\0"6 \b j\xFD	\0\0"5\xFD\xE6  j\xFD\0\0": \b j\xFD	\0\0"7\xFD\xE6\xFD\xE4"8\xFD\xE4"9\xFD\xE4\xFD\v\0   j"
 \rj \f j\xFD\0\0"; 1 2\xFD\xE6 0 3\xFD\xE6\xFD\xE5"0 : 5\xFD\xE6 6 7\xFD\xE6\xFD\xE5"2\xFD\xE4"1\xFD\xE4\xFD\v\0 \v \x1Bj 0 2\xFD\xE5\xFD\f\xD7\xB3]?\xD7\xB3]?\xD7\xB3]?\xD7\xB3]?\xFD\xE6"0 / 9\xFD\f\0\0\0?\0\0\0?\0\0\0?\0\0\0?\xFD\xE6\xFD\xE5"/\xFD\xE4\xFD\v\0   \0kAtj j"Ak / 0\xFD\xE5\xFD\v\0 
 \vj 8 4\xFD\xE5\xFD\f\xD7\xB3]?\xD7\xB3]?\xD7\xB3]?\xD7\xB3]?\xFD\xE6"/ ; 1\xFD\f\0\0\0?\0\0\0?\0\0\0?\0\0\0?\xFD\xE6\xFD\xE5"0\xFD\xE4\xFD\v\0  / 0\xFD\xE5\xFD\v\0 \0Aj"\0 H\r\0\v Aj" G\r\0\v\f\v !\0  l"A\0J@A\0!@  Atj \0 Atj"\xFD\0\0"/  Atj\xFD\0\0"0\xFD\xE4\xFD\v\0   j"AtjAk / 0\xFD\xE5\xFD\v\0  H\r\0\v\v  Atj!\b@ AH\r\0 AG@ A\0J@A\0!@  j"At!  Atj!	 \0 Atj!A!@  Ak"\fAt"
j"\r\xFD\0\0!/ 	 At"\vj \v j"\v\xFD\0\0"0 \v At"j\xFD\0\0"2 \b AtjA\bk\xFD	\0\0"1\xFD\xE6 \r j\xFD\0\0"3 \b \fAtj\xFD	\0\0"4\xFD\xE6\xFD\xE5"6\xFD\xE4\xFD\v\0   kAtj"\f 6 0\xFD\xE5\xFD\v\0 	 
j / 2 4\xFD\xE6 3 1\xFD\xE6\xFD\xE4"0\xFD\xE4\xFD\v\0 \fAk / 0\xFD\xE5\xFD\v\0 Aj" H\r\0\v " H\r\0\v\v Aq\r\v A\0L\r\0  At"j! \0 j AtjAk!\bA\0!@  Atj"	 \b Atj\xFD\0\0\xFD\xE1\xFD\v\0 	Ak \0  j"AtjAk\xFD\0\0\xFD\v\0  H\r\0\v\v\f\vA\xDD
A\xC4	A\xCBA\xEE\b\0\0\v  Atj"\0! \0 At"\bj"	!  l"A\0J@  At"\fj!
 At!\r At!\v A0l! At! !\0 !@ \0 j\xFD\0\0!/ \0 \fj\xFD\0\0!0  \vj"Ak \0\xFD\0\0"2 \0 j\xFD\0\0"1\xFD\xE5\xFD\v\0  / 0\xFD\xE5\xFD\v\0  2 1\xFD\xE4"2 0 /\xFD\xE4"/\xFD\xE4\xFD\v\0  \rj"Ak 2 /\xFD\xE5\xFD\v\0 \0 Atj"\0 
I\r\0\v\v \b 	j!\f@ AH\r\0@ AG@ A\0L\r A0l! At! Aj!\x1BA\0!\b A0l!
 At!\r@  \bAt"j!	 \x1B \bAtj!\0A!@ 	 Ak"Atj"  \0\xFD\0\0"/ \0 j"!\xFD\0\0"0  AtA\bk"\vj\xFD	\0\0"2\xFD\xE6 !\xFD\0"1  At"j\xFD	\0\0"3\xFD\xE6\xFD\xE4"4\xFD\xE4"6 \0 Atj"!\xFD\0\0"5 \v j\xFD	\0\0":\xFD\xE6 !\xFD\0"7  j\xFD	\0\0"8\xFD\xE6\xFD\xE4"9 \0 j"!\xFD\0\0"; \v \fj\xFD	\0\0"<\xFD\xE6 !\xFD\0"= \f j\xFD	\0\0">\xFD\xE6\xFD\xE4"?\xFD\xE4"@\xFD\xE4\xFD\v\0   kAt"\vj jAk" 
j 6 @\xFD\xE5\xFD\v\0 \r  j / 4\xFD\xE5"/ 7 :\xFD\xE6 5 8\xFD\xE6\xFD\xE5"4 = <\xFD\xE6 ; >\xFD\xE6\xFD\xE5"6\xFD\xE5"5\xFD\xE4\xFD\v\0  At" j / 5\xFD\xE5\xFD\v\0 	 Atj" 4 6\xFD\xE4"/ 1 2\xFD\xE6 0 3\xFD\xE6\xFD\xE5"0 \0\xFD\0"2\xFD\xE4"1\xFD\xE4\xFD\v\0 	 \vj"\v 
j / 1\xFD\xE5\xFD\v\0 \r j ? 9\xFD\xE5"/ 2 0\xFD\xE5"0\xFD\xE4\xFD\v\0 \v  j / 0\xFD\xE5\xFD\v\0 \0A j!\0 Aj" H\r\0\v  \bj"\b H\r\0\v AqE\r\f\v A\0L\r\v A0l! At!\b At!	 A0l!  At"Ak"\0j!\f \0 j!
A\0!\0@ 
 \0Atj" 	j\xFD\0\0!/ \f \0At"\rj"\v \xFD\0\0"0  j\xFD\0\0"2  Atj\xFD\0\0"1\xFD\xE5\xFD\f\xF35\xBF\xF35\xBF\xF35\xBF\xF35\xBF\xFD\xE6"3\xFD\xE4\xFD\v\0 \b \vj 0 3\xFD\xE5\xFD\v\0  \rj" j 1 2\xFD\xE4\xFD\f\xF35\xBF\xF35\xBF\xF35\xBF\xF35\xBF\xFD\xE6"0 /\xFD\xE5\xFD\v\0  j 0 /\xFD\xE4\xFD\v\0 \0 j"\0 H\r\0\v\v\v    F"\0\x1B!   \0\x1B! \x07Aj!\0 \x07 G\r\0\v\v \f\vA\xB9
A\xC4	A\xB0A\xEE\b\0\0\v G"\x1B! (t!   \x1B"\0 G@  AtjAk\xFD\0\0!/ \xFD\0p!2 \xFD\0\0!0 \0 \xFD\00"1\xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0 \xFD\00"3\xFD\r\b	
\v\x1B\f\r"4 \xFD\0"6 \xFD\0P"5\xFD\r\b	
\v\x1B\f\r":\xFD\r\0\x07"7\xFD\xE6 \xFD\0 "8\xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0 \xFD\0@"9\xFD\r\b	
\v\x1B\f\r"; \xFD\0 "< \xFD\0\`"=\xFD\r\b	
\v\x1B\f\r">\xFD\r\0\x07"?\xFD\xE6\xFD\xE4"@\xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0 9\xFD\r\0\x07"9 < =\xFD\r\0\x07"<\xFD\r\0\x07"=\xFD\xE4"A \xFD\0"B\xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0 3\xFD\r\0\x07"3 6 5\xFD\r\0\x07"6\xFD\r\b	
\v\x1B\f\r"5\xFD\xE6 \xFD\0\0"C 9 <\xFD\r\b	
\v\x1B\f\r"9\xFD\xE6\xFD\xE4"< \xFD\0P"D 4 :\xFD\r\b	
\v\x1B\f\r"4\xFD\xE6 \xFD\0@": ; >\xFD\r\b	
\v\x1B\f\r";\xFD\xE6\xFD\xE4">\xFD\xE4"E\xFD\xE4\xFD\v \0 3 6\xFD\r\0\x07"3 8 7\xFD\xE6 1 ?\xFD\xE6\xFD\xE5"1\xFD\xE5"6 > <\xFD\xE5"7\xFD\xE5\xFD\v@ \0 6 7\xFD\xE4\xFD\v  \0 : 4\xFD\xE6 D ;\xFD\xE6\xFD\xE5"4 C 5\xFD\xE6 B 9\xFD\xE6\xFD\xE5"6\xFD\xE5"5 = @\xFD\xE5":\xFD\xE5\xFD\v0 \0 1 3\xFD\xE4"1 6 4\xFD\xE4"3\xFD\xE5\xFD\v\` \0 E A\xFD\xE5\xFD\vp \0 : 5\xFD\xE4\xFD\vP \0 1 3\xFD\xE4\xFD\v\0 \0 0\xFD\0"G 0\xFD"H\x92"I 0\xFD"J 0\xFD"L\x92"M\x938 \0 G H\x938@ \0 /\xFD"G /\xFD"H\x93"KC\xF35?\x94 /\xFD\0"N\x928  \0 G H\x92C\xF35\xBF\x94"G /\xFD"H\x9380 \0 KC\xF35\xBF\x94 N\x928\` \0 G H\x928p \0 L J\x938P \0 I M\x928\0 A\bN@A Am" AL\x1B!A!\x07@ 2  \x07A\x07t"j"\xFD\00"0\xFD\r\b	
\v\x1B\f\r!/ 2 0\xFD\r\0\x07!0 \xFD\0p!2 \0 j"  \x07A\xE0\0lj"\xFD\0"1 0 \xFD\0"3 \xFD\0P"4\xFD\r\0\x07"6\xFD\r\b	
\v\x1B\f\r"5\xFD\xE6 \xFD\0\0": \xFD\0\0"7 \xFD\0@"8\xFD\r\0\x07"9 \xFD\0 "; \xFD\0\`"<\xFD\r\0\x07"=\xFD\r\b	
\v\x1B\f\r">\xFD\xE6\xFD\xE4"? \xFD\0P"@ / 3 4\xFD\r\b	
\v\x1B\f\r"3\xFD\r\b	
\v\x1B\f\r"4\xFD\xE6 \xFD\0@"A 7 8\xFD\r\b	
\v\x1B\f\r"7 ; <\xFD\r\b	
\v\x1B\f\r"8\xFD\r\b	
\v\x1B\f\r";\xFD\xE6\xFD\xE4"<\xFD\xE4"B \xFD\00"C / 3\xFD\r\0\x07"/\xFD\xE6 \xFD\0 "3 7 8\xFD\r\0\x07"7\xFD\xE6\xFD\xE4"8 9 =\xFD\r\0\x07"9\xFD\xE4"=\xFD\xE5\xFD\vp  3 /\xFD\xE6 C 7\xFD\xE6\xFD\xE5"/ 0 6\xFD\r\0\x07"0\xFD\xE4"3 : 5\xFD\xE6 1 >\xFD\xE6\xFD\xE5"1 A 4\xFD\xE6 @ ;\xFD\xE6\xFD\xE5"4\xFD\xE4"6\xFD\xE5\xFD\v\`  9 8\xFD\xE5"5 4 1\xFD\xE5"1\xFD\xE4\xFD\vP  0 /\xFD\xE5"/ < ?\xFD\xE5"0\xFD\xE5\xFD\v@  1 5\xFD\xE5\xFD\v0  / 0\xFD\xE4\xFD\v   = B\xFD\xE4\xFD\v  3 6\xFD\xE4\xFD\v\0 \x07Aj"\x07 G\r\0\v\v\f\vA\xA4\bA\xC4	A\xBC
A\xFF	\0\0\v A\0J@A\0!@  At"j  "j\xFD\0\0"/ " Ar"j\xFD\0\0"0\xFD\r\0\b	
\v\x1B\xFD\v\0  j / 0\xFD\r\x07\f\r\xFD\v\0 Aj" G\r\0\v\v     \0\x1B  (x %A\x7F\f  F\r G"\0! AH\r\0 Am!\x07   \x1B! (t!   \0\x1B!A\0!@   A\x07tj"\0\xFD\0"/ \0\xFD\0P"0\xFD\r\0\x07"2 \0\xFD\00"1 \0\xFD\0p"3\xFD\r\0\x07"4\xFD\r\0\x07"6  A\xE0\0lj"\xFD\00"5 \0\xFD\0\0": \0\xFD\0@"7\xFD\r\b	
\v\x1B\f\r"8 \0\xFD\0 "9 \0\xFD\0\`";\xFD\r\b	
\v\x1B\f\r"<\xFD\r\0\x07"=\xFD\xE6 \xFD\0 "> / 0\xFD\r\b	
\v\x1B\f\r"/ 1 3\xFD\r\b	
\v\x1B\f\r"0\xFD\r\0\x07"1\xFD\xE6\xFD\xE4"3\xFD\xE5"? \xFD\0\0"@ : 7\xFD\r\0\x07": 9 ;\xFD\r\0\x07"7\xFD\r\b	
\v\x1B\f\r"9\xFD\xE6 \xFD\0"; 2 4\xFD\r\b	
\v\x1B\f\r"2\xFD\xE6\xFD\xE5"4 \xFD\0@"A 8 <\xFD\r\b	
\v\x1B\f\r"8\xFD\xE6 \xFD\0P"< / 0\xFD\r\b	
\v\x1B\f\r"/\xFD\xE6\xFD\xE5"0\xFD\xE5"B\xFD\xE4\xFD\vp  : 7\xFD\r\0\x07": > =\xFD\xE6 5 1\xFD\xE6\xFD\xE5"1\xFD\xE5"5 ; 9\xFD\xE6 @ 2\xFD\xE6\xFD\xE4"2 < 8\xFD\xE6 A /\xFD\xE6\xFD\xE4"/\xFD\xE5"7\xFD\xE5\xFD\v\`  3 6\xFD\xE4"3 2 /\xFD\xE4"/\xFD\xE5\xFD\vP  1 :\xFD\xE4"2 4 0\xFD\xE4"0\xFD\xE5\xFD\v@  ? B\xFD\xE5\xFD\v0  5 7\xFD\xE4\xFD\v   3 /\xFD\xE4\xFD\v  2 0\xFD\xE4\xFD\v\0 A\x80j! Aj" \x07G\r\0\v\v    \x1B A\fj A\bj \x1B(\0A\0\r\f\v  "   "   \0\x1BG \0s"\0\x1B"A\r A\bj \0EAtj(\0!\0 (t! (lE@@ \0 G@ *p!G *\`!H *P!I *@!J *0!L * !M *!K *\0!N \0 \xFD\0"/ \xFD\0p"0\xFD\xE5"2 \xFD\00"1 \xFD\0P"3\xFD\xE5"4\xFD\xE5"6 4 2\xFD\xE4"2 \xFD\0 "4\xFD\xE6 \xFD\0\0"5 \xFD\0\`":\xFD\xE4"7 \xFD\0 "8 \xFD\0@"9\xFD\xE4";\xFD\xE5"< \xFD\00"=\xFD\xE6\xFD\xE5">\xFD\r\b	
\v\x1B\f\r"? / 0\xFD\xE4"/ 8 9\xFD\xE5"0\xFD\xE5"8 \xFD\0\0"9\xFD\xE6 5 :\xFD\xE5"5 1 3\xFD\xE4"1\xFD\xE5"3 \xFD\0":\xFD\xE6\xFD\xE5"@ 0 /\xFD\xE4"/ \xFD\0@"0\xFD\xE6 1 5\xFD\xE4"1 \xFD\0P"5\xFD\xE6\xFD\xE5"A\xFD\r\b	
\v\x1B\f\r"B\xFD\r\b	
\v\x1B\f\r\xFD\v\` \0 ; 7\xFD\xE4"7 2 =\xFD\xE6 < 4\xFD\xE6\xFD\xE4"2\xFD\r\b	
\v\x1B\f\r"4 3 9\xFD\xE6 : 8\xFD\xE6\xFD\xE4"3 / 5\xFD\xE6 1 0\xFD\xE6\xFD\xE4"/\xFD\r\b	
\v\x1B\f\r"0\xFD\r\b	
\v\x1B\f\r\xFD\vP \0 ? B\xFD\r\0\x07\xFD\v@ \0 4 0\xFD\r\0\x07\xFD\v0 \0 6 >\xFD\r\0\x07 @ A\xFD\r\0\x07\xFD\r\b	
\v\x1B\f\r\xFD\v  \0 7 2\xFD\r\0\x07 3 /\xFD\r\0\x07\xFD\r\b	
\v\x1B\f\r\xFD\v A\x07J@A Am" AL\x1B! \0Ak!\bA!@ \b A\x07t"j"  j"\xFD\0"/ \xFD\0p"0\xFD\xE5"2 \xFD\00"1 \xFD\0P"3\xFD\xE5"4\xFD\xE5"6 4 2\xFD\xE4"2  A\xE0\0lj"\x07\xFD\0 "4\xFD\xE6 \xFD\0\0"5 \xFD\0\`":\xFD\xE4"7 \xFD\0 "8 \xFD\0@"9\xFD\xE4";\xFD\xE5"< \x07\xFD\00"=\xFD\xE6\xFD\xE5">\xFD\r\b	
\v\x1B\f\r"? / 0\xFD\xE4"/ 8 9\xFD\xE5"0\xFD\xE5"8 \x07\xFD\0\0"9\xFD\xE6 5 :\xFD\xE5"5 1 3\xFD\xE4"1\xFD\xE5"3 \x07\xFD\0":\xFD\xE6\xFD\xE5"@ 0 /\xFD\xE4"/ \x07\xFD\0@"0\xFD\xE6 1 5\xFD\xE4"1 \x07\xFD\0P"5\xFD\xE6\xFD\xE5"A\xFD\r\b	
\v\x1B\f\r"B\xFD\r\b	
\v\x1B\f\r\xFD\vp  ; 7\xFD\xE4"7 2 =\xFD\xE6 < 4\xFD\xE6\xFD\xE4"2\xFD\r\b	
\v\x1B\f\r"4 3 9\xFD\xE6 : 8\xFD\xE6\xFD\xE4"3 / 5\xFD\xE6 1 0\xFD\xE6\xFD\xE4"/\xFD\r\b	
\v\x1B\f\r"0\xFD\r\b	
\v\x1B\f\r\xFD\v\`  ? B\xFD\r\0\x07\xFD\vP  4 0\xFD\r\0\x07\xFD\v@  6 >\xFD\r\0\x07"0 @ A\xFD\r\0\x07"1\xFD\r\b	
\v\x1B\f\r\xFD\v0  7 2\xFD\r\0\x07"2 3 /\xFD\r\0\x07"/\xFD\r\b	
\v\x1B\f\r\xFD\v   0 1\xFD\r\0\x07\xFD\v  2 /\xFD\r\0\x07\xFD\v\0 Aj" G\r\0\v\v \0 I I\x92"I N K\x93"O\x928\f \0 N K\x92"K J J\x92"J\x938\b \0 O I\x938 \0 J K\x928\0 \0 Atj"Ak M H\x93"IC\xF3\xB5\xBF\x94 L G\x92C\xF3\xB5\xBF\x94"J\x928\0 A\bk G L\x93"G G\x928\0 A\fk IC\xF3\xB5?\x94 J\x928\0 Ak M H\x92"G G\x928\0\f\vA\xA4\bA\xC4	A\x96\vA\xC4\b\0\0\v\x7F (x!   \0 F\x1B" \0G@A! %("A\0J@A!@  % "Aj"Atj(\0" "\x07l"m!@@@@@@ Ak\0\v \x07A\0L\r  Atj" At"j" j"\f j!
 \0 A\xA0\x7Flj"\bAk!   \x07A\x7FslAtj"\0Ak! \x07Al!\r \x07At!\v \x07Al!A! \x07At!@ \b Al"Aj lAt"	j\xFD\0\0!/ \b Aj lAt"\x1Bj\xFD\0\0!0 \0  \x07j lAtj \b Aj lAtj\xFD\0\0"2  	j\xFD\0\0"1 1\xFD\xE4"1  \x1Bj\xFD\0\0"3 3\xFD\xE4"3\xFD\xE4\xFD\xE4\xFD\v\0 \0  j lAtj 2 1\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 3\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5\xFD\xE4"4 / /\xFD\xE4"/\xFD\fqxs?qxs?qxs?qxs?\xFD\xE6 0 0\xFD\xE4"0\xFD\fy?y?y?y?\xFD\xE6\xFD\xE4"6\xFD\xE5\xFD\v\0 \0  j lAtj 2 3\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 1\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5\xFD\xE4"2 /\xFD\fy?y?y?y?\xFD\xE6 0\xFD\fqxs?qxs?qxs?qxs?\xFD\xE6\xFD\xE5"/\xFD\xE5\xFD\v\0 \0  \vj lAtj / 2\xFD\xE4\xFD\v\0 \0  \rj lAtj 6 4\xFD\xE4\xFD\v\0  \x07G Aj!\r\0\v AF\r AH\r Aj!\x1BA!@   \rj lAtj!   \vj lAtj!    j lAtj!!   j lAtj!&   \x07j lAtj!'  Al"\bAj lAtj!(  \bAj lAtj!)  \bAj lAtj!*  \bAj lAtj!+A!\0  \bAj lAtj!,@ , \0At"\bj"\xFD\0\0!/ + \x1B \0kAt"	j"#\xFD\0\0!0 \b *j"-\xFD\0\0!2 	 )j"	\xFD\0\0!1 \b 'j"$Ak \b (j".Ak\xFD\0\0"3 Ak\xFD\0\0"? #Ak\xFD\0\0"@\xFD\xE4"4 -Ak\xFD\0\0"A 	Ak\xFD\0\0"B\xFD\xE4"6\xFD\xE4\xFD\xE4\xFD\v\0 $ / 0\xFD\xE5"5 2 1\xFD\xE5":\xFD\xE4 .\xFD\0\0"7\xFD\xE4\xFD\v\0 
 \0At"	A\bk"j\xFD	\0\0!8 
 	A\fk"	j\xFD	\0\0!9 \f j\xFD	\0\0!; 	 \fj\xFD	\0\0!<  j\xFD	\0\0!= 	 j\xFD	\0\0!> \b &j"# 3 4\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 6\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5\xFD\xE4"C / 0\xFD\xE4"/\xFD\fqxs?qxs?qxs?qxs?\xFD\xE6 2 1\xFD\xE4"0\xFD\fy?y?y?y?\xFD\xE6\xFD\xE4"2\xFD\xE5"1  j\xFD	\0\0"D\xFD\xE6 ? @\xFD\xE5"?\xFD\fqxs?qxs?qxs?qxs?\xFD\xE6 A B\xFD\xE5"@\xFD\fy?y?y?y?\xFD\xE6\xFD\xE4"A 7 5\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 :\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5\xFD\xE4"B\xFD\xE4"E 	 j\xFD	\0\0"F\xFD\xE6\xFD\xE4\xFD\v\0 #Ak 1 F\xFD\xE6 E D\xFD\xE6\xFD\xE5\xFD\v\0 \b !j" = 3 6\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 4\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5\xFD\xE4"1 /\xFD\fy?y?y?y?\xFD\xE6 0\xFD\fqxs?qxs?qxs?qxs?\xFD\xE6\xFD\xE5"/\xFD\xE5"0\xFD\xE6 > ?\xFD\fy?y?y?y?\xFD\xE6 @\xFD\fqxs?qxs?qxs?qxs?\xFD\xE6\xFD\xE5"3 7 :\xFD\fz7\x9E>z7\x9E>z7\x9E>z7\x9E>\xFD\xE6 5\xFD\f\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xBD\x1BO?\xFD\xE6\xFD\xE5\xFD\xE4"4\xFD\xE4"6\xFD\xE6\xFD\xE4\xFD\v\0 Ak 0 >\xFD\xE6 6 =\xFD\xE6\xFD\xE5\xFD\v\0 \b  j" ; / 1\xFD\xE4"/\xFD\xE6 < 4 3\xFD\xE5"0\xFD\xE6\xFD\xE4\xFD\v\0 Ak / <\xFD\xE6 0 ;\xFD\xE6\xFD\xE5\xFD\v\0 \b j"\b 8 2 C\xFD\xE4"/\xFD\xE6 9 B A\xFD\xE5"0\xFD\xE6\xFD\xE4\xFD\v\0 \bAk / 9\xFD\xE6 0 8\xFD\xE6\xFD\xE5\xFD\v\0 \0Aj"\0 L\r\0\v  \x07F Aj!E\r\0\v\f\v \x07A\0L\r  Atj"\b Atj! \x07At! \0 AtjAk!	A\0!@   lAtj \0 Al" lAtj\xFD\0\0"/ 	 Aj lAtj\xFD\0\0"0 0\xFD\xE4"0\xFD\xE4\xFD\v\0   \x07j lAtj / 0\xFD\f\0\0\0\xBF\0\0\0\xBF\0\0\0\xBF\0\0\0\xBF\xFD\xE6\xFD\xE4"/ \0 Aj lAtj\xFD\0\0\xFD\f\xD7\xB3\xDD?\xD7\xB3\xDD?\xD7\xB3\xDD?\xD7\xB3\xDD?\xFD\xE6"0\xFD\xE5\xFD\v\0   j lAtj / 0\xFD\xE4\xFD\v\0 Aj" \x07G\r\0\vA\0! AH\r@A! Al"	Aj lAt! 	Aj lAt!  	lAt!	  lAt!  \x07j lAt!\f  j lAt!
@  Ak"At"\vj"\r j \0 \vj"\v 	j\xFD\0\0"/ \v j\xFD\0\0"0 \0  kAtj j"\x1BAk\xFD\0\0"2\xFD\xE4"1\xFD\xE4\xFD\v\0  At"j"\v j \0 j" 	j\xFD\0\0"3  j\xFD\0\0"4 \x1B\xFD\0\0"6\xFD\xE5"5\xFD\xE4\xFD\v\0 \f \rj / 1\xFD\f\0\0\0?\0\0\0?\0\0\0?\0\0\0?\xFD\xE6\xFD\xE5"/ 4 6\xFD\xE4\xFD\f\xD7\xB3]?\xD7\xB3]?\xD7\xB3]?\xD7\xB3]?\xFD\xE6"1\xFD\xE5"4 \b AtA\bk"\x1Bj\xFD	\0\0"6\xFD\xE6 0 2\xFD\xE5\xFD\f\xD7\xB3]?\xD7\xB3]?\xD7\xB3]?\xD7\xB3]?\xFD\xE6"0 3 5\xFD\f\0\0\0?\0\0\0?\0\0\0?\0\0\0?\xFD\xE6\xFD\xE5"2\xFD\xE4"3 \b At"j\xFD	\0\0"5\xFD\xE6\xFD\xE5\xFD\v\0 \v \fj 4 5\xFD\xE6 3 6\xFD\xE6\xFD\xE4\xFD\v\0 
 \rj / 1\xFD\xE4"/  \x1Bj\xFD	\0\0"1\xFD\xE6 2 0\xFD\xE5"0  j\xFD	\0\0"2\xFD\xE6\xFD\xE5\xFD\v\0 
 \vj / 2\xFD\xE6 0 1\xFD\xE6\xFD\xE4\xFD\v\0 Aj" H\r\0\v Aj" \x07G\r\0\v\f\v \0!  \x07l"A\0J@A\0!\0@  \0Atj"\x07  \0Atj\xFD\0\0"/  \0 j"\0AtjAk\xFD\0\0"0\xFD\xE4\xFD\v\0 \x07 Atj / 0\xFD\xE5\xFD\v\0 \0 H\r\0\v\v  Atj!\b@ AH\r\0 AG@ A\0J@A\0!\0@ \0 j"\x07At!	  \0Atj!  \0Atj!A!\0@  \0At"j\xFD\0\0!/  	 \0kAtj"\xFD\0\0!0  \0Ak"\fAt"
j"\r 
 j\xFD\0\0"2 Ak\xFD\0\0"1\xFD\xE4\xFD\v\0  j" / 0\xFD\xE5\xFD\v\0 \r At"j 2 1\xFD\xE5"2 \b \0AtjA\bk\xFD	\0\0"1\xFD\xE6 / 0\xFD\xE4"/ \b \fAtj\xFD	\0\0"0\xFD\xE6\xFD\xE5\xFD\v\0  j 2 0\xFD\xE6 / 1\xFD\xE6\xFD\xE4\xFD\v\0 \0Aj"\0 H\r\0\v \x07"\0 H\r\0\v\v Aq\r\v A\0L\r\0  Atj!A\0!\0@  \0Atj"\x07\xFD\0\0!/  \0 j"\0AtjAk"\b \x07Ak\xFD\0\0"0 0\xFD\xE4\xFD\v\0 \b Atj /\xFD\f\0\0\0\xC0\0\0\0\xC0\0\0\0\xC0\0\0\0\xC0\xFD\xE6\xFD\v\0 \0 H\r\0\v\v\f\vA\xDD
A\xC4	A\xF8A\x82	\0\0\v  Atj"!  At"\bj"!	  \x07l"A\0J@  At"j! A0l!\f At!
 At!\r At!\v \0! !\x07@  \rj"\xFD\0\0!/ \x07 \xFD\0\0"0  \vj"Ak\xFD\0\0"2\xFD\xE4"1 Ak\xFD\0\0"3 3\xFD\xE4"3\xFD\xE4\xFD\v\0 \x07 
j 1 3\xFD\xE5\xFD\v\0 \x07 j 0 2\xFD\xE5"0 / /\xFD\xE4"/\xFD\xE5\xFD\v\0 \x07 \fj 0 /\xFD\xE4\xFD\v\0 \x07 Atj"\x07 I\r\0\v\v \b j!@ AH\r\0@ AG@ A\0L\r APl!\v At! At! \0Ak!A\0!\b@  \bAtj" Atj!\x1B  \bAtjAj!A!\x07@   \x07At"\fj"
\xFD\0\0"/   \x07kAtj"\r\xFD\0\0"0\xFD\xE4"2 \f \x1Bj"\f\xFD\0\0"1   \x07kAtj"\xFD\0\0"3\xFD\xE4"4\xFD\xE4\xFD\v\0  \f\xFD\0"6 \xFD\0"5\xFD\xE5": 
\xFD\0"7 \r\xFD\0"8\xFD\xE5"9\xFD\xE4\xFD\v  At"\fj" / 0\xFD\xE5"/ 6 5\xFD\xE4"0\xFD\xE5"6  \x07At"\rAk"
j\xFD	\0\0"5\xFD\xE6 1 3\xFD\xE5"1 7 8\xFD\xE4"3\xFD\xE4"7  \rA\bk"\rj\xFD	\0\0"8\xFD\xE6\xFD\xE4\xFD\v  6 8\xFD\xE6 7 5\xFD\xE6\xFD\xE5\xFD\v\0  \fj" 2 4\xFD\xE5"2 	 
j\xFD	\0\0"4\xFD\xE6 9 :\xFD\xE5"6 	 \rj\xFD	\0\0"5\xFD\xE6\xFD\xE4\xFD\v  2 5\xFD\xE6 6 4\xFD\xE6\xFD\xE5\xFD\v\0  \fj" / 0\xFD\xE4"/ 
 j\xFD	\0\0"0\xFD\xE6 3 1\xFD\xE5"2 \r j\xFD	\0\0"1\xFD\xE6\xFD\xE4\xFD\v  / 1\xFD\xE6 2 0\xFD\xE6\xFD\xE5\xFD\v\0  \vjA j! \x07Aj"\x07 H\r\0\v  \bj"\b H\r\0\v AqE\r\f\v A\0L\r\v A0l!\b At! \0 Atj!  AtjAk!	A\0!\x07@  \x07At jAt"j"\xFD\0\0!/ \0 j"\xFD\0\0!0 	 \x07Atj" Ak\xFD\0\0"2 Ak\xFD\0\0"1\xFD\xE4"3 3\xFD\xE4\xFD\v\0  Atj 0 /\xFD\xE4"3 2 1\xFD\xE5"2\xFD\xE5\xFD\f\xF3\xB5\xBF\xF3\xB5\xBF\xF3\xB5\xBF\xF3\xB5\xBF\xFD\xE6\xFD\v\0  j / 0\xFD\xE5"/ /\xFD\xE4\xFD\v\0  \bj 2 3\xFD\xE4\xFD\f\xF3\xB5\xBF\xF3\xB5\xBF\xF3\xB5\xBF\xF3\xB5\xBF\xFD\xE6\xFD\v\0  \x07j"\x07 H\r\0\v\v\v    F"\x1B!\0   \x1B! Ak l j!  G\r\0\v\v \0\f\vA\xA4\bA\xC4	A\xDFA\x82	\0\0\v G!\f\v \0 F\r AJ@ Am!A\0! \0!@   A\x07tj"\x07\xFD\0"/ \x07\xFD\0P"0\xFD\xE4"2 \x07\xFD\00"1 \x07\xFD\0p"3\xFD\xE4"4\xFD\xE4"6 2 4\xFD\xE5"2  A\xE0\0lj"\xFD\0 "4\xFD\xE6 \x07\xFD\0\0"5 \x07\xFD\0@":\xFD\xE4"7 \x07\xFD\0 "8 \x07\xFD\0\`"9\xFD\xE4";\xFD\xE5"< \xFD\00"=\xFD\xE6\xFD\xE5">\xFD\r\b	
\v\x1B\f\r"? / 0\xFD\xE5"/ 8 9\xFD\xE5"0\xFD\xE4"8 \xFD\0\0"9\xFD\xE6 \xFD\0"@ 5 :\xFD\xE5"5 1 3\xFD\xE5"1\xFD\xE5"3\xFD\xE6\xFD\xE5": / 0\xFD\xE5"/ \xFD\0@"0\xFD\xE6 5 1\xFD\xE4"1 \xFD\0P"5\xFD\xE6\xFD\xE5"A\xFD\r\b	
\v\x1B\f\r"B\xFD\r\b	
\v\x1B\f\r\xFD\vp  7 ;\xFD\xE4"7 2 =\xFD\xE6 < 4\xFD\xE6\xFD\xE4"2\xFD\r\b	
\v\x1B\f\r"4 8 @\xFD\xE6 3 9\xFD\xE6\xFD\xE4"3 / 5\xFD\xE6 1 0\xFD\xE6\xFD\xE4"/\xFD\r\b	
\v\x1B\f\r"0\xFD\r\b	
\v\x1B\f\r\xFD\v\`  ? B\xFD\r\0\x07\xFD\vP  4 0\xFD\r\0\x07\xFD\v@  6 >\xFD\r\0\x07"0 : A\xFD\r\0\x07"1\xFD\r\b	
\v\x1B\f\r\xFD\v0  7 2\xFD\r\0\x07"2 3 /\xFD\r\0\x07"/\xFD\r\b	
\v\x1B\f\r\xFD\v   0 1\xFD\r\0\x07\xFD\v  2 /\xFD\r\0\x07\xFD\v\0 A\x80j! Aj" G\r\0\v\v  \0   (x %A\f"\0 G! A\0L\r\0 A\fj A\bj \0 G\x1B(\0!A\0! AG@ Aq A\xFE\xFF\xFF\xFF\x07q!A\0!\x07@  Atj"\0 \0\xFD\0\0"/ \0\xFD\0"0\xFD\r\b	
\v\x1B\f\r\xFD\v \0 / 0\xFD\r\0\x07\xFD\v\0 \0 \0\xFD\0 "/ \0\xFD\00"0\xFD\r\0\x07\xFD\v  \0 / 0\xFD\r\b	
\v\x1B\f\r\xFD\v0 Aj! \x07Aj"\x07 G\r\0\vE\r\v  Atj"\0 \0\xFD\0\0"/ \0\xFD\0"0\xFD\r\b	
\v\x1B\f\r\xFD\v \0 / 0\xFD\r\0\x07\xFD\v\0\v  A\bj Atj(\0"\0G@  "G\rA\0! A\0J@@ \0 At"Ar"j\xFD\0\0!/  j \0 j\xFD\0\0\xFD\v\0  j /\xFD\v\0 Aj" G\r\0\v\v A\bjA\0A \x1Bj(\0 G\r\v Aj$\0\f\vA\xDF
A\xC4	A\xC7\vA\xAB	\0\0\vA\xA4\bA\xC4	A\xAF	A\xEB	\0\0\vA\xA4\bA\xC4	A\xDB	A\xAE\b\0\0\vA\x94\bA\xC4	A\xF4\vA\xAB	\0\0\vA\x80\bA\xC4	A\xFB\vA\xAB	\0\0\v\v\0 \0@ \0(p	 \0\x07\v\v\xC6"\x7F{
}@@ \0A\0H\r\0@@@@@@@@@@ \0A\x81\x80\x80 I@@ E@ \0E\r\r \0AqE\r\f\r\v AG\r\0 \0E\r\f \0Aq\r\f\vA\xFC\0
" 6l  \x006\0  \0 EvAv"6  At\v"6t  6p   ("AlAm"Atj"\v6x A\0J@ \0\xB3!&@  AqAtj AvA\xE0\0lj" \xB3"%C\xDB\xC9\xC0\x94 &\x95"$8\0  %C\xE4\xCB\x96\xC1\x94 &\x95"'8P A@k '8\0  %C\xDBI\xC1\x94 &\x95"%80  %8   $8 Aj" G\r\0\v\v Aj!\f Aj!\b A\bj! \0Av!\x07@ E@ \x07AF\rA\0!A\0! \x07! \0A\fq\r	 \bA6\0A! \0Av"AF\rA! \0Av"At G@A! !\f
\v \fA6\0 AF\r\bA!  \0A\bv"AtG\r	 A6 AF@A!\f	\v \0A
v"At G@A! !\f
\vA! A6 AF\r\b \0A\fv"At G@A!\f
\v A6  AF@A!\f	\v \0Av"At G@A! !\f
\v A6$ AF@A!\f	\v \0Av"At G@A!\f
\v A6( AF@A\x07!\f	\v \0Av"At G@A\x07! !\f
\v A6, AF@A\b!\f	\v \0Av"At G@A\b!\f
\v A60 AF@A	!\f	\v \0Av"At G@A	! !\f
\v A64 AF@A
!\f	\v \0Av"At G@A
!\f
\v A68 AF@A\v!\f	\v \0Av"At G@A\v! !\f
\v A6< @A\f!\f	\v A6h B\x84\x80\x80\x80\xC0\x007\` \xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\xFD\vP A@k\xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\xFD\v\0\f\vA! \x07AF@ B7\b\f\f\v \0An"Al \x07G@ \x07!\f\v \bA6\0 \x07AkAI@A!\f\v \0A\xE4\0n"Al G@A!\f\v \fA6\0 \x07AkAI@A!\f\v \0A\xF4n"Al G@A! !\f\v A6 \x07A\xFD\0kA\xFD\0I@A!\f\v \0A\xC4n"Al G@A!\f\v A6 \x07A\xF1kA\xF1I@A!\f\vA! \0A\xD4\xE1\0n"Al G@A! !\f\v A6  \x07A\xB5kA\xB5I\r  \0A\xA4\xE8n"AlG\r A6$ \x07A\x89\xFA\0kA\x89\xFA\0I@A!\f\v \0A\xB4\x89n"Al G@A! !\f\v A6( \x07A\xAD\xE2kA\xAD\xE2I@A\x07!\f\v \0A\x84\xAF\xDF\0n"Al G@A\x07!\f\v A6, \x07A\xE1\xEBkA\xE1\xEBI@A\b!\f\v \0A\x94\xEB\xDCn"Al G@A\b! !\f\v A60 \x07A\xE5\x9A\xF7\0kA\xE5\x9A\xF7\0I@A	!\f\vAA\0 \0A\xE3\x97\xD0K"\x1B G@A	!\f\v A64 @A
!\f\v A6h \xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\xFD\vX \xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\xFD\vH \xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\xFD\v8\f\r\v  6\f  \x076\b\f	\vA\xDD
A\xC4	A\xAF\bA\x9B	\0\0\v AF\r@  An"AlG\r AF\r\v  AtjA6\b Aj! Ak !AO\r\0\v\v  6\f  \x076\b\f\v AF\r\0A  AL\x1B! !@ AqE@  F\r
  AtjA6\b Aj"! Av"AG\r\f\v\vA  AL\x1B k!	A\0! !@ Aq\r  	F\r	  AtjA6\b @@ A\0L\r\0  jAt"E\r\0 \f \b \xFC
\0\0\v \bA6\0\v Aj! Aj! AG Av!\r\0\v\v  6\f  \x076\b A\0L\r\vC\xDB\xC9@ \x07\xB3\x95!&  Atj"A\bj! Aj!\x1BA!\fA!A!@ \x07  \f"Aj"\fAtj(\0" "	l"m!@ AH\r\0 A\0L@ \v AtjAkB\x80\x80\x80\xFC7\0\f\vA At"Ar"\r \rAL\x1BAkAv"Aj!
 AM@ At!A! 
A\xFC\xFF\xFF\xFF\x07q"\bAt"Ar!A\0!@ \v At"j"AkB\x80\x80\x80\xFC7\0 &  	j"\xB2\x94!%A!@@ \rAH@A\0!\f\v  \x1Bj" j I@A\0!\f\v  j" j I@A\0!\f\v A\x81\x80\x80\x80J@A\0!\f\v  j! %\xFD!"\xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\0! A\0!@ "  \xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\xFD\xAE\xFD\xFA\xFD\xE6"!\xFD\0"$!' !\xFD"(!) !\xFD"*!+ !\xFD",!-  Atj" $\xFD (\xFD  *\xFD  ,\xFD "! '\xFD )\xFD  +\xFD  -\xFD "#\xFD\r\b	
\v\x1B\f\r\xFD\v  ! #\xFD\r\0\x07\xFD\v  \xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\xFD\xAE!  Aj" \bG\r\0\v ! \b" 
F\r\v@ \v Atj % Aj"\xB3\x94"$8 \v Aj"Atj $8\0  L Aj!\r\0\v\v  Aj"G\r\0\v\f\v At!A! 
A\xFC\xFF\xFF\xFF\x07q"\bAt"Ar! \rAH! A\x81\x80\x80\x80J!A\0!@ \v At"j"\rA\x006\0 & 	 j"\xB2\x94!% \rAkA!@@\x7FA\0 \r\0A\0  \x1Bj" j I\r\0A\0  j" j I\r\0A\0 \r\0 Aj!  j! %\xFD!"\xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\0! A\0!@ "  \xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\xFD\xAE\xFD\xFA\xFD\xE6"!\xFD\0"$!' !\xFD"(!) !\xFD"*!+ !\xFD",!- \r Atj" $\xFD (\xFD  *\xFD  ,\xFD "! '\xFD )\xFD  +\xFD  -\xFD "#\xFD\r\b	
\v\x1B\f\r\xFD\v  ! #\xFD\r\0\x07\xFD\v "A\bj!  \xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\xFD\xAE!  Aj" \bG\r\0\v \b 
F\r ! \b\v!@ \v Atj % Aj"\xB3\x94"'"$8 \v Aj"Atj" '8\0  L Aj!\r\0\v\f\v \v AtjA\bj! !\xFD!$\v $8\0 \r *\x008\0 Aj" G\r\0\v\v  G\r\0\v\f\v  6\f  \x076\b\f\vA k! !@@ AqE@  F\r\x07  AtjA6\b @  jAt"	@ \f \b 	\xFC
\0\0\v \bA6\0\v Aj! Aj! AF Av!E\r\f\v\v AF\r\0A  AL\x1B!@ An"Al F@  F\r\x07  AtjA6\b Aj! Ak !AO\r\f\v\v AF\r\0A  AL\x1B!@  An"AlG\r  F\r  AtjA6\b Aj! Ak !AO\r\0\v\v  6\f  \x076\b AH\r\vC\xDB\xC9@ \x07\xB3\x95!%  AtjAj!A\0!A!A!\b@ \x07  Aj"Atj(\0" \b"l"\bm!	@ AH\r\0 	AH@ 	 Akl j!\f\v 	At!\x1B 	Ak"Aq!  Atj!A!\r Av"At! Aj"A\xFC\xFF\xFF\xFFq"\fAt!A\0! AI! A\xFF\xFF\xFF\xFFK!A\0!@ %  j"\xB2\x94!&A\0! !@@ \r\0   \x1Blj" j I\r\0 \r\0  j! \v Atj! &\xFD!"\xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\0! @ "  \xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\xFD\xAE\xFD\xFA\xFD\xE6"!\xFD\0"$!' !\xFD"(!) !\xFD"*!+ !\xFD",!-  Atj"
 $\xFD (\xFD  *\xFD  ,\xFD "! '\xFD )\xFD  +\xFD  -\xFD "#\xFD\r\b	
\v\x1B\f\r\xFD\v 
 ! #\xFD\r\0\x07\xFD\v\0  \xFD\f\0\0\0\0\0\0\0\0\0\0\0\0\xFD\xAE!  Aj" \fG\r\0\v \f" F\r\v@ @ !\f\v \v Atj"
 & Ar"\xB3\x94"$8 
 $8\0 Aj!\v  F\r\0@ \v Atj"
 & Aj"\xB3\x94"$8\f 
 $8\b 
 & Aj"\xB3\x94"$8 
 $8\0 Aj! !  G\r\0\v\v Aj!  	j! \rAj"\r G\r\0\v\v  G\r\0\v\vA! A\0L\r\0 Aj!A\0! AO@ A\xFC\xFF\xFF\xFF\x07q!\xFD\f\0\0\0\0\0\0\0\0\0\0\0\0! A\0!@  Atj\xFD\0\0  \xFD\xB5!  Aj" G\r\0\v      \xFD\r\b	
\v\f\r\0\0\xFD\xB5"     \xFD\r\x07\0\0\0\xFD\xB5\xFD\x1B\0!  F\r\v@  Atj(\0 l! Aj" G\r\0\v\v \0Av F@ \v 	 \x07\vA\0\vA\xA2
A\xC4	A\x90\x07A\x93
\0\0\v\0A\x9D
\v\0A\v\0\v\v\xB6\0A\x80\b\v\x84buff[ib] == voutput\0finput==foutput\0in != out\0pffft_cplx_preprocess\0pffft_real_preprocess\0passf5_ps\0passf3_ps\0rfftf1_ps\0cfftf1_ps\0rfftb1_ps\0pffft_zreorder\0pffft_new_setup\0pffft_transform_internal\0.build/pffft-src/src/pffft_priv_impl.h\0pffft_cplx_finalize\0pffft_real_finalize\0decompose\0NEON\x002 + nf < IFAC_MAX_SIZE\0in != out && work1 != work2\0ido > 2\x000\0VALIGNED(finput) && VALIGNED(foutput)\0A\x90\v\v\xD7\0\0\0\0\0\0\0\0\0\0\0\0\x83\xF9\xA2\0DNn\0\xFC)\0\xD1W'\0\xDD4\xF5\0b\xDB\xC0\0<\x99\x95\0A\x90C\0cQ\xFE\0\xBB\xDE\xAB\0\xB7a\xC5\0:n$\0\xD2MB\0I\xE0\0	\xEA.\0\x92\xD1\0\xEB\xFE\0)\xB1\0\xE8>\xA7\0\xF55\x82\0D\xBB.\0\x9C\xE9\x84\0\xB4&p\0A~_\0\xD6\x919\0S\x839\0\x9C\xF49\0\x8B_\x84\0(\xF9\xBD\0\xF8;\0\xDE\xFF\x97\0\x98\0/\xEF\0
Z\x8B\0mm\0\xCF~6\0	\xCB'\0FO\xB7\0\x9Ef?\0-\xEA_\0\xBA'u\0\xE5\xEB\xC7\0={\xF1\0\xF79\x07\0\x92R\x8A\0\xFBk\xEA\0\xB1_\0\b]\x8D\x000V\0{\xFCF\0\xF0\xABk\0 \xBC\xCF\x006\xF4\x9A\0\xE3\xA9\0^a\x91\0\b\x1B\xE6\0\x85\x99e\0\xA0_\0\x8D@h\0\x80\xD8\xFF\0'sM\01\0\xCAV\0\xC9\xA8s\0{\xE2\`\0k\x8C\xC0\0\xC4G\0\xCDg\xC3\0	\xE8\xDC\0Y\x83*\0\x8Bv\xC4\0\xA6\x96\0D\xAF\xDD\0W\xD1\0\xA5>\0\x07\xFF\x003~?\0\xC22\xE8\0\x98O\xDE\0\xBB}2\0&=\xC3\0k\xEF\0\x9F\xF8^\x005:\0\x7F\xF2\xCA\0\xF1\x87\0|\x90!\0j$|\0\xD5n\xFA\x000-w\0;C\0\xB5\xC6\0\xC3\x9D\0\xAD\xC4\xC2\0,MA\0\f\0]\0\x86}F\0\xE3q-\0\x9B\xC6\x9A\x003b\0\0\xB4\xD2|\0\xB4\xA7\x97\x007U\xD5\0\xD7>\xF6\0\xA3\0Mv\xFC\0d\x9D*\0p\xD7\xAB\0c|\xF8\0z\xB0W\0\xE7\0\xC0IV\0;\xD6\xD9\0\xA7\x848\0$#\xCB\0\xD6\x8Aw\0ZT#\0\0\xB9\0\xF1
\x1B\0\xCE\xDF\0\x9F1\xFF\0fj\0\x99Wa\0\xAC\xFBG\0~\x7F\xD8\0"e\xB7\x002\xE8\x89\0\xE6\xBF\`\0\xEF\xC4\xCD\0l6	\0]?\xD4\0\xDE\xD7\0X;\xDE\0\xDE\x9B\x92\0\xD2"(\0(\x86\xE8\0\xE2XM\0\xC6\xCA2\0\b\xE3\0\xE0}\xCB\0\xC0P\0\xF3\xA7\0\xE0[\0.4\0\x83b\0\x83H\0\xF5\x8E[\0\xAD\xB0\x7F\0\xE9\xF2\0HJC\0g\xD3\0\xAA\xDD\xD8\0\xAE_B\0ja\xCE\0
(\xA4\0\xD3\x99\xB4\0\xA6\xF2\0\\w\x7F\0\xA3\xC2\x83\0a<\x88\0\x8Asx\0\xAF\x8CZ\0o\xD7\xBD\0-\xA6c\0\xF4\xBF\xCB\0\x8D\x81\xEF\0&\xC1g\0U\xCAE\0\xCA\xD96\0(\xA8\xD2\0\xC2a\x8D\0\xC9w\0&\0F\x9B\0\xC4Y\xC4\0\xC8\xC5D\0M\xB2\x91\0\0\xF3\0\xD4C\xAD\0)I\xE5\0\xFD\xD5\0\0\xBE\xFC\0\x94\xCC\0p\xCE\xEE\0>\xF5\0\xEC\xF1\x80\0\xB3\xE7\xC3\0\xC7\xF8(\0\x93\x94\0\xC1q>\0.	\xB3\0\vE\xF3\0\x88\x9C\0\xAB {\0.\xB5\x9F\0G\x92\xC2\0{2/\0\fUm\0r\xA7\x90\0k\xE7\x001\xCB\x96\0yJ\0Ay\xE2\0\xF4\xDF\x89\0\xE8\x94\x97\0\xE2\xE6\x84\0\x991\x97\0\x88\xEDk\0__6\0\xBB\xFD\0H\x9A\xB4\0g\xA4l\0qrB\0\x8D]2\0\x9F\xB8\0\xBC\xE5	\0\x8D1%\0\xF7t9\x000\0\r\f\0K\bh\0,\xEEX\0G\xAA\x90\0t\xE7\0\xBD\xD6$\0\xF7}\xA6\0nHr\0\x9F\xEF\0\x8E\x94\xA6\0\xB4\x91\xF6\0\xD1SQ\0\xCF
\xF2\0 \x983\0\xF5K~\0\xB2ch\0\xDD>_\0@]\0\x85\x89\x7F\0UR)\x007d\xC0\0m\xD8\x002H2\0[Lu\0Nq\xD4\0ETn\0\v	\xC1\0*\xF5i\0f\xD5\0'\x07\x9D\0]P\0\xB4;\xDB\0\xEAv\xC5\0\x87\xF9\0Ik}\0'\xBA\0\x96i)\0\xC6\xCC\xAC\0\xADT\0\x90\xE2j\0\x88\xD9\x89\0,rP\0\xA4\xBE\0w\x07\x94\0\xF30p\0\0\xFC'\0\xEAq\xA8\0f\xC2I\0d\xE0=\0\x97\xDD\x83\0\xA3?\x97\0C\x94\xFD\0\r\x86\x8C\x001A\xDE\0\x929\x9D\0\xDDp\x8C\0\xB7\xE7\0\b\xDF;\07+\0\\\x80\xA0\0Z\x80\x93\0\x92\0\xE8\xD8\0l\x80\xAF\0\xDB\xFFK\x008\x90\0Yv\0b\xA5\0a\xCB\xBB\0\xC7\x89\xB9\0@\xBD\0\xD2\xF2\0Iu'\0\xEB\xB6\xF6\0\xDB"\xBB\0
\xAA\0\x89&/\0d\x83v\0	;3\0\x94\0Q:\xAA\0\xA3\xC2\0\xAF\xED\xAE\0\\&\0m\xC2M\0-z\x9C\0\xC0V\x97\0?\x83\0	\xF0\xF6\0+@\x8C\0m1\x99\x009\xB4\x07\0\f \0\xD8\xC3[\0\xF5\x92\xC4\0\xC6\xADK\0N\xCA\xA5\0\xA77\xCD\0\xE6\xA96\0\xAB\x92\x94\0\xDDBh\0c\xDE\0v\x8C\xEF\0h\x8BR\0\xFC\xDB7\0\xAE\xA1\xAB\0\xDF1\0\0\xAE\xA1\0\f\xFB\xDA\0dMf\0\xED\xB7\0)e0\0WV\xBF\0G\xFF:\0j\xF9\xB9\0u\xBE\xF3\0(\x93\xDF\0\xAB\x800\0f\x8C\xF6\0\xCB\0\xFA"\0\xD9\xE4\0=\xB3\xA4\0W\x1B\x8F\x006\xCD	\0NB\xE9\0\xBE\xA4\x003#\xB5\0\xF0\xAA\0Oe\xA8\0\xD2\xC1\xA5\0\v?\0[x\xCD\0#\xF9v\0{\x8B\0\x89r\0\xC6\xA6S\0on\xE2\0\xEF\xEB\0\0\x9BJX\0\xC4\xDA\xB7\0\xAAf\xBA\0v\xCF\xCF\0\xD1\0\xB1\xF1-\0\x8C\x99\xC1\0\xC3\xADw\0\x86H\xDA\0\xF7]\xA0\0\xC6\x80\xF4\0\xAC\xF0/\0\xDD\xEC\x9A\0?\\\xBC\0\xD0\xDEm\0\x90\xC7\0*\xDB\xB6\0\xA3%:\0\0\xAF\x9A\0\xADS\x93\0\xB6W\0)-\xB4\0K\x80~\0\xDA\x07\xA7\0v\xAA\0{Y\xA1\0*\0\xDC\xB7-\0\xFA\xE5\xFD\0\x89\xDB\xFE\0\x89\xBE\xFD\0\xE4vl\0\xA9\xFC\0>\x80p\0\x85n\0\xFD\x87\xFF\0(>\x07\0ag3\0*\x86\0M\xBD\xEA\0\xB3\xE7\xAF\0\x8Fmn\0\x95g9\x001\xBF[\0\x84\xD7H\x000\xDF\0\xC7-C\0%a5\0\xC9p\xCE\x000\xCB\xB8\0\xBFl\xFD\0\xA4\0\xA2\0l\xE4\0Z\xDD\xA0\0!oG\0b\xD2\0\xB9\\\x84\0paI\0kV\xE0\0\x99R\0PU7\0\xD5\xB7\x003\xF1\xC4\0n_\0]0\xE4\0\x85.\xA9\0\xB2\xC3\0\xA126\0\b\xB7\xA4\0\xEA\xB1\xD4\0\xF7!\0\x8Fi\xE4\0'\xFFw\0\f\x80\0\x8D@-\0O\xCD\xA0\0 \xA5\x99\0\xB3\xA2\xD3\0/]
\0\xB4\xF9B\0\xDA\xCB\0}\xBE\xD0\0\x9B\xDB\xC1\0\xAB\xBD\0\xCA\xA2\x81\0\bj\\\0.U\0'\0U\0\x7F\xF0\0\xE1\x07\x86\0\vd\0\x96A\x8D\0\x87\xBE\xDE\0\xDA\xFD*\0k%\xB6\0{\x894\0\xF3\xFE\0\xB9\xBF\x9E\0hjO\0J*\xA8\0O\xC4Z\0-\xF8\xBC\0\xD7Z\x98\0\xF4\xC7\x95\0\rM\x8D\0 :\xA6\0\xA4W_\0?\xB1\0\x808\x95\0\xCC \0q\xDD\x86\0\xC9\xDE\xB6\0\xBF\`\xF5\0Me\0\x07k\0\x8C\xB0\xAC\0\xB2\xC0\xD0\0QUH\0\xFB\0\x95r\xC3\0\xA3;\0\xC0@5\0\xDC{\0\xE0E\xCC\0N)\xFA\0\xD6\xCA\xC8\0\xE8\xF3A\0|d\xDE\0\x9Bd\xD8\0\xD9\xBE1\0\xA4\x97\xC3\0wX\xD4\0i\xE3\xC5\0\xF0\xDA\0\xBA:<\0FF\0Uu_\0\xD2\xBD\xF5\0n\x92\xC6\0\xAC.]\0D\xED\0>B\0a\xC4\x87\0)\xFD\xE9\0\xE7\xD6\xF3\0"|\xCA\0o\x915\0\b\xE0\xC5\0\xFF\xD7\x8D\0nj\xE2\0\xB0\xFD\xC6\0\x93\b\xC1\0|]t\0k\xAD\xB2\0\xCDn\x9D\0>r{\0\xC6j\0\xF7\xCF\xA9\0)s\xDF\0\xB5\xC9\xBA\0\xB7\0Q\0\xE2\xB2\r\0t\xBA$\0\xE5}\`\0t\xD8\x8A\0\r,\0\x81\f\0~f\x94\0)\0\x9Fzv\0\xFD\xFD\xBE\0VE\xEF\0\xD9~6\0\xEC\xD9\0\x8B\xBA\xB9\0\xC4\x97\xFC\x001\xA8'\0\xF1n\xC3\0\x94\xC56\0\xD8\xA8V\0\xB4\xA8\xB5\0\xCF\xCC\0\x89-\0oW4\0,V\x89\0\x99\xCE\xE3\0\xD6 \xB9\0k^\xAA\0>*\x9C\0_\xCC\0\xFD\vJ\0\xE1\xF4\xFB\0\x8E;m\0\xE2\x86,\0\xE9\xD4\x84\0\xFC\xB4\xA9\0\xEF\xEE\xD1\0.5\xC9\0/9a\x008!D\0\x1B\xD9\xC8\0\x81\xFC
\0\xFBJj\0/\xD8\0S\xB4\x84\0N\x99\x8C\0T"\xCC\0*U\xDC\0\xC0\xC6\xD6\0\v\x96\0p\xB8\0i\x95d\0&Z\`\0?R\xEE\0\x7F\0\xF4\xB5\0\xFC\xCB\xF5\x004\xBC-\x004\xBC\xEE\0\xE8]\xCC\0\xDD^\`\0g\x8E\x9B\0\x923\xEF\0\xC9\xB8\0aX\x9B\0\xE1W\xBC\0Q\x83\xC6\0\xD8>\0\xDDqH\0-\xDD\0\xAF\xA1\0!,F\0Y\xF3\xD7\0\xD9z\x98\0\x9ET\xC0\0O\x86\xFA\0V\xFC\0\xE5y\xAE\0\x89"6\x008\xAD"\0g\x93\xDC\0U\xE8\xAA\0\x82&8\0\xCA\xE7\x9B\0Q\r\xA4\0\x993\xB1\0\xA9\xD7\0iH\0e\xB2\xF0\0\x7F\x88\xA7\0\x88L\x97\0\xF9\xD16\0!\x92\xB3\0{\x82J\0\x98\xCF!\0@\x9F\xDC\0\xDCGU\0\xE1t:\0g\xEBB\0\xFE\x9D\xDF\0^\xD4_\0{g\xA4\0\xBA\xACz\0U\xF6\xA2\0+\x88#\0A\xBAU\0Yn\b\0!*\x86\x009G\x83\0\x89\xE3\xE6\0\xE5\x9E\xD4\0I\xFB@\0\xFFV\xE9\0\xCA\0\xC5Y\x8A\0\x94\xFA+\0\xD3\xC1\xC5\0\xC5\xCF\0\xDBZ\xAE\0G\xC5\x86\0\x85Cb\0!\x86;\0,y\x94\0a\x87\0*L{\0\x80,\0C\xBF\0\x88&\x90\0x<\x89\0\xA8\xC4\xE4\0\xE5\xDB{\0\xC4:\xC2\0&\xF4\xEA\0\xF7g\x8A\0\r\x92\xBF\0e\xA3+\0=\x93\xB1\0\xBD|\v\0\xA4Q\xDC\0'\xDDc\0i\xE1\xDD\0\x9A\x94\0\xA8)\x95\0h\xCE(\0	\xED\xB4\0D\x9F \0N\x98\xCA\0p\x82c\0~|#\0\xB92\0\xA7\xF5\x8E\0V\xE7\0!\xF1\b\0\xB5\x9D*\0o~M\0\xA5Q\0\xB5\xF9\xAB\0\x82\xDF\xD6\0\x96\xDDa\06\0\xC4:\x9F\0\x83\xA2\xA1\0r\xEDm\x009\x8Dz\0\x82\xB8\xA9\0k2\\\0F'[\0\x004\xED\0\xD2\0w\0\xFC\xF4U\0YM\0\xE0q\x80\0A\xF3 \v=@\xFB!\xF9?\0\0\0\0-Dt>\0\0\0\x80\x98F\xF8<\0\0\0\`Q\xCCx;\0\0\0\x80\x83\x1B\xF09\0\0\0@ %z8\0\0\0\x80"\x82\xE36\0\0\0\0\xF3i5\0A\xB0!\v\xB0`)}function $(V){return V}async function w(V){return V}async function T(V,ge){try{var He=await w(V);return await WebAssembly.instantiate(He,ge)}catch(Pe){s(`failed to asynchronously prepare wasm: ${Pe}`),g(Pe)}}async function E(V,ge,He){return T(ge,He)}function C(){return{a:ot}}async function S(){function V(De){return at=De.exports,he(at),f(),at}function ge(De){return V(De.instance)}var He=C(),Pe=t.instantiateWasm;return Pe?new Promise(De=>{Pe(He,st=>De(V(st)))}):(_??=I(),ge(await E(n,_,He)))}var R,A,P,K,Y,L,H,me,O,W,ue=V=>{for(;V.length>0;)V.shift()(t)},ne=[],te=[],ie=globalThis.TextDecoder&&new TextDecoder,G=(V,ge,He,Pe)=>{var De=ge+He;if(Pe)return De;for(;V[ge]&&!(ge>=De);)++ge;return ge},oe=(V,ge=0,He,Pe)=>{var De=G(V,ge,He,Pe);if(De-ge>16&&V.buffer&&ie)return ie.decode(V.subarray(ge,De));for(var st="";ge<De;){var nt=V[ge++];if(!(nt&128)){st+=String.fromCharCode(nt);continue}var pt=V[ge++]&63;if((nt&224)==192){st+=String.fromCharCode((nt&31)<<6|pt);continue}var ct=V[ge++]&63;if(nt=(nt&240)==224?(nt&15)<<12|pt<<6|ct:(nt&7)<<18|pt<<12|ct<<6|V[ge++]&63,nt<65536)st+=String.fromCharCode(nt);else{var ir=nt-65536;st+=String.fromCharCode(55296|ir>>10,56320|ir&1023)}}return st},ee=(V,ge,He)=>V?oe(W,V,ge,He):"",J=(V,ge,He,Pe)=>g(`Assertion failed: ${ee(V)}, at: `+[ge?ee(ge):"unknown filename",He,Pe?ee(Pe):"unknown function"]),Re=()=>2147483648,Ue=(V,ge)=>Math.ceil(V/ge)*ge,Ee=V=>{var ge=(V-pe.buffer.byteLength+65535)/65536|0;try{return pe.grow(ge),f(),1}catch{}},Me=V=>{var ge=W.length;V>>>=0;var He=Re();if(V>He)return!1;for(var Pe=1;Pe<=4;Pe*=2){var De=ge*(1+.2/Pe);if(De=Math.min(De,V+100663296),Ee(Math.min(He,Ue(Math.max(V,De),65536))))return!0}return!1};t.noExitRuntime&&t.noExitRuntime,t.print&&t.print,t.printErr&&(s=t.printErr),t.arguments&&t.arguments,t.thisProgram&&t.thisProgram;var de=t.preInit;if(de)for(typeof de=="function"&&(t.preInit=de=[de]);de.length>0;)de.shift()();var pe;function he(V){t._pffft_simd_size=V.e,t._pffft_simd_arch=V.f,t._pffft_new_setup=V.g,t._malloc=V.h,t._pffft_aligned_malloc=V.i,t._pffft_aligned_free=V.j,t._free=V.k,t._pffft_destroy_setup=V.l,t._pffft_transform_ordered=V.m,pe=V.c,V.__indirect_function_table}var ot={a:J,b:Me};async function Ct(){c();var V=t.setStatus;V&&(V("Running..."),await new Promise(ge=>setTimeout(ge,1)),setTimeout(V,1,"")),!o&&(h(),t.onRuntimeInitialized?.(),y())}var at=await S();return await Ct(),t}var Tw=0,Sw=1,Ew=0,Iw=3,Pv=class hl{static{this.modulePromise=null}constructor(t,r,i){if(this.setup=0,this.inPtr=0,this.outPtr=0,this.workPtr=0,this.normEnvelopeCache=new Map,t%32!=0)throw Error(`PffftSTFT: nFft (${t}) must be a multiple of 32 (pffft real-transform requirement)`);this.nFft=t,this.hopLength=r,this.dimF=i,this.hannWindow=new Float32Array(t);for(let a=0;a<t;a++)this.hannWindow[a]=.5*(1-Math.cos(2*Math.PI*a/t));this.frameScratch=new Float32Array(t)}async init(){if(hl.modulePromise||=kw(),this.mod=await hl.modulePromise,this.setup=this.mod._pffft_new_setup(this.nFft,Ew),this.setup===0)throw Error(`PffftSTFT: pffft_new_setup(${this.nFft}, PFFFT_REAL) failed (returned NULL)`);let t=this.nFft*4;if(this.inPtr=this.mod._pffft_aligned_malloc(t),this.outPtr=this.mod._pffft_aligned_malloc(t),this.workPtr=this.mod._pffft_aligned_malloc(t),!this.inPtr||!this.outPtr||!this.workPtr)throw Error("PffftSTFT: pffft_aligned_malloc failed");let r=this.simdArchString();console.info(`pffft wasm FFT ready (simd_arch=${r})`)}simdArchString(){let t=this.mod._pffft_simd_arch(),r=this.mod.HEAPU8,i="";for(let a=t;r[a]!==0;a++)i+=String.fromCharCode(r[a]);return i}dimTFor(t){let r=this.nFft/2;return Math.floor((t+2*r-this.nFft)/this.hopLength)+1}reflectPadInto(t,r,i,a,s,n){for(let o=0;o<a;o++)s[n+o]=t[r+a-o];for(let o=0;o<i;o++)s[n+a+o]=t[r+o];for(let o=0;o<a;o++)s[n+a+i+o]=t[r+i-2-o]}forward(t,r,i){let{nFft:a,hopLength:s,dimF:n}=this;if(i%s!==0)throw Error(`PffftSTFT.forward: chunkSize (${i}) must be an exact multiple of hopLength (${s})`);let o=a/2,l=this.dimTFor(i),d=i+2*o,f=new Float32Array(r*4*n*l),c=new Float32Array(d),h=this.mod.HEAPF32,y=this.inPtr>>2,g=this.outPtr>>2;for(let _=0;_<r;_++)for(let I=0;I<2;I++){let $=(_*2+I)*i;this.reflectPadInto(t,$,i,o,c,0);let w=2*I+0,T=2*I+1,E=(_*4+w)*n*l,C=(_*4+T)*n*l;for(let S=0;S<l;S++){let R=S*s;for(let P=0;P<a;P++)this.frameScratch[P]=c[R+P]*this.hannWindow[P];h.set(this.frameScratch,y),this.mod._pffft_transform_ordered(this.setup,this.inPtr,this.outPtr,this.workPtr,Tw);let A=this.mod.HEAPF32;for(let P=Iw;P<n;P++){let K,Y;P===0?(K=A[g+0],Y=0):(K=A[g+2*P],Y=A[g+2*P+1]),f[E+P*l+S]=K,f[C+P*l+S]=Y}}}return f}getNormEnvelope(t){let r=this.normEnvelopeCache.get(t);if(r)return r;let{nFft:i,hopLength:a}=this,s=(t-1)*a+i;r=new Float32Array(s);for(let n=0;n<t;n++){let o=n*a;for(let l=0;l<i;l++){let d=this.hannWindow[l];r[o+l]+=d*d}}for(let n=0;n<s;n++)r[n]+=1e-8;return this.normEnvelopeCache.set(t,r),r}inverse(t,r){let{nFft:i,hopLength:a,dimF:s}=this,n=i/2,o=t.length,l=o/(r*4*s);if(!Number.isInteger(l))throw Error(`PffftSTFT.inverse: specData length (${o}) not consistent with batch=${r}, dimF=${s}`);let d=(l-1)*a+i,f=d-2*n,c=i/2,h=new Float32Array(r*2*f),y=new Float32Array(d),g=this.getNormEnvelope(l),_=this.mod.HEAPF32,I=this.inPtr>>2,$=this.outPtr>>2;for(let w=0;w<r;w++)for(let T=0;T<2;T++){y.fill(0);let E=2*T+0,C=2*T+1,S=(w*4+E)*s*l,R=(w*4+C)*s*l;for(let P=0;P<l;P++){this.frameScratch.fill(0),s>0&&(this.frameScratch[0]=t[S+0*l+P]),s>c&&(this.frameScratch[1]=t[S+c*l+P]);let K=Math.min(s,c);for(let H=1;H<K;H++)this.frameScratch[2*H]=t[S+H*l+P],this.frameScratch[2*H+1]=t[R+H*l+P];_.set(this.frameScratch,I),this.mod._pffft_transform_ordered(this.setup,this.inPtr,this.outPtr,this.workPtr,Sw);let Y=this.mod.HEAPF32,L=P*a;for(let H=0;H<i;H++){let me=Y[$+H]/i*this.hannWindow[H];y[L+H]+=me}}let A=(w*2+T)*f;for(let P=0;P<f;P++)h[A+P]=y[n+P]/g[n+P]}return h}};var dt={name:"Kim Vocal 2",sampleRate:44100,fft:7680,hop:1024,bins:3072,frames:256,compensate:1.009,url:"https://huggingface.co/Politrees/UVR_resources/resolve/83719e1e624d07842f914d856722af6f463e88cb/models/MDXNet/Kim_Vocal_2.onnx",sha256:"ce74ef3b6a6024ce44211a07be9cf8bc6d87728cc852a68ab34eb8e58cde9c8b"};async function Lv(e,t,r=()=>{}){let i=e[0].length,a=dt.hop*(dt.frames-1),s=dt.fft/2,n=a-2*s,o=Math.floor(n*.75),l=n-o,d=new Pv(dt.fft,dt.hop,dt.bins);await d.init();let f=[new Float32Array(i),new Float32Array(i)],c=new Float32Array(i),h=Math.ceil(i/o),y=0;for(let g=0;g<i;g+=o){let _=new Float32Array(2*a);for(let T=0;T<2;T++){let E=e[T]||e[0],C=Math.max(0,g-s),S=Math.min(i,g-s+a);_.set(E.subarray(C,S),T*a+C-(g-s))}let I=await t(d.forward(_,1,a)),$=d.inverse(I,1),w=Math.min(n,i-g);for(let T=0;T<w;T++){let E=Math.min(g===0?1:(T+1)/l,g+n>=i?1:(n-T)/l,1);c[g+T]+=E;for(let C=0;C<2;C++)f[C][g+T]+=$[C*a+s+T]*E*dt.compensate}r(++y/h,y,h)}for(let g=0;g<2;g++)for(let _=0;_<i;_++)if(f[g][_]/=Math.max(c[_],1e-8),!Number.isFinite(f[g][_]))throw new Error("\u6A21\u578B\u7522\u751F\u7121\u6548\u97F3\u8A0A\uFF0C\u8ACB\u91CD\u65B0\u5206\u6790\u3002");return f}var Zr=(e,t,r={})=>self.postMessage({type:"progress",stage:e,fraction:t,...r});async function Cw(){let e;try{e=await caches.open("singkeys-model-v2");let d=await e.match(dt.url);if(d)return Zr("model",1,{cached:!0}),new Uint8Array(await d.arrayBuffer())}catch{}let t=await fetch(dt.url);if(!t.ok)throw new Error("\u7121\u6CD5\u4E0B\u8F09\u4EBA\u8072\u6A21\u578B\uFF0C\u8ACB\u6AA2\u67E5\u7DB2\u8DEF\u5F8C\u91CD\u8A66\u3002");let r=Number(t.headers.get("content-length"))||668e5,i=t.body.getReader(),a=[],s=0;for(;;){let{done:d,value:f}=await i.read();if(d)break;a.push(f),s+=f.length,Zr("model",Math.min(.99,s/r),{megabytes:Math.round(s/1e6)})}let n=new Uint8Array(s),o=0;for(let d of a)n.set(d,o),o+=d.length;if(Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",n)),d=>d.toString(16).padStart(2,"0")).join("")!==dt.sha256)throw new Error("\u6A21\u578B\u5B8C\u6574\u6027\u6AA2\u67E5\u5931\u6557\uFF0C\u8ACB\u91CD\u8A66\u3002");try{await e?.put(dt.url,new Response(n))}catch{}return Zr("model",1),n}self.onmessage=async({data:e})=>{let t;try{We.wasm.numThreads=1,We.wasm.proxy=!1,We.wasm.wasmPaths=new URL("./runtime/",self.location.href).href,Zr("model",0);let r=await Cw();Zr("initialize",0);let i="wasm";t=await _n.create(r,{executionProviders:["wasm"],logSeverityLevel:3}),Zr("separate",0,{backend:i});let a=e.channels.map(n=>new Float32Array(n)),s=await Lv(a,async n=>{let o=new St("float32",n,[1,4,dt.bins,dt.frames]),l;try{return l=await t.run({[t.inputNames[0]]:o}),new Float32Array(l[t.outputNames[0]].data)}finally{if(o.dispose(),l)for(let d of Object.values(l))d.dispose()}},(n,o,l)=>Zr("separate",n,{chunk:o,total:l,backend:i}));self.postMessage({type:"vocals",channels:s.map(n=>n.buffer),sampleRate:44100,model:dt.name,backend:i},s.map(n=>n.buffer))}catch(r){self.postMessage({type:"error",message:r.message||String(r)})}finally{await t?.release()}};
/*! Bundled license information:

onnxruntime-web/dist/ort.wasm.bundle.min.mjs:
onnxruntime-web/dist/ort.bundle.min.mjs:
  (*!
   * ONNX Runtime Web v1.30.0
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)

onnxruntime-web/dist/ort.bundle.min.mjs:
  (**
   * @license
   * Copyright 2021 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2020 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2019 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
*/
