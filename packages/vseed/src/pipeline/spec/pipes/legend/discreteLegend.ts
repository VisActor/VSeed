import type { Legend, SpecPipe } from 'src/types'

const defaultLegend = {
  enable: true,
}

export const discreteLegend: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const baseConfig = advancedVSeed.baseConfig.vchart
  if (!baseConfig || !baseConfig.legend) {
    return result
  }

  const { legend = defaultLegend } = baseConfig
  const { enable, position = 'bottom', labelFontColor, labelFontSize, labelFontWeight, maxSize } = legend as Legend

  const orient = ['bottom', 'bottomLeft', 'bottomRight', 'bl', 'br'].includes(position)
    ? 'bottom'
    : ['top', 'topLeft', 'topRight', 'tl', 'tr'].includes(position)
      ? 'top'
      : ['left', 'leftTop', 'leftBottom', 'lt', 'lb'].includes(position)
        ? 'left'
        : 'right'

  const legendPosition = ['top', 'leftTop', 'rightTop', 'lt', 'rt'].includes(position)
    ? 'start'
    : ['bottom', 'leftBottom', 'rightBottom', 'lb', 'rb'].includes(position)
      ? 'end'
      : 'middle'

  result.legends = {
    type: 'discrete',
    visible: enable,
    maxCol: maxSize,
    maxRow: maxSize,
    autoPage: true,
    orient,
    position: legendPosition,
    item: {
      focus: true,
      label: {
        style: {
          fontSize: labelFontSize,
          fill: labelFontColor,
          fontWeight: labelFontWeight,
        },
      },
    },
  }
  return result
}
