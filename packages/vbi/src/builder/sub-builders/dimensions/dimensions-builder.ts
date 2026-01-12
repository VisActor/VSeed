import * as Y from 'yjs'
import { VBIDimension, VBIDimensionGroup, VBIDimensionTree } from '../../../types'
import { DimensionNodeBuilder } from './dimension-node-builder'

export class DimensionsBuilder {
  private dsl: Y.Map<any>
  private doc: Y.Doc
  constructor(doc: Y.Doc, dsl: Y.Map<any>) {
    this.doc = doc
    this.dsl = dsl
  }

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

    this.dsl.get('dimensions').push([yMap])
    const dimensionNode = new DimensionNodeBuilder(yMap)

    if (callback) {
      callback(dimensionNode)
      return this
    } else {
      return dimensionNode
    }
  }

  removeDimension(field: VBIDimension['field']) {
    const dimensions = this.dsl.get('dimensions')
    const index = dimensions.toArray().findIndex((item: any) => item.get('field') === field)
    if (index !== -1) {
      this.dsl.get('dimensions').delete(index, 1)
    }
  }

  getDimensions(): VBIDimension[] {
    return this.dsl.get('dimensions').toJSON()
  }

  static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension {
    return 'alias' in node && !('children' in node)
  }

  static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup {
    return 'children' in node
  }
}
