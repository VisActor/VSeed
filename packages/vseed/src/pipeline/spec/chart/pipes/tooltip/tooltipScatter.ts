import { uniqueBy } from 'remeda'
import { createFormatterByMeasure, findAllMeasures, findMeasureById } from '../../../../utils'
import type { Datum, Dimensions, FoldInfo, Locale, Measures, SpecPipe, Tooltip, UnfoldInfo } from 'src/types'
import { ORIGINAL_DATA } from 'src/dataReshape'

export const tooltipScatter: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo, chartType, locale, dimensions, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { tooltip: Tooltip }
  const { tooltip = { enable: true } } = baseConfig
  const { enable } = tooltip
  const { foldInfoList } = datasetReshapeInfo[0] as unknown as {
    foldInfoList: FoldInfo[]
    unfoldInfo: UnfoldInfo
  }

  result.tooltip = {
    visible: enable,

    mark: {
      title: {
        visible: false,
      },
      content: createMarkContent(
        encoding.tooltip || [],
        dimensions,
        findAllMeasures(vseed.measures),
        locale,
        foldInfoList,
      ),
    },
    dimension: {
      visible: false,
    },
  }
  return result
}

export const createMarkContent = (
  tooltip: string[],
  dimensions: Dimensions,
  measures: Measures,
  locale: Locale,
  foldInfoList: FoldInfo[],
) => {
  const dims = uniqueBy(
    dimensions.filter((item) => tooltip.includes(item.id)),
    (item) => item.id,
  )
  const meas = uniqueBy(
    measures.filter((item) => tooltip.includes(item.id)),
    (item) => item.id,
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

  const foldMeaContent = foldInfoList.map((foldInfo) => {
    return {
      visible: true,
      hasShape: true,
      shapeType: 'rectRound',
      key: (v: unknown) => {
        const { measureId, foldMap } = foldInfo
        const datum = v as Datum
        const id = datum[measureId] as string
        return foldMap[id] || id
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
        const formatter = createFormatterByMeasure(measure)
        return formatter(value)
      },
    }
  })
  return [...dimContent, ...foldMeaContent, ...meaContent]
}
