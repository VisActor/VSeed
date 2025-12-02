import { z } from 'zod'
import { zChartTypeBuilder } from './chartType/chartType'
import { zDimensionsBuilder } from './dimensions/dimensions'
import { zFieldsBuilder } from './fields/fields'
import { zMeasuresBuilder } from './measures/measures'
import { zWhereFiltersBuilder } from './whereFilters/whereFilters'

export const zVBIBuilder = z.object({
  chartType: zChartTypeBuilder,
  measures: zMeasuresBuilder,
  dimensions: zDimensionsBuilder,
  fields: zFieldsBuilder,
  whereFilters: zWhereFiltersBuilder,
})

export type VBIBuilder = z.infer<typeof zVBIBuilder>
