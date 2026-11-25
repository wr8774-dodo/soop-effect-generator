// A published pack contains its own images and code; it never reads the viewer's saved editor photos.
function fileDataURL(file) {
    return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(new Error('사진 원본을 읽지 못했습니다.'));r.readAsDataURL(file)});
}
function originalFile(item) {
    const binary=atob(item.data.slice(item.data.indexOf(',')+1));
    const bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
    return new File([bytes],item.name,{type:item.type});
}
async function encodePackPhoto(file,maxSize) {
    const original=await fileDataURL(file);
    if(!maxSize)return {data:original,name:file.name,type:file.type};
    const img=new Image();
    await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=()=>reject(new Error('배포용 사진을 읽지 못했습니다.'));img.src=original});
    const scale=Math.min(1,maxSize/img.naturalWidth,maxSize/img.naturalHeight);
    const canvas=document.createElement('canvas');
    canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));
    const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(img,0,0,canvas.width,canvas.height);
    let data=canvas.toDataURL('image/webp',.88);
    for(const quality of [.78,.65]){if(data.length<950000)break;data=canvas.toDataURL('image/webp',quality)}
    if(data.length>=original.length)return {data:original,name:file.name,type:file.type};
    const type=data.slice(5,data.indexOf(';'));
    return {data,name:file.name.replace(/\.[^.]+$/,'')+(type==='image/webp'?'.webp':'.png'),type};
}
async function buildCardpackHTML({maxSize=1920}={}) {
    await restoredPhotos;
    if(tierPhotos.some(p=>!p))throw new Error('일반부터 레전더리까지 6개 등급에 사진을 모두 넣어주세요.');
    // Process sequentially to avoid decoding six large originals at once.
    const data={sound,photos:[],pack:null,optimized:!!maxSize};
    for(const item of tierPhotos)data.photos.push({...await encodePackPhoto(item.file,maxSize),crop:normalizedCrop(item.crop)});
    if(packFile)data.pack=(await encodePackPhoto(packFile,maxSize)).data;
    const read=async path=>{const response=await fetch(new URL(path,location.href));if(!response.ok)throw new Error('카드팩 파일을 불러오지 못했습니다. 새로고침 후 다시 시도해주세요.');return response.text()};
    const [template,css,photos,position,runtime]=await Promise.all(['index.html','reveal.css','photos.js','position.js','viewer.js'].map(read));
    // Escape HTML delimiters even in user-supplied filenames.
    const json=JSON.stringify(data).replaceAll('<','\\u003c').replaceAll('>','\\u003e').replaceAll('&','\\u0026');
    const script=text=>'<script>'+text.replace(/<\/script/gi,'<\\/script')+'</script>';
    let html=template.replace('<link rel="stylesheet" href="reveal.css">',()=>'<style>'+css+'</style>');
    html=html.replace('<script>',()=>script('window.CARDPACK_DATA='+json+';')+`<style>
    header,#editPhotos,nav label,.backGenerator,#photoDialog,#positionDialog{display:none!important}
    nav{top:10px!important;right:12px!important;z-index:50}nav button{font-size:11px;padding:6px 10px}
    footer{bottom:12px}#hint{font-size:clamp(10px,2vw,16px)}footer small{font-size:10px;margin-top:4px}
    body.loading{pointer-events:none}body.loading canvas{opacity:.25}
    </style><script>`);
    for(const [name,code] of [['photos.js',photos],['position.js',position],['export.js',runtime]])html=html.replace('<script src="'+name+'"></script>',()=>script(code));
    return html;
}