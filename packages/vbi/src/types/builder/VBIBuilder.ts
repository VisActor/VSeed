import { ChartTypeBuilder } from './chartType'
import { DimensionsBuilder } from './dimensions'
import { FieldsBuilder } from './fields'
import { MeasuresBuilder } from './measures'
import { WhereFiltersBuilder } from './whereFilters'

export interface VBIBuilder {
  chartType: ChartTypeBuilder
  measures: MeasuresBuilder
  dimensions: DimensionsBuilder
  fields: FieldsBuilder
  whereFilters: WhereFiltersBuilder
}
