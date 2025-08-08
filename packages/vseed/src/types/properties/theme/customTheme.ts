import { z } from 'zod'
import { zBaseConfig } from '../baseConfig'
import { zConfig } from '../config'

export const zCustomThemeConfig = z.object({
  baseConfig: zBaseConfig.optional(),
  config: zConfig.optional(),
})

export const zCustomTheme = z.record(z.string(), zCustomThemeConfig).optional()

export type CustomTheme = z.infer<typeof zCustomTheme>
export type CustomThemeConfig = z.infer<typeof zCustomThemeConfig>
