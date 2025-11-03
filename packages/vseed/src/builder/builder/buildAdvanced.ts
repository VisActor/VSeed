import type { AdvancedPipelineContext, AdvancedVSeed } from 'src/types'
import { execPipeline } from '../../pipeline'
import { Builder } from './builder'
import { intl } from 'src/i18n'

export const buildAdvanced = (builder: Builder): AdvancedVSeed | null => {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now()
  const { chartType } = builder.vseed
  if (!chartType) {
    throw new Error('chartType is nil in buildAdvanced')
  }

  const pipeline = Builder.getAdvancedPipeline(chartType)
  if (!pipeline) {
    throw new Error(
      `please invoke registerAll or register ${chartType} before build, no advanced pipeline for chartType ${chartType}`,
    )
  }

  const context: AdvancedPipelineContext = {
    vseed: builder.vseed,
    customTheme: Builder.getThemeMap(),
  }
  if (builder.vseed.locale) {
    intl.setLocale(builder.vseed.locale)
  }

  try {
    const advancedVSeed = execPipeline<AdvancedVSeed, AdvancedPipelineContext>(pipeline, context)
    builder.advancedVSeed = advancedVSeed
    return advancedVSeed
  } catch (e) {
    console.error(e)
    throw new Error(`buildAdvanced error: ${(e as Error).message}.\ndetails info in console`)
  } finally {
    const end = typeof performance !== 'undefined' ? performance.now() : Date.now()
    builder.performance['buildAdvanced'] = `${(end - start).toFixed(4)}ms`
  }
}
