import { createFormatter, findMeasureById } from '../../../utils'
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

  const { measureId, measureName, measureValue } = datasetReshapeInfo[0].foldInfo
  result.tooltip = {
    visible: enable,
    mark: {
      content: [
        {
          visible: true,
          key: (datum) => (datum && (datum[measureName] as string)) || '',
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

            if (format || autoFormat) {
              const formatter = createFormatter(format)
              return formatter(value)
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
          key: (datum) => (datum && (datum[measureName] as string)) || '',
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

            if (format || autoFormat) {
              const formatter = createFormatter(format)
              return formatter(value)
            }
            return String(value)
          },
        },
      ],
    },
  }
  return result
}
