import { unique } from 'remeda'
import type { Builder } from '../builder'
import { isPivotTable, isTable } from 'src/pipeline'

export const getColorItems = (builder: Builder): string[] => {
  const advancedVSeed = builder.advancedVSeed

  if (!advancedVSeed || isTable(builder.vseed) || isPivotTable(builder.vseed)) {
    return []
  }

  const { datasetReshapeInfo } = advancedVSeed
  const colorItems = unique(datasetReshapeInfo.flatMap((d) => d.unfoldInfo.colorItems))
  const colorIdMap = datasetReshapeInfo.reduce<Record<string, string>>((prev, cur) => {
    return { ...prev, ...cur.unfoldInfo.colorIdMap }
  }, {})

  return colorItems.map((d) => colorIdMap[d])
}

export const getColorIdMap = (builder: Builder): Record<string, string> => {
  const advancedVSeed = builder.advancedVSeed

  if (!advancedVSeed || isTable(builder.vseed) || isPivotTable(builder.vseed)) {
    return {}
  }

  const { datasetReshapeInfo } = advancedVSeed
  const colorIdMap = datasetReshapeInfo.reduce<Record<string, string>>((prev, cur) => {
    return { ...prev, ...cur.unfoldInfo.colorIdMap }
  }, {})

  return colorIdMap
}
