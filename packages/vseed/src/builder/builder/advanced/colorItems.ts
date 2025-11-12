import { unique } from 'remeda'
import type { Builder } from '../builder'
import { isPivotTable, isTable } from 'src/pipeline'

export const getColorItems = (builder: Builder): { id: string; alias: string }[] => {
  const advancedVSeed = builder.advancedVSeed

  if (!advancedVSeed || isTable(builder.vseed) || isPivotTable(builder.vseed)) {
    return []
  }

  const { datasetReshapeInfo } = advancedVSeed
  const colorItems = unique(datasetReshapeInfo.flatMap((d) => d.unfoldInfo.colorItems))
  const colorIdMap = datasetReshapeInfo.reduce<Record<string, { id: string; alias: string }>>((prev, cur) => {
    return { ...prev, ...cur.unfoldInfo.colorIdMap }
  }, {})

  return colorItems.map((d) => ({
    id: d,
    alias: colorIdMap[d]?.alias,
  }))
}

export const getColorIdMap = (builder: Builder): Record<string, { id: string; alias: string }> => {
  const advancedVSeed = builder.advancedVSeed

  if (!advancedVSeed || isTable(builder.vseed) || isPivotTable(builder.vseed)) {
    return {}
  }

  const { datasetReshapeInfo } = advancedVSeed
  const colorIdMap = datasetReshapeInfo.reduce<Record<string, { id: string; alias: string }>>((prev, cur) => {
    return { ...prev, ...cur.unfoldInfo.colorIdMap }
  }, {})

  return colorIdMap
}
