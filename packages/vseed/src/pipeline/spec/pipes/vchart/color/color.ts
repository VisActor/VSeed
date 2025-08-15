import type { ILineChartSpec } from '@visactor/vchart'
import { Separator } from 'src/dataReshape'
import type { Color, SpecPipe } from 'src/types'

export const color: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]
  const baseConfig = advancedVSeed.baseConfig.vchart
  if (!baseConfig || !baseConfig.color) {
    return result
  }

  const { color } = baseConfig
  const { colorScheme, colorMapping } = color as Color
  const mappingList: Array<[string, string]> = []
  if (colorMapping) {
    Object.entries(colorMapping)
      .sort((a, b) => a[0].split(Separator).length - b[0].split(Separator).length)
      .forEach(([key, value]) => {
        const idMap = Object.entries(unfoldInfo.colorIdMap).filter(([_, v]) => v.includes(key))

        for (const [colorId] of idMap) {
          mappingList.push([colorId, value])
        }
      })
  }

  result.color = {
    type: 'ordinal',
    domain: unfoldInfo.colorItems,
    range: colorScheme,
    specified: Object.fromEntries(mappingList),
  } as ILineChartSpec['color']
  return result
}
