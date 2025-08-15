import { z } from 'zod'
import { zConfig } from '../config'

export const zCustomThemeConfig = z.object({
  config: zConfig.optional(),
})

export const zCustomTheme = z.record(z.string(), zCustomThemeConfig).optional()

export type CustomTheme = z.infer<typeof zCustomTheme>
export type CustomThemeConfig = z.infer<typeof zCustomThemeConfig>
