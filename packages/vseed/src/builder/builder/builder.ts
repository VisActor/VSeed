import type {
  AdvancedPipeline,
  AdvancedVSeed,
  ChartType,
  CustomThemeConfig,
  SpecPipeline,
  VSeed,
  VSeedBuilder,
} from 'src/types'
import { buildAdvanced } from './buildAdvanced'
import { buildSpec } from './buildSpec'
import { build } from './build'

export class Builder implements VSeedBuilder {
  private _vseed: VSeed
  private _advancedVSeed: AdvancedVSeed | null = null

  static _advancedPipelineMap: Partial<Record<ChartType, AdvancedPipeline>> = {}
  static _specPipelineMap: Partial<Record<ChartType, SpecPipeline>> = {}
  static _themeMap: Record<string, CustomThemeConfig> = {}
  static from = (vseed: VSeed) => new Builder(vseed)

  constructor(vseed: VSeed) {
    this._vseed = vseed
  }

  build = () => build(this)

  buildSpec = (advanced: AdvancedVSeed) => buildSpec(this, advanced)

  buildAdvanced = () => buildAdvanced(this)

  getAdvancedPipeline = (chartType: ChartType) => Builder._advancedPipelineMap[chartType] as AdvancedPipeline
  getSpecPipeline = (chartType: ChartType) => Builder._specPipelineMap[chartType] as SpecPipeline
  getTheme = (themeKey: string) => Builder._themeMap[themeKey]
  getThemeMap = () => Builder._themeMap

  get vseed() {
    return this._vseed
  }

  set vseed(value) {
    this._vseed = value
  }

  get advancedVSeed() {
    return this._advancedVSeed
  }

  set advancedVSeed(value) {
    this._advancedVSeed = value
  }
}
