import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { IDiscreteTableLegendOption } from '@visactor/vtable/es/ts-types/component/legend'
import { unique } from 'remeda'
import type { Color, Legend, SpecPipe } from 'src/types'

export const pivotLegend: SpecPipe = (spec, context) => {
  const result = { ...spec } as PivotChartConstructorOptions
  const { advancedVSeed } = context
  const baseConfig = advancedVSeed.baseConfig.vchart
  if (!baseConfig || !baseConfig.legend) {
    return result
  }

  const { datasetReshapeInfo } = advancedVSeed
  const colorItems = unique(datasetReshapeInfo.flatMap((d) => d.unfoldInfo.colorItems))

  const { legend, color } = baseConfig
  const { enable } = legend as Legend
  const { colorScheme } = color as Color

  result.legends = {
    visible: enable,
    alignSelf: 'end',
    type: 'discrete',
    position: 'start',
    data: colorItems.map((d, index) => ({
      label: d,
      shape: {
        symbolType: 'square',
        fill: colorScheme[index],
      },
    })),
    orient: 'bottom',
  } as unknown as IDiscreteTableLegendOption
  return result
}
