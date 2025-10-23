import { z } from 'zod'
import { zTableConfig } from './table'
import { zLineConfig } from './line'
import { zColumnConfig, zColumnParallelConfig, zColumnPercentConfig } from './column'
import { zBarConfig, zBarParallelConfig, zBarPercentConfig } from './bar'
import { zAreaConfig, zAreaPercentConfig } from './area'
import { zScatterConfig } from './scatter'
import { zDualAxisConfig } from './dualAxis'
import { zDonutConfig, zPieConfig, zRadarConfig } from './pie'
import { zRoseConfig, zRoseParallelConfig } from './rose'
import { zFunnelConfig } from './funnel'
import { zHeatmapConfig } from './heatmap'
import { zPivotTableConfig } from './pivotTable'

export type Config = z.infer<typeof zConfig>
export const zConfig = z.object({
  table: zTableConfig.nullish(),
  pivotTable: zPivotTableConfig.nullish(),

  // cartesian
  line: zLineConfig.nullish(),
  column: zColumnConfig.nullish(),
  columnParallel: zColumnParallelConfig.nullish(),
  columnPercent: zColumnPercentConfig.nullish(),
  bar: zBarConfig.nullish(),
  barParallel: zBarParallelConfig.nullish(),
  barPercent: zBarPercentConfig.nullish(),
  area: zAreaConfig.nullish(),
  areaPercent: zAreaPercentConfig.nullish(),

  scatter: zScatterConfig.nullish(),
  dualAxis: zDualAxisConfig.nullish(),

  // polar
  rose: zRoseConfig.nullish(),
  roseParallel: zRoseParallelConfig.nullish(),
  pie: zPieConfig.nullish(),
  donut: zDonutConfig.nullish(),
  radar: zRadarConfig.nullish(),
  // other
  funnel: zFunnelConfig.nullish(),
  heatmap: zHeatmapConfig.nullish(),
})
