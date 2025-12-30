import * as Y from 'yjs'

import { VSeedDSL } from '@visactor/vseed'
import { DimensionsBuilder } from './sub-builders/dimensions'
import { MeasuresBuilder } from './sub-builders/measures'
import { VBIDSL, VBIBuilderInterface } from 'src/types'
import { buildVQuery } from 'src/pipeline'
import { ChartTypeBuilder } from './sub-builders/chart-type'
import { getConnector } from './connector'
import { VQueryDSL } from '@visactor/vquery'

export class VBIBuilder implements VBIBuilderInterface {
  public doc: Y.Doc
  public dsl: Y.Map<any>
  public undoManager: Y.UndoManager

  public chartType: ChartTypeBuilder
  public measures: MeasuresBuilder
  public dimensions: DimensionsBuilder

  constructor(doc: Y.Doc) {
    this.doc = doc
    this.dsl = doc.get('dsl') as Y.Map<any>

    this.undoManager = new Y.UndoManager(this.dsl)
    this.chartType = new ChartTypeBuilder(doc, this.dsl)
    this.measures = new MeasuresBuilder(doc, this.dsl)
    this.dimensions = new DimensionsBuilder(doc, this.dsl)
  }

  public applyUpdate(update: Uint8Array) {
    Y.applyUpdate(this.doc, update)
  }

  public encodeStateAsUpdate(targetStateVector?: Uint8Array) {
    return Y.encodeStateAsUpdate(this.doc, targetStateVector)
  }

  public buildVSeed = async (): Promise<VSeedDSL> => {
    const vbiDSL = this.build()
    const connectorId = vbiDSL.connectorId
    const connector = await getConnector(vbiDSL.connectorId)

    const queryDSL = this.buildVQuery()
    const schema = await connector.discoverSchema()
    const queryResult = await connector.query({ queryDSL, schema, connectorId })

    console.log('debug queryDSL', queryDSL)
    return {
      chartType: vbiDSL.chartType,
      dataset: queryResult.dataset,
    } as VSeedDSL
  }

  public buildVQuery = (): VQueryDSL => {
    const vbiDSL = this.build()
    return buildVQuery(vbiDSL, this)
  }

  public build = (): VBIDSL => {
    return this.dsl.toJSON() as VBIDSL
  }

  public getSchema = async () => {
    const connectorId = this.dsl.get('connectorId')
    const con = await getConnector(connectorId)
    const result = await con.discoverSchema()
    return result
  }
}
