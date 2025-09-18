import type { BaseTableConstructorOptions } from '@visactor/vtable/es/ts-types'
import type { SpecPipe, TableConfig } from 'src/types'

export const frameStyle: SpecPipe = (spec, context) => {
  const result = { ...spec } as BaseTableConstructorOptions
  const { advancedVSeed } = context
  const { config, chartType } = advancedVSeed
  const themConfig = config?.[chartType] as TableConfig

  if (!result.theme || !themConfig) return result

  const borderColor = themConfig.borderColor || 'rgb(224, 224, 224)'

  result.theme.frameStyle = {
    borderColor,
    borderLineWidth: 1,
    cornerRadius: 4,
  }

  return result
}
