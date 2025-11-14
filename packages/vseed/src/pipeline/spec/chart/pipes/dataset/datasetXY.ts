import type { ISpec } from '@visactor/vchart'
import { isPivotChart } from 'src/pipeline/utils'
import type { SpecPipe, Spec } from 'src/types'

export const datasetXY: SpecPipe<Spec> = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { analysis, datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]
  const orderMapping = analysis?.orderMapping || {}
  const angle = unfoldInfo.encodingAngle
  const x = unfoldInfo.encodingX
  const colorId = unfoldInfo.encodingColorId
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

  if (colorId) {
    const order = orderMapping[colorId]
    if (order) {
      fields[colorId] = {
        sortIndex: 0,
        domain: order,
        lockStatisticsByDomain: true,
      }
    } else {
      fields[colorId] = {
        sortIndex: 0,
      }
    }
  }

  return {
    ...spec,
    data: {
      id,
      // 透视表不使用 dataValues
      values: isPivotChart(vseed) ? undefined : advancedVSeed.dataset,
      fields: fields,
    },
  } as ISpec
}
