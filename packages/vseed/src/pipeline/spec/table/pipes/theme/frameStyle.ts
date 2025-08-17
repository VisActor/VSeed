import type { BaseTableConstructorOptions } from '@visactor/vtable/es/ts-types'
import type { SpecPipe } from 'src/types'

export const frameStyle: SpecPipe = (spec) => {
  const result = { ...spec } as BaseTableConstructorOptions
  if (!result.theme) result.theme = {}
  const borderColor = 'rgb(224, 224, 224)'

  result.theme.frameStyle = {
    borderColor,
    borderLineWidth: 0,
    cornerRadius: 0,
  }

  return result
}
