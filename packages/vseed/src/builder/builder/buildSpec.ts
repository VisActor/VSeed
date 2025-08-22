import type { Spec } from 'src/types'
import { Builder } from './builder'
import type { AdvancedVSeed, SpecPipelineContext } from 'src/types'
import { execPipeline } from '../../pipeline'

export const buildSpec = (builder: Builder, advancedVSeed: AdvancedVSeed): Spec => {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now()

  const { chartType } = builder.vseed
  if (!chartType) {
    throw new Error('chartType is nil in buildSpec')
  }

  const pipeline = Builder.getSpecPipeline(chartType)
  if (!pipeline) {
    throw new Error(`no spec pipeline for chartType ${chartType}`)
  }

  const context: SpecPipelineContext = {
    vseed: builder.vseed,
    advancedVSeed,
  }
  try {
    return execPipeline<Spec, SpecPipelineContext>(pipeline, context)
  } catch (e) {
    console.error(e)
    throw new Error(`buildSpec error, see error info in console`)
  } finally {
    const end = typeof performance !== 'undefined' ? performance.now() : Date.now()
    builder.performance['buildSpec'] = `${(end - start).toFixed(4)}ms`
  }
}
