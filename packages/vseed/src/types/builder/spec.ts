import type {
  PivotChartConstructorOptions,
  PivotTableConstructorOptions,
  ListTableConstructorOptions,
} from '@visactor/vtable'
import type { ISpec } from '@visactor/vchart'

export type Spec = ISpec | PivotChartConstructorOptions | PivotTableConstructorOptions | ListTableConstructorOptions
