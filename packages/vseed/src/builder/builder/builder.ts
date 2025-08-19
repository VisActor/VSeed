import type {
  AdvancedPipe,
  AdvancedPipeline,
  AdvancedVSeed,
  ChartType,
  CustomThemeConfig,
  Spec,
  SpecPipe,
  SpecPipeline,
  VSeed,
  VSeedBuilder,
} from 'src/types'
import { buildAdvanced } from './buildAdvanced'
import { buildSpec } from './buildSpec'
import { build } from './build'
import { intl } from 'src/i18n'
import { getColorIdMap, getColorItems } from './advanced'

export class Builder implements VSeedBuilder {
  private _vseed: VSeed
  private _advancedVSeed: AdvancedVSeed | null = null
  private _spec: Spec | null = null

  constructor(vseed: VSeed) {
    this._vseed = vseed
    this._vseed.locale = vseed.locale || intl.getLocale()
  }

  build = () => build(this)

  buildSpec = (advanced: AdvancedVSeed) => buildSpec(this, advanced)

  buildAdvanced = () => buildAdvanced(this)

  getAdvancedPipeline = (chartType: ChartType) => {
    const customPipe = Builder._customAdvancedPipe[chartType] as AdvancedPipe
    const pipeline = Builder._advancedPipelineMap[chartType] as AdvancedPipeline
    if (customPipe) {
      pipeline.push(customPipe)
    }
    return pipeline
  }
  getSpecPipeline = (chartType: ChartType) => {
    const customPipe = Builder._customSpecPipe[chartType] as SpecPipe
    const pipeline = Builder._specPipelineMap[chartType] as SpecPipeline
    if (customPipe) {
      pipeline.push(customPipe)
    }
    return pipeline
  }
  getTheme = (themeKey: string) => Builder._themeMap[themeKey]
  getThemeMap = () => Builder._themeMap

  getColorItems = () => getColorItems(this)
  getColorIdMap = () => getColorIdMap(this)

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

  get spec() {
    return this._spec
  }

  set spec(value) {
    this._spec = value
  }

  static _advancedPipelineMap: Partial<Record<ChartType, AdvancedPipeline>> = {}
  static _specPipelineMap: Partial<Record<ChartType, SpecPipeline>> = {}

  static _customAdvancedPipe: Partial<Record<ChartType, AdvancedPipe>> = {}
  static _customSpecPipe: Partial<Record<ChartType, SpecPipe>> = {}

  static _themeMap: Record<string, CustomThemeConfig> = {}
  static from = (vseed: VSeed) => new Builder(vseed)
}
