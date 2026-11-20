(() => {
  'use strict';
  const { metro, ui } = vendetta;
  let timer, active = false;
  function safe(x) { try { return String(x).slice(0, 100); } catch { return '?'; } }
  function run() {
    if (!active) return;
    const rows = [];
    try {
      const finder = globalThis.bunny?.metro?.findByFilePath;
      rows.push('Kettu fájlkereső: ' + typeof finder);
      for (const path of ['modules/main_tabs_v2/native/tabs/messages/Messages.tsx','modules/main_tabs_v2/native/tabs/guilds/HomePanelContent.tsx','modules/main_tabs_v2/native/panels/MainTabsNavigatorPanel.tsx']) {
        try {
          const mod = typeof finder === 'function' ? finder(path, false) : null;
          const keys = mod && (typeof mod === 'object' || typeof mod === 'function') ? Object.keys(mod).slice(0, 14) : [];
          rows.push(path.split('/').pop() + ': ' + (mod ? typeof mod + ' [' + keys.map(safe).join(', ') + ']' : 'nem található'));
        } catch (e) { rows.push(path.split('/').pop() + ': keresési hiba'); }
      }
      try {
        const matches = metro.findByNameAll?.('Messages', false) || [];
        rows.push('Messages nevű modulok: ' + matches.length);
        matches.slice(0, 3).forEach((mod, i) => rows.push('Találat ' + (i + 1) + ': ' + (mod && (typeof mod === 'object' || typeof mod === 'function') ? Object.keys(mod).slice(0, 10).map(safe).join(', ') : typeof mod)));
      } catch (_) { rows.push('Névkeresés sikertelen'); }
    } catch (_) { rows.push('Diagnosztikai hiba.'); }
    try { ui.alerts.showConfirmationAlert({title:'Cortex Inbox – diagnosztika',content:rows.join('\n'),confirmText:'Rendben',onConfirm:()=>{}}); } catch (_) {}
  }
  return { onLoad() { active = true; timer = setTimeout(run, 8000); }, onUnload() { active = false; if (timer) clearTimeout(timer); } };
})()
