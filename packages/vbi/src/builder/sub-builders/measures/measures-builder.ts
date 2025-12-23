import * as Y from 'yjs'
import { VBIMeasure, VBIMeasureGroup, VBIMeasureTree } from '../../../types'
import { MeasureNodeBuilder } from './measure-node-builder'

export class MeasuresBuilder {
  private measures: Y.Array<any>
  constructor(dsl: Y.Map<any>) {
    this.measures = dsl.get('measures') || new Y.Array<any>()
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

    this.measures.push([yMap])
    const measureNode = new MeasureNodeBuilder(yMap)

    if (callback) {
      callback(measureNode)
      return this
    } else {
      return measureNode
    }
  }

  build(): VBIMeasure[] {
    return this.measures.toJSON()
  }

  static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure {
    return 'field' in node
  }

  static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup {
    return 'children' in node
  }
}
