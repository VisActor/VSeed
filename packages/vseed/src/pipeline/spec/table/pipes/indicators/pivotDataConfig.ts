import { findAllMeasures } from 'src/pipeline/utils'
import type { SpecPipe } from 'src/types'

export const dataConfig: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const measures = findAllMeasures(advancedVSeed.measures)

  const aggregationRules = measures.map((measure) => ({
    field: measure.id,
    aggregationType: 'NONE',
    indicatorKey: measure.id,
  }))

  return {
    ...spec,
    dataConfig: {
      aggregationRules,
    },
  }
}
