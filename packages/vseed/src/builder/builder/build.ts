import type { Spec } from 'src/types'
import type { Builder } from './builder'

export const build = (builder: Builder): Spec => {
  const advancedVSeed = builder.buildAdvanced()
  if (!advancedVSeed) {
    throw new Error('advancedVSeed is null')
  }
  const spec = builder.buildSpec(advancedVSeed)
  return spec
}
