import { z } from 'zod'
import { zBaseConfig } from '../baseConfig'
import { zConfig } from '../config'
import { zAnnotation } from '../annotation'
import { zMarkStyle } from '../markStyle'

export const zCustomThemeConfig = z.object({
  baseConfig: zBaseConfig.optional(),
  config: zConfig.optional(),
  annotation: zAnnotation.optional(),
  markStyle: zMarkStyle.optional(),
})

export const zCustomTheme = z.record(z.string(), zCustomThemeConfig).optional()

export type CustomTheme = z.infer<typeof zCustomTheme>
export type CustomThemeConfig = z.infer<typeof zCustomThemeConfig>
