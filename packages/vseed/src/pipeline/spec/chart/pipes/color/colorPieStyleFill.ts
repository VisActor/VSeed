import type { IPieChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'
import { isLinearColor } from './colorAdapter'

export const colorPieStyleFill = (stylePipe: SpecPipe): SpecPipe => {
  return (spec, context) => {
    const result = stylePipe(spec, context) as IPieChartSpec

    const { advancedVSeed } = context
    const { datasetReshapeInfo } = advancedVSeed
    const { unfoldInfo } = datasetReshapeInfo[0]

    if (isLinearColor(advancedVSeed)) {
      if (result?.pie?.style) {
        result.pie.style.fill = {
          field: unfoldInfo.encodingColor,
          scale: 'color',
        }
      }
    }

    return result
  }
}
