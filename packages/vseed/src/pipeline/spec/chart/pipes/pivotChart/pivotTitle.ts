import type { PivotChartConstructorOptions } from '@visactor/vtable'
import { FoldXMeasureId } from 'src/dataReshape'
import type { Config, PivotChartSpecPipe } from 'src/types'

export const pivotTitle: PivotChartSpecPipe = (spec, context) => {
  const result = { ...spec } as PivotChartConstructorOptions
  const { advancedVSeed } = context
  const { config, chartType } = advancedVSeed
  const themConfig = (config?.[chartType] as Config['line'])?.pivotGrid ?? {}
  const columns = result.columns?.filter((c) => (c as any).dimensionKey !== FoldXMeasureId)

  if (columns && columns.length > 0) {
    result.title = {
      text: (spec as unknown as { columns: { title: string }[] }).columns.map((entry) => entry.title).join('/'),
      align: 'center',
      orient: 'top',
      padding: [2, 0, 0, 0],
      textStyle: {
        fontSize: themConfig.titleFontSize ?? 12,
        fill: themConfig.titleFontColor ?? '#000',
        fontWeight: themConfig.titleFontWeight ?? 'bold',
      },
    }
  }

  return result
}
