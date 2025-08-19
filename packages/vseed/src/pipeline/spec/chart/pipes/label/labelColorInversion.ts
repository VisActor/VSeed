import type { IHeatmapChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const labelColorInversion: SpecPipe = (spec) => {
  const result = { ...spec } as IHeatmapChartSpec
  if (result.label) {
    result.label.smartInvert = true
  } else {
    result.label = {
      smartInvert: true,
    }
  }
  return result
}
