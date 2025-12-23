import * as Y from 'yjs'
import { VBIDimension, VBIDimensionGroup, VBIDimensionTree } from '../../../types'
import { DimensionNodeBuilder } from './dimension-node-builder'

export class DimensionsBuilder {
  constructor(private yArray: Y.Array<any>) {}

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

    const yMap = new Y.Map<any>()
    for (const [key, value] of Object.entries(defaultDimension)) {
      yMap.set(key, value)
    }

    this.yArray.push([yMap])
    const dimensionNode = new DimensionNodeBuilder(yMap)

    if (callback) {
      callback(dimensionNode)
      return this
    } else {
      return dimensionNode
    }
  }

  build(): VBIDimension[] {
    return this.yArray.toJSON()
  }

  static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension {
    return 'alias' in node && !('children' in node)
  }

  static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup {
    return 'children' in node
  }
}
