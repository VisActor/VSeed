import type { ListTableConstructorOptions } from '@visactor/vtable'
import type { ListTableSpecPipe } from 'src/types'

export const initTable: ListTableSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { dataset } = advancedVSeed
  const { config } = advancedVSeed
  const { backgroundColor = 'transparent' } = config.table || {}

  return {
    ...spec,
    records: dataset,
    widthMode: 'standard',
    defaultHeaderColWidth: 'auto',
    heightMode: 'autoHeight',
    autoWrapText: true,
    columnResizeMode: 'all',
    showHeader: true,
    tooltip: {
      isShowOverflowTextTooltip: true,
    },
    animationAppear: {
      duration: 300,
      delay: 250,
      type: 'one-by-one',
      direction: 'row',
    },
    hover: {
      highlightMode: 'row',
    },
    theme: {
      cellInnerBorder: false,
      underlayBackgroundColor: backgroundColor,
    },
  } as ListTableConstructorOptions
}
