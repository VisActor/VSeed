import type { IAreaChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { Datum, LineStyle, SpecPipe } from 'src/types'
import { groupBy, isEmpty, isNullish } from 'remeda'
import { getCurveTension, getCurveType } from './curve'

export const lineStyle: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { markStyle, datasetReshapeInfo, dataset } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]
  const { lineStyle } = markStyle
  const result = {
    ...spec,
    line: {
      style: {},
    },
  } as IAreaChartSpec

  if (isNullish(lineStyle) || isEmpty(lineStyle)) {
    return result
  }

  const lineStyles = (Array.isArray(lineStyle) ? lineStyle : [lineStyle]) as LineStyle[]

  const colorId = unfoldInfo.encodingColorId
  const lineGroups = groupBy(dataset, (d) => d[colorId ?? ''] as string)

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
        filter: (datum: Datum) => {
          const lineData = lineGroups[datum[colorId ?? ''] as string]
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
