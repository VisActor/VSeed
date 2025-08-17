import type { ListTableConstructorOptions } from '@visactor/vtable'
import type { SpecPipe } from 'src/types'

export const initTable: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { dataset } = advancedVSeed

  return {
    ...spec,
    records: dataset,
    widthMode: 'standard',
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
  } as ListTableConstructorOptions
}
