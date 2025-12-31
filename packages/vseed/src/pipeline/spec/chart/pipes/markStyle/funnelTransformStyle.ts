import type { VChartSpecPipe } from 'src/types'
import { isPivotChart } from 'src/pipeline/utils'
import type { BrushConfig } from 'src/types/properties/brush/zBrush'

export const funnelTransformStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const config = advancedVSeed.config?.[chartType as 'funnel']?.transform

  const isPivot = isPivotChart(vseed)
  const brushConfig = isPivot ? ((advancedVSeed.config as any)?.[chartType]?.brush ?? ({} as BrushConfig)) : null

  return {
    ...spec,
    transform: {
      style: {
        fill: config?.backgroundColor,
      },
      state: {
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
    transformLabel: {
      visible: true,
      style: {
        fill: config?.textColor,
      },
    },
  }
}
