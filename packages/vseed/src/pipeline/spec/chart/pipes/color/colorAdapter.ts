import { findAllMeasures } from 'src/pipeline/utils'
import type { SpecPipe } from 'src/types'

export const colorAdapter = (ordinalPipe: SpecPipe, linearPipe: SpecPipe): SpecPipe => {
  return (spec, context) => {
    const { advancedVSeed } = context
    const { encoding, measures } = advancedVSeed

    const measureIdList = findAllMeasures(measures).map((measure) => measure.id)
    const { color } = encoding
    if (color?.length === 1 && measureIdList.includes(color[0])) {
      return linearPipe(spec, context)
    }
    return ordinalPipe(spec, context)
  }
}
