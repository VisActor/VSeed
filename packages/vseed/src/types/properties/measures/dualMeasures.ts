import type { Measure } from './measures'

export type DualMeasure = {
  primaryAlias?: string
  primaryMeasures?: Measure | Measure[]

  secondaryAlias?: string
  secondaryMeasures?: Measure | Measure[]
}

export type DualMeasures = DualMeasure[]
