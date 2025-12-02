import { VBIMeasure } from 'src/types'

export class MeasureNodeBuilder {
  private measureNode: VBIMeasure

  constructor(measureNode: VBIMeasure) {
    this.measureNode = measureNode
  }

  setAlias(alias: string): this {
    this.measureNode.alias = alias
    return this
  }

  setEncoding(encoding: VBIMeasure['encoding']): this {
    this.measureNode.encoding = encoding
    return this
  }

  setAggregate(aggregate: VBIMeasure['aggregate']): this {
    this.measureNode.aggregate = aggregate
    return this
  }

  static from(measureNode: VBIMeasure): MeasureNodeBuilder {
    return new MeasureNodeBuilder(measureNode)
  }
}
