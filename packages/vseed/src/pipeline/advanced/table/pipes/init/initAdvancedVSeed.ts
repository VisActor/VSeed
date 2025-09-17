import { checkVSeed } from 'src/pipeline/utils'
import type { AdvancedPipe, AdvancedVSeed } from 'src/types'

export const initAdvancedVSeed: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType, locale } = vseed

  checkVSeed(vseed)

  return {
    ...advancedVSeed,
    chartType,
    locale: locale || 'zh-CN',
  } as AdvancedVSeed
}
