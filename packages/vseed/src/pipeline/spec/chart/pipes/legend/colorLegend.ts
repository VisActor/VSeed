import type { Legend, SpecPipe } from 'src/types'

export const colorLegend: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { datasetReshapeInfo, chartType } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]
  const baseConfig = advancedVSeed.config[chartType] as { legend: Legend }
  if (!baseConfig || !baseConfig.legend) {
    return result
  }

  const { legend } = baseConfig
  const { enable, position = 'bottom', labelFontColor, labelFontSize = 12, labelFontWeight } = legend || {}

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
    inverse: ['right', 'left'].includes(orient),
    maxWidth: '30%',
    startText: {
      visible: true,
      style: {
        fill: labelFontColor,
        fontSize: labelFontSize,
        fontWeight: labelFontWeight,
      },
    },
    endText: {
      visible: true,
      style: {
        fill: labelFontColor,
        fontSize: labelFontSize,
        fontWeight: labelFontWeight,
      },
    },
  }
  return result
}
