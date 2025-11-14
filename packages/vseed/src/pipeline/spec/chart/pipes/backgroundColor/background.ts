import type { ISpec } from '@visactor/vchart'
import type { BackgroundColor, SpecPipe, Spec } from 'src/types'

export const backgroundColor: SpecPipe<Spec> = (spec, context) => {
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
