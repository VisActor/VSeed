import type { SpecPipe } from 'src/types'

export const pivotHideIndicatorName: SpecPipe = (spec) => {
  return {
    ...spec,
    hideIndicatorName: true,
  }
}
