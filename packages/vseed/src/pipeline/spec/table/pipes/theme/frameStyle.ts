import type { SpecPipelineContext, TableConfig } from 'src/types'
import type { ThemeLike } from './type'
import type { ListTableConstructorOptions, PivotTableConstructorOptions } from '@visactor/vtable'

export const frameStyle = <T extends ListTableConstructorOptions | PivotTableConstructorOptions>(
  spec: T,
  context: SpecPipelineContext,
): Partial<T> => {
  const result = { ...spec }
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

  return result
}
