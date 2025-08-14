import type { IBarChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { BarStyle, Datum, SpecPipe } from 'src/types'
import type { ISeriesMarkAttributeContext } from '@visactor/vchart/esm/compile/mark'

export const barStyle: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { markStyle, encoding } = advancedVSeed
  const { barStyle } = markStyle

  const result = {
    ...spec,
    bar: {
      state: {
        hover: {
          stroke: (datum, context: ISeriesMarkAttributeContext) => {
            const field = encoding[0]?.group?.[0] as string
            const color = context.seriesColor(datum[field] as string)
            return color
          },
          lineWidth: 4,
          fillOpacity: 0.6,
        },
      },
    },
  } as IBarChartSpec

  if (!barStyle) {
    return result
  }

  const barStyles = (Array.isArray(barStyle) ? barStyle : [barStyle]) as BarStyle[]

  const customMap = barStyles.reduce<object>((result, style, index) => {
    const { barBorderColor, barBorderStyle, barBorderWidth, barColor, barColorOpacity, barRadius } = style

    const lineDash = barBorderStyle === 'dashed' ? [5, 2] : barBorderStyle === 'dotted' ? [2, 5] : [0, 0]
    return {
      ...result,
      [`custom${index + 1}`]: {
        // 优先级: 后者覆盖前者
        level: index + 1,
        filter: (datum: Datum) => {
          if (selector(datum, style.selector)) {
            return true
          }
          return false
        },
        style: {
          fill: barColor,
          fillOpacity: barColorOpacity,
          stroke: barBorderColor,
          lineWidth: barBorderWidth,
          lineDash: lineDash,
          cornerRadius: barRadius,
        },
      },
    }
  }, {})

  return {
    ...result,
    bar: {
      state: {
        ...customMap,
      },
    },
  }
}
