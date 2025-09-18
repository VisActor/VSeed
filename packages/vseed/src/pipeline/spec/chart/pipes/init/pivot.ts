import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { SpecPipe } from 'src/types'

export const initPivot: SpecPipe = (spec) => {
  const result = { ...spec } as PivotChartConstructorOptions

  return {
    ...result,
    animation: true,
    rows: [],
    columns: [],
    indicators: [],
    records: [],
    widthMode: 'adaptive',
    heightMode: 'adaptive',
    indicatorsAsCol: false,
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
    corner: {
      titleOnDimension: 'all',
    },
    animationAppear: {
      duration: 600,
      type: 'all',
      direction: 'row',
    },
  }
}

export const pivotIndicatorsAsRow: SpecPipe = (spec) => {
  const result = { ...spec } as PivotChartConstructorOptions

  return {
    ...result,
    indicatorsAsCol: false,
  }
}

export const pivotIndicatorsAsCol: SpecPipe = (spec) => {
  const result = { ...spec } as PivotChartConstructorOptions

  return {
    ...result,
    indicatorsAsCol: true,
  }
}
