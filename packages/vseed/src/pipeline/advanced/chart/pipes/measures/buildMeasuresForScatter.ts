import type { AdvancedPipe, MeasureEncoding, Measures } from 'src/types'
import { clone } from 'remeda'
import { DEFAULT_PARENT_ID } from 'src/pipeline/utils/constant'
import { ensureParentIdInitialized, isCommonMeasureEncoding } from './utils'

export const buildMeasuresForScatter: AdvancedPipe = (advancedVSeed) => {
  const { measures = [] } = advancedVSeed
  const measuresByView = {} as { [key: string]: Measures }
  const parentIds: string[] = []

  for (let index = 0; index < measures.length; index++) {
    const item = measures[index]
    const encoding = item.encoding
    const parentId = item.parentId || DEFAULT_PARENT_ID
    const isYAxis = encoding === 'yAxis'
    const isXAxis = encoding === 'xAxis'
    const isOtherEncoding = item.encoding && isCommonMeasureEncoding(encoding as MeasureEncoding)

    ensureParentIdInitialized(parentId, measuresByView, parentIds)

    if (isYAxis) {
      measuresByView[parentId].push(item)
    } else if (isXAxis) {
      measuresByView[parentId].push(item)
    } else if (!isOtherEncoding && encoding !== 'size') {
      const xCount = measuresByView[parentId].filter((m) => m.encoding === 'xAxis').length
      item.encoding = xCount === 0 ? 'xAxis' : 'yAxis'
      measuresByView[parentId].push(item)
    }
  }

  advancedVSeed.reshapeMeasures = parentIds
    .map((pid) => {
      const basicMeasures = measuresByView[pid]
      const xCount = basicMeasures.filter((m) => m.encoding === 'xAxis').length
      const yCount = basicMeasures.filter((m) => m.encoding === 'yAxis').length

      if (yCount === 0 && xCount > 0) {
        const cloneMeasure = clone(basicMeasures[0])
        cloneMeasure.encoding = 'yAxis'

        return [...basicMeasures, cloneMeasure]
      }

      return basicMeasures
    })
    .filter((m) => m.length > 0)

  return advancedVSeed
}
