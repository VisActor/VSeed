import { z } from 'zod'
import { zConfig } from '../config'

export const zCustomThemeConfig = z.object({
  config: zConfig.nullish(),
})

export const zCustomTheme = z.record(z.string(), zCustomThemeConfig).nullish()

export type CustomTheme = z.infer<typeof zCustomTheme>
export type CustomThemeConfig = z.infer<typeof zCustomThemeConfig>
