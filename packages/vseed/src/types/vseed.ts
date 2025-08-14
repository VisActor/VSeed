import { z } from 'zod'

import { zBar, type Bar } from './chartType/bar'
import { zBarParallel, type BarParallel } from './chartType/barParallel'
import { zColumn, type Column } from './chartType/column'
import { zColumnParallel, type ColumnParallel } from './chartType/columnParallel'
import { zColumnPercent, type ColumnPercent } from './chartType/columnPercent'
import { zLine, type Line } from './chartType/line'
import type { Table } from './chartType/table'
import type { Rose } from './chartType/rose'
import { zBarPercent, type BarPercent } from './chartType/barPercent'
import type { PivotTable } from './chartType/pivotTable'
import { zPie, type Pie } from './chartType/pie'
import type { Donut } from './chartType/donut'
import type { DualAxis } from './chartType/dualAxis'
import { zArea, type Area } from './chartType/area'
import { zAreaPercent, type AreaPercent } from './chartType/areaPercent'

export type VSeed =
  | Table
  | PivotTable
  | Line
  | Column
  | ColumnParallel
  | ColumnPercent
  | Bar
  | BarParallel
  | BarPercent
  | Area
  | AreaPercent
  | DualAxis
  | Rose
  | Pie
  | Donut

export const zVSeed = z.discriminatedUnion('chartType', [
  zLine,
  zColumn,
  zColumnParallel,
  zColumnPercent,
  zBar,
  zBarParallel,
  zBarPercent,
  zArea,
  zAreaPercent,
  zPie,
  // zRose,
  // zDualAxis,
  // zDonut,
])
