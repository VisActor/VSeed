import type { ISpec } from '@visactor/vchart'
import type { AdvancedVSeed, VSeed } from '../properties'

export interface VSeedBuilder {
  buildAdvanced(): AdvancedVSeed | null
  buildSpec(): ISpec

  get vseed(): VSeed
  get advancedVSeed(): VSeed | null
  set advancedVSeed(value: VSeed | null)
}
