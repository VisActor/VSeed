import type { Measure } from './measures'

export type ScatterMeasure = {
  id: string
  xMeasures?: Measure | Measure[]
  yMeasures?: Measure | Measure[]
}

export type ScatterMeasures = ScatterMeasure[]
