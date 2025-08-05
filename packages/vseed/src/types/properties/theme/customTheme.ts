import { z } from 'zod'
import { zBaseConfig } from '../baseConfig'

export const zCustomThemeConfig = z.object({
  baseConfig: zBaseConfig.optional(),
})

export const zCustomTheme = z.record(z.string(), zCustomThemeConfig).optional()

export type CustomTheme = z.infer<typeof zCustomTheme>
export type CustomThemeConfig = z.infer<typeof zCustomThemeConfig>
