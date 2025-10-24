import type { Legend, SpecPipe } from 'src/types'

export const discreteLegend: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { datasetReshapeInfo, chartType } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]
  const baseConfig = advancedVSeed.config[chartType] as { legend: Legend }
  if (!baseConfig || !baseConfig.legend) {
    return result
  }

  const { legend } = baseConfig
  const {
    enable,
    position = 'bottom',
    labelFontColor,
    labelColor,
    labelFontSize = 12,
    labelFontWeight,
    maxSize = 1,
    border,
    shapeType = 'rectRound',
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

  result.legends = {
    type: 'discrete',
    visible: enable,
    maxCol: Math.max(1, maxSize),
    maxRow: Math.max(1, maxSize),
    autoPage: true,
    orient,
    position: legendPosition,
    item: {
      focus: true,
      maxWidth: '30%',
      focusIconStyle: {
        size: labelFontSize + 2,
        fill: labelColor || labelFontColor,
        fontWeight: labelFontWeight,
      },
      shape: {
        space: border ? 6 : 4,
        style: (item) => {
          return {
            symbolType: shapeType,
            size: border ? 8 : 10,
            outerBorder: border
              ? {
                  stroke: item.shape.fill,
                  distance: 3,
                  lineWidth: 1,
                }
              : null,
          }
        },
        state: {
          unSelected: {
            opacity: 0.2,
            fillOpacity: 1, // 覆盖 vchart 里的默认值
          },
        },
      },
      label: {
        formatMethod: (value) => {
          return unfoldInfo.colorIdMap[String(value)] ?? value
        },
        style: {
          fontSize: labelFontSize,
          fill: labelColor || labelFontColor,
          fontWeight: labelFontWeight,
        },
        state: {
          unSelected: {
            fill: labelColor || labelFontColor, // 覆盖vchart里面的默认值
            fillOpacity: 0.8, // 覆盖 vchart 里的默认值
          },
        },
      },
      background: {
        state: {
          selectedHover: {
            fill: labelColor || labelFontColor,
            fillOpacity: 0.05,
          },
          unSelectedHover: {
            fill: null,
          },
        },
      },
    },
    padding: 0,
  }
  return result
}
