import { z } from 'zod'
import { ChartTypeBuilderSchema } from './chartType/chartType'
import { DimensionsBuilderSchema } from './dimensions/dimensions'
import { FieldsBuilderSchema } from './fields/fields'
import { MeasuresBuilderSchema } from './measures/measures'
import { WhereFiltersBuilderSchema } from './whereFilters/whereFilters'

export const VBIBuilderSchema = z.object({
  chartType: ChartTypeBuilderSchema,
  measures: MeasuresBuilderSchema,
  dimensions: DimensionsBuilderSchema,
  fields: FieldsBuilderSchema,
  whereFilters: WhereFiltersBuilderSchema,
})

export type VBIBuilder = z.infer<typeof VBIBuilderSchema>
