import { createFormatterByMeasure, findTreeNodesBy } from 'src/pipeline/utils'
import type { Legend, Measure, VChartSpecPipe } from 'src/types'

export const colorLegend: VChartSpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { datasetReshapeInfo, chartType, measures = [] } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]
  const baseConfig = advancedVSeed.config[chartType] as { legend: Legend }
  if (!baseConfig || !baseConfig.legend) {
    return result
  }

  const { legend } = baseConfig
  const { enable, position = 'bottom', labelFontColor, labelColor, labelFontSize = 12, labelFontWeight } = legend || {}

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

  result.legends = {
    type: 'color',
    visible: enable,
    orient,
    position: legendPosition,
    padding: 0,
    field: unfoldInfo.encodingColor,
    maxWidth: '30%',
    handlerText: {
      visible: true,
      style: {
        fill: labelColor || labelFontColor,
        fontSize: labelFontSize,
        fontWeight: labelFontWeight,
      },
    },
  }
  const colorMeasure = findTreeNodesBy<Measure>(measures, (m) => m.encoding === 'color')?.[0]
  if (colorMeasure) {
    const formatter = createFormatterByMeasure(colorMeasure)
    result.legends.handlerText!.formatter = formatter
  }
  return result
}
