import { VQueryDSL } from '@visactor/vquery'
import { VSeedDSL } from '@visactor/vseed'
import { VBIConnector } from '../types/connector'
import { VBIConnectorId } from '../types/connector/connector'
import { VBIDSL } from '../types/dsl'
import { VBIBuilderInterface } from '../types/builder/VBIInterface'
import { MeasuresBuilder } from './subBuilders'

export class VBIBuilder implements VBIBuilderInterface {
  private vbiDSL: VBIDSL

  constructor(private vbi: VBIDSL) {
    this.vbiDSL = vbi
  }

  get measures(): MeasuresBuilder {
    return MeasuresBuilder.from(this.vbiDSL.measures || [])
  }

  static from: (vbi: VBIDSL) => VBIBuilderInterface = (vbi: VBIDSL) => {
    return new VBIBuilder(vbi)
  }

  buildVSeed: () => VSeedDSL = () => {
    return {} as VSeedDSL
  }

  buildVQuery: () => VQueryDSL = () => {
    return {} as VQueryDSL
  }

  build(): VBIDSL {
    return this.vbiDSL
  }

  static connectorMap: Map<VBIConnectorId, VBIConnector | (() => Promise<VBIConnector>)> = new Map()

  static registerConnector: (id: VBIConnectorId, connector: VBIConnector | (() => Promise<VBIConnector>)) => void = (
    id: VBIConnectorId,
    connector: VBIConnector | (() => Promise<VBIConnector>),
  ) => {
    this.connectorMap.set(id, connector)
  }
}
