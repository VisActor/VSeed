import { VSeedDSL } from '@visactor/vseed'
import { VBIConnector } from '../types/connector'
import { VBIConnectorId } from '../types/connector/connector'
import { VBIDSL } from '../types/dsl'
import { VBIBuilderInterface } from '../types/builder/VBIInterface'
import { MeasuresBuilder, DimensionsBuilder } from './subBuilders'
import { BuilderContext } from './context'
import { buildVQuery } from 'src/pipeline'

export class VBIBuilder implements VBIBuilderInterface {
  private _vbiDSL: VBIDSL

  measures: MeasuresBuilder
  dimensions: DimensionsBuilder
  constructor(private vbi: VBIDSL) {
    this._vbiDSL = vbi
    const context = BuilderContext.from(this)
    this.measures = MeasuresBuilder.from(vbi.measures || [], context)
    this.dimensions = DimensionsBuilder.from(vbi.dimensions || [], context)
  }

  public buildVSeed = async () => {
    const connectorId = this._vbiDSL.connectorId
    const connector = await VBIBuilder.getConnector(this._vbiDSL.connectorId)

    const queryDSL = this.buildVQuery()
    const schema = await connector.discoverSchema()
    const queryResult = await connector.query({ queryDSL, schema, connectorId })

    console.log('debug queryDSL', queryDSL)
    return {
      chartType: 'table',
      dataset: queryResult.dataset,
    } as VSeedDSL
  }

  public buildVQuery = () => {
    return buildVQuery(this.build(), this)
  }

  public build(): VBIDSL {
    const result = {
      ...this._vbiDSL,
      measures: this.measures.build(),
      dimensions: this.dimensions.build(),
    }
    return result
  }

  public get vbiDSL(): VBIDSL {
    return this._vbiDSL
  }

  private static connectorMap: Map<VBIConnectorId, VBIConnector | (() => Promise<VBIConnector>)> = new Map()
  public static registerConnector: (
    id: VBIConnectorId,
    connector: VBIConnector | (() => Promise<VBIConnector>),
  ) => void = (id: VBIConnectorId, connector: VBIConnector | (() => Promise<VBIConnector>)) => {
    this.connectorMap.set(id, connector)
  }

  public static getConnector = async (id: VBIConnectorId) => {
    const connector = this.connectorMap.get(id)
    if (!connector) {
      throw new Error(`connector ${id} not registered`)
    }
    if (typeof connector === 'function') {
      return connector()
    }
    return connector
  }

  public static from: (vbi: VBIDSL) => VBIBuilderInterface = (vbi: VBIDSL) => {
    return new VBIBuilder(vbi)
  }

  public static generateEmptyDSL = (connectorId: VBIConnectorId): VBIDSL => {
    return {
      connectorId: connectorId,
      chartType: 'table',
      measures: [],
      dimensions: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 0,
    }
  }
}
