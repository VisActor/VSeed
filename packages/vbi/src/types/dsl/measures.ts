export interface VBIMeasure {
  alias: string
}

export interface VBIMeasureGroup {
  alias: string
  children: (VBIMeasure | VBIMeasureGroup)[]
}

export type VBIMeasureTree = (VBIMeasure | VBIMeasureGroup)[]
