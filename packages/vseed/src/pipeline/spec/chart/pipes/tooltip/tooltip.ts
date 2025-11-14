import { pipe, uniqueBy } from 'remeda'
import { createFormatterByMeasure, findAllMeasures, findMeasureById } from '../../../../utils'
import type { Datum, Dimensions, FoldInfo, Measures, VChartSpecPipe, TooltipConfig, UnfoldInfo } from 'src/types'
import { ORIGINAL_DATA } from 'src/dataReshape'
import { getTooltipStyle } from './tooltipStyle'

export const tooltip: VChartSpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed, vseed } = context
  const { measures, datasetReshapeInfo, chartType, dimensions, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { tooltip: TooltipConfig }
  const { tooltip = { enable: true } } = baseConfig
  const { enable = true } = tooltip
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0] as unknown as {
    foldInfo: FoldInfo
    unfoldInfo: UnfoldInfo
  }

  result.tooltip = {
    style: getTooltipStyle(tooltip),
    visible: !!enable,
    mark: {
      title: {
        visible: false,
      },
      content: createMarkContent(
        encoding.tooltip || [],
        dimensions,
        findAllMeasures(vseed.measures),
        foldInfo,
        unfoldInfo,
      ),
    },
    dimension: {
      title: {
        visible: true,
      },
      content: createDimensionContent(dimensions, measures, foldInfo, unfoldInfo),
    },
  }
  return result
}

export const createDimensionContent = (
  dimensions: Dimensions,
  measures: Measures,
  foldInfo: FoldInfo,
  unfoldInfo: UnfoldInfo,
) => {
  const { measureId, measureValue, foldMap } = foldInfo
  const { encodingColor } = unfoldInfo

  return [
    {
      visible: true,
      shapeType: 'rectRound',
      hasShape: true,
      key: dimensions.some((d) => d.encoding === 'color')
        ? (v: unknown) => {
            const datum = v as Datum
            const key = (datum && (datum[encodingColor] as string)) || ''
            return unfoldInfo.colorIdMap[key].alias ?? key
          }
        : (v: unknown) => {
            const datum = v as Datum
            const key = (datum && (datum[measureId] as string)) || ''
            return foldMap[key] ?? key
          },
      value: (v: unknown) => {
        const datum = v as Datum
        if (!datum) {
          return ''
        }
        const value = datum[measureValue] as string | number
        const id = datum[measureId] as string
        const measure = findMeasureById(measures, id)
        const formatter = createFormatterByMeasure(measure)
        return formatter(value)
      },
    },
  ]
}

export const createMarkContent = (
  tooltip: string[],
  dimensions: Dimensions,
  measures: Measures,
  foldInfo: FoldInfo,
  unfoldInfo: UnfoldInfo,
) => {
  const dims = pipe(
    dimensions.filter((item) => tooltip.includes(item.id)),
    uniqueBy((item) => item.id),
    uniqueBy((item) => item.alias),
  )
  const meas = pipe(
    measures.filter((item) => tooltip.includes(item.id)),
    uniqueBy((item) => item.id),
    uniqueBy((item) => item.alias),
  )

  const dimContent = dims.map((item) => ({
    visible: true,
    hasShape: true,
    shapeType: 'rectRound',
    key: (v: unknown) => {
      const datum = v as Datum
      if (item.alias || item.id) {
        return item.alias || item.id
      }
      return datum && (datum[item.id] as string)
    },
    value: (v: unknown) => {
      const datum = v as Datum
      return datum && (datum[item.id] as string)
    },
  }))

  const meaContent = meas.map((item) => ({
    visible: true,
    hasShape: true,
    shapeType: 'rectRound',
    key: item.alias || item.id,
    value: (v: unknown) => {
      const datum = v as Datum
      if (!datum) {
        return ''
      }
      const id = item.id
      if (!datum || !datum[ORIGINAL_DATA] || !datum[ORIGINAL_DATA]) {
        return ''
      }
      const originalData = datum[ORIGINAL_DATA] as Datum
      const value = originalData[id] as string | number
      const measure = findMeasureById(measures, id)
      const formatter = createFormatterByMeasure(measure)
      return formatter(value)
    },
  }))

  const defaultContent = {
    visible: true,
    hasShape: true,
    shapeType: 'rectRound',
    key: (v: unknown) => {
      const { measureName } = foldInfo
      const { encodingColor: colorName } = unfoldInfo

      const datum = v as Datum
      return (datum && (datum[measureName || colorName] as string)) || ''
    },
    value: (v: unknown) => {
      const { measureId, measureValue } = foldInfo

      const datum = v as Datum
      if (!datum) {
        return ''
      }
      const value = datum[measureValue] as string | number
      const id = datum[measureId] as string
      const measure = findMeasureById(measures, id)
      if (!measure) {
        return String(value)
      }

      const formatter = createFormatterByMeasure(measure)
      return formatter(value)
    },
  }

  return [...dimContent, defaultContent, ...meaContent]
}
