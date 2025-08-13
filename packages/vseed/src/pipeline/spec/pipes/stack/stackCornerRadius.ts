import type { SpecPipe, StackCornerRadius } from 'src/types'

export const stackCornerRadius: SpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const stackCornerRadius = advancedVSeed.config?.[chartType as 'column']?.stackCornerRadius as StackCornerRadius

  return {
    ...spec,
    stackCornerRadius,
  }
}
