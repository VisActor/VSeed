import { isNullish } from 'remeda'
import translateMap from './i18nData.json'
import type { Locale, TranslateRecordType } from '../types'

class Intl {
  private static instance: Intl

  private translateMap: TranslateRecordType = translateMap as unknown as TranslateRecordType
  private locale: Locale = 'zh-CN'

  canTranslate = (value: string) => !!this.translateMap[value]

  /**
   * @example i18n`指标名称`
   */
  i18n = (segments: TemplateStringsArray, ...values: Array<number | string>) => {
    const text = segments.map((segment, index) => segment + (values[index] || '')).join('')

    const translatedText = this.translateMap?.[text]?.[this.locale]
    if (isNullish(translatedText)) {
      console.warn(`i18n ${this.locale} no translate: ${text}`)
      return text
    }
    return translatedText
  }

  setLocale = (locale: Locale): void => {
    this.locale = locale
  }

  getLocale: () => Locale = () => this.locale

  public static getInstance() {
    if (!Intl.instance) {
      Intl.instance = new Intl()
    }

    return Intl.instance
  }
}

const intl = Intl.getInstance()

const i18n = intl.i18n

export { intl, i18n }
