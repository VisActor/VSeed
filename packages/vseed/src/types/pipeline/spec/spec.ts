import type { Pipe } from '../pipeline'
import type { VSeed } from '../../vseed'
import type { AdvancedVSeed } from 'src/types/advancedVSeed'
import type { Spec } from 'src/types/builder'
import type {
  ListTableConstructorOptions,
  PivotChartConstructorOptions,
  PivotTableConstructorOptions,
} from '@visactor/vtable'

export type SpecPipelineContext = {
  vseed: VSeed
  advancedVSeed: AdvancedVSeed
}

export type SpecPipe<
  T extends Spec | PivotChartConstructorOptions | PivotTableConstructorOptions | ListTableConstructorOptions,
> = Pipe<T, SpecPipelineContext>

export type SpecPipeline<
  T extends Spec | PivotChartConstructorOptions | PivotTableConstructorOptions | ListTableConstructorOptions,
> = SpecPipe<T>[]
