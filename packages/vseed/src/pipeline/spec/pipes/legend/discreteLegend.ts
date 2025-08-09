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
  const {
    enable,
    position = 'bottom',
    labelFontColor,
    labelFontSize = 12,
    labelFontWeight,
    maxSize,
    border,
  } = legend as Legend

  const orient = ['bottom', 'bottomLeft', 'bottomRight', 'bl', 'br'].includes(position)
    ? 'bottom'
    : ['top', 'topLeft', 'topRight', 'tl', 'tr'].includes(position)
      ? 'top'
      : ['left', 'leftTop', 'leftBottom', 'lt', 'lb'].includes(position)
        ? 'left'
        : 'right'

  const legendPosition = ['topLeft', 'bottomLeft', 'leftTop', 'rightTop', 'lt', 'rt', 'tl', 'tr'].includes(position)
    ? 'start'
    : ['topRight', 'bottomRight', 'leftBottom', 'rightBottom', 'lb', 'rb', 'bl', 'br'].includes(position)
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
              distance: 2,
              lineWidth: 1,
            }
            return item
          })
        }
      : undefined,
    item: {
      focus: true,
      focusIconStyle: {
        size: labelFontSize + 2,
        fill: labelFontColor,
        fontWeight: labelFontWeight,
      },
      shape: {
        space: border ? 6 : 4,
        style: {
          size: border ? 8 : 10,
          // cornerRadius nor working,  cornerRadius: 4,
        },
      },
      label: {
        style: {
          fontSize: labelFontSize,
          fill: labelFontColor,
          fontWeight: labelFontWeight,
        },
      },
      background: {
        state: {
          selected: {
            fillOpacity: 0.2,
          },
        },
      },
    },
  }
  return result
}
