import type { IBoxPlotChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { BoxPlotStyle, Datum, VChartSpecPipe } from 'src/types'
import { isEmpty, isNullish } from 'remeda'

export const boxPlotStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { markStyle, config } = advancedVSeed
  const { boxPlotStyle } = markStyle
  const theme = config?.[vseed.chartType as 'boxPlot']?.boxPlotStyle

  const result = {
    ...spec,
    boxPlot: {
      style: {
        shaftShape: 'filled-line',
        visible: true,
        shaftWidth: '50%',
        stroke: theme?.whiskerBorderColor,
        boxStroke: theme?.boxBorderColor,
        boxCornerRadius: theme?.boxCornerRadius,
        medianStroke: theme?.medianBorderColor ?? theme?.boxBorderColor,
      },
    },
  } as IBoxPlotChartSpec

  if (isNullish(boxPlotStyle) || isEmpty(boxPlotStyle)) {
    return result
  }

  const boxPlotStyles = (Array.isArray(boxPlotStyle) ? boxPlotStyle : [boxPlotStyle]) as BoxPlotStyle[]

  const customMap = boxPlotStyles.reduce<object>((result, style, index) => {
    const {
      boxColor,
      boxColorOpacity,
      boxBorderColor,
      boxBorderWidth = 1,
      boxVisible = true,
      boxBorderOpacity,
      medianBorderColor,
      whiskerBorderColor,
    } = style

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
          visible: boxVisible,
          fill: boxColor,
          fillOpacity: boxColorOpacity,
          lineWidth: boxBorderWidth,
          stroke: whiskerBorderColor,
          boxStroke: boxBorderColor,
          strokeOpacity: boxBorderOpacity,
          medianStroke: medianBorderColor ?? boxBorderColor,
        },
      },
    }
  }, {})

  result.boxPlot!.state = {
    ...result.boxPlot!.state,
    ...customMap,
  }

  return result
}
