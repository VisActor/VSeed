import type { Legend, SpecPipe } from 'src/types'

export const colorLegend: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { chartType } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { legend: Legend }
  const { encoding } = advancedVSeed

  if (!encoding[0].color) {
    return result
  }

  if (!baseConfig || !baseConfig.legend) {
    return result
  }

  const { legend } = baseConfig
  const { enable, position = 'bottom' } = legend || {}

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
    field: encoding[0].color[0],
    inverse: ['left', 'right'].includes(orient) ? true : false,
  }
  return result
}
