import type { IPieChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const addRegionPadding: SpecPipe = (spec) => {
  const result = { ...spec } as IPieChartSpec

  if (result.region && result.region.length > 0) {
    result.region[0].padding = 10
  }

  return result
}
