import type { IRoseChartSpec } from '@visactor/vchart'
import type { SpecPipe, Spec } from 'src/types'
import { isLinearColor } from './colorAdapter'

export const colorRoseStyleFill = (stylePipe: SpecPipe<Spec>): SpecPipe<Spec> => {
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
