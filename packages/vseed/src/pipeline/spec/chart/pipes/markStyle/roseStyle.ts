import type { IRoseChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'
import { isPivotChart } from 'src/pipeline/utils'
import type { BrushConfig } from 'src/types/properties/brush/zBrush'

export const roseStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { dataset } = advancedVSeed
  const { chartType } = vseed
  const showStroke = dataset.length <= 30

  const isPivot = isPivotChart(vseed)
  const brushConfig = isPivot ? ((advancedVSeed.config as any)?.[chartType]?.brush ?? ({} as BrushConfig)) : null

  const result = {
    ...spec,
    rose: {
      style: {},
    },
  } as Required<IRoseChartSpec>

  return {
    ...result,
    rose: {
      style: {
        stroke: '#ffffff',
        lineWidth: showStroke ? 1 : 0,
      },
      state: {
        hover: {
          lineWidth: 1,
          fillOpacity: 0.6,
        },
        selected: {
          opacity: brushConfig?.inBrushStyle?.opacity ?? 1,
          ...(brushConfig?.inBrushStyle?.stroke && { stroke: brushConfig.inBrushStyle.stroke }),
          ...(brushConfig?.inBrushStyle?.lineWidth && { lineWidth: brushConfig.inBrushStyle.lineWidth }),
        },
        selected_reverse: {
          opacity: brushConfig?.outOfBrushStyle?.opacity ?? 0.2,
          ...(brushConfig?.outOfBrushStyle?.stroke && { stroke: brushConfig.outOfBrushStyle.stroke }),
          ...(brushConfig?.outOfBrushStyle?.lineWidth && { lineWidth: brushConfig.outOfBrushStyle.lineWidth }),
        },
      },
    },
  }
}
