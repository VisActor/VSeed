import type { PivotTableConstructorOptions } from '@visactor/vtable'
import type { SpecPipe } from 'src/types'

export const initPivotTable: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { dataset } = advancedVSeed
  const { config } = advancedVSeed
  const { backgroundColor = 'transparent' } = config.pivotTable || {}
  return {
    ...spec,
    records: dataset,
    widthMode: 'standard',
    heightMode: 'autoHeight',
    autoWrapText: true,
    columnResizeMode: 'all',
    columnResizeType: 'column',
    showColumnHeader: true,
    showRowHeader: true,
    select: {
      highlightMode: 'cell',
      headerSelectMode: 'inline',
    },
    hover: {
      highlightMode: 'cross',
    },
    tooltip: {
      isShowOverflowTextTooltip: true,
    },
    widthAdaptiveMode: 'all',
    animationAppear: {
      duration: 300,
      delay: 250,
      type: 'one-by-one',
      direction: 'row',
    },
    theme: {
      underlayBackgroundColor: backgroundColor,
    },
  } as PivotTableConstructorOptions
}
