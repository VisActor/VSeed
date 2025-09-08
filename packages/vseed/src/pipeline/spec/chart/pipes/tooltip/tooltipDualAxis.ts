import { isEmpty, isNullish } from 'remeda'
import { autoFormatter, createFormatter, findMeasureById } from '../../../../utils'
import type { Datum, FoldInfo, SpecPipe, Tooltip, UnfoldInfo } from 'src/types'

export const tooltipPrimary: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { measures, datasetReshapeInfo, chartType, locale, dimensions } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { tooltip: Tooltip }
  const { tooltip = { enable: true } } = baseConfig
  const { enable } = tooltip

  const foldInfoList = datasetReshapeInfo[0].foldInfoList as FoldInfo[]
  const unfoldInfo = datasetReshapeInfo[0].unfoldInfo

  const { measureId, measureValue, measureName } = foldInfoList[0]
  const { encodingColor: colorName } = unfoldInfo

  result.tooltip = {
    visible: enable,

    mark: {
      title: {
        visible: true,
      },
      content: [
        ...dimensions.map((item) => ({
          visible: true,
          hasShape: true,
          shapeType: 'rectRound',
          key: (datum: unknown) => {
            if (item.alias || item.id) {
              return item.alias || item.id
            }
            return (datum as Datum) && ((datum as Datum)[item.id] as string)
          },
          value: (datum: unknown) => {
            return (datum as Datum) && ((datum as Datum)[item.id] as string)
          },
        })),
        {
          visible: true,
          hasShape: true,
          key: (datum) => (datum && (datum[measureName || colorName] as string)) || '',
          value: (datum) => {
            if (!datum) {
              return ''
            }
            const value = datum[measureValue] as string | number
            const id = datum[measureId] as string
            const measure = findMeasureById(measures, id)
            if (!measure) {
              return String(value)
            }

            const { format = {}, autoFormat = true } = measure

            if (!isEmpty(format)) {
              const formatter = createFormatter(format)
              return formatter(value)
            }
            if (autoFormat) {
              return autoFormatter(value, locale)
            }
            return String(value)
          },
        },
      ],
    },
    dimension: {
      content: [
        {
          visible: true,
          key: (datum) => (datum && (datum[colorName] as string)) || '',
          value: (datum) => {
            if (!datum) {
              return ''
            }
            const value = datum[measureValue] as string | number
            const id = datum[measureId] as string
            const measure = findMeasureById(measures, id)
            if (!measure) {
              return String(value)
            }

            const { format = {}, autoFormat = true } = measure

            if (!isEmpty(format)) {
              const formatter = createFormatter(format)
              return formatter(value)
            }
            if (autoFormat) {
              return autoFormatter(value, locale)
            }
            return String(value)
          },
          shapeType: 'rectRound',
        },
      ],
    },
  }
  return result
}

export const tooltipSecondary: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { measures, datasetReshapeInfo, chartType, locale, dimensions } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { tooltip: Tooltip }
  const { tooltip = { enable: true } } = baseConfig
  const { enable } = tooltip

  if (isNullish(datasetReshapeInfo[0].foldInfoList?.[1])) {
    return result
  }

  const foldInfoList = datasetReshapeInfo[0].foldInfoList as FoldInfo[]
  const unfoldInfo = datasetReshapeInfo[0].unfoldInfo as UnfoldInfo
  const { measureId, measureValue, measureName } = foldInfoList[1]
  const { encodingColorId } = unfoldInfo

  result.tooltip = {
    visible: enable,

    mark: {
      title: {
        visible: true,
      },
      content: [
        ...dimensions.map((item) => ({
          visible: true,
          hasShape: true,
          shapeType: 'rectRound',
          key: (datum: unknown) => {
            if (item.alias || item.id) {
              return item.alias || item.id
            }
            return (datum as Datum) && ((datum as Datum)[item.id] as string)
          },
          value: (datum: unknown) => {
            return (datum as Datum) && ((datum as Datum)[item.id] as string)
          },
        })),
        {
          visible: true,
          hasShape: true,
          key: (datum) => (datum && (datum[measureName || encodingColorId] as string)) || '',
          value: (datum) => {
            if (!datum) {
              return ''
            }
            const value = datum[measureValue] as string | number
            const id = datum[measureId] as string
            const measure = findMeasureById(measures, id)
            if (!measure) {
              return String(value)
            }

            const { format = {}, autoFormat = true } = measure

            if (!isEmpty(format)) {
              const formatter = createFormatter(format)
              return formatter(value)
            }
            if (autoFormat) {
              return autoFormatter(value, locale)
            }
            return String(value)
          },
        },
      ],
    },
    dimension: {
      content: [
        {
          visible: true,
          key: (datum) => (datum && (datum[encodingColorId] as string)) || '',
          value: (datum) => {
            if (!datum) {
              return ''
            }
            const value = datum[measureValue] as string | number
            const id = datum[measureId] as string
            const measure = findMeasureById(measures, id)
            if (!measure) {
              return String(value)
            }

            const { format = {}, autoFormat = true } = measure

            if (!isEmpty(format)) {
              const formatter = createFormatter(format)
              return formatter(value)
            }
            if (autoFormat) {
              return autoFormatter(value, locale)
            }
            return String(value)
          },
          shapeType: 'rectRound',
        },
      ],
    },
  }
  return result
}
