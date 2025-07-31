import type { ISpec } from '@visactor/vchart'
import type { AdvancedVSeed, VSeed } from '../properties'

export interface VSeedBuilder {
  build: () => ISpec
  buildAdvanced: () => AdvancedVSeed | null
  buildSpec: (advancedVSeed: AdvancedVSeed) => ISpec

  get vseed(): VSeed
  get advancedVSeed(): VSeed | null
  set advancedVSeed(value: VSeed | null)
}
