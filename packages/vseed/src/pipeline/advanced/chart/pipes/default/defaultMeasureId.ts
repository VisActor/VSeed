import { MeasureId } from 'src/dataReshape'
import { intl } from 'src/i18n'
import type { AdvancedPipe, Dimension } from 'src/types'

export const defaultMeasureId: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }

  const MeaIdDim: Dimension = {
    id: MeasureId,
    alias: intl.i18n`指标Id`,
  }

  // 如果没有指标Id维度，则默认添加指标Id维度
  if (!result.dimensions?.some((dim) => dim.id === MeasureId)) {
    result.dimensions?.push(MeaIdDim)
  }

  return result
}
