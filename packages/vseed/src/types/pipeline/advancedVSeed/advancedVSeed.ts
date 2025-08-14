import type { AdvancedVSeed } from 'src/types/advancedVSeed'
import type { VSeed } from '../../vseed'
import type { CustomTheme } from '../../properties'
import type { Pipe } from '../pipeline'

export type AdvancedPipelineContext = {
  vseed: VSeed
  customTheme?: CustomTheme
}

export type AdvancedPipe = Pipe<AdvancedVSeed, AdvancedPipelineContext>

export type AdvancedPipeline = Pipe<AdvancedVSeed, AdvancedPipelineContext>[]
