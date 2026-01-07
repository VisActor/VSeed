import type { IAreaChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { AreaStyle, Datum, LineStyle, VChartSpecPipe } from 'src/types'
import { groupBy, isEmpty, isNullish } from 'remeda'
import { getCurveTension, getCurveType } from './curve'
import { isPivotChart } from 'src/pipeline/utils'
import type { BrushConfig } from 'src/types/properties/brush/zBrush'

export const areaStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { markStyle, datasetReshapeInfo, dataset } = advancedVSeed
  const { areaStyle, lineStyle } = markStyle
  const { unfoldInfo } = datasetReshapeInfo[0]
  const { chartType } = vseed

  const isPivot = isPivotChart(vseed)
  const brushConfig = isPivot ? ((advancedVSeed.config as any)?.[chartType]?.brush ?? ({} as BrushConfig)) : null

  const result = {
    ...spec,
    area: {
      visible: true,
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

  if (isNullish(areaStyle) || isEmpty(areaStyle)) {
    return result
  }

  const areaStyles = (Array.isArray(areaStyle) ? areaStyle : [areaStyle]) as AreaStyle[]
  const lineStyles = (Array.isArray(lineStyle) ? lineStyle : [lineStyle]) as LineStyle[]

  const group = unfoldInfo.encodingColorId

  const areaGroups = groupBy(dataset, (d) => d[group ?? ''] as string)

  const customMap = areaStyles.reduce<object>((result, style, index) => {
    const { areaColor, areaColorOpacity, areaVisible = true } = style

    const curveType = getCurveType(context.vseed, lineStyles[index]?.lineSmooth)
    const curveTension = getCurveTension(context.vseed, lineStyles[index]?.lineSmooth)

    return {
      ...result,
      [`custom${index + 1}`]: {
        // 优先级: 后者覆盖前者
        level: index + 1,
        filter: (datum: Datum) => {
          const lineData = areaGroups[datum[group ?? ''] as string]
          for (const d of lineData) {
            if (selector(d, style.selector)) {
              return true
            }
          }
          return false
        },
        style: {
          curveType,
          curveTension,
          visible: areaVisible,
          fill: areaColor,
          fillOpacity: areaColorOpacity,
        },
      },
    }
  }, {})

  return {
    ...result,
    area: {
      ...result.area,
      visible: true,
      state: {
        ...customMap,
      },
    },
  }
}
