import type { VSeed } from '../../chartType'
import type { AdvancedVSeed } from '../../properties'
import type { Pipe } from '../pipeline'

export type AdvancedPipelineContext = {
  vseed: VSeed
}

export type AdvancedPipe = Pipe<AdvancedVSeed, AdvancedPipelineContext>

export type AdvancedPipeline = Pipe<AdvancedVSeed, AdvancedPipelineContext>[]
