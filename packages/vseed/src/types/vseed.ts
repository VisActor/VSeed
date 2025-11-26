import type {
  Area,
  AreaPercent,
  Bar,
  BarParallel,
  BarPercent,
  Boxplot,
  Column,
  ColumnParallel,
  ColumnPercent,
  Donut,
  DualAxis,
  Funnel,
  Heatmap,
  Histogram,
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
  | Boxplot
  | Histogram
