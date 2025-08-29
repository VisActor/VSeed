import type { Measure, MeasureGroup } from 'src/types'

export const isMeasure = (measure: Measure | MeasureGroup): measure is Measure => {
  return !('children' in measure)
}

export const isMeasureGroup = (measure: Measure | MeasureGroup): measure is MeasureGroup => {
  return 'children' in measure
}

export const isMeasures = (measures: Measure[] | MeasureGroup[]): measures is Measure[] => {
  return measures.every(isMeasure)
}
