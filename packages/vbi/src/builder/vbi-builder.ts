import * as Y from 'yjs'

import { VSeedDSL } from '@visactor/vseed'
import { DimensionsBuilder } from './sub-builders/dimensions'
import { MeasuresBuilder } from './sub-builders/measures'
import { VBIBuilderInterface, VBIDSL } from 'src/types'
import { VBIConnector, VBIConnectorId } from 'src/types/connector/connector'
import { buildVQuery } from 'src/pipeline'
import { ChartTypeBuilder } from './sub-builders/chart-type'

export class VBIBuilder implements VBIBuilderInterface {
  public doc: Y.Doc
  public dsl: Y.Map<any>
  public undoManager: Y.UndoManager
  public chartType: ChartTypeBuilder
  public measures: MeasuresBuilder
  public dimensions: DimensionsBuilder

  constructor(doc: Y.Doc, dsl: Y.Map<any>) {
    this.doc = doc
    this.dsl = dsl
    this.undoManager = new Y.UndoManager(this.dsl)

    this.chartType = new ChartTypeBuilder(doc, dsl)
    this.measures = new MeasuresBuilder(doc, dsl)
    this.dimensions = new DimensionsBuilder(doc, dsl)
  }

  public applyUpdate(update: Uint8Array) {
    Y.applyUpdate(this.doc, update)
  }

  public encodeStateAsUpdate(targetStateVector?: Uint8Array) {
    return Y.encodeStateAsUpdate(this.doc, targetStateVector)
  }

  public on(event: string, listener: (...args: any[]) => void) {
    this.doc.on(event as any, listener)
  }

  public off(event: string, listener: (...args: any[]) => void) {
    this.doc.off(event as any, listener)
  }

  undo() {
    this.undoManager.undo()
  }

  redo() {
    this.undoManager.redo()
  }

  public buildVSeed = async () => {
    const vbiDSL = this.build()
    const connectorId = vbiDSL.connectorId
    const connector = await VBIBuilder.getConnector(vbiDSL.connectorId)

    const queryDSL = this.buildVQuery()
    const schema = await connector.discoverSchema()
    const queryResult = await connector.query({ queryDSL, schema, connectorId })

    console.log('debug queryDSL', queryDSL)
    return {
      chartType: vbiDSL.chartType,
      dataset: queryResult.dataset,
    } as VSeedDSL
  }

  public buildVQuery = () => {
    const vbiDSL = this.build()
    return buildVQuery(vbiDSL, this)
  }

  public getSchema = async () => {
    const connectorId = this.dsl.get('connectorId')
    const con = await VBIBuilder.getConnector(connectorId)
    const result = await con.discoverSchema()
    return result
  }

  public build = (): VBIDSL => {
    return this.dsl.toJSON() as VBIDSL
  }

  get vbiDSL(): VBIDSL {
    return this.build()
  }

  static from(vbi: VBIDSL) {
    const doc = new Y.Doc()
    const dsl = doc.getMap('vbi_dsl')

    doc.transact(() => {
      if (vbi.connectorId) dsl.set('connectorId', vbi.connectorId)
      if (vbi.chartType) dsl.set('chartType', vbi.chartType)
      if (vbi.theme) dsl.set('theme', vbi.theme)
      if (vbi.locale) dsl.set('locale', vbi.locale)
      if (vbi.version) dsl.set('version', vbi.version)

      if (!dsl.get('measures')) {
        dsl.set('measures', new Y.Array<any>())
      }

      if (!dsl.get('dimensions')) {
        dsl.set('dimensions', new Y.Array<any>())
      }
    })

    return new VBIBuilder(doc, dsl)
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
