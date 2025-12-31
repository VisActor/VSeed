import { DATUM_HIDE_KEY } from 'src/pipeline/utils/constant'
import type { VChartSpecPipe } from 'src/types'
import { isLinearColor } from '../color/colorAdapter'
import { isPivotChart } from 'src/pipeline/utils'
import type { BrushConfig } from 'src/types/properties/brush/zBrush'

export const cellStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const cell = advancedVSeed.config?.[chartType as 'heatmap']?.cell
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]

  const isPivot = isPivotChart(vseed)
  const brushConfig = isPivot ? ((advancedVSeed.config as any)?.[chartType]?.brush ?? ({} as BrushConfig)) : null

  return {
    ...spec,
    cell: {
      style: {
        visible: (datum: any) => {
          return datum?.[DATUM_HIDE_KEY] !== true
        },
        shape: 'rect',
        stroke: cell?.stroke,
        lineWidth: cell?.lineWidth ?? 1,
        fill: {
          field: isLinearColor(advancedVSeed, vseed) ? unfoldInfo.encodingColor : unfoldInfo.encodingColorId,
          scale: 'color',
        },
      },
      state: {
        hover: {
          // innerBorder: {
          //   lineWidth: 1,
          //   stroke: cell?.hoverShadowColor,
          //   distance: 1,
          // },
          shadowColor: cell?.hoverShadowColor,
          shadowBlur: 5,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
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
