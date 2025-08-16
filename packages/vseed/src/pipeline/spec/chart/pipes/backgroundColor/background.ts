import type { ISpec } from '@visactor/vchart'
import type { BackgroundColor, SpecPipe } from 'src/types'

export const backgroundColor: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed } = context
  const { chartType } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { backgroundColor: BackgroundColor }

  const { backgroundColor } = baseConfig

  return {
    ...result,
    background: backgroundColor,
  }
}
