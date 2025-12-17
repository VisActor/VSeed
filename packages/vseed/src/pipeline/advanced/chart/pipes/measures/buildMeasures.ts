import type { AdvancedPipe, MeasureEncoding, Measures } from 'src/types'

import { DEFAULT_PARENT_ID } from 'src/pipeline/utils/constant'
import { ensureParentIdInitialized, isCommonMeasureEncoding } from './utils'

export const buildMeasures = (encodingKeys: string[]): AdvancedPipe => {
  return (advancedVSeed) => {
    const { measures = [] } = advancedVSeed
    const measuresByView = {} as { [key: string]: Measures }
    const parentIds: string[] = []

    for (let index = 0; index < measures.length; index++) {
      const item = measures[index]
      const encoding = item.encoding
      const parentId = item.parentId || DEFAULT_PARENT_ID

      const isOtherEncoding = item.encoding && isCommonMeasureEncoding(encoding as MeasureEncoding)

      ensureParentIdInitialized(parentId, measuresByView, parentIds)

      if (encodingKeys.includes(encoding as string)) {
        measuresByView[parentId].push(item)
      } else if (!isOtherEncoding) {
        item.encoding = encodingKeys[0] as MeasureEncoding
        measuresByView[parentId].push(item)
      }
    }

    advancedVSeed.reshapeMeasures = parentIds.map((pid) => measuresByView[pid]).filter((m) => m.length > 0)

    return advancedVSeed
  }
}
