import type { Axis } from './axis'

export type XBandAxis = Omit<Axis, 'min' | 'max' | 'nice' | 'zero'>
export type YBandAxis = Omit<Axis, 'min' | 'max' | 'nice' | 'zero'>
