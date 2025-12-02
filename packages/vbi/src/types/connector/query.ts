import { z } from 'zod'
import type { VQueryDSL } from '@visactor/vquery'
import { VBIConnectorIdSchema } from './connector'
import { SchemaSchema } from './schema'

export const VBIQueryResultSchema = z.object({
  dataset: z.array(z.record(z.string(), z.union([z.number(), z.string(), z.null(), z.undefined(), z.boolean()]))),
})

export type VBIQueryResult = z.infer<typeof VBIQueryResultSchema>

export const VBIQueryPropsSchema = z.object({
  queryDSL: z.custom<VQueryDSL>(),
  schema: SchemaSchema,
  connectorId: VBIConnectorIdSchema,
})

export type VBIQueryProps = z.infer<typeof VBIQueryPropsSchema>
