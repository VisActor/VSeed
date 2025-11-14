import type { SpecPipelineContext, TableConfig } from 'src/types'
import type { ThemeLike } from './type'
import type { ListTableConstructorOptions, PivotTableConstructorOptions } from '@visactor/vtable'

export const selectionStyle = <T extends ListTableConstructorOptions | PivotTableConstructorOptions>(
  spec: T,
  context: SpecPipelineContext,
): Partial<T> => {
  const result = { ...spec }
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
