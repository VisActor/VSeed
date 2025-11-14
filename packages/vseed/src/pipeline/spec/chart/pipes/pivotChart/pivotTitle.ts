import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { SpecPipe, Config } from 'src/types'

export const pivotTitle: SpecPipe<PivotChartConstructorOptions> = (
  spec,
  context,
): Partial<PivotChartConstructorOptions> => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { config, chartType } = advancedVSeed
  const themConfig = (config?.[chartType] as Config['line'])?.pivotGrid ?? {}

  if (result.columns && result.columns.length > 0) {
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
