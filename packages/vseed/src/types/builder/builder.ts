import type { Spec } from 'src/types'
import type { ChartType, CustomThemeConfig } from '../properties'
import type { VSeed } from '../vseed'
import type { AdvancedPipeline, SpecPipeline } from '../pipeline'
import type { AdvancedVSeed } from '../advancedVSeed'

export abstract class VSeedBuilder {
  abstract build: () => Spec
  abstract buildAdvanced: () => AdvancedVSeed | null
  abstract buildSpec: (advancedVSeed: AdvancedVSeed) => Spec

  static getAdvancedPipeline: (chartType: ChartType) => AdvancedPipeline
  static getSpecPipeline: (chartType: ChartType) => SpecPipeline
  static getTheme: (themeKey: string) => CustomThemeConfig
  static getThemeMap: () => Record<string, CustomThemeConfig>

  abstract getColorItems: () => { id: string; alias: string }[]
  abstract getColorIdMap: () => Record<string, string>

  abstract get spec(): Spec | null
  abstract set spec(value: Spec | null)
  abstract get vseed(): VSeed
  abstract set vseed(value: VSeed)
  abstract get advancedVSeed(): AdvancedVSeed | null
  abstract set advancedVSeed(value: AdvancedVSeed | null)
}
