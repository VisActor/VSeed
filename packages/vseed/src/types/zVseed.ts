import { z } from 'zod'

import { zBar } from './chartType/bar'
import { zBarParallel } from './chartType/barParallel'
import { zColumn } from './chartType/column'
import { zColumnParallel } from './chartType/columnParallel'
import { zColumnPercent } from './chartType/columnPercent'
import { zLine } from './chartType/line'
import { zRose } from './chartType/rose'
import { zBarPercent } from './chartType/barPercent'
import { zPie } from './chartType/pie'
import { zDonut } from './chartType/donut'
import { zArea } from './chartType/area'
import { zAreaPercent } from './chartType/areaPercent'
import {
  zBoxplot,
  zDualAxis,
  zFunnel,
  zHeatmap,
  zHistogram,
  zPivotTable,
  zRadar,
  zRoseParallel,
  zScatter,
  zTable,
} from './chartType'

export const zVSeed = z.discriminatedUnion('chartType', [
  zTable,
  zPivotTable,
  // cartesian
  zLine,
  zColumn,
  zColumnParallel,
  zColumnPercent,
  zBar,
  zBarParallel,
  zBarPercent,
  zArea,
  zAreaPercent,
  zScatter,
  zDualAxis,
  // polar
  zPie,
  zDonut,
  zRose,
  zRoseParallel,
  zRadar,
  // other
  zFunnel,
  zHeatmap,
  zBoxplot,
  zHistogram,
])
