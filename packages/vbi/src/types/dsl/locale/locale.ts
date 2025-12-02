import { z } from 'zod'

export const zVBIDSLLocale = z.enum(['en-US', 'zh-CN'])
export type VBIDSLLocale = z.infer<typeof zVBIDSLLocale>
