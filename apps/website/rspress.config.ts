import * as path from 'node:path'
import { pluginPlayground } from '@rspress/plugin-playground'
import { defineConfig } from '@rspress/core'
import i18nJson from './i18n.json'

export default defineConfig({
  root: './docs',
  base: '/VBI/',
  globalStyles: path.join(__dirname, 'components/styles/index.css'),
  plugins: [
    pluginPlayground({
      include: [
        '@visactor/vchart',
        '@visactor/vtable',
        '@visactor/vseed',
        '@visactor/vquery',
        '@visactor/vbi',
        '@rspress/core/runtime',
        'yjs',
      ],
    }),
  ],
  lang: 'zh-CN',
  locales: [
    {
      lang: 'zh-CN',
      label: '简体中文',
      title: 'VisActor VBI',
      description: 'VisActor VBI',
    },
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/visactor/vbi',
      },
    ],
    locales: [
      {
        lang: 'zh-CN',
        label: '简体中文',
      },
    ],
  },
  markdown: {
    showLineNumbers: true,
  },
  i18nSource: i18nJson as Record<string, Record<string, string>>,
  title: 'VisActor/VBI',
  icon: '/logo.svg',
  logoText: 'VisActor VBI',
  route: {
    exclude: ['components/**/*'],
  },
  builderConfig: {
    tools: {
      rspack: {
        resolve: {
          conditionNames: ['source', '...'],
        },
      },
    },
    server: {
      open: true,
    },
    output: {
      sourceMap: true,
      assetPrefix: 'https://visactor.github.io/VBI/',
    },
  },
})
