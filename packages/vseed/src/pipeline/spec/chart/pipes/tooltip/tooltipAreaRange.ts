import { isEmpty } from 'remeda'
import { autoFormatter, createFormatter, findMeasureById } from '../../../../utils'
import type { Datum, SpecPipe, Tooltip } from 'src/types'

export const tooltipAreaRange: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { measures, datasetReshapeInfo, chartType, locale, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { tooltip: Tooltip }
  const { tooltip = { enable: true } } = baseConfig
  const { enable } = tooltip

  const { groupName } = datasetReshapeInfo[0].unfoldInfo

  const y = encoding[0]?.y || []

  result.tooltip = {
    visible: enable,

    dimension: {
      content: [
        {
          visible: true,
          key: (datum) => (datum && (datum[groupName] as string)) || '',
          value: (datum) => {
            if (!datum) {
              return ''
            }
            const text = y.map((id) => {
              const value = datum[id] as string | number
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
            })
            return text.join(' ~ ')
          },
          shapeType: 'rectRound',
        },
        ...y.map((id: string) => {
          const measure = findMeasureById(measures, id)
          return {
            visible: true,
            key: measure?.alias || id,
            value: (datum: unknown) => {
              if (!datum) {
                return ''
              }
              const value = (datum as unknown as Datum)[id] as string | number
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
          }
        }),
      ],
    },
  }
  return result
}
