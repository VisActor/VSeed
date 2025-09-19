import type { IArcLabelSpec, IPieChartSpec } from '@visactor/vchart'
import type { Encoding, FoldInfo, PieLabel, SpecPipe } from 'src/types'
import { isEmpty } from 'remeda'
import { buildLabel } from './label'

export const labelPie: SpecPipe = (spec, context) => {
  const result = { ...spec } as IPieChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: PieLabel }
  const foldInfo = datasetReshapeInfo[0].foldInfo as FoldInfo
  if (!baseConfig || isEmpty(baseConfig.label)) {
    return result
  }

  const { label } = baseConfig

  result.label = buildLabel<IArcLabelSpec>(
    label,
    vseed.measures,
    vseed.dimensions,
    advancedVSeed.measures,
    encoding as Encoding,
    [foldInfo],
  )
  if (label.labelLayout) {
    result.label.layout = {
      align: label.labelLayout,
    }
  }
  return result
}
