import type { ISpec } from '@visactor/vchart'
import type { Pipe } from '../pipeline'
import type { VSeed } from '../../chartType'
import type { AdvancedVSeed } from 'src/types/advancedVSeed'

export type SpecPipelineContext = {
  vseed: VSeed
  advancedVSeed: AdvancedVSeed
}

export type SpecPipe = Pipe<ISpec, SpecPipelineContext>

export type SpecPipeline = SpecPipe[]
