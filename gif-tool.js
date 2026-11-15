// 외부 GIF 라이브러리는 변환을 시작할 때만 불러옵니다.
// 네트워크에서 라이브러리를 못 받아도 MP4 업로드와 미리보기는 동작합니다.
let GIFEncoder, quantize, applyPalette;
async function ensureEncoder(){
 if(GIFEncoder)return;
 const lib=await import("https://esm.sh/gifenc@1.0.3");
 ({GIFEncoder,quantize,applyPalette}=lib);
}

const $=id=>document.getElementById(id);
const video=document.createElement("video");
video.muted=true;video.playsInline=true;video.preload="auto";
const canvas=$("preview"),ctx=canvas.getContext("2d",{willReadFrequently:true});
const stage=$("stage"),sign=new Image();
let videoUrl=null,signUrl=null,signReady=false,signX=.75,signY=.82;
let drag=null,processing=false,lastUrl=null;
const status=t=>$("status").textContent=t;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function videoSize(){
 const w=video.videoWidth||720,h=video.videoHeight||405;
 return [w,h];
}
function updatePreview(){
 if(!video.videoWidth)return;
 const [w,h]=videoSize();
 const displayW=Math.min(960,w);
 canvas.width=displayW;canvas.height=Math.max(1,Math.round(displayW*h/w));
 ctx.drawImage(video,0,0,canvas.width,canvas.height);
 drawSign(ctx,canvas.width,canvas.height);
}
function drawSign(target,w,h){
 if(!signReady)return;
 const dw=w*Number($("signScale").value)/100;
 const dh=dw*sign.naturalHeight/sign.naturalWidth;
 const x=signX*w-dw/2,y=signY*h-dh/2;
 const ratio=w/Math.max(1,canvas.width);
 const opacity=Number($("signOpacity").value)/100;
 const colorAlpha=(hex,alpha)=>{
  const v=hex.replace("#","");
  const r=parseInt(v.slice(0,2),16),g=parseInt(v.slice(2,4),16),b=parseInt(v.slice(4,6),16);
  return `rgba(${r},${g},${b},${alpha})`;
 };
 target.save();
 // 캔버스 그림자는 투명 PNG의 알파 형태를 따라 그려집니다.
 if($("shadowEnabled").checked){
  target.save();
  target.globalAlpha=opacity;
  target.shadowColor=colorAlpha($("shadowColor").value,Number($("shadowOpacity").value)/100);
  target.shadowBlur=Number($("shadowBlur").value)*ratio;
  target.shadowOffsetX=Number($("shadowX").value)*ratio;
  target.shadowOffsetY=Number($("shadowY").value)*ratio;
  // 원본 이미지가 두 번 보이지 않도록 그림자만 별도 레이어에 렌더링
  const pad=Math.ceil((Number($("shadowBlur").value)*2+80)*ratio);
  const layer=document.createElement("canvas");
  layer.width=Math.max(1,Math.ceil(dw+pad*2));layer.height=Math.max(1,Math.ceil(dh+pad*2));
  const lc=layer.getContext("2d");
  lc.shadowColor=target.shadowColor;
  lc.shadowColor=colorAlpha($("shadowColor").value,Number($("shadowOpacity").value)/100);
  lc.shadowBlur=Number($("shadowBlur").value)*ratio;
  lc.shadowOffsetX=Number($("shadowX").value)*ratio;
  lc.shadowOffsetY=Number($("shadowY").value)*ratio;
  lc.drawImage(sign,pad,pad,dw,dh);
  // destination-out: 서명 본체를 지워 그림자만 남김
  lc.globalCompositeOperation="destination-out";
  lc.shadowColor="transparent";lc.shadowBlur=0;lc.shadowOffsetX=0;lc.shadowOffsetY=0;
  lc.drawImage(sign,pad,pad,dw,dh);
  target.shadowColor="transparent";target.shadowBlur=0;target.shadowOffsetX=0;target.shadowOffsetY=0;
  target.drawImage(layer,x-pad,y-pad);
  target.restore();
 }
 if($("glowEnabled").checked){
  target.save();
  const size=Number($("glowSize").value)*ratio;
  const pad=Math.ceil(size*3+8);
  const layer=document.createElement("canvas");
  layer.width=Math.max(1,Math.ceil(dw+pad*2));
  layer.height=Math.max(1,Math.ceil(dh+pad*2));
  const lc=layer.getContext("2d");
  lc.drawImage(sign,pad,pad,dw,dh);
  lc.globalCompositeOperation="source-in";
  lc.fillStyle=$("glowColor").value;
  lc.fillRect(0,0,layer.width,layer.height);
  lc.globalCompositeOperation="source-over";
  target.globalAlpha=opacity*Number($("glowOpacity").value)/100;
  target.globalCompositeOperation=$("glowBlend").value==="screen"?"screen":"source-over";
  target.shadowColor=$("glowColor").value;
  target.shadowBlur=size;
  const passes=1+Math.round(Number($("glowStrength").value)/25);
  for(let i=0;i<passes;i++){
   target.drawImage(layer,x-pad,y-pad);
  }
  target.restore();
 }
 target.globalAlpha=opacity;
 target.drawImage(sign,x,y,dw,dh);
 target.restore();
}
const styleDefaults={
 glowEnabled:false,glowColor:"#ffffff",glowOpacity:"70",glowSize:"18",glowStrength:"50",glowBlend:"normal",
 shadowEnabled:false,shadowColor:"#000000",shadowOpacity:"70",shadowBlur:"8",shadowX:"4",shadowY:"4"
};
function updateStyleLabels(){
 for(const id of ["glowOpacity","glowSize","glowStrength","shadowOpacity","shadowBlur","shadowX","shadowY"]){
  const suffix=id.toLowerCase().includes("opacity")||id==="glowStrength"?"%":"px";
  $(id+"Value").textContent=$(id).value+suffix;
 }
}
for(const id of Object.keys(styleDefaults)){
 $(id).addEventListener("input",()=>{updateStyleLabels();updatePreview();});
 $(id).addEventListener("change",()=>{updateStyleLabels();updatePreview();});
}
$("resetEffects").addEventListener("click",()=>{
 for(const [id,v] of Object.entries(styleDefaults)){
  if(typeof v==="boolean")$(id).checked=v;else $(id).value=v;
 }
 updateStyleLabels();updatePreview();
});
updateStyleLabels();
function resetSign(){signX=.75;signY=.82;updatePreview();}
$("resetSign").onclick=resetSign;
for(const [input,label] of [["signScale","signScaleLabel"],["signOpacity","signOpacityLabel"]]){
 $(input).addEventListener("input",()=>{$(label).textContent=$(input).value+"%";updatePreview();});
}
$("videoFile").addEventListener("change",async e=>{
 const file=e.target.files?.[0];if(!file)return;
 $("convert").disabled=true;
 status("영상 정보를 읽는 중...");
 $("videoInfo").textContent="영상 불러오는 중...";
 if(videoUrl)URL.revokeObjectURL(videoUrl);
 videoUrl=URL.createObjectURL(file);
 video.pause();
 video.removeAttribute("src");
 video.load();
 try{
  await new Promise((resolve,reject)=>{
   let finished=false;
   const timer=setTimeout(()=>finish(Error("영상 로딩 시간 초과: MP4 코덱을 확인해주세요.")),15000);
   function finish(error){
    if(finished)return;finished=true;clearTimeout(timer);
    video.removeEventListener("loadedmetadata",ready);
    video.removeEventListener("loadeddata",ready);
    video.removeEventListener("error",failed);
    error?reject(error):resolve();
   }
   function ready(){if(video.videoWidth&&video.videoHeight)finish();}
   function failed(){
    const code=video.error?.code;
    finish(Error("영상을 재생할 수 없습니다"+(code?` (오류 ${code})`:"")+". H.264 영상으로 변환해 다시 시도해주세요."));
   }
   video.addEventListener("loadedmetadata",ready);
   video.addEventListener("loadeddata",ready);
   video.addEventListener("error",failed);
   video.src=videoUrl;
   video.load();
   if(video.readyState>=1)ready();
  });
  if(!Number.isFinite(video.duration)||video.duration<=0)throw Error("영상 길이를 읽을 수 없습니다.");
  $("start").value=0;
  $("end").value=Math.min(5,video.duration).toFixed(2);
  $("start").max=video.duration;
  $("end").max=video.duration;
  $("seek").max=Math.floor(video.duration*1000);
  $("seek").value=0;
  $("videoInfo").textContent=`${video.videoWidth}×${video.videoHeight} · ${video.duration.toFixed(2)}초`;
  $("convert").disabled=false;
  try{await seekVideo(0);}catch(err){console.warn("초기 프레임 이동:",err);}
  updatePreview();status("영상 준비 완료");
 }catch(err){
  $("videoInfo").textContent="영상 로딩 실패";
  status(err.message);
 }
});
$("signFile").addEventListener("change",e=>{
 const file=e.target.files?.[0];if(!file)return;
 if(signUrl)URL.revokeObjectURL(signUrl);
 signUrl=URL.createObjectURL(file);
 signReady=false;
 sign.onload=()=>{signReady=true;resetSign();};
 sign.onerror=()=>status("싸인 이미지를 읽을 수 없습니다.");
 sign.src=signUrl;
});
function seekVideo(t){
 return new Promise((resolve,reject)=>{
  if(!video.videoWidth)return reject(Error("영상을 먼저 선택해주세요."));
  const target=clamp(t,0,Math.max(0,video.duration-.001));
  if(Math.abs(video.currentTime-target)<.001 && video.readyState>=2){resolve();return;}
  const timer=setTimeout(()=>{cleanup();reject(Error("영상 프레임을 읽는 데 시간이 오래 걸립니다."));},12000);
  const done=()=>{cleanup();resolve();};
  const fail=()=>{cleanup();reject(Error("영상 위치 이동에 실패했습니다."));};
  function cleanup(){clearTimeout(timer);video.removeEventListener("seeked",done);video.removeEventListener("error",fail);}
  video.addEventListener("seeked",done,{once:true});video.addEventListener("error",fail,{once:true});
  video.currentTime=target;
 });
}
let seekBusy=false;
$("seek").addEventListener("input",async e=>{
 if(seekBusy||processing)return;
 seekBusy=true;
 try{await seekVideo(Number(e.target.value)/1000);updatePreview();}catch(err){status(err.message);}
 finally{seekBusy=false;}
});
stage.addEventListener("pointerdown",e=>{
 if(!signReady||processing)return;
 const r=canvas.getBoundingClientRect();
 const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
 const dw=Number($("signScale").value)/100,dh=dw*sign.naturalHeight/sign.naturalWidth*(canvas.width/canvas.height);
 if(Math.abs(x-signX)<dw/2+.05 && Math.abs(y-signY)<dh/2+.05){
  drag={pointerId:e.pointerId};stage.setPointerCapture(e.pointerId);
 }
});
stage.addEventListener("pointermove",e=>{
 if(!drag||drag.pointerId!==e.pointerId)return;
 const r=canvas.getBoundingClientRect();
 signX=clamp((e.clientX-r.left)/r.width,0,1);
 signY=clamp((e.clientY-r.top)/r.height,0,1);
 updatePreview();
});
for(const ev of ["pointerup","pointercancel"])stage.addEventListener(ev,()=>drag=null);

async function encodeGif({start,end,width,fps,colors}){
 const [nativeW,nativeH]=videoSize();
 const w=Math.max(2,Math.round(width/2)*2);
 const h=Math.max(2,Math.round(w*nativeH/nativeW/2)*2);
 const work=document.createElement("canvas");work.width=w;work.height=h;
 const c=work.getContext("2d",{willReadFrequently:true});
 const gif=GIFEncoder();
 const frames=Math.max(1,Math.ceil((end-start)*fps));
 const delay=Math.round(1000/fps);
 for(let i=0;i<frames;i++){
  const time=Math.min(end-.001,start+i/fps);
  await seekVideo(time);
  c.clearRect(0,0,w,h);
  c.drawImage(video,0,0,w,h);drawSign(c,w,h);
  const rgba=c.getImageData(0,0,w,h).data;
  const palette=quantize(rgba,colors);
  const indexed=applyPalette(rgba,palette);
  gif.writeFrame(indexed,w,h,{palette,delay,repeat:i===0?0:undefined});
  $("progress").value=Math.round((i+1)/frames*100);
  if(i%4===0){status(`변환 중 · ${i+1}/${frames}프레임 (${w}×${h}, ${fps}fps)`);await new Promise(r=>setTimeout(r,0));}
 }
 gif.finish();
 return new Blob([gif.bytes()],{type:"image/gif"});
}
$("convert").addEventListener("click",async()=>{
 if(processing)return;
 const start=Number($("start").value),end=Number($("end").value);
 let width=Number($("width").value),fps=Number($("fps").value);
 if(!video.videoWidth){status("MP4 영상을 선택해주세요.");return;}
 if(!Number.isFinite(start)||!Number.isFinite(end)||start<0||end<=start||end>video.duration+.02){
  status("시작·종료 시간을 영상 길이 안에서 올바르게 입력해주세요.");return;
 }
 if(!Number.isFinite(width)||width<160||width>1920||!Number.isFinite(fps)||fps<5||fps>30){
  status("해상도는 160~1920, FPS는 5~30 사이로 입력해주세요.");return;
 }
 processing=true;$("convert").disabled=true;$("download").hidden=true;
 if(lastUrl){URL.revokeObjectURL(lastUrl);lastUrl=null;}
 const limit=19*1024*1024;
 let colors=256;
 try{
  let result=null;
  for(let attempt=1;attempt<=6;attempt++){
   $("progress").value=0;
   status(`용량 최적화 ${attempt}/6 · ${Math.round(width)}px, ${fps}fps, ${colors}색`);
   result=await encodeGif({start,end,width,fps,colors});
   if(result.size<=limit)break;
   if(attempt===1)colors=128;
   else if(attempt===2)fps=Math.max(5,Math.round(fps*.75));
   else if(attempt===3)width=Math.max(160,Math.round(width*.75));
   else if(attempt===4){fps=Math.max(5,Math.round(fps*.65));colors=64;}
   else width=Math.max(160,Math.round(width*.65));
  }
  const mb=(result.size/1024/1024).toFixed(2);
  if(result.size>20*1024*1024){
   status(`변환 결과 ${mb}MB로 20MB를 초과했습니다. 구간을 줄이거나 해상도/FPS를 낮춰주세요.`);
  }else{
   lastUrl=URL.createObjectURL(result);
   $("download").href=lastUrl;$("download").hidden=false;
   $("download").textContent=`GIF 다운로드 (${mb}MB)`;
   status(result.size<=limit?`완료 · ${mb}MB (20MB 제한 이내)`:`완료 · ${mb}MB (20MB 이내이나 여유가 적습니다)`);
  }
 }catch(err){console.error(err);status("변환 실패: "+err.message);}
 finally{processing=false;$("convert").disabled=false;updatePreview();}
});

status("준비 완료 · MP4 파일을 선택해주세요.");
