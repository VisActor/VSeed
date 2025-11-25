import { VQueryDSL } from '@visactor/vquery'
import { VBI } from './dsl'
import { Spec, VSeedDSL } from '@visactor/vseed'
import { VBIBuilder } from './builder'
import { VBIConnector, VBIConnectorId } from './connector/connector'

export interface VBIInterface {
  from: (vbi: VBI) => VBIBuilder

  buildSpec: () => Spec
  buildVSeed: () => VSeedDSL
  buildVQuery: () => VQueryDSL

  registerConnector: (id: VBIConnectorId, connector: VBIConnector | (() => Promise<VBIConnector>)) => void
}
