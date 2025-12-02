import { z } from 'zod'

export const VBIDSLLocaleSchema = z.enum(['en-US', 'zh-CN'])
export type VBIDSLLocale = z.infer<typeof VBIDSLLocaleSchema>
