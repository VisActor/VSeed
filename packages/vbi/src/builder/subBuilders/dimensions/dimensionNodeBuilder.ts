import { VBIDimension } from 'src/types'

export class DimensionNodeBuilder {
  private dimensionNode: VBIDimension

  constructor(dimensionNode: VBIDimension) {
    this.dimensionNode = dimensionNode
  }

  setAlias(alias: string): this {
    this.dimensionNode.alias = alias
    return this
  }

  build(): VBIDimension {
    return { ...this.dimensionNode }
  }

  static from(dimensionNode: VBIDimension): DimensionNodeBuilder {
    return new DimensionNodeBuilder(dimensionNode)
  }
}
