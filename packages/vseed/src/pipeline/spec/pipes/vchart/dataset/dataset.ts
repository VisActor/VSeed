import type { ISpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const dataset: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  return {
    ...spec,
    data: {
      values: advancedVSeed.dataset,
    },
  } as ISpec
}
