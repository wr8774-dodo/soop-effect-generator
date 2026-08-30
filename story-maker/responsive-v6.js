"use strict";
(function(){
const previousStoryDocument=storyDocumentV2;
storyDocumentV2=function(){
 const compactCss=`@media (pointer:coarse){.dialog,.message .dialog,.diary .dialog{left:38%!important;right:3%!important;bottom:4%!important;padding:7px 9px!important;border-radius:7px!important;transform:none!important}.dialog small{font-size:7px!important}.dialog p{font-size:10px!important;line-height:1.25!important;margin:2px 0 5px!important}.options{grid-template-columns:1fr 1fr!important;gap:3px!important}.options button,.next,.restart{min-height:23px!important;padding:3px 5px!important;font-size:8px!important;border-radius:5px!important}.ending{left:30%!important;right:8%!important}}`;
 return previousStoryDocument().replace('</style>',compactCss+'</style>');
};
})();
