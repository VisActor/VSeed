import type { ISpec } from '@visactor/vchart'
import type { AdvancedVSeed } from '../properties'
import type { VSeed } from '../chartType'

export interface VSeedBuilder {
  build: () => ISpec
  buildAdvanced: () => AdvancedVSeed | null
  buildSpec: (advancedVSeed: AdvancedVSeed) => ISpec

  get vseed(): VSeed
  get advancedVSeed(): AdvancedVSeed | null
  set advancedVSeed(value: AdvancedVSeed | null)
}
