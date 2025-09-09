import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedVSeed, SpecPipe } from 'src/types'

export const colorAdapter = (ordinalPipe: SpecPipe, linearPipe: SpecPipe): SpecPipe => {
  return (spec, context) => {
    const { advancedVSeed } = context
    if (isLinearColor(advancedVSeed)) {
      return linearPipe(spec, context)
    }
    return ordinalPipe(spec, context)
  }
}

export const isLinearColor = (advancedVSeed: AdvancedVSeed) => {
  const { encoding, measures } = advancedVSeed
  const measureIdList = findAllMeasures(measures).map((measure) => measure.id)
  const { color } = encoding
  return color?.length === 1 && measureIdList.includes(color[0])
}
