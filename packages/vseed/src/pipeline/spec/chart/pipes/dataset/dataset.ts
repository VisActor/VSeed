import type { ISpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const dataset: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { encoding, analysis, datasetReshapeInfo } = advancedVSeed
  const { orderMapping = {} } = analysis ?? {}
  const angle = encoding[0]?.angle?.[0]
  const x = encoding[0]?.x?.[0]
  const y = encoding[0]?.y?.[0]
  const group = encoding[0]?.group?.[0]
  const id = datasetReshapeInfo[0].id

  const fields: Record<string, object> = {}
  if (angle) {
    fields[angle] = {
      sortIndex: 0,
    }
  }
  if (x) {
    const order = orderMapping[x]
    if (order) {
      fields[x] = {
        sortIndex: 0,
        domain: order,
        lockStatisticsByDomain: true,
      }
    } else {
      fields[x] = {
        sortIndex: 0,
      }
    }
  }
  if (y) {
    const order = orderMapping[y]
    if (order) {
      fields[y] = {
        sortIndex: 0,
        domain: order,
        lockStatisticsByDomain: true,
      }
    } else {
      fields[y] = {
        sortIndex: 0,
      }
    }
  }
  if (group) {
    const order = orderMapping[group]
    if (order) {
      fields[group] = {
        sortIndex: 0,
        domain: order,
        lockStatisticsByDomain: true,
      }
    } else {
      fields[group] = {
        sortIndex: 0,
      }
    }
  }

  return {
    ...spec,
    data: {
      id,
      values: advancedVSeed.dataset,
      fields: fields,
    },
  } as ISpec
}
