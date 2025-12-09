import type { PivotTableSpecPipe, TableConfig } from 'src/types'
import type { ThemeLike, WithTheme } from './type'

export const tableThemeStyle: PivotTableSpecPipe = (spec, context) => {
  const result = { ...spec } as Partial<typeof spec> & WithTheme
  const { advancedVSeed } = context
  const { config, chartType } = advancedVSeed
  const themConfig = config?.[chartType] as TableConfig

  if (!result.theme || !themConfig) return result

  const borderColor = themConfig.borderColor || 'rgb(224, 224, 224)'

  ;(result.theme as ThemeLike).frameStyle = {
    borderColor,
    borderLineWidth: 1,
    cornerRadius: 4,
  }
  result.theme.scrollStyle = {
    visible: 'scrolling',
    hoverOn: true,
  }

  return result
}
