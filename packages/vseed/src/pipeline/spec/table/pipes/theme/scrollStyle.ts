import type { SpecPipe, Spec } from 'src/types'
import type { ThemeLike, WithTheme } from './type'

export const frameStyle: SpecPipe<Spec> = (spec) => {
  const result = { ...spec } as Partial<typeof spec> & WithTheme
  if (!result.theme) return result
  ;(result.theme as ThemeLike).scrollStyle = {
    hoverOn: true,
    visible: 'focus',
    width: 7,
  }

  return result
}
