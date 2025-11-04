import type { SpecPipe, TableConfig } from 'src/types'
import type { ThemeLike, WithTheme } from './type'

export const selectionStyle: SpecPipe = (spec, context) => {
  const result = { ...spec } as Partial<typeof spec> & WithTheme
  const { advancedVSeed } = context
  const { config, chartType } = advancedVSeed
  const themConfig = config?.[chartType] as TableConfig

  if (!result.theme || !themConfig) return result

  const borderColor = themConfig.selectedBorderColor || 'rgb(224, 224, 224)'
  const backgroundColor = themConfig.selectedBackgroundColor || 'rgb(224, 224, 224, 0.5)'

  ;(result.theme as ThemeLike).selectionStyle = {
    cellBorderColor: borderColor,
    cellBorderLineWidth: 2,
    cellBgColor: backgroundColor,
  }

  return result
}
