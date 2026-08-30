"use strict";
(function(){
const baseStoryDocument=storyDocumentV2;
storyDocumentV2=function(){
 let html=baseStoryDocument();
 html=html.replace(
  "action=!last?'<button class=\"next\">다음 ›</button>':s.isEnding?'<button class=\"restart\">처음부터 다시 보기</button>':'<div class=\"options\">'+opts+'</div>';",
  "action=!last?'<button class=\"next\">다음 ›</button>':s.isEnding?'<button class=\"restart\">처음부터 다시 보기</button>':s.choices.length?'<div class=\"options\">'+opts+'</div>':'<button class=\"nextScene\">다음 ›</button>';"
 );
 html=html.replace(
  "document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{id=b.dataset.go;step=0;draw()});let r=",
  "document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{id=b.dataset.go;step=0;draw()});let ns=document.querySelector('.nextScene');if(ns)ns.onclick=()=>{let i=D.scenes.findIndex(x=>x.id===id),next=D.scenes[i+1];if(next){id=next.id;step=0;draw()}else alert('다음 장면이 없습니다. 이 장면을 엔딩으로 설정해주세요.')};let r="
 );
 return html;
};
})();
