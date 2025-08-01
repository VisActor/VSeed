import type { ISpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const yLinear: SpecPipe = (spec) => {
  const result = { ...spec } as ISpec

  if (!result.axes) {
    result.axes = []
  }

  result.axes = [
    ...result.axes,
    {
      visible: true,
      type: 'linear',
      orient: 'left',
    },
  ] as ISpec['axes']

  return result
}
