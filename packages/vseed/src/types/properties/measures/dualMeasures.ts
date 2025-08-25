import type { Measure } from './measures'

export type DualMeasure = {
  primaryMeasures?: Measure | Measure[]

  secondaryMeasures?: Measure | Measure[]
}

export type DualMeasures = DualMeasure[]
