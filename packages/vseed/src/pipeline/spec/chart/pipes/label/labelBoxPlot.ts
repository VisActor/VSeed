import type { IPieChartSpec } from '@visactor/vchart'
import type { Encoding, PieLabel, VChartSpecPipe } from 'src/types'
import { buildLabel } from './label'
import { FoldMeasureId, MedianMeasureId } from 'src/dataReshape/constant'

export const labelBoxPlot: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as IPieChartSpec
  const { advancedVSeed, vseed } = context
  const { chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: PieLabel }

  const { label } = baseConfig

  result.label = buildLabel(
    label,
    vseed.measures,
    vseed.dimensions,
    advancedVSeed.dimensions!,
    advancedVSeed.measures!,
    encoding as Encoding,
    [
      {
        measureId: FoldMeasureId,
        measureValue: MedianMeasureId,
      },
    ],
  ) as unknown as IPieChartSpec['label']

  return result
}
