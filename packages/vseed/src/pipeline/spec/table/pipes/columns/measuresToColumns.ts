import type { ColumnsDefine, ListTableConstructorOptions } from '@visactor/vtable'
import type { MeasureTree, SpecPipe } from 'src/types'

export const measureTreeToColumns: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const measures = (advancedVSeed as unknown as { measures: MeasureTree }).measures
  const result = { ...spec } as ListTableConstructorOptions
  const columns = treeTreeToColumns(measures)
  return {
    ...result,
    columns: [...(result.columns || []), ...columns] as ListTableConstructorOptions['columns'],
  }
}

export const dimensionTreeToColumns: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const dimensions = (advancedVSeed as unknown as { dimensions: MeasureTree }).dimensions
  const result = { ...spec } as ListTableConstructorOptions
  const columns = treeTreeToColumns(dimensions)
  return {
    ...result,
    columns: [...(result.columns || []), ...columns] as ListTableConstructorOptions['columns'],
  }
}

const treeTreeToColumns = (tree: MeasureTree = []): ColumnsDefine[] => {
  const result = tree.map((item) => {
    const field = item.id
    const title = item.alias ?? item.id

    if ('children' in item && Array.isArray(item.children)) {
      // group
      return {
        field,
        title,
        columns: treeTreeToColumns(item.children),
      }
    } else {
      // leaf
      return {
        field,
        title,
      }
    }
  }) as unknown as ColumnsDefine[]

  return result || []
}
