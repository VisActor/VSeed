import type { AdvancedPipe } from 'src/types'

export const locale: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { locale } = vseed

  return {
    ...advancedVSeed,
    locale: locale || 'zh-CN',
  }
}
