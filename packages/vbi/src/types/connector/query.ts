import { z } from 'zod'
import type { VQueryDSL } from '@visactor/vquery'
import { zVBIConnectorId } from './connector'
import { zSchema } from './schema'

export const zVBIQueryResult = z.object({
  dataset: z.array(z.record(z.string(), z.union([z.number(), z.string(), z.null(), z.undefined(), z.boolean()]))),
})

export type VBIQueryResult = z.infer<typeof zVBIQueryResult>

export const zVBIQueryProps = z.object({
  queryDSL: z.custom<VQueryDSL>(),
  schema: zSchema,
  connectorId: zVBIConnectorId,
})

export type VBIQueryProps = z.infer<typeof zVBIQueryProps>
