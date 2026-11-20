(() => {
  'use strict';
  const { metro, patcher, logger } = vendetta;
  const imageUrl = 'https://raw.githubusercontent.com/Macskanv/cortex-midnight-theme/main/cortex_messages_background.jpg';
  let unpatch = null;
  return {
    onLoad() {
      const React = metro.common.React;
      const RN = metro.common.ReactNative;
      if (!React?.createElement || !RN?.Image || !RN?.View) throw new Error('Cortex Inbox: missing React Native modules; no changes applied.');
      // Scope the patch to the exact 329.0 inbox file; never patch chat by name.
      const finder = globalThis.bunny?.metro?.findByFilePath;
      if (typeof finder !== 'function') throw new Error('Cortex Inbox: Kettu path lookup unavailable; no changes applied.');
      const target = finder('modules/main_tabs_v2/native/tabs/messages/Messages.tsx', false);
      if (!target || typeof target.default !== 'function') throw new Error('Cortex Inbox: inbox module unavailable or changed; no changes applied.');
      unpatch = patcher.after('default', target, (_, content) => {
        if (!React.isValidElement(content)) return content;
        return React.createElement(RN.View, { style: { flex: 1 }, collapsable: false },
          content,
          React.createElement(RN.Image, {
            source: { uri: imageUrl }, resizeMode: 'cover', pointerEvents: 'none',
            accessible: false, accessibilityElementsHidden: true,
            style: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%', opacity: 0.13 }
          })
        );
      });
      logger?.log?.('Cortex Inbox experimental patch active.');
    },
    onUnload() { if (unpatch) { unpatch(); unpatch = null; } }
  };
})()
