import type { Spec } from 'src/types'
import type { Pipe } from '../pipeline'
import type { VSeed } from '../../chartType'
import type { AdvancedVSeed } from 'src/types/advancedVSeed'

export type SpecPipelineContext = {
  vseed: VSeed
  advancedVSeed: AdvancedVSeed
}

export type SpecPipe = Pipe<Spec, SpecPipelineContext>

export type SpecPipeline = SpecPipe[]
