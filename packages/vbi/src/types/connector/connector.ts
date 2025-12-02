import { z } from 'zod'
import { DiscoverSchemaSchema } from './schema'
import type { VBIQueryProps, VBIQueryResult } from './query'

export const VBIConnectorIdSchema = z.string()
export type VBIConnectorId = z.infer<typeof VBIConnectorIdSchema>

export const VBIConnectorSchema = z.object({
  discoverSchema: DiscoverSchemaSchema,
  query: z.custom<(queryProps: VBIQueryProps) => Promise<VBIQueryResult>>(),
})

export type VBIConnector = z.infer<typeof VBIConnectorSchema>
