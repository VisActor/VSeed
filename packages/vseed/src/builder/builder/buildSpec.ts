import type { ISpec } from '@visactor/vchart'
import type { Builder } from './builder'
import type { AdvancedVSeed, SpecPipelineContext } from 'src/types'
import { execPipeline } from '../../pipeline'

export const buildSpec = (
  builder: Builder,
  advancedVSeed: AdvancedVSeed,
): ISpec => {
  const { chartType } = builder.vseed
  if (!chartType) {
    throw new Error('chartType is nil in buildSpec')
  }

  const pipeline = builder.getSpecPipeline(chartType)
  if (!pipeline) {
    throw new Error(`no spec pipeline for chartType ${chartType}`)
  }

  const context: SpecPipelineContext = {
    vseed: builder.vseed,
    advancedVSeed,
  }
  try {
    return execPipeline<ISpec, SpecPipelineContext>(pipeline, {}, context)
  } catch (e) {
    console.error(e)
    throw new Error(`buildSpec error, see error info in console`)
  }
}
