import * as path from 'node:path'
import { defineConfig } from 'rspress/config'
import { pluginPlayground } from '@rspress/plugin-playground'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  base: '/VSeed/',
  globalStyles: path.join(__dirname, 'components/styles/index.css'),
  plugins: [
    pluginPlayground({
      include: ['@visactor/vchart', '@visactor/vtable', '@visactor/vseed', 'rspress/runtime'],
    }),
  ],
  lang: 'zh-CN',
  locales: [
    {
      lang: 'zh-CN',
      label: '简体中文',
      title: 'VisActor VSeed',
      description: 'VisActor VSeed',
    },
    {
      lang: 'en-US',
      label: 'English',
      title: 'VisActor VSeed',
      description: 'VisActor VSeed',
    },
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/visactor/vseed',
      },
    ],
    locales: [
      {
        lang: 'en-US',
        label: 'English',
        outlineTitle: 'ON THIS Page',
      },
      {
        lang: 'zh-CN',
        label: '简体中文',
        outlineTitle: '目录',
      },
    ],
    nav: [
      {
        text: '介绍',
        link: '/guide/guide',
        activeMatch: '/guide/',
      },
      {
        text: '示例',
        link: '/galley/chartType/line',
        activeMatch: '/galley',
      },
      ...(isDev
        ? [
            {
              text: '开发指南',
              link: '/development/',
              activeMatch: '/development/',
            },
          ]
        : []),
      {
        text: 'Playground',
        link: '/playground/',
        activeMatch: '/playground/',
      },
      {
        text: '了解VChart',
        link: 'https://visactor.com/vchart',
      },
      {
        text: '了解VTable',
        link: 'https://visactor.com/vtable',
      },
    ],
  },
  title: 'VisActor/VSeed',
  icon: '/logo.svg',
  logoText: 'VisActor VSeed',
  route: {
    exclude: ['components/**/*'],
  },
  builderConfig: {
    output: {
      assetPrefix: 'https://visactor.github.io/VSeed/',
    },
  },
})
