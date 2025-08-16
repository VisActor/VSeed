import type { ISpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const dataset: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { encoding } = advancedVSeed
  const angle = encoding[0]?.angle?.[0]
  const x = encoding[0]?.x?.[0]
  const group = encoding[0]?.group?.[0]

  const fields: Record<string, object> = {}
  if (angle) {
    fields[angle] = {
      sortIndex: 0,
    }
  }
  if (x) {
    fields[x] = {
      sortIndex: 0,
    }
  }
  if (group) {
    fields[group] = {
      sortIndex: 1,
    }
  }

  return {
    ...spec,
    data: {
      values: advancedVSeed.dataset,
      fields: fields,
    },
  } as ISpec
}
