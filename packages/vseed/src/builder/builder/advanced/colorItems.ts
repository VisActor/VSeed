import { unique } from 'remeda'
import type { Builder } from '../builder'

export const getColorItems = (builder: Builder): string[] => {
  const advancedVSeed = builder.advancedVSeed
  if (!advancedVSeed) {
    return []
  }

  const { datasetReshapeInfo } = advancedVSeed
  const colorItems = unique(datasetReshapeInfo.flatMap((d) => d.unfoldInfo.colorItems))
  const colorIdMap = datasetReshapeInfo.reduce<Record<string, string>>((prev, cur) => {
    return { ...prev, ...cur.unfoldInfo.colorIdMap }
  }, {})

  return colorItems.map((d) => colorIdMap[d])
}
