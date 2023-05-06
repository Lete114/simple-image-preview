import { PluginOption } from 'vite'

export default function (): PluginOption {
    let styleCode = ''
    return {
      name: 'vite-plugin-style-inject',
      apply: 'build',
      enforce: 'post',
      generateBundle(_, bundle) {
        for (const key in bundle) {
          if (bundle[key]) {
            const chunk = bundle[key]
            if (chunk.type === 'asset' && chunk.fileName.includes('.css')) {
              styleCode += chunk.source
              delete bundle[key]
            }
          }
        }

        for (const key in bundle) {
          if (bundle[key]) {
            const chunk = bundle[key]
            if (
              chunk.type === 'chunk' &&
              chunk.fileName.match(/\.[cm]?js$/) &&
              !chunk.fileName.includes('polyfill')
            ) {
              const injectStyleCode = `;(function () {var s = document.createElement('style');s.textContent = '${styleCode.trim()}';document.head.appendChild(s)})();`
              chunk.code = injectStyleCode + chunk.code
              break
            }
          }
        }
      }
    }
}
