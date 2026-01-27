import * as path from 'node:path'
import { defineConfig } from '@rspress/core'
import { pluginPlayground } from '@rspress/plugin-playground'
// const isDev = process.env.NODE_ENV === 'development'

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
    // {
    //   lang: 'en-US',
    //   label: 'English',
    //   title: 'VisActor VSeed',
    //   description: 'VisActor VSeed',
    // },
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
      // {
      //   lang: 'en-US',
      //   label: 'English',
      //   outlineTitle: 'ON THIS Page',
      // },
      {
        lang: 'zh-CN',
        label: '简体中文',
        outlineTitle: '目录',
      },
    ],
  },
  markdown: {
    showLineNumbers: true,
  },
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
