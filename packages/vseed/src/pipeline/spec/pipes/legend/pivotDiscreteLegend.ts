import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { IDiscreteTableLegendOption } from '@visactor/vtable/es/ts-types/component/legend'
import { unique } from 'remeda'
import type { Color, Legend, SpecPipe } from 'src/types'

export const pivotDiscreteLegend: SpecPipe = (spec, context) => {
  const result = { ...spec } as PivotChartConstructorOptions
  const { advancedVSeed } = context
  const baseConfig = advancedVSeed.baseConfig.vchart
  if (!baseConfig || !baseConfig.legend) {
    return result
  }

  const { datasetReshapeInfo } = advancedVSeed
  const colorItems = unique(datasetReshapeInfo.flatMap((d) => d.unfoldInfo.colorItems))

  const { legend, color } = baseConfig
  const { colorScheme } = color as Color

  const {
    enable,
    position = 'bottom',
    labelFontColor,
    labelFontSize = 12,
    labelFontWeight,
    maxSize,
    border,
  } = (legend || {}) as Legend

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

  const legends: IDiscreteTableLegendOption = {
    visible: enable,
    type: 'discrete',
    orient,
    position: legendPosition,
    maxCol: maxSize,
    maxRow: maxSize,
    data: colorItems.map((d, index) => ({
      label: d,
      shape: {
        outerBorder: border
          ? {
              stroke: colorScheme[index],
              distance: 3,
              lineWidth: 1,
            }
          : undefined,
        fill: colorScheme[index],
      },
    })),

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
          symbolType: 'rectRound',
          size: border ? 8 : 10,
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
          selectedHover: {
            fill: labelFontColor,
            fillOpacity: 0.05,
          },
        },
      },
    },
  } as unknown as IDiscreteTableLegendOption
  return { ...result, legends }
}
