import type { IAreaChartSpec } from '@visactor/vchart'
import { selector } from '../../../../dataSelector'
import type { Datum, PointStyle, SpecPipe } from 'src/types'

export const pointStyle: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { markStyle } = advancedVSeed
  const { pointStyle } = markStyle
  const result = {
    ...spec,
    point: {
      state: {
        dimension_hover: {
          scaleX: 1.4,
          scaleY: 1.4,
        },
      },
    },
  } as IAreaChartSpec

  if (!pointStyle) {
    return result
  }

  const pointStyles = (Array.isArray(pointStyle) ? pointStyle : [pointStyle]) as PointStyle[]

  const customMap = pointStyles.reduce<object>((result, style, index) => {
    const { pointBorderColor, pointBorderStyle, pointBorderWidth, pointColor, pointColorOpacity, pointSize } = style

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
          size: pointSize,
          fill: pointColor,
          fillOpacity: pointColorOpacity,
          stroke: pointBorderColor,
          lineWidth: pointBorderWidth,
          lineDash: lineDash,
        },
      },
    }
  }, {})

  return {
    ...result,
    point: {
      state: {
        ...customMap,
      },
    },
  }
}
