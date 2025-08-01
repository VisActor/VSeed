import type { ISpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const xLinear: SpecPipe = (spec) => {
  const result = { ...spec } as ISpec

  if (!result.axes) {
    result.axes = []
  }

  result.axes = [
    ...result.axes,
    {
      visible: true,
      type: 'linear',
      orient: 'bottom',
    },
  ] as ISpec['axes']

  return result
}
