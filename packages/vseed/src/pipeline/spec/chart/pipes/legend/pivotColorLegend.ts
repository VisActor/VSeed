import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { IColorTableLegendOption } from '@visactor/vtable/es/ts-types/component/legend'
import type { Color, Legend, SpecPipe } from 'src/types'

export const pivotColorLegend: SpecPipe = (spec, context) => {
  const result = { ...spec } as PivotChartConstructorOptions
  const { advancedVSeed } = context
  const { chartType } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { legend: Legend; color: Color }

  if (!baseConfig || !baseConfig.legend) {
    return result
  }

  const { datasetReshapeInfo } = advancedVSeed
  const max = Math.max(...datasetReshapeInfo.map((d) => d.foldInfo.statistics.colorMin))
  const min = Math.min(...datasetReshapeInfo.map((d) => d.foldInfo.statistics.colorMax))
  const { legend, color } = baseConfig
  const { colorScheme, linearColorScheme } = color

  const {
    enable,
    position = 'bottom',
    labelFontColor,
    labelColor,
    labelFontSize = 12,
    labelFontWeight = 400,
  } = legend || {}

  const orient = ['bottom', 'bottomLeft', 'bottomRight', 'bl', 'br'].includes(position)
    ? 'bottom'
    : ['top', 'topLeft', 'topRight', 'tl', 'tr'].includes(position)
      ? 'top'
      : ['left', 'leftTop', 'leftBottom', 'lt', 'lb'].includes(position)
        ? 'left'
        : 'right'

  const legendPosition = ['topLeft', 'bottomLeft', 'leftTop', 'rightTop', 'lt', 'rt', 'tl', 'bl'].includes(position)
    ? 'start'
    : ['topRight', 'bottomRight', 'leftBottom', 'rightBottom', 'lb', 'rb', 'rt', 'br'].includes(position)
      ? 'end'
      : 'middle'

  const legends: IColorTableLegendOption = {
    visible: enable,
    type: 'color',
    orient,
    position: legendPosition,

    colors: linearColorScheme || colorScheme || [],
    value: [min, max],
    min: min,
    max: max,

    maxWidth: '30%',
    startText: {
      visible: true,
      style: {
        fill: labelColor || labelFontColor,
        fontSize: labelFontSize,
        fontWeight: labelFontWeight,
      },
    },
    endText: {
      visible: true,
      style: {
        fill: labelColor || labelFontColor,
        fontSize: labelFontSize,
        fontWeight: labelFontWeight,
      },
    },
  }
  return { ...result, legends }
}
