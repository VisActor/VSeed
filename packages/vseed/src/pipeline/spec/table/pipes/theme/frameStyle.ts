import type { BaseTableConstructorOptions } from '@visactor/vtable/es/ts-types'
import type { SpecPipe, TableConfig } from 'src/types'

export const frameStyle: SpecPipe = (spec, context) => {
  const result = { ...spec } as BaseTableConstructorOptions
  const { advancedVSeed } = context
  const { customTheme, chartType } = advancedVSeed
  const themConfig = customTheme?.config?.[chartType] as TableConfig

  if (!result.theme || !themConfig) return result

  const borderColor = themConfig.borderColor || 'rgb(224, 224, 224)'

  result.theme.frameStyle = {
    borderColor,
    borderLineWidth: 0,
    cornerRadius: 0,
  }

  return result
}
