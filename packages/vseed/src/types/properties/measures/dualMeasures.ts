import type { Measure } from './measures'

export type DualMeasure = {
  id: string
  primaryMeasures?: Omit<Measure, 'encoding' | 'parentId'> | Omit<Measure, 'encoding' | 'parentId'>[]
  secondaryMeasures?: Omit<Measure, 'encoding' | 'parentId'> | Omit<Measure, 'encoding' | 'parentId'>[]
}

export type DualMeasures = DualMeasure[]
