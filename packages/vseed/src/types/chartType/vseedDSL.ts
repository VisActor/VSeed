import type { Bar } from './bar'
import type { BarParallel } from './barParallel'
import type { Column } from './column'
import type { ColumnParallel } from './columnParallel'
import type { ColumnPercent } from './columnPercent'
import type { Line } from './line'
import type { Table } from './table'
import type { Rose } from './rose'
import type { BarPercent } from './barPercent'
import type { PivotTable } from './pivotTable'
import type { Pie } from './pie'
import type { Donut } from './donut'
import type { DualAxis } from './dualAxis'
import type { Area } from './area'
import type { AreaPercent } from './areaPercent'

export type VSeedDSL =
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
