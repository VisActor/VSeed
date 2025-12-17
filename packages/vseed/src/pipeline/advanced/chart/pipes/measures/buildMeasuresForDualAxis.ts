import type { AdvancedPipe, MeasureEncoding, Measures } from 'src/types'
import { DEFAULT_PARENT_ID } from 'src/pipeline/utils/constant'
import { ensureParentIdInitialized, isCommonMeasureEncoding } from './utils'

export const buildMeasuresForDualAxis: AdvancedPipe = (advancedVSeed) => {
  const { measures = [] } = advancedVSeed
  const measuresByView = {} as { [key: string]: Measures }
  const parentIds: string[] = []

  for (let index = 0; index < measures.length; index++) {
    const item = measures[index]
    const encoding = item.encoding
    const parentId = item.parentId || DEFAULT_PARENT_ID
    const isPrimaryYAxis = encoding === 'primaryYAxis'
    const isSecondaryYAxis = encoding === 'secondaryYAxis'
    const isOtherEncoding = item.encoding && isCommonMeasureEncoding(encoding as MeasureEncoding)

    ensureParentIdInitialized(parentId, measuresByView, parentIds)

    if (isPrimaryYAxis) {
      measuresByView[parentId].push(item)
    } else if (isSecondaryYAxis) {
      measuresByView[parentId].push(item)
    } else if (!isOtherEncoding) {
      const primaryCount = measuresByView[parentId].filter((m) => m.encoding === 'primaryYAxis').length
      item.encoding = primaryCount === 0 ? 'primaryYAxis' : 'secondaryYAxis'
      measuresByView[parentId].push(item)
    }
  }

  advancedVSeed.reshapeMeasures = parentIds.map((pid) => measuresByView[pid]).filter((m) => m.length > 0)

  return advancedVSeed
}
