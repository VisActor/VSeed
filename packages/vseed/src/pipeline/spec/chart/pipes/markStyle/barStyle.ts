import type { IBarChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { BarStyle, Datum, VChartSpecPipe } from 'src/types'
import { isEmpty, isNullish } from 'remeda'
import { isPivotChart } from 'src/pipeline/utils'
import type { BrushConfig } from 'src/types/properties/brush/zBrush'

export const barStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { markStyle, dataset = [] } = advancedVSeed
  const { barStyle } = markStyle
  const { chartType } = vseed

  const showStroke = dataset.length <= 100
  const isPivot = isPivotChart(vseed)

  // 在pivot场景下读取brush配置
  const brushConfig = isPivot ? ((advancedVSeed.config as any)?.[chartType]?.brush ?? ({} as BrushConfig)) : null

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
        selected: {
          opacity: brushConfig?.inBrushStyle?.opacity ?? 1,
          ...(brushConfig?.inBrushStyle?.stroke && { stroke: brushConfig.inBrushStyle.stroke }),
          ...(brushConfig?.inBrushStyle?.lineWidth && { lineWidth: brushConfig.inBrushStyle.lineWidth }),
        },
        selected_reverse: {
          // fill: '#ddd'
          opacity: brushConfig?.outOfBrushStyle?.opacity ?? 0.2,
          ...(brushConfig?.outOfBrushStyle?.stroke && { stroke: brushConfig.outOfBrushStyle.stroke }),
          ...(brushConfig?.outOfBrushStyle?.lineWidth && { lineWidth: brushConfig.outOfBrushStyle.lineWidth }),
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
