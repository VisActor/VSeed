import type { PivotTableConstructorOptions } from '@visactor/vtable'
import type { PivotTableSpecPipe } from 'src/types'

export const initPivotTable: PivotTableSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { dataset } = advancedVSeed
  const { config } = advancedVSeed
  const { backgroundColor = 'transparent' } = config.pivotTable || {}
  return {
    ...spec,
    records: dataset,
    widthMode: 'standard',
    defaultHeaderColWidth: 'auto',
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
      renderMode: 'html',
      confine: false,
      parentElement: document.body,
    },
    corner: {
      titleOnDimension: 'all',
    },
    widthAdaptiveMode: 'all',
    animationAppear: {
      duration: 300,
      delay: 250,
      type: 'one-by-one',
      direction: 'row',
    },
    theme: {
      cellInnerBorder: false,
      underlayBackgroundColor: backgroundColor,
    },
  } as PivotTableConstructorOptions
}
