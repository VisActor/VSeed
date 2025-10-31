import { pipe, uniqueBy, isNullish } from 'remeda'
import type { Dimension, Dimensions, Encoding, Spec, SpecPipe, Tooltip } from 'src/types'
import type { Datum, ISpec, ITooltipLinePattern } from '@visactor/vchart'
import { BinEndMeasureId, BinStartMeasureId, ColorEncoding, FoldMeasureValue, XEncoding } from 'src/dataReshape'

const VCHART_OUTLIER_KEY = '__VCHART_BOX_PLOT_OUTLIER_VALUE'

export const tooltipHistogram: SpecPipe = (spec, context): Partial<Spec> => {
  const result = { ...spec }
  const { advancedVSeed } = context
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
      content: createMarkContent(encoding.tooltip || [], dimensions, encoding as Encoding),
    },
    dimension: {
      title: {
        visible: false,
      },
      content: createMarkContent(encoding.tooltip || [], dimensions, encoding as Encoding),
    },
  }
  return result as unknown as ISpec
}

const createMarkContent = (tooltip: string[], dimensions: Dimensions, encoding: Encoding) => {
  const dims = pipe(
    dimensions.filter((item) => tooltip.includes(item.id)),
    uniqueBy((item: Dimension) => item.id),
    uniqueBy((item: Dimension) => item.alias),
  )

  const dimContent = dims.map((item: Dimension) => ({
    visible: true,
    hasShape: true,
    shapeType: 'rectRound',
    key: item.alias ?? item.id,
    value: (datum: Datum | undefined) => {
      if (!isNullish(datum?.[VCHART_OUTLIER_KEY])) {
        if (encoding.color?.includes(item.id)) {
          return datum?.[ColorEncoding] as string
        }
        if (encoding.x?.includes(item.id)) {
          return datum?.[XEncoding] as string
        }
      }

      return datum?.[item.id] as string
    },
  }))

  const defaultContent = [
    {
      visible: true,
      hasShape: true,
      shapeType: 'rectRound',
      key: (datum: Datum | undefined) => {
        if (!datum) {
          return ''
        }
        return `${datum[BinStartMeasureId]} ~ ${datum[BinEndMeasureId]}`
      },
      value: (datum: Datum | undefined) => {
        if (!datum) {
          return ''
        }
        return datum[FoldMeasureValue] as string | number
      },
    },
  ]

  return [...dimContent, defaultContent] as ITooltipLinePattern[]
}
