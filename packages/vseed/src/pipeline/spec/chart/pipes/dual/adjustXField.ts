import type { ICommonChartSpec, IBarSeriesSpec } from '@visactor/vchart'
import { DimAxisType } from 'src/dataReshape/constant'
import type { VChartSpecPipe } from 'src/types'

export const adjustXField: VChartSpecPipe = (spec) => {
  const result = { ...spec } as ICommonChartSpec
  const chartTypes = (spec.series ?? []).map((s: any) => (s as IBarSeriesSpec).type)

  if (chartTypes.length > 1 && chartTypes.every((type: string) => type === 'bar')) {
    result.series!.forEach((s: any) => {
      if (Array.isArray((s as IBarSeriesSpec).xField)) {
        ;((s as IBarSeriesSpec).xField as string[]).push(DimAxisType)
      } else {
        ;(s as IBarSeriesSpec).xField = [(s as IBarSeriesSpec).xField as string, DimAxisType]
      }
    })
  }

  return result
}
