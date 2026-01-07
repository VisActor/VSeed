import type { IPieChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'
import { isPivotChart } from 'src/pipeline/utils'
import type { BrushConfig } from 'src/types/properties/brush/zBrush'

export const pieStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { dataset } = advancedVSeed
  const showStroke = dataset.length <= 30
  const config = advancedVSeed.config?.[chartType as 'pie']

  const isPivot = isPivotChart(vseed)
  const brushConfig = isPivot ? ((config as any)?.brush ?? ({} as BrushConfig)) : null

  const result = {
    ...spec,
    pie: {
      style: {
        stroke: config?.backgroundColor ?? '#ffffff',
        lineWidth: showStroke ? 1 : 0,
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
  } as Required<IPieChartSpec>

  if ((spec as IPieChartSpec).outerRadius) {
    result.pie.state = {
      ...result.pie.state,
      hover: {
        outerRadius: ((spec as IPieChartSpec).outerRadius as number) * 1.1,
      },
    }
  }

  if (config?.cornerRadius) {
    result.pie.style!.cornerRadius = config.cornerRadius
  }

  return result
}
