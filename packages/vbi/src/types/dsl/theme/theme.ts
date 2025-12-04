import { z } from 'zod'

export const zVBIDSLTheme = z.enum(['light', 'dark'])
export type VBIDSLTheme = z.infer<typeof zVBIDSLTheme>
