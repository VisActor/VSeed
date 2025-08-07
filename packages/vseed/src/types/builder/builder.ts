import type { Spec } from 'src/types'
import type { ChartType, CustomThemeConfig } from '../properties'
import type { VSeed } from '../chartType'
import type { AdvancedPipeline, SpecPipeline } from '../pipeline'
import type { AdvancedVSeed } from '../advancedVSeed'

export interface VSeedBuilder {
  build: () => Spec
  buildAdvanced: () => AdvancedVSeed | null
  buildSpec: (advancedVSeed: AdvancedVSeed) => Spec

  getAdvancedPipeline: (chartType: ChartType) => AdvancedPipeline
  getSpecPipeline: (chartType: ChartType) => SpecPipeline
  getTheme: (themeKey: string) => CustomThemeConfig

  get vseed(): VSeed
  set vseed(value: VSeed)
  get advancedVSeed(): AdvancedVSeed | null
  set advancedVSeed(value: AdvancedVSeed | null)
}
