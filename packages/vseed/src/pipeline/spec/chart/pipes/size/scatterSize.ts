import type { IScatterChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const scatterSize: SpecPipe = (spec, context) => {
  const result = { ...spec } as IScatterChartSpec
  const { advancedVSeed } = context
  const { chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as {
    sizeRange: number | number[]
    size?: number | number[]
  }

  if (!baseConfig || (!baseConfig.sizeRange && !baseConfig.size)) {
    return result
  }

  const size = baseConfig.size ?? baseConfig.sizeRange

  result.size = {
    type: 'linear',
    range: Array.isArray(size) ? size : [size, size],
  } as IScatterChartSpec['size']

  result.sizeField = encoding?.size?.[0] || undefined

  return result
}
