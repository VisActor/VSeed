import type { VQueryDSL } from '@visactor/vquery'
import type { VBIDSL } from '../dsl'
import type { VSeedDSL } from '@visactor/vseed'
import { MeasuresBuilder } from 'src'

export interface VBIBuilderInterface {
  measures: MeasuresBuilder
  buildVSeed: () => VSeedDSL
  buildVQuery: () => VQueryDSL
  build: () => VBIDSL
}
