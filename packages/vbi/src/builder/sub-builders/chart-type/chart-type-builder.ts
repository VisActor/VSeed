import * as Y from 'yjs'

export class ChartTypeBuilder {
  private dsl: Y.Map<any>
  constructor(dsl: Y.Map<any>) {
    this.dsl = dsl
  }

  changeChartType(chartType: string) {
    this.dsl.set('chartType', chartType)
  }

  build(): string {
    return this.dsl.get('chartType') || 'table'
  }
}
