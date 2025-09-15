import type {
  Area,
  AreaPercent,
  Bar,
  BarParallel,
  BarPercent,
  Column,
  ColumnParallel,
  ColumnPercent,
  Donut,
  DualAxis,
  Funnel,
  Heatmap,
  Line,
  Pie,
  PivotTable,
  Radar,
  Rose,
  RoseParallel,
  Scatter,
  Table,
} from './chartType'

export type VSeed =
  // table
  | Table
  | PivotTable

  // cartesian
  | Line
  | Column
  | ColumnParallel
  | ColumnPercent
  | Bar
  | BarParallel
  | BarPercent
  | Area
  | AreaPercent
  | Scatter
  | DualAxis

  // polar
  | Rose
  | RoseParallel
  | Pie
  | Donut
  | Radar

  // other
  | Funnel
  | Heatmap
