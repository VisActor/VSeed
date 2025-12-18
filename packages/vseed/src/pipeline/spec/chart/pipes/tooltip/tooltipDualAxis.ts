import { createDimensionContent, createMarkContent } from './tooltip'
import type { VChartSpecPipe, Tooltip, Measures, DualAxisOptions } from 'src/types'
import { getTooltipStyle } from './tooltipStyle'
import { updateTooltipElement } from './tooltipElement'

export const tooltipOfDualAxisSeries = (options: DualAxisOptions): VChartSpecPipe => {
  return (spec, context) => {
    const result = { ...spec }
    const { advancedVSeed, vseed } = context
    const { measures = [], datasetReshapeInfo, chartType, dimensions = [], encoding } = advancedVSeed
    const baseConfig = advancedVSeed.config[chartType] as { tooltip: Tooltip }
    const { tooltip = { enable: true } } = baseConfig
    const { enable } = tooltip

    const unfoldInfo = datasetReshapeInfo[0].unfoldInfo

    result.tooltip = {
      visible: enable,
      mark: {
        title: {
          visible: false,
        },
        content: createMarkContent(
          encoding.tooltip || [],
          dimensions,
          vseed.measures as Measures,
          options.foldInfo,
          unfoldInfo,
        ),
      },
      dimension: {
        title: {
          visible: true,
        },
        content: createDimensionContent(dimensions, measures, options.foldInfo, unfoldInfo),
      },
    }
    return result
  }
}

export const tooltipDualAxis: VChartSpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { chartType } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { tooltip: Tooltip }
  const { tooltip = { enable: true } } = baseConfig

  result.tooltip = {
    style: getTooltipStyle(tooltip),
    updateElement: updateTooltipElement,
  }
  return result
}
