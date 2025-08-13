import { z } from 'zod'
import { zChartType } from './properties/chartType'
import { zDataset } from './properties/dataset'
import { zDimensions } from './properties/dimensions'
import { zMeasures } from './properties/measures'
import { zBackgroundColor } from './properties/baseConfig'

import type { Bar } from './chartType/bar'
import type { BarParallel } from './chartType/barParallel'
import type { Column } from './chartType/column'
import type { ColumnParallel } from './chartType/columnParallel'
import type { ColumnPercent } from './chartType/columnPercent'
import type { Line } from './chartType/line'
import type { Table } from './chartType/table'
import type { Rose } from './chartType/rose'
import type { BarPercent } from './chartType/barPercent'
import type { PivotTable } from './chartType/pivotTable'
import type { Pie } from './chartType/pie'
import type { Donut } from './chartType/donut'
import type { DualAxis } from './chartType/dualAxis'
import type { Area } from './chartType/area'
import type { AreaPercent } from './chartType/areaPercent'
import { zLocale } from './i18n'

export type VSeed =
  | Table
  | PivotTable
  | Line // done
  | Column // done
  | ColumnParallel // done
  | ColumnPercent // done
  | Bar // done
  | BarParallel // done
  | BarPercent // done
  | Area // done
  | AreaPercent // done
  | DualAxis
  | Rose
  | Pie
  | Donut

export const zVSeed = z.object({
  chartType: zChartType,
  dataset: zDataset,
  dimensions: zDimensions.optional(),
  measures: zMeasures.optional(),
  backgroundColor: zBackgroundColor.optional(),
  locale: zLocale.optional(),
})

export const VSeedJSONSchema = z.toJSONSchema(zVSeed)
