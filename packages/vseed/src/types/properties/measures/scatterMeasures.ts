import type { Measure } from './measures'

export type ScatterMeasure = {
  xMeasures?: Measure | Measure[]
  yMeasures?: Measure | Measure[]
}

export type ScatterMeasures = ScatterMeasure[]
