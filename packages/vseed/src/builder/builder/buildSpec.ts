import type { ISpec } from '@visactor/vchart'
import type { Builder } from './builder'
import type { SpecPipeline, SpecPipelineContext } from 'src/types'
import { execPipeline } from '../../pipeline'

export const buildSpec = (builder: Builder): ISpec => {
  const advancedVSeed = builder.buildAdvanced()
  if (!advancedVSeed) {
    throw new Error('advancedVSeed is null')
  }
  const context: SpecPipelineContext = {
    vseed: builder.vseed,
    advancedVSeed,
  }
  const pipeline = builder.getSpecPipeline(
    builder.vseed.chartType,
  ) as SpecPipeline
  const spec = execPipeline<ISpec, SpecPipelineContext>(pipeline, {}, context)
  return spec
}
