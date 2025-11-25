export type Schema = Array<{
  name: string
  type: string
}>

export type DiscoverSchema = () => Promise<Schema>
