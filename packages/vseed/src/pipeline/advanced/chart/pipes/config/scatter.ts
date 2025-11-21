import { pick } from 'remeda'
import { replaceNullToUndefined } from 'src/pipeline/utils'
import type { AdvancedPipe, AdvancedVSeed, Config } from 'src/types'

export const scatterConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType } = vseed
  const result = {
    ...advancedVSeed,
  }

  const pickedConfig = pick(vseed, [
    'backgroundColor',
    'color',
    'label',
    'legend',
    'tooltip',
    'xAxis',
    'yAxis',
    'sizeRange',
    'size',
    'crosshairLine',

    'dimensionLinkage',
  ]) as Config['line']

  const config = replaceNullToUndefined(pickedConfig)

  result.config = {
    ...(result.config || {}),
    [chartType]: {
      ...config,
    },
  }

  return result as AdvancedVSeed
}
