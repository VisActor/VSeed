import type { IRoseChartSpec } from '@visactor/vchart'
import { isLinearColor } from './colorAdapter'
import type { VChartSpecPipe } from 'src/types/pipeline/spec/spec'

export const colorRoseStyleFill = (stylePipe: VChartSpecPipe): VChartSpecPipe => {
  return (spec, context) => {
    const result = stylePipe(spec, context) as IRoseChartSpec

    const { advancedVSeed, vseed } = context
    const { datasetReshapeInfo } = advancedVSeed
    const { unfoldInfo } = datasetReshapeInfo[0]

    if (isLinearColor(advancedVSeed, vseed)) {
      if (result?.rose?.style) {
        result.rose.style.fill = {
          field: unfoldInfo.encodingColor,
          scale: 'color',
        }
      }
    }

    return result
  }
}
