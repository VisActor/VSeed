import type { VQueryDSL } from '@visactor/vquery'
import { VBIConnectorId } from './connector'
import { Schema } from './schema'

export type VBIQueryResult = {
  dataset: Record<string, number | string | null | undefined | boolean>[]
}

export type VBIQueryProps = {
  queryDSL: VQueryDSL
  schema: Schema
  connectorId: VBIConnectorId
}
