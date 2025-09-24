import type { IBarChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'
import { isLinearColor } from './colorAdapter'

export const colorBarStyleFill = (stylePipe: SpecPipe): SpecPipe => {
  return (spec, context) => {
    const result = stylePipe(spec, context) as IBarChartSpec

    const { advancedVSeed, vseed } = context
    const { datasetReshapeInfo } = advancedVSeed
    const { unfoldInfo } = datasetReshapeInfo[0]

    if (isLinearColor(advancedVSeed, vseed)) {
      if (result?.bar?.style) {
        result.bar.style.fill = {
          field: unfoldInfo.encodingColor,
          scale: 'color',
        }
      }
    }

    return result
  }
}
