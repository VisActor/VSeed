import type { VSeed } from '../../chartType'
import type { AdvancedVSeed, CustomTheme } from '../../properties'
import type { Pipe } from '../pipeline'

export type AdvancedPipelineContext = {
  vseed: VSeed
  customTheme?: CustomTheme
}

export type AdvancedPipe = Pipe<AdvancedVSeed, AdvancedPipelineContext>

export type AdvancedPipeline = Pipe<AdvancedVSeed, AdvancedPipelineContext>[]
