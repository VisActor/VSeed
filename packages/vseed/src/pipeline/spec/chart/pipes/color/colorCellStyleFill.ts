import type { IHeatmapChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'
import { isLinearColor } from './colorAdapter'

export const colorCellStyleFill = (stylePipe: SpecPipe): SpecPipe => {
  return (spec, context) => {
    const result = stylePipe(spec, context) as IHeatmapChartSpec

    const { advancedVSeed } = context
    const { datasetReshapeInfo } = advancedVSeed
    const { unfoldInfo } = datasetReshapeInfo[0]

    if (isLinearColor(advancedVSeed)) {
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
