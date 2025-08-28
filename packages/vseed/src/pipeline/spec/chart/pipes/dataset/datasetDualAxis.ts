import type { ISpec } from '@visactor/vchart'
import { isPivotChart } from 'src/pipeline/utils'
import type { SpecPipe } from 'src/types'

export const datasetPrimary: SpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { encoding, analysis, datasetReshapeInfo } = advancedVSeed
  const orderMapping = analysis?.orderMapping || {}
  const x = encoding[0]?.x?.[0]
  const group = encoding[0]?.group?.[0]
  const id = datasetReshapeInfo[0].id

  const fields: Record<string, object> = {}

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
      id: `${id}-primary-dataset`,
      // 透视表不使用 dataValues
      values: isPivotChart(vseed) ? undefined : advancedVSeed.dataset,
      fields: fields,
    },
  } as ISpec
}

export const datasetSecondary: SpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { encoding, analysis, datasetReshapeInfo } = advancedVSeed
  const orderMapping = analysis?.orderMapping || {}
  const x = encoding[0]?.x?.[0]
  const group = encoding[0]?.group?.[0]
  const id = datasetReshapeInfo[0].id

  const fields: Record<string, object> = {}

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
      id: `${id}-secondary-dataset`,
      // 透视表不使用 dataValues
      values: isPivotChart(vseed) ? undefined : advancedVSeed.dataset,
      fields: fields,
    },
  } as ISpec
}
