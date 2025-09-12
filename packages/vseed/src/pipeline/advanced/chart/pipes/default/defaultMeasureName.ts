import { MeasureName } from 'src/dataReshape'
import { intl } from 'src/i18n'
import type { AdvancedPipe, Dimension } from 'src/types'

export const defaultMeasureName: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }

  const MeaName: Dimension = {
    id: MeasureName,
    alias: intl.i18n`指标名称`,
  }

  // 如果没有指标名称维度，则默认添加指标名称维度
  if (!result.dimensions?.some((dim) => dim.id === MeasureName)) {
    result.dimensions?.push(MeaName)
  }

  return result
}
