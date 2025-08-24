import type { Measure } from './measures'

export type DualMeasure = {
  primaryAlias?: string
  primaryMeasures?: Measure | Measure[]

  secondaryMeasures?: Measure | Measure[]
  secondaryAlias?: string
}

export type DualMeasures = DualMeasure[]
