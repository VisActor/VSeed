import type { ISpec } from '@visactor/vchart'
import type { AdvancedVSeed } from '../../properties'
import type { Pipe } from '../pipeline'
import type { VSeed } from '../../chartType'

export type SpecPipelineContext = {
  vseed: VSeed
  advancedVSeed: AdvancedVSeed
}

export type SpecPipe = Pipe<ISpec, SpecPipelineContext>

export type SpecPipeline = SpecPipe[]
