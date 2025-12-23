import * as Y from 'yjs'
import { VBIMeasure, VBIMeasureGroup, VBIMeasureTree } from '../../../types'
import { MeasureNodeBuilder } from './measure-node-builder'

export class MeasuresBuilder {
  private dsl: Y.Map<any>
  private doc: Y.Doc
  constructor(doc: Y.Doc, dsl: Y.Map<any>) {
    this.doc = doc
    this.dsl = dsl
  }

  addMeasure(fieldOrMeasure: VBIMeasure['field'] | VBIMeasure): MeasureNodeBuilder
  addMeasure(
    fieldOrMeasure: VBIMeasure['field'] | VBIMeasure,
    callback: (measureNode: MeasureNodeBuilder) => void,
  ): MeasuresBuilder
  addMeasure(
    fieldOrMeasure: VBIMeasure['field'] | VBIMeasure,
    callback?: (measureNode: MeasureNodeBuilder) => void,
  ): MeasureNodeBuilder | MeasuresBuilder {
    const defaultMeasure: VBIMeasure = {} as VBIMeasure
    if (typeof fieldOrMeasure === 'string') {
      defaultMeasure.alias = fieldOrMeasure
      defaultMeasure.field = fieldOrMeasure
      defaultMeasure.encoding = 'yAxis'
      defaultMeasure.aggregate = { func: 'sum' }
    } else {
      defaultMeasure.alias = fieldOrMeasure.alias
      defaultMeasure.field = fieldOrMeasure.field
      defaultMeasure.encoding = fieldOrMeasure.encoding
      defaultMeasure.aggregate = fieldOrMeasure.aggregate
    }

    const yMap = new Y.Map<any>()

    for (const [key, value] of Object.entries(defaultMeasure)) {
      yMap.set(key, value)
    }
    this.dsl.get('measures').push([yMap])

    const measureNode = new MeasureNodeBuilder(yMap)

    if (callback) {
      callback(measureNode)
      return this
    } else {
      return measureNode
    }
  }

  build(): VBIMeasure[] {
    return this.dsl.get('measures').toJSON()
  }

  static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure {
    return 'field' in node
  }

  static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup {
    return 'children' in node
  }
}
