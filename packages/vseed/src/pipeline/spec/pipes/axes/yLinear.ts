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
      nice: true,
      zero: true,
    },
  ] as ISpec['axes']

  return result
}
