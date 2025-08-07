import type { Spec } from 'src/types'
import type { Builder } from './builder'

export const build = (builder: Builder): Spec => {
  console.log('debug vseed', builder.vseed)
  const advancedVSeed = builder.buildAdvanced()
  console.log('debug advancedVSeed', advancedVSeed)
  if (!advancedVSeed) {
    throw new Error('advancedVSeed is null')
  }
  const spec = builder.buildSpec(advancedVSeed)
  console.log('debug spec', spec)
  return spec
}
