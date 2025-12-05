import { z } from 'zod'
import { zDiscoverSchema } from './schema'
import type { VBIQueryProps, VBIQueryResult } from './query'

export const zVBIConnectorId = z.string()
export type VBIConnectorId = z.infer<typeof zVBIConnectorId>

export const zVBIConnector = z.object({
  discoverSchema: zDiscoverSchema,
  query: z.custom<(queryProps: VBIQueryProps) => Promise<VBIQueryResult>>(),
})

export type VBIConnector = z.infer<typeof zVBIConnector>
