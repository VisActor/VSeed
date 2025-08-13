import { z } from 'zod'

export type Locale = 'zh-CN' | 'en-US'

export type TranslateRecordType = Record<string, { [local in Locale]: string }>

export const zLocale = z.enum(['zh-CN', 'en-US']).default('zh-CN')
