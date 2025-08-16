import type { IAreaChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { AreaStyle, Datum, SpecPipe } from 'src/types'
import { groupBy } from 'remeda'

export const areaStyle: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { markStyle, encoding, dataset } = advancedVSeed
  const { areaStyle } = markStyle
  if (!areaStyle) {
    return spec
  }
  const result = { ...spec } as IAreaChartSpec

  const areaStyles = (Array.isArray(areaStyle) ? areaStyle : [areaStyle]) as AreaStyle[]

  const group = encoding[0]?.group?.[0]
  const lineGroups = groupBy(dataset, (d) => d[group ?? ''] as string)

  const customMap = areaStyles.reduce<object>((result, style, index) => {
    const { areaColor, areaColorOpacity } = style

    return {
      ...result,
      [`custom${index + 1}`]: {
        // 优先级: 后者覆盖前者
        level: index + 1,
        filter: (datum: Datum) => {
          const lineData = lineGroups[datum[group ?? ''] as string]
          for (const d of lineData) {
            if (selector(d, style.selector)) {
              return true
            }
          }
          return false
        },
        style: {
          fill: areaColor,
          fillOpacity: areaColorOpacity,
        },
      },
    }
  }, {})

  return {
    ...result,
    area: {
      state: {
        ...customMap,
      },
    },
  }
}
