/**
 * @description 维度
 */
export type Dimension = {
  id: string
  alias?: string
  location?: 'dimension' | 'rowDimension' | 'columnDimension'
}

/**
 * @description 维度组
 */
export type DimensionGroup = {
  id: string
  alias?: string
  children?: (Dimension | DimensionGroup)[]
}

export type Dimensions = Dimension[]

export type DimensionTree = (Dimension | DimensionGroup)[]
