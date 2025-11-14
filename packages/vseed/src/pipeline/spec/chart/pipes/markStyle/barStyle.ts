import type { IBarChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { BarStyle, Datum, SpecPipe, Spec } from 'src/types'
import { isEmpty, isNullish } from 'remeda'

export const barStyle: SpecPipe<Spec> = (spec, context) => {
  const { advancedVSeed } = context
  const { markStyle, dataset = [] } = advancedVSeed
  const { barStyle } = markStyle

  const showStroke = dataset.length <= 100

  const result = {
    ...spec,
    bar: {
      style: {
        visible: true,
        fillOpacity: 1,
        lineWidth: showStroke ? 1 : 0,
      },
      state: {
        hover: {
          fillOpacity: 0.6,
        },
      },
    },
  } as IBarChartSpec

  if (isNullish(barStyle) || isEmpty(barStyle)) {
    return result
  }

  const barStyles = (Array.isArray(barStyle) ? barStyle : [barStyle]) as BarStyle[]

  const customMap = barStyles.reduce<object>((result, style, index) => {
    const {
      barBorderColor,
      barBorderStyle,
      barBorderWidth = 1,
      barColor,
      barColorOpacity,
      barBorderOpacity,
      barRadius,
      barVisible = true,
    } = style

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
          visible: barVisible,
          fill: barColor,
          fillOpacity: barColorOpacity,
          cornerRadius: barRadius,
          lineWidth: barBorderWidth,
          stroke: barBorderColor,
          strokeOpacity: barBorderOpacity,
          lineDash: lineDash,
        },
      },
    }
  }, {})

  result.bar!.state = {
    ...result.bar!.state,
    ...customMap,
  }

  return result
}
