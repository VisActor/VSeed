import { DiscoverSchema } from './schema'
import { VBIQueryProps, VBIQueryResult } from './query'

export type VBIConnectorId = string

export interface VBIConnector {
  discoverSchema: DiscoverSchema
  query: (queryProps: VBIQueryProps) => Promise<VBIQueryResult>
}
