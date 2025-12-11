import { preorderTraverse } from '../../../utils'
import { VBIMeasure, VBIMeasureGroup, VBIMeasureTree } from '../../../types'
import { MeasureNodeBuilder } from './measureNodeBuilder'
import { BuilderContext } from 'src/builder'

export class MeasuresBuilder {
  private readonly measures: MeasureNodeBuilder[] = []
  private readonly context: BuilderContext
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

    const measureNode = MeasureNodeBuilder.from({ ...defaultMeasure })
    this.measures.push(measureNode)
    if (callback) {
      callback(measureNode)
      return this
    } else {
      return measureNode
    }
  }

  build(): VBIMeasure[] {
    return this.measures.map((measureNode) => measureNode.build())
  }

  constructor(context: BuilderContext) {
    this.context = context
  }

  static from(measures: VBIMeasureTree, context: BuilderContext): MeasuresBuilder {
    const builder = new MeasuresBuilder(context)
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
