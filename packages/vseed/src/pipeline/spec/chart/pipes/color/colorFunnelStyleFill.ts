import type { IFunnelChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'
import { isLinearColor } from './colorAdapter'

export const colorFunnelStyleFill = (stylePipe: SpecPipe): SpecPipe => {
  return (spec, context) => {
    const result = stylePipe(spec, context) as IFunnelChartSpec

    const { advancedVSeed } = context
    const { datasetReshapeInfo } = advancedVSeed
    const { unfoldInfo } = datasetReshapeInfo[0]

    if (isLinearColor(advancedVSeed)) {
      if (result?.funnel?.style) {
        result.funnel.style.fill = {
          field: unfoldInfo.encodingColor,
          scale: 'color',
        }
      }
    }

    return result
  }
}
