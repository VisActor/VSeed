import { lineConfig } from './line'
import { columnConfig } from './column'
import { pieConfig } from './pie'
import { dualAxisConfig } from './dualAxis'
import { scatterConfig } from './scatter'
import { histogramConfig } from './histogram'
import { boxplotConfig } from './boxplot'

export { lineConfig, columnConfig, pieConfig, dualAxisConfig, scatterConfig, histogramConfig, boxplotConfig }

// area
export const areaConfig = lineConfig
export const areaPercentConfig = lineConfig

// bar
export const barConfig = columnConfig
export const barParallelConfig = columnConfig
export const barPercentConfig = columnConfig

// column
export const columnParallelConfig = columnConfig
export const columnPercentConfig = columnConfig

// donut, rose
export const donutConfig = pieConfig
export const roseConfig = pieConfig
export const roseParallelConfig = pieConfig
export const radarConfig = pieConfig

// funnel, heatmap
export const funnelConfig = pieConfig
export const heatmapConfig = pieConfig
