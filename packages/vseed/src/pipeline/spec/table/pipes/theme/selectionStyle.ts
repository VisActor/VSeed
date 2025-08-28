import type { BaseTableConstructorOptions } from '@visactor/vtable/es/ts-types'
import type { SpecPipe, TableConfig } from 'src/types'

export const selectionStyle: SpecPipe = (spec, context) => {
  const result = { ...spec } as BaseTableConstructorOptions
  const { advancedVSeed } = context
  const { config, chartType } = advancedVSeed
  const themConfig = config?.[chartType] as TableConfig

  if (!result.theme || !themConfig) return result

  const borderColor = themConfig.selectedBorderColor || 'rgb(224, 224, 224)'
  const backgroundColor = themConfig.selectedBackgroundColor || 'rgb(224, 224, 224, 0.5)'

  result.theme.selectionStyle = {
    cellBorderColor: borderColor,
    cellBorderLineWidth: 2,
    cellBgColor: backgroundColor,
  }

  return result
}
