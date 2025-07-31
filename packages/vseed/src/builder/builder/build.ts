import type { ISpec } from '@visactor/vchart'
import type { Builder } from './builder'

export const build = (builder: Builder): ISpec => {
  const advancedVSeed = builder.buildAdvanced()
  if (!advancedVSeed) {
    throw new Error('advancedVSeed is null')
  }
  return builder.buildSpec(advancedVSeed)
}
