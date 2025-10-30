import { pipe, uniqueBy, isNullish } from 'remeda'
import { createFormatterByMeasure, findAllMeasures } from '../../../../utils'
import type { Dimension, Dimensions, Measures, SpecPipe, Tooltip } from 'src/types'
import type { Datum, ISpec, ITooltipLinePattern } from '@visactor/vchart'

export const tooltipBoxplot: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed, vseed } = context
  const { chartType, dimensions, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { tooltip: Tooltip }
  const { tooltip = { enable: true } } = baseConfig
  const { enable } = tooltip

  result.tooltip = {
    visible: enable,
    mark: {
      title: {
        visible: false,
      },
      content: createMarkContent(encoding.tooltip || [], dimensions, findAllMeasures(vseed.measures)),
    },
    dimension: {
      visible: false,
    },
  }
  return result as unknown as ISpec
}

const createMarkContent = (tooltip: string[], dimensions: Dimensions, measures: Measures) => {
  const dims = pipe(
    dimensions.filter((item) => tooltip.includes(item.id)),
    uniqueBy((item: Dimension) => item.id),
    uniqueBy((item: Dimension) => item.alias),
  )
  const valueMeasure = measures.find((item) => item.encoding === 'value' || isNullish(item.encoding))
  const formatter = valueMeasure ? createFormatterByMeasure(valueMeasure) : (v: unknown) => v

  const dimContent = dims.map((item: Dimension) => ({
    visible: true,
    hasShape: true,
    shapeType: 'rectRound',
    key: (datum: Datum | undefined) => {
      if (item.alias || item.id) {
        return item.alias || item.id
      }
      return datum && (datum[item.id] as string)
    },
    value: (datum: Datum | undefined) => {
      return datum && (datum[item.id] as string)
    },
  }))

  const defaultContent = ['max', 'upperWhisker', 'q3', 'median', 'mean', 'q1', 'lowerWhisker', 'min', 'iqr'].map(
    (key: string) => {
      return {
        visible: true,
        hasShape: true,
        shapeType: 'rectRound',
        key,
        value: (datum: Datum | undefined) => {
          if (!datum) {
            return ''
          }
          const value = datum[key] as string | number

          return formatter(value)
        },
      }
    },
  )

  return [...dimContent, defaultContent] as ITooltipLinePattern[]
}
