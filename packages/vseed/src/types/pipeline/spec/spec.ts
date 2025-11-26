import type { Pipe } from '../pipeline'
import type { VSeed } from '../../vseed'
import type { AdvancedVSeed } from 'src/types/advancedVSeed'
import type { ISpec } from '@visactor/vchart'
import type {
  ListTableConstructorOptions,
  PivotChartConstructorOptions,
  PivotTableConstructorOptions,
} from '@visactor/vtable'

export type SpecPipelineContext = {
  vseed: VSeed
  advancedVSeed: AdvancedVSeed
}

export type VChartSpecPipe = Pipe<ISpec, SpecPipelineContext>

export type VChartSpecPipeline = VChartSpecPipe[]

export type PivotChartSpecPipe = Pipe<PivotChartConstructorOptions, SpecPipelineContext>

export type PivotChartSpecPipeline = PivotChartSpecPipe[]

export type ListTableSpecPipe = Pipe<ListTableConstructorOptions, SpecPipelineContext>

export type ListTableSpecPipeline = ListTableSpecPipe[]

export type PivotTableSpecPipe = Pipe<PivotTableConstructorOptions, SpecPipelineContext>

export type PivotTableSpecPipeline = PivotTableSpecPipe[]

export type SpecPipe = VChartSpecPipe | PivotChartSpecPipe | ListTableSpecPipe | PivotTableSpecPipe

export type SpecPipeline = SpecPipe[]
