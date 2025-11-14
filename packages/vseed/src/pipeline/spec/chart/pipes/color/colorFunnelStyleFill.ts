import type { IFunnelChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'
import { isLinearColor } from './colorAdapter'

export const colorFunnelStyleFill = (stylePipe: VChartSpecPipe): VChartSpecPipe => {
  return (spec, context) => {
    const result = stylePipe(spec, context) as IFunnelChartSpec

    const { advancedVSeed, vseed } = context
    const { datasetReshapeInfo } = advancedVSeed
    const { unfoldInfo } = datasetReshapeInfo[0]

    if (isLinearColor(advancedVSeed, vseed)) {
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
