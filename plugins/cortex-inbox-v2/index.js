(() => {
  'use strict';
  const { metro, patcher, logger, ui } = vendetta;
  const url = 'https://raw.githubusercontent.com/Macskanv/cortex-midnight-theme/main/cortex_messages_background.jpg';
  let unpatch = null, timer = null, active = false, attempts = 0;
  function notify(message) { try { ui?.toasts?.showToast?.(message); } catch (_) {} }
  function tryPatch() {
    if (!active || unpatch) return;
    attempts++;
    try {
      const React = metro.common.React, RN = metro.common.ReactNative;
      const finder = globalThis.bunny?.metro?.findByFilePath;
      if (typeof finder !== 'function') { notify('Cortex Inbox: Kettu modulkereső nem érhető el.'); return; }
      const target = finder('modules/main_tabs_v2/native/tabs/messages/Messages.tsx', false);
      if (target && typeof target.default === 'function' && React?.createElement && RN?.Image && RN?.View) {
        unpatch = patcher.after('default', target, (_, content) => {
          if (!React.isValidElement(content)) return content;
          return React.createElement(RN.View, { style: { flex: 1 }, collapsable: false }, content,
            React.createElement(RN.Image, { source: { uri: url }, resizeMode: 'cover', pointerEvents: 'none', accessible: false,
              style: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%', opacity: .13 } }));
        });
        notify('Cortex Inbox: háttér bekapcsolva. Nyisd meg újra az üzeneteket.');
        return;
      }
      if (attempts >= 20) { notify('Cortex Inbox: nem találom az üzenetlista modulját.'); return; }
    } catch (e) {
      logger?.error?.('Cortex Inbox:', e);
      if (attempts >= 20) { notify('Cortex Inbox: a háttér nem indult el.'); return; }
    }
    timer = setTimeout(tryPatch, 1500);
  }
  return {
    onLoad() { active = true; attempts = 0; notify('Cortex Inbox: háttérmodul keresése…'); timer = setTimeout(tryPatch, 300); },
    onUnload() { active = false; if (timer) clearTimeout(timer); timer = null; if (unpatch) { unpatch(); unpatch = null; } }
  };
})()
