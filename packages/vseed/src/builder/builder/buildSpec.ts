import type { Spec } from 'src/types'
import { Builder } from './builder'
import type { AdvancedVSeed, SpecPipelineContext } from 'src/types'
import { execPipeline } from '../../pipeline'
import { intl } from 'src/i18n'

export const buildSpec = (builder: Builder, advancedVSeed: AdvancedVSeed): Spec => {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now()

  const { chartType } = builder.vseed

  const pipeline = Builder.getSpecPipeline(chartType)
  if (!pipeline) {
    throw new Error(
      `please invoke registerAll or register ${chartType} before build, no spec pipeline for chartType ${chartType}`,
    )
  }

  const context: SpecPipelineContext = {
    vseed: builder.vseed,
    advancedVSeed,
  }
  if (builder.vseed.locale) {
    intl.setLocale(builder.vseed.locale)
  }

  try {
    const spec = execPipeline<Spec, SpecPipelineContext>(pipeline, context)
    builder.spec = spec
    return spec
  } catch (e) {
    console.error(e)
    throw new Error(`buildSpec error: ${(e as Error).message}.\ndetails info in console`)
  } finally {
    const end = typeof performance !== 'undefined' ? performance.now() : Date.now()
    builder.performance['buildSpec'] = `${(end - start).toFixed(4)}ms`
  }
}
