import { isEmpty } from 'remeda'
import { autoFormatter, createFormatter, findMeasureById } from '../../../../utils'
import type { SpecPipe, Tooltip } from 'src/types'

export const tooltip: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { measures, datasetReshapeInfo, chartType, locale, dimensions } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { tooltip: Tooltip }
  const { tooltip = { enable: true } } = baseConfig
  const { enable } = tooltip

  const { measureId, measureValue, measureName } = datasetReshapeInfo[0].foldInfo
  const { groupName } = datasetReshapeInfo[0].unfoldInfo

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
          key: (datum) => (datum && item.alias) || datum[item.id] || '',
          value: (datum) => (datum && (datum[item.id] as string)) || '',
        })),
        {
          visible: true,
          hasShape: true,
          key: (datum) => (datum && (datum[measureName || groupName] as string)) || '',
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
          key: (datum) => (datum && (datum[groupName] as string)) || '',
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
