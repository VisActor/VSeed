import type { AdvancedPipelineContext, AdvancedVSeed } from 'src/types'
import { execPipeline } from '../../pipeline'
import type { Builder } from './builder'

export const buildAdvanced = (builder: Builder): AdvancedVSeed | null => {
  const { chartType } = builder.vseed
  if (!chartType) {
    throw new Error('chartType is nil in buildAdvanced')
  }

  const pipeline = builder.getAdvancedPipeline(chartType)
  if (!pipeline) {
    throw new Error(`no advanced pipeline for chartType ${chartType}`)
  }

  const context = {
    vseed: builder.vseed,
  }

  try {
    return execPipeline<AdvancedVSeed, AdvancedPipelineContext>(
      pipeline,
      {},
      context,
    )
  } catch (e) {
    console.error(e)
    throw new Error(`buildAdvanced error, see error info in console`)
  }
}
