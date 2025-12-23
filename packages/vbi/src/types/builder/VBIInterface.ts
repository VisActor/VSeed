import type { VQueryDSL } from '@visactor/vquery'
import type { VBIDSL } from '../dsl'
import type { VSeedDSL } from '@visactor/vseed'
import { MeasuresBuilder, DimensionsBuilder } from 'src/builder-yjs/sub-builders'

export interface VBIBuilderInterface {
  measures: MeasuresBuilder
  dimensions: DimensionsBuilder
  buildVSeed: () => Promise<VSeedDSL>
  buildVQuery: () => VQueryDSL
  build: () => VBIDSL

  get vbiDSL(): VBIDSL
}
