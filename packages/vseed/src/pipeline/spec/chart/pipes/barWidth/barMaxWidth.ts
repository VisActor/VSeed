import { isNullish } from 'remeda'
import type { BarMaxWidth, SpecPipe } from 'src/types'

export const barMaxWidth: SpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const barMaxWidth = advancedVSeed.config?.[chartType as 'column']?.barMaxWidth as BarMaxWidth

  if (!isNullish(barMaxWidth)) {
    return {
      ...spec,
      barMaxWidth,
    }
  }

  return spec
}
