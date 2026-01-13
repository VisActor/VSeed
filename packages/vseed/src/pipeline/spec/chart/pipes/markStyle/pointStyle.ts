import type { IAreaChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { Datum, PointStyle, VChartSpecPipe } from 'src/types'
import { isEmpty, isNullish } from 'remeda'

export const pointStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { markStyle } = advancedVSeed
  const { pointStyle } = markStyle
  const result = {
    ...spec,
    point: {
      style: {},
    },
  } as IAreaChartSpec

  if (isNullish(pointStyle) || isEmpty(pointStyle)) {
    return result
  }

  const pointStyles = (Array.isArray(pointStyle) ? pointStyle : [pointStyle]) as PointStyle[]

  const customMap = pointStyles.reduce<object>((result, style, index) => {
    const {
      pointBorderColor,
      pointBorderStyle,
      pointBorderWidth = 1,
      pointColor,
      pointColorOpacity,
      pointSize,
      pointVisible = true,
    } = style

    const lineDash = pointBorderStyle === 'dashed' ? [5, 2] : pointBorderStyle === 'dotted' ? [2, 5] : [0, 0]
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
          visible: pointVisible,
          size: pointSize,
          fill: pointColor,
          fillOpacity: pointColorOpacity,
          innerBorder: {
            stroke: pointBorderColor,
            lineWidth: pointBorderWidth,
            distance: (pointBorderWidth || 0) / 2,
            lineDash: lineDash,
          },
        },
      },
    }
  }, {})

  return {
    ...result,
    point: {
      ...result.point,
      state: {
        ...customMap,
      },
    },
  }
}
