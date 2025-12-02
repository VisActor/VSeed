export interface VBIDimension {
  alias: string
}

export interface VBIDimensionGroup {
  alias: string
  children: (VBIDimension | VBIDimensionGroup)[]
}

export type VBIDimensionTree = (VBIDimension | VBIDimensionGroup)[]
