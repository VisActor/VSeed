import * as path from 'node:path'
import { defineConfig } from 'rspress/config'
import { pluginPlayground } from '@rspress/plugin-playground'

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  // globalUIComponents: [
  //   path.join(__dirname, 'components/Editor', 'Editor.tsx'),
  //   path.join(__dirname, 'components/Gallery', 'Gallery.tsx'),
  // ],
  globalStyles: path.join(__dirname, 'components/styles/index.css'),
  plugins: [
    pluginPlayground({
      include: ['@visactor/vchart', '@visactor/vtable', '@visactor/vseed'],
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
      // 导航栏切换语言的标签
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
  },
  title: 'VisActor/VSeed',
  icon: '/logo.svg',
  logoText: 'VisActor VSeed',
  route: {
    exclude: ['component/**/*'],
  },
})
