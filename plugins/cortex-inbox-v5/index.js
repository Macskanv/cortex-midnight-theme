(() => {
 'use strict'; const { ui } = vendetta; let timer,active=false;
 function describe(value) {
   try { if (value==null) return String(value); let t=typeof value, keys=(t==='object'||t==='function')?Object.keys(value).slice(0,8):[]; let details=keys.map(k=>k+':'+typeof value[k]);
   const d=(t==='object'||t==='function')?Object.getOwnPropertyDescriptor(value,'default'):null;
   let out=t+' ['+details.join(', ')+']';
   if(d){let v=value.default; out+='; default='+typeof v; if(v&&(typeof v==='object'||typeof v==='function'))out+=' {'+Object.keys(v).slice(0,8).map(k=>k+':'+typeof v[k]).join(', ')+'}';}return out;
   }catch(e){return 'hiba: '+String(e).slice(0,100)}
 }
 function run(){if(!active)return;const f=globalThis.bunny?.metro?.findByFilePath;let results=[];
 for(const name of ['modules/main_tabs_v2/native/tabs/messages/Messages.tsx','modules/main_tabs_v2/native/tabs/guilds/HomePanelContent.tsx','modules/main_tabs_v2/native/panels/MainTabsNavigatorPanel.tsx']){try{results.push(name.split('/').pop()+': '+describe(f?.(name,false)))}catch(e){results.push(name.split('/').pop()+': hiba')}}
 try{ui.alerts.showConfirmationAlert({title:'Cortex Inbox – modul típusa',content:results.join('\n\n'),confirmText:'Rendben',onConfirm:()=>{}})}catch(_){}
 }
 return {onLoad(){active=true;timer=setTimeout(run,7000)},onUnload(){active=false;if(timer)clearTimeout(timer)}};
})()
