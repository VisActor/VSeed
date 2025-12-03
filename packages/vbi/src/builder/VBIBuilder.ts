import { VQueryDSL } from '@visactor/vquery'
import { VSeedDSL } from '@visactor/vseed'
import { VBIConnector } from '../types/connector'
import { VBIConnectorId } from '../types/connector/connector'
import { VBIDSL } from '../types/dsl'
import { VBIBuilderInterface } from '../types/builder/VBIInterface'
import { MeasuresBuilder } from './subBuilders'

export class VBIBuilder implements VBIBuilderInterface {
  private vbiDSL: VBIDSL

  measures: MeasuresBuilder
  constructor(private vbi: VBIDSL) {
    this.vbiDSL = vbi
    this.measures = MeasuresBuilder.from(vbi.measures || [])
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
    const result = {
      ...this.vbiDSL,
      measures: this.measures.build(),
    }
    return result
  }

  static connectorMap: Map<VBIConnectorId, VBIConnector | (() => Promise<VBIConnector>)> = new Map()

  static registerConnector: (id: VBIConnectorId, connector: VBIConnector | (() => Promise<VBIConnector>)) => void = (
    id: VBIConnectorId,
    connector: VBIConnector | (() => Promise<VBIConnector>),
  ) => {
    this.connectorMap.set(id, connector)
  }
}
