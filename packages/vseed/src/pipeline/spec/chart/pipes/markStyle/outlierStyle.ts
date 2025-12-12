import type { IBoxPlotChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { Datum, OutlierStyle, VChartSpecPipe } from 'src/types'
import { isEmpty, isNullish } from 'remeda'

export const outlierStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { markStyle, config } = advancedVSeed
  const { outlierStyle } = markStyle
  const theme = config?.[vseed.chartType as 'boxPlot']?.outlierStyle
  const result = {
    ...spec,
    outlier: {
      style: {
        // stroke: theme?.pointColor,
        fill: theme?.pointColor,
        lineWidth: theme?.pointBorderWidth,
        stroke: theme?.pointBorderColor,
      },
    },
  } as IBoxPlotChartSpec

  if (isNullish(outlierStyle) || isEmpty(outlierStyle)) {
    return result
  }

  const outlierStyles = (Array.isArray(outlierStyle) ? outlierStyle : [outlierStyle]) as OutlierStyle[]

  const customMap = outlierStyles.reduce<object>((result, style, index) => {
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
          stroke: pointBorderColor,
          lineWidth: pointBorderWidth,
          lineDash: lineDash,
        },
      },
    }
  }, {})

  return {
    ...result,
    outlier: {
      ...result.outlier,
      state: {
        ...customMap,
      },
    },
  }
}
