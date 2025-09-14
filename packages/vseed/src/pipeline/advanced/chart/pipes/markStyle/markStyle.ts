import { pick } from 'remeda'
import { replaceNullToUndefined } from 'src/pipeline/utils'
import type { AdvancedPipe, AdvancedVSeed } from 'src/types'

export const markStyle: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context

  const pickedMarkStyle = pick(vseed, [
    'barStyle',
    'pointStyle',
    'lineStyle',
    'areaStyle',
  ]) as AdvancedVSeed['markStyle']

  const markStyle = replaceNullToUndefined(pickedMarkStyle)

  return { ...advancedVSeed, markStyle }
}
