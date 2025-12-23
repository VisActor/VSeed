import type { VQueryDSL } from '@visactor/vquery'
import type { VBIDSL } from '../dsl'
import type { VSeedDSL } from '@visactor/vseed'
import { MeasuresBuilder, DimensionsBuilder } from 'src/builder/sub-builders'

export interface VBIBuilderInterface {
  measures: MeasuresBuilder
  dimensions: DimensionsBuilder
  buildVSeed: () => Promise<VSeedDSL>
  buildVQuery: () => VQueryDSL
  build: () => VBIDSL

  get vbiDSL(): VBIDSL

  applyUpdate: (update: Uint8Array, origin?: any) => void
  encodeStateAsUpdate: (targetStateVector?: Uint8Array) => Uint8Array
  on: (event: string, listener: (...args: any[]) => void) => void
  off: (event: string, listener: (...args: any[]) => void) => void
}
