import { preorderTraverse } from '../../../utils'
import { VBIDimension, VBIDimensionGroup, VBIDimensionTree } from 'src/types/dsl'
import { DimensionNodeBuilder } from './dimensionNodeBuilder'
import { BuilderContext } from 'src/builder'

export class DimensionsBuilder {
  private readonly dimensions: DimensionNodeBuilder[] = []
  private readonly context: BuilderContext

  addDimension(fieldOrDimension: VBIDimension['field'] | VBIDimension): DimensionNodeBuilder
  addDimension(
    fieldOrDimension: VBIDimension['field'] | VBIDimension,
    callback: (dimensionNode: DimensionNodeBuilder) => void,
  ): DimensionsBuilder
  addDimension(
    fieldOrDimension: VBIDimension['field'] | VBIDimension,
    callback?: (dimensionNode: DimensionNodeBuilder) => void,
  ): DimensionNodeBuilder | DimensionsBuilder {
    const defaultDimension: VBIDimension = {} as VBIDimension
    if (typeof fieldOrDimension === 'string') {
      defaultDimension.alias = fieldOrDimension
      defaultDimension.field = fieldOrDimension
    } else {
      defaultDimension.alias = fieldOrDimension.alias
      defaultDimension.field = fieldOrDimension.field || fieldOrDimension.alias
    }

    const dimensionNode = DimensionNodeBuilder.from({ ...defaultDimension })
    this.dimensions.push(dimensionNode)
    if (callback) {
      callback(dimensionNode)
      return this
    } else {
      return dimensionNode
    }
  }

  build(): VBIDimension[] {
    return this.dimensions.map((dimensionNode) => dimensionNode.build())
  }

  constructor(context: BuilderContext) {
    this.context = context
  }

  static from(dimensions: VBIDimensionTree, context: BuilderContext): DimensionsBuilder {
    const builder = new DimensionsBuilder(context)
    preorderTraverse(dimensions, (dimension) => {
      if (this.isDimensionNode(dimension)) {
        builder.addDimension(dimension)
      } else if (this.isDimensionGroup(dimension)) {
        // builder.addDimensionGroup(dimension)
      }
      return false
    })
    return builder
  }

  static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension {
    return 'alias' in node && !('children' in node)
  }

  static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup {
    return 'children' in node
  }
}
