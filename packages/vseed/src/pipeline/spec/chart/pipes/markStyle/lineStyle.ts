import type { IAreaChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { Datum, LineStyle, VChartSpecPipe } from 'src/types'
import { isEmpty, isNullish } from 'remeda'
import { getCurveTension, getCurveType } from './curve'
import { isPivotChart } from 'src/pipeline/utils'
import type { BrushConfig } from 'src/types/properties/brush/zBrush'

export const lineStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { markStyle } = advancedVSeed
  const { lineStyle } = markStyle
  const { chartType } = vseed

  const isPivot = isPivotChart(vseed)
  const brushConfig = isPivot ? ((advancedVSeed.config as any)?.[chartType]?.brush ?? ({} as BrushConfig)) : null

  const result = {
    ...spec,
    line: {
      style: {},
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
  } as IAreaChartSpec

  if (isNullish(lineStyle) || isEmpty(lineStyle)) {
    return result
  }

  const lineStyles = (Array.isArray(lineStyle) ? lineStyle : [lineStyle]) as LineStyle[]

  const customMap = lineStyles.reduce<object>((result, style, index) => {
    const { lineColor, lineColorOpacity, lineSmooth, lineStyle, lineWidth = 2, lineVisible = true } = style

    const dashSegment = lineWidth * 2
    const dashGap = lineWidth

    const lineDash =
      lineStyle === 'dashed' ? [dashSegment, dashSegment] : lineStyle === 'dotted' ? [dashGap / 2, dashGap * 2] : [0, 0]

    const curveType = getCurveType(context.vseed, lineSmooth)
    const curveTension = getCurveTension(context.vseed, lineSmooth)

    return {
      ...result,
      [`custom${index + 1}`]: {
        // 优先级: 后者覆盖前者
        level: index + 1,
        filter: (
          _: Datum,
          node: {
            renderNode: {
              context: {
                data: Datum[]
              }
            }
          },
        ) => {
          const lineData = node.renderNode.context.data
          for (const d of lineData) {
            if (selector(d, style.selector)) {
              return true
            }
          }
          return false
        },
        style: {
          visible: lineVisible,
          curveType: curveType,
          curveTension: curveTension,
          strokeOpacity: lineColorOpacity,
          stroke: lineColor,
          lineWidth: lineWidth,
          lineDash: lineDash,
        },
      },
    }
  }, {})

  return {
    ...result,
    line: {
      ...result.line,
      state: {
        ...customMap,
      },
    },
  }
}
