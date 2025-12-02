import { preorderTraverse } from 'src/utils/tree/traverse'
import { VBIMeasure, VBIMeasureGroup, VBIMeasureTree } from '../../../types'
import { MeasureNodeBuilder } from './measureNodeBuilder'

export class MeasuresBuilder {
  private readonly measures: MeasureNodeBuilder[] = []

  addMeasure(fieldOrMeasure: VBIMeasure['field'] | VBIMeasure): MeasureNodeBuilder
  addMeasure(
    fieldOrMeasure: VBIMeasure['field'] | VBIMeasure,
    callback?: (measureNode: MeasureNodeBuilder) => void,
  ): MeasureNodeBuilder {
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

    const measureNode = MeasureNodeBuilder.from({ ...defaultMeasure })
    this.measures.push(measureNode)
    if (callback) {
      callback(measureNode)
    }
    return measureNode
  }

  build(): VBIMeasure[] {
    return this.measures.map((measureNode) => measureNode.build())
  }

  static from(measures: VBIMeasureTree): MeasuresBuilder {
    const builder = new MeasuresBuilder()
    preorderTraverse(measures, (measure) => {
      if (this.isMeasureNode(measure)) {
        builder.addMeasure(measure)
      } else if (this.isMeasureGroup(measure)) {
        // builder.addMeasureGroup(measure)
      }
      return false
    })
    return builder
  }

  static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure {
    return 'field' in node
  }

  static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup {
    return 'children' in node
  }
}
