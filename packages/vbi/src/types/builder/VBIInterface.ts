import type { VQueryDSL } from '@visactor/vquery'
import type { VBIDSL } from '../dsl'
import type { VSeedDSL } from '@visactor/vseed'

export interface VBIBuilderInterface {
  buildVSeed: () => VSeedDSL
  buildVQuery: () => VQueryDSL
  build: () => VBIDSL
}
