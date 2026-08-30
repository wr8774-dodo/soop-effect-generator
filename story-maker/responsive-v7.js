"use strict";
(function(){
const previousStoryDocument=storyDocumentV2;
storyDocumentV2=function(){
 const desktopCss=`@media (pointer:fine){.dialog,.message .dialog,.diary .dialog{left:52%!important;right:3%!important;bottom:4%!important;padding:11px 14px!important;border-radius:9px!important;transform:none!important}.dialog small{font-size:10px!important}.dialog p{font-size:14px!important;line-height:1.35!important;margin:4px 0 8px!important}.options{grid-template-columns:1fr 1fr!important;gap:5px!important}.options button,.next,.restart{min-height:34px!important;padding:6px 8px!important;font-size:11px!important;border-radius:6px!important}.ending{left:55%!important;right:5%!important;bottom:12%!important}}`;
 return previousStoryDocument().replace('</style>',desktopCss+'</style>');
};
})();
