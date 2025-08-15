import { isEmpty } from 'remeda'
import { autoFormatter, createFormatter, findMeasureById } from '../../../../utils'
import type { SpecPipe, Tooltip } from 'src/types'

const defaultTooltip: Tooltip = {
  enable: true,
}

export const tooltip: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { measures, datasetReshapeInfo } = advancedVSeed
  const baseConfig = advancedVSeed.baseConfig.vchart as { tooltip: Tooltip }
  const { tooltip = defaultTooltip } = baseConfig
  const { enable } = tooltip

  const { measureId, measureValue } = datasetReshapeInfo[0].foldInfo
  const { groupName } = datasetReshapeInfo[0].unfoldInfo

  result.tooltip = {
    visible: enable,

    mark: {
      title: {
        value: (datum) => (datum && (datum[groupName] as string)) || '',
      },
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
              return autoFormatter(value)
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
              return autoFormatter(value)
            }
            return String(value)
          },
        },
      ],
    },
  }
  return result
}
