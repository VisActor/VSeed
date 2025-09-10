import type { Measure } from './measures'

export type DualMeasure = {
  id: string
  primaryMeasures?: Measure | Measure[]
  secondaryMeasures?: Measure | Measure[]
}

export type DualMeasures = DualMeasure[]
