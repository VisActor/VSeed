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
  private _performance: Record<string, string | number> = {}

  constructor(vseed: VSeed) {
    this._vseed = vseed
    this._vseed.locale = vseed.locale || intl.getLocale()
  }

  /**
   * @description 构建spec
   * @returns spec
   */
  build = <T extends Spec>(): T => build(this) as T

  /**
   * @description 构建spec
   * @param advanced 高级配置
   * @returns spec
   */
  buildSpec = (advanced: AdvancedVSeed): Spec => buildSpec(this, advanced)

  /**
   * @description 构建spec
   * @returns AdvancedVSeed | null
   */
  buildAdvanced = (): AdvancedVSeed | null => buildAdvanced(this)

  /**
   * @description 获取颜色项, 颜色项可以重复,
   * @returns 颜色项
   */
  getColorItems = () => getColorItems(this)

  /**
   * @description 获取颜色id映射
   * @returns 颜色id映射
   */
  getColorIdMap = () => getColorIdMap(this)

  /**
   * @description 获取vseed
   * @returns vseed
   */
  get vseed() {
    return this._vseed
  }

  /**
   * @description 设置vseed
   * @param value vseed
   */
  set vseed(value) {
    this._vseed = value
  }

  /**
   * @description 获取advancedVSeed
   * @returns advancedVSeed
   */
  get advancedVSeed() {
    return this._advancedVSeed
  }

  /**
   *
   * @description 设置advancedVSeed
   * @param value advancedVSeed
   */
  set advancedVSeed(value) {
    this._advancedVSeed = value
  }

  /**
   * @description 获取spec
   * @returns spec
   */
  get spec() {
    return this._spec
  }

  /**
   * @description 设置spec
   * @param value spec
   */
  set spec(value) {
    this._spec = value
  }

  /**
   * @description 获取performance, 统计了构建spec和advancedVSeed的时间
   * @returns performance
   */
  get performance() {
    return this._performance
  }

  /**
   * @description 设置performance
   * @param value performance
   */
  set performance(value) {
    this._performance = value
  }

  /**
   * @description 获取advancedPipeline
   * @param chartType 图表类型
   * @returns advancedPipeline
   */
  static getAdvancedPipeline = (chartType: ChartType) => {
    const customPipe = Builder._customAdvancedPipe[chartType] as AdvancedPipe
    const pipeline = Builder._advancedPipelineMap[chartType] as AdvancedPipeline
    if (customPipe) {
      pipeline.push(customPipe)
    }
    return pipeline
  }

  /**
   * @description 获取specPipeline
   * @param chartType 图表类型
   * @returns specPipeline
   */

  static getSpecPipeline = (chartType: ChartType) => {
    const customPipe = Builder._customSpecPipe[chartType] as SpecPipe
    const pipeline = Builder._specPipelineMap[chartType] as SpecPipeline
    if (customPipe) {
      pipeline.push(customPipe)
    }
    return pipeline
  }

  /**
   * @description 根据主题key获取主题配置
   * @param themeKey 主题key
   * @example Builder.getTheme('light'), 获取浅色主题
   * @returns 主题配置
   */
  static getTheme = (themeKey: string) => Builder._themeMap[themeKey]

  /**
   * @description 获取主题配置映射表
   * @example Builder.getThemeMap()
   * @returns 主题配置映射表
   */
  static getThemeMap = () => Builder._themeMap

  /**
   * @description 从vseed创建builder
   * @param vseed 完整的vseed DSL
   * @returns builder
   */
  static from = (vseed: VSeed) => new Builder(vseed)

  static _advancedPipelineMap: Partial<Record<ChartType, AdvancedPipeline>> = {}
  static _specPipelineMap: Partial<Record<ChartType, SpecPipeline>> = {}
  static _customAdvancedPipe: Partial<Record<ChartType, AdvancedPipe>> = {}
  static _customSpecPipe: Partial<Record<ChartType, SpecPipe>> = {}
  static _themeMap: Record<string, CustomThemeConfig> = {}
}
