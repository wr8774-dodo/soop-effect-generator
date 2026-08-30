"use strict";
(function(){
const previousStoryDocument=storyDocumentV2;
storyDocumentV2=function(){
 const mobileCss=`@media (pointer:coarse){.dialog,.message .dialog,.diary .dialog{left:4%!important;right:4%!important;bottom:4%!important;padding:10px 12px!important;border-radius:8px!important;transform:none!important}.dialog small{font-size:9px!important}.dialog p{font-size:12px!important;line-height:1.35!important;margin:3px 0 7px!important}.options{gap:4px!important}.options button,.next,.restart{min-height:28px!important;padding:4px 7px!important;font-size:10px!important;border-radius:6px!important}}`;
 return previousStoryDocument().replace('</style>',mobileCss+'</style>');
};
})();
