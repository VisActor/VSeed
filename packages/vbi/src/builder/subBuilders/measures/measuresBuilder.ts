import { VBIMeasure } from '../../../types'
import { MeasureNodeBuilder } from './measureNodeBuilder'

export class MeasuresBuilder {
  private readonly measures: VBIMeasure[] = []

  addMeasure(measure: Pick<VBIMeasure, 'field'> & Partial<VBIMeasure>): MeasureNodeBuilder {
    const defaultMeasure: VBIMeasure = {
      alias: measure.field,
      encoding: 'yAxis',
      aggregate: { func: 'sum' },
      ...measure,
    }
    this.measures.push({ ...defaultMeasure, ...measure })
    return MeasureNodeBuilder.from({ ...defaultMeasure, ...measure })
  }

  build(): VBIMeasure[] {
    return this.measures
  }
}
