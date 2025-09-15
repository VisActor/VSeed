import type { SpecPipe, StackCornerRadius } from 'src/types'

export const stackCornerRadius: SpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const stackCornerRadius = advancedVSeed.config?.[chartType as 'column']?.stackCornerRadius as StackCornerRadius
  const { datasetReshapeInfo } = advancedVSeed
  const { foldInfo } = datasetReshapeInfo[0]
  return {
    ...spec,
    stackCornerRadius: (_, datum) => {
      if (datum[foldInfo.measureValue] > 0) {
        return stackCornerRadius
      }

      return 0
    },
  }
}
