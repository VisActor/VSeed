import type { BaseTableConstructorOptions } from '@visactor/vtable/es/ts-types'
import type { SpecPipe } from 'src/types'

export const frameStyle: SpecPipe = (spec) => {
  const result = { ...spec } as BaseTableConstructorOptions
  if (!result.theme) result.theme = {}

  result.theme.scrollStyle = {
    hoverOn: true,
    visible: 'focus',
    width: 7,
  }

  return result
}
