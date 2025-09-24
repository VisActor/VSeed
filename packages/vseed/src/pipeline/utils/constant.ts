// 标注层 z-index
export const ANNOTATION_Z_INDEX = 1000
// 线性轴 顶部空隙 预留5px
export const LINEAR_AXIS_INNER_OFFSET_TOP = 7
// 双轴图 柱图 ZIndex
export const DUAL_AXIS_CHART_COLUMN_Z_INDEX = 1000
// 双轴图 非柱图 ZIndex
export const DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX = 1001
// 双轴图 标注层 ZIndex
export const DUAL_AXIS_LABEL_Z_INDEX = 1002
// 默认父级id
export const DEFAULT_PARENT_ID = '__DefaultParentId__'

// 图表类型枚举
export const ChartTypeEnum = {
  Table: 'table',
  PivotTable: 'pivotTable',
  // cartesian
  Line: 'line',
  Column: 'column',
  ColumnPercent: 'columnPercent',
  ColumnParallel: 'columnParallel',
  Bar: 'bar',
  BarPercent: 'barPercent',
  BarParallel: 'barParallel',
  Area: 'area',
  AreaPercent: 'areaPercent',
  DualAxis: 'dualAxis',
  Scatter: 'scatter',
  // polar
  Rose: 'rose',
  RoseParallel: 'roseParallel',
  Pie: 'pie',
  Donut: 'donut',
  Radar: 'radar',
  // other
  Funnel: 'funnel',
  Heatmap: 'heatmap',
} as const
