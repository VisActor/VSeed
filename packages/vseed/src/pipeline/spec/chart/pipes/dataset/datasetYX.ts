import type { ISpec } from '@visactor/vchart'
import { isPivotChart } from 'src/pipeline/utils'
import type { SpecPipe } from 'src/types'

export const datasetYX: SpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { analysis, datasetReshapeInfo } = advancedVSeed

  const { unfoldInfo } = datasetReshapeInfo[0]
  const orderMapping = analysis?.orderMapping || {}

  const angle = unfoldInfo.encodingAngle
  const y = unfoldInfo.encodingY
  const colorId = unfoldInfo.encodingColorId
  const id = datasetReshapeInfo[0].id

  const fields: Record<string, object> = {}
  if (angle) {
    fields[angle] = {
      sortIndex: 0,
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
