import { pick } from 'remeda'
import { replaceNullToUndefined } from 'src/pipeline/utils'
import type { AdvancedPipe, AdvancedVSeed, Config } from 'src/types'

export const pieConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType } = vseed
  const result = {
    ...advancedVSeed,
  }

  const pickedConfig = pick(vseed, ['backgroundColor', 'color', 'label', 'legend', 'tooltip']) as Config['pie']

  const config = replaceNullToUndefined(pickedConfig)

  result.config = {
    ...(result.config || {}),
    [chartType]: {
      ...config,
    },
  }

  return result as AdvancedVSeed
}
