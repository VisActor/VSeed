import { findAllMeasures } from 'src/pipeline/utils'
import type { Dimensions, MeasureTree } from 'src/types'

export const defaultTitleText = (measures: MeasureTree, dimensions: Dimensions, idList: string[] = []) => {
  const allMeasures = findAllMeasures(measures)
  return idList.map((id) => {
    const alias = [...allMeasures, ...dimensions].find((f) => f.id === id)?.alias || ''
    return alias
  }).join(' & ')
}
