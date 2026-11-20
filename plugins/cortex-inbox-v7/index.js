(() => {
 'use strict'; const { metro, patcher, ui } = vendetta;
 const url='https://raw.githubusercontent.com/Macskanv/cortex-midnight-theme/main/cortex_messages_background.jpg';
 let active=false, unpatch=null, timers=[], renders=0, imagesLoaded=0, imageErrors=0, patchStatus='nem indult';
 function later(fn,ms){timers.push(setTimeout(fn,ms))}
 function report(){if(!active)return;try{ui.alerts.showConfirmationAlert({title:'Cortex Inbox – render teszt',content:'Módosítás: '+patchStatus+'\nKirajzolások: '+renders+'\nSikeres képletöltések: '+imagesLoaded+'\nKéplettöltési hibák: '+imageErrors,confirmText:'Rendben',onConfirm:()=>{}})}catch(_){}}
 function start(){if(!active)return;try{const finder=globalThis.bunny?.metro?.findByFilePath;const target=finder?.('modules/main_tabs_v2/native/tabs/messages/Messages.tsx',false);const memo=target?.default;const React=metro.common.React,RN=metro.common.ReactNative;if(typeof memo?.type!=='function')throw Error('memo komponens hiányzik');
 unpatch=patcher.after('type',memo,(_,content)=>{renders++;if(!React.isValidElement(content))return content;return React.createElement(RN.View,{style:{flex:1}},content,React.createElement(RN.Image,{source:{uri:url},resizeMode:'cover',pointerEvents:'none',accessible:false,onLoad:()=>{imagesLoaded++},onError:()=>{imageErrors++},style:{position:'absolute',top:0,right:0,bottom:0,left:0,width:'100%',height:'100%',opacity:.22}}))});patchStatus='regisztrált';}catch(e){patchStatus='hiba: '+String(e?.message||e).slice(0,120)}}
 return {onLoad(){active=true;later(start,300);later(report,25000)},onUnload(){active=false;timers.forEach(clearTimeout);timers=[];if(unpatch){unpatch();unpatch=null}}};
})()
