import type { FoldInfo, PivotChartSpecPipe } from 'src/types'

export const heatmapColorDomain: PivotChartSpecPipe = (spec, context) => {
  const { advancedVSeed } = context

  const indicators = spec.indicators

  if (!indicators || !indicators.length || indicators.every((ind: any) => ind.chartSpec.color?.type !== 'linear')) {
    return spec
  }
  const { datasetReshapeInfo } = advancedVSeed
  const max = Math.max(...datasetReshapeInfo.map((d: { foldInfo: FoldInfo }) => d.foldInfo.statistics.colorMax))
  const min = Math.min(...datasetReshapeInfo.map((d: { foldInfo: FoldInfo }) => d.foldInfo.statistics.colorMin))

  indicators.forEach((ind: any) => {
    if (ind.chartSpec.color?.type === 'linear') {
      ind.chartSpec.color.domain = [min, max]
    }
  })

  return spec
}
