import { pick } from 'remeda'
import type { AdvancedPipe, AdvancedVSeed } from 'src/types'

export const markStyle: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context

  const markStyle = pick(vseed, ['barStyle', 'pointStyle']) as AdvancedVSeed['markStyle']

  return { ...advancedVSeed, markStyle }
}
