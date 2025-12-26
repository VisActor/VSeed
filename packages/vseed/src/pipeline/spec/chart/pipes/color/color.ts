import type { ILineChartSpec } from '@visactor/vchart'
import type { Color, VChartSpecPipe } from 'src/types'

export const color: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo, chartType } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]
  const baseConfig = advancedVSeed.config[chartType] as { color: Color }

  if (!baseConfig || !baseConfig.color) {
    return result
  }

  const colorItems = unfoldInfo.colorItems
  const colorIdMap = unfoldInfo.colorIdMap

  const { color } = baseConfig
  const { colorScheme, colorMapping } = color

  result.color = {
    type: 'ordinal',
    domain: colorItems,
    range: colorScheme,
    specified: createSpecifiedForColorMapping(colorMapping, colorIdMap, colorItems),
  } as ILineChartSpec['color']
  return result
}

export const createSpecifiedForColorMapping = (
  colorMapping?: Record<string, string>,
  colorIdMap?: Record<string, { id: string; alias: string }>,
  colorItems?: string[],
) => {
  if (!colorMapping || !colorIdMap || !colorItems) {
    return undefined
  }

  const matchedList: string[] = []

  // 名称越长优先级越高: 按名称长度降, 优先匹配名称长的, 避免一个短的名称匹配到了超多个长的
  const colors = Object.entries(colorMapping).sort((a, b) => b[0].length - a[0].length)
  // 准确匹配
  const accurateMap = colors.reduce(
    (prev, cur) => {
      const name = cur[0]
      const colorValue = cur[1]

      const accurateMatchedList = Object.entries(colorIdMap).filter(([colorKey, colorObj]) => {
        return colorKey === name || colorObj.alias === name || colorObj.id === name
      })
      accurateMatchedList.forEach((item) => {
        prev[item[0]] = colorValue
        matchedList.push(name)
      })

      return prev
    },
    {} as Record<string, string>,
  )

  // 模糊匹配
  const fuzzyMap = colors.reduce(
    (prev, cur) => {
      const name = cur[0]
      const colorValue = cur[1]
      if (matchedList.includes(name)) {
        return prev
      }

      const fuzzyMatchedList = Object.entries(colorIdMap).filter(([colorKey, colorObj]) => {
        return colorKey.includes(name) || colorObj.alias.includes(name) || colorObj.id.includes(name)
      })
      fuzzyMatchedList.forEach((item) => {
        // 已经匹配有值, 则不重复匹配
        if (prev[item[0]]) {
          return
        }
        prev[item[0]] = colorValue
      })

      return prev
    },
    {} as Record<string, string>,
  )

  // 合并, 准确匹配的优先级高
  return {
    ...fuzzyMap,
    ...accurateMap,
  }
}
