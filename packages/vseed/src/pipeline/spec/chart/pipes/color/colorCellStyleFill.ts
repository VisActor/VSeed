import type { IHeatmapChartSpec } from '@visactor/vchart'
import type { SpecPipe, Spec } from 'src/types'
import { isLinearColor } from './colorAdapter'

export const colorCellStyleFill = (stylePipe: SpecPipe<Spec>): SpecPipe<Spec> => {
  return (spec, context) => {
    const result = stylePipe(spec, context) as IHeatmapChartSpec

    const { advancedVSeed, vseed } = context
    const { datasetReshapeInfo } = advancedVSeed
    const { unfoldInfo } = datasetReshapeInfo[0]

    if (isLinearColor(advancedVSeed, vseed)) {
      if (result?.cell?.style) {
        result.cell.style.fill = {
          field: unfoldInfo.encodingColor,
          scale: 'color',
        }
      }
    }

    return result
  }
}
