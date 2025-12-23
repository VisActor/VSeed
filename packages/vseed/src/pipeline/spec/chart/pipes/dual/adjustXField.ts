import type { ICommonChartSpec, IBarSeriesSpec } from '@visactor/vchart'
import { DimAxisType } from 'src/dataReshape/constant'
import type { VChartSpecPipe } from 'src/types'

export const adjustXField: VChartSpecPipe = (spec) => {
  const result = { ...spec } as ICommonChartSpec
  const chartTypes = (spec.series ?? []).map((s: any) => (s as IBarSeriesSpec).type)

  if (chartTypes.length > 1 && chartTypes.filter((type: string) => type === 'bar').length > 1) {
    result.series!.forEach((s: any) => {
      if (s.type === 'bar' && !Array.isArray((s as IBarSeriesSpec).xField)) {
        // 当左右轴都是柱图的时候，带堆积的柱图增加轴类型作为分组字段，来实现左右轴柱图平行展示的效果
        ;(s as IBarSeriesSpec).xField = [(s as IBarSeriesSpec).xField as string, DimAxisType]
      }
    })
  }

  return result
}
