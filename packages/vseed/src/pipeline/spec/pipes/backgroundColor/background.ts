import type { ISpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const backgroundColor: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed } = context
  const { baseConfig } = advancedVSeed
  if (!baseConfig?.vchart) {
    return result
  }
  const { backgroundColor } = baseConfig.vchart
  return {
    ...result,
    background: backgroundColor,
  }
}
