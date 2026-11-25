function originalFile(item) {
    const binary=atob(item.data.slice(item.data.indexOf(',')+1));
    const bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
    return new File([bytes],item.name,{type:item.type});
}

if(window.CARDPACK_DATA) {
    document.body.classList.add('loading');
    hint.textContent='사진을 불러오는 중입니다';
    sound=!!CARDPACK_DATA.sound;
    document.querySelector('#sound').textContent=sound?'소리 켜짐':'소리 꺼짐';
    (async()=>{
        await Promise.all(CARDPACK_DATA.photos.map((item,i)=>setTierPhoto(i,originalFile(item),false,item.crop)));
        if(CARDPACK_DATA.pack){art=await new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=CARDPACK_DATA.pack})}
        if(tierPhotos.some(p=>!p))throw new Error('사진을 불러오지 못했습니다. 새로고침해주세요.');
        hint.textContent='팩 왼쪽 위를 잡고, 오른쪽으로 천천히 뜯어보세요';
        document.body.classList.remove('loading');
    })().catch(()=>{hint.textContent='사진을 불러오지 못했습니다. 새로고침해주세요.'});
}
