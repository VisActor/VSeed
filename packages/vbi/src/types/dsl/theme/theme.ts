import { z } from 'zod'

export const VBIDSLThemeSchema = z.enum(['light', 'dark'])
export type VBIDSLTheme = z.infer<typeof VBIDSLThemeSchema>
