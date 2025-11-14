import type { IScatterChartSpec } from '@visactor/vchart'
import type { SpecPipe, Spec } from 'src/types'

export const scatterSize: SpecPipe<Spec> = (spec, context) => {
  const result = { ...spec } as IScatterChartSpec
  const { advancedVSeed } = context
  const { chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as {
    sizeRange: number | number[]
    size?: number | number[]
  }
  const hasSizeEncoding = encoding?.size?.[0]
  if (!hasSizeEncoding) {
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
