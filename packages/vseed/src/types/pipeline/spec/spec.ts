import type { ISpec } from '@visactor/vchart'
import type { AdvancedVSeed, VSeed } from '../../properties'
import type { Pipe } from '../pipeline'

export type SpecPipelineContext = {
  vseed: VSeed
  advancedVSeed: AdvancedVSeed
}

export type SpecPipe = Pipe<ISpec, SpecPipelineContext>

export type SpecPipeline = SpecPipe[]
