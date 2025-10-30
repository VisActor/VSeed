import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { IDiscreteTableLegendOption } from '@visactor/vtable/es/ts-types/component/legend'
import { unique } from 'remeda'
import type { Color, Legend, SpecPipe } from 'src/types'
import { createSpecifiedForColorMapping } from '../color/color'

export const pivotDiscreteLegend: SpecPipe = (spec, context) => {
  const result = { ...spec } as PivotChartConstructorOptions
  const { advancedVSeed } = context
  const { chartType } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { legend: Legend; color: Color }

  if (!baseConfig || !baseConfig.legend) {
    return result
  }

  const { datasetReshapeInfo } = advancedVSeed

  const colorItems = unique(
    datasetReshapeInfo.flatMap((d) => {
      return d.unfoldInfo.colorItems
    }),
  )

  const colorIdMap = datasetReshapeInfo.reduce<Record<string, string>>((prev, cur) => {
    return { ...prev, ...cur.unfoldInfo.colorIdMap }
  }, {})

  const { legend, color } = baseConfig
  const { colorScheme, colorMapping } = color

  const colorSpecified = createSpecifiedForColorMapping(colorMapping, colorIdMap, colorItems)

  const {
    enable,
    position = 'bottom',
    labelFontColor,
    labelColor,
    labelFontSize = 12,
    labelFontWeight = 400,
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

  const legends: IDiscreteTableLegendOption = {
    visible: enable,
    type: 'discrete',
    orient,
    position: legendPosition,
    maxCol: Math.max(1, maxSize),
    maxRow: Math.max(1, maxSize),
    data: colorItems.map((d: string, index: number) => {
      const color = colorSpecified?.[d] ?? colorScheme?.[index % colorScheme.length]
      return {
        label: d,
        shape: {
          outerBorder: border
            ? {
                stroke: color,
                distance: 3,
                lineWidth: 1,
              }
            : undefined,
          fill: color,
        },
      }
    }),

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
        style: {
          symbolType: shapeType,
          size: border ? 8 : 10,
        },
      },
      label: {
        formatMethod: (value: string) => {
          return colorIdMap[value] ?? value
        },
        style: {
          fontSize: labelFontSize,
          fill: labelColor || labelFontColor,
          fontWeight: labelFontWeight,
        },
      },
      background: {
        state: {
          selectedHover: {
            fill: labelColor || labelFontColor,
            fillOpacity: 0.05,
          },
        },
      },
    },
  } as unknown as IDiscreteTableLegendOption
  return { ...result, legends }
}
