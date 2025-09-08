import type { IAreaChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { AreaStyle, Datum, SpecPipe } from 'src/types'
import { groupBy } from 'remeda'

export const areaStyle: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { markStyle, datasetReshapeInfo, dataset } = advancedVSeed
  const { areaStyle } = markStyle
  const { unfoldInfo } = datasetReshapeInfo[0]

  if (!areaStyle) {
    return {
      ...spec,
      area: {
        visible: true,
      },
    }
  }
  const result = { ...spec } as IAreaChartSpec

  const areaStyles = (Array.isArray(areaStyle) ? areaStyle : [areaStyle]) as AreaStyle[]

  const group = unfoldInfo.encodingColorId

  const areaGroups = groupBy(dataset, (d) => d[group ?? ''] as string)

  const customMap = areaStyles.reduce<object>((result, style, index) => {
    const { areaColor, areaColorOpacity, areaVisible = true } = style

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
      visible: true,
      state: {
        ...customMap,
      },
    },
  }
}
