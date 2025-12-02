import { z } from 'zod'
import type { VQueryDSL } from '@visactor/vquery'
import type { VBI } from './dsl'
import type { VBIBuilder } from './builder'
import type { Spec, VSeedDSL } from '@visactor/vseed'
import type { VBIConnector, VBIConnectorId } from './connector/connector'

export const VBIInterfaceSchema = z.object({
  from: z.custom<(vbi: VBI) => VBIBuilder>(),
  buildSpec: z.custom<() => Spec>(),
  buildVSeed: z.custom<() => VSeedDSL>(),
  buildVQuery: z.custom<() => VQueryDSL>(),
  registerConnector: z.custom<(id: VBIConnectorId, connector: VBIConnector | (() => Promise<VBIConnector>)) => void>(),
})

export type VBIInterface = z.infer<typeof VBIInterfaceSchema>
