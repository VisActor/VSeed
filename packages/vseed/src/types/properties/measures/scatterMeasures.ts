import type { Measure } from './measures'

export type ScatterMeasure = {
  id: string
  xMeasures?: Omit<Measure, 'encoding' | 'parentId'> | Omit<Measure, 'encoding' | 'parentId'>[]
  yMeasures?: Omit<Measure, 'encoding' | 'parentId'> | Omit<Measure, 'encoding' | 'parentId'>[]
}

export type ScatterMeasures = ScatterMeasure[]
