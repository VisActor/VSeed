import type { StringOrNumber } from '@visactor/vchart'
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
    labelFontSize = 12,
    labelFontWeight,
    maxSize,
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
    maxCol: maxSize,
    maxRow: maxSize,
    autoPage: true,
    orient,
    position: legendPosition,
    data: border
      ? (items) => {
          return items.map((item) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item.shape.outerBorder = {
              stroke: item.shape.fill,
              distance: 3,
              lineWidth: 1,
            }
            return item
          })
        }
      : undefined,
    item: {
      focus: true,
      maxWidth: '30%',
      focusIconStyle: {
        size: labelFontSize + 2,
        fill: labelFontColor,
        fontWeight: labelFontWeight,
      },
      shape: {
        space: border ? 6 : 4,
        style: {
          symbolType: shapeType,
          size: border ? 8 : 10,
        },
      },
      label: {
        formatMethod: (value: StringOrNumber) => {
          return unfoldInfo.colorIdMap[String(value)] ?? value
        },
        style: {
          fontSize: labelFontSize,
          fill: labelFontColor,
          fontWeight: labelFontWeight,
        },
      },
      background: {
        state: {
          selectedHover: {
            fill: labelFontColor,
            fillOpacity: 0.05,
          },
        },
      },
    },
    padding: 0,
  }
  return result
}
