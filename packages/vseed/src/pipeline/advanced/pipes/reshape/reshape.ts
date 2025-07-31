import type { AdvancedPipe } from 'src/types'

export const reshape: AdvancedPipe = (result, context) => {
  const { vseed } = context
  console.log(vseed)
  return result
}
