import type { Dimensions, Measure } from 'src/types'

export const defaultTitleText = (measures: Measure[], dimensions: Dimensions, idList: string[] = []) => {
  return idList
    .map((id) => {
      const alias = [...measures, ...dimensions].find((f) => f.id === id)?.alias || ''
      return alias
    })
    .join(' & ')
}
