import type { IAreaChartSpec } from '@visactor/vchart'
import { selector } from '../../../../dataSelector'
import type { Datum, LineStyle, SpecPipe } from 'src/types'
import { groupBy } from 'remeda'

export const lineStyle: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { markStyle, encoding, dataset } = advancedVSeed
  const { lineStyle } = markStyle
  if (!lineStyle) {
    return spec
  }
  const result = { ...spec } as IAreaChartSpec

  const lineStyles = (Array.isArray(lineStyle) ? lineStyle : [lineStyle]) as LineStyle[]

  const group = encoding[0]?.group?.[0]
  const lineGroups = groupBy(dataset, (d) => d[group ?? ''] as string)

  const customMap = lineStyles.reduce<object>((result, style, index) => {
    const { lineColor, lineColorOpacity, lineSmooth, lineStyle, lineWidth } = style

    const dashSegment = (lineWidth ?? 2) * 2
    const dashGap = lineWidth ?? 2

    const lineDash =
      lineStyle === 'dashed' ? [dashSegment, dashSegment] : lineStyle === 'dotted' ? [dashGap / 2, dashGap * 2] : [0, 0]

    const curveType = lineSmooth ? 'monotone' : 'linear'

    return {
      ...result,
      [`custom${index + 1}`]: {
        // 优先级: 后者覆盖前者
        level: index + 1,
        filter: (datum: Datum) => {
          const lineData = lineGroups[datum[group ?? ''] as string]
          for (const d of lineData) {
            if (selector(d, style.selector)) {
              return true
            }
          }
          return false
        },
        style: {
          curveType: curveType,
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
      state: {
        ...customMap,
      },
    },
  }
}
