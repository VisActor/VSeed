import type {
  AdvancedPipeline,
  AdvancedPipelineContext,
  AdvancedVSeed,
} from 'src/types'
import { execPipeline } from '../../pipeline'
import type { Builder } from './builder'

export const buildAdvanced = (builder: Builder): AdvancedVSeed | null => {
  const vseed = builder.vseed
  const { chartType } = vseed
  const pipeline = builder.getAdvancedPipeline(chartType) as AdvancedPipeline
  if (!pipeline) {
    throw new Error(`no advanced pipeline for chartType ${chartType}`)
  }
  const context = {
    vseed,
  }
  const advancedVSeed = execPipeline<AdvancedVSeed, AdvancedPipelineContext>(
    pipeline,
    {},
    context,
  )
  return advancedVSeed
}
