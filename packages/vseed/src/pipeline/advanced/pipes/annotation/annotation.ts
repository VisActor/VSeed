import { pick } from 'remeda'
import type { AdvancedPipe, AdvancedVSeed } from 'src/types'

export const annotation: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context

  const annotation = pick(vseed, ['annotationPoint']) as AdvancedVSeed['annotation']

  return { ...advancedVSeed, annotation }
}
