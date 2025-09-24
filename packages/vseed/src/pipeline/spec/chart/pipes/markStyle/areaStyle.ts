import type { IAreaChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { AreaStyle, Datum, LineStyle, SpecPipe } from 'src/types'
import { groupBy, isEmpty, isNullish } from 'remeda'
import { getCurveTension, getCurveType } from './curve'

export const areaStyle: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { markStyle, datasetReshapeInfo, dataset } = advancedVSeed
  const { areaStyle, lineStyle } = markStyle
  const { unfoldInfo } = datasetReshapeInfo[0]
  const result = {
    ...spec,
    area: {
      visible: true,
      style: {},
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
