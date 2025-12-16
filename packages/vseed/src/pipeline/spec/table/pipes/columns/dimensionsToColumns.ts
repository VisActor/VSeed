import type { ColumnsDefine, ListTableConstructorOptions } from '@visactor/vtable'
import { isMeasure } from 'src/pipeline/utils'
import type { Dimension, DimensionGroup, DimensionTree, ListTableSpecPipe } from 'src/types'

export const dimensionTreeToColumns: ListTableSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const dimensionTree = (advancedVSeed as unknown as { dimensionTree: DimensionTree }).dimensionTree
  const result = { ...spec } as ListTableConstructorOptions
  const eachNode = (node: Dimension | DimensionGroup) => {
    if (isMeasure(node)) {
      return {
        width: 'auto',
      }
    }

    return {}
  }
  const columns = treeTreeToColumns<Dimension, DimensionGroup>(dimensionTree, eachNode)

  return {
    ...result,
    columns: [...(result.columns || []), ...columns] as ListTableConstructorOptions['columns'],
  }
}

const treeTreeToColumns = <
  T extends { id: string; alias?: string },
  U extends { id: string; alias?: string; children?: (T | U)[] },
>(
  tree: (T | U)[],
  callback?: (node: T | U) => object,
): ColumnsDefine[] => {
  const result = tree.map((item) => {
    if ('children' in item && Array.isArray(item.children)) {
      const groupNode = item as unknown as U
      const field = groupNode.id
      const title = groupNode.alias ?? groupNode.id
      const props = callback?.(groupNode) || {}
      // group
      return {
        field,
        title,
        columns: treeTreeToColumns(item.children, callback),
        ...props,
      }
    } else {
      const field = item.id
      const title = item.alias ?? item.id
      const props = callback?.(item) || {}
      // leaf
      return {
        field,
        title,
        ...props,
      }
    }
  }) as unknown as ColumnsDefine[]

  return result || []
}
