import type { AdvancedPipelineContext, AdvancedVSeed } from 'src/types'
import { execPipeline } from '../../pipeline'
import { Builder } from './builder'

export const buildAdvanced = (builder: Builder): AdvancedVSeed | null => {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now()
  const { chartType } = builder.vseed
  if (!chartType) {
    throw new Error('chartType is nil in buildAdvanced')
  }

  const pipeline = Builder.getAdvancedPipeline(chartType)
  if (!pipeline) {
    throw new Error(`no advanced pipeline for chartType ${chartType}`)
  }

  const context: AdvancedPipelineContext = {
    vseed: builder.vseed,
    customTheme: Builder.getThemeMap(),
  }

  try {
    return execPipeline<AdvancedVSeed, AdvancedPipelineContext>(pipeline, context)
  } catch (e) {
    console.error(e)
    throw new Error(`buildAdvanced error, see error info in console`)
  } finally {
    const end = typeof performance !== 'undefined' ? performance.now() : Date.now()
    builder.performance['buildAdvanced'] = `${(end - start).toFixed(4)}ms`
  }
}
