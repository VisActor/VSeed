import type { ISpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const yBand: SpecPipe = (spec) => {
  const result = { ...spec } as ISpec

  if (!result.axes) {
    result.axes = []
  }

  result.axes = [
    ...result.axes,
    {
      visible: true,
      type: 'band',
      orient: 'left',
    },
  ] as ISpec['axes']
  return result
}
