import type { ColumnsDefine, ListTableConstructorOptions } from '@visactor/vtable'
import type { Dimension, DimensionGroup, Measure, MeasureGroup, MeasureTree, SpecPipe } from 'src/types'

export const measureTreeToColumns: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const measures = (advancedVSeed as unknown as { measures: MeasureTree }).measures
  const result = { ...spec } as ListTableConstructorOptions

  const eachNode = (node: Measure | MeasureGroup) => {
    if ('children' in node) {
      return {}
    }

    return {
      width: 'auto',
    }
  }
  const columns = treeTreeToColumns<Measure, MeasureGroup>(measures, eachNode)
  return {
    ...result,
    columns: [...(result.columns || []), ...columns] as ListTableConstructorOptions['columns'],
  }
}

export const dimensionTreeToColumns: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const dimensions = (advancedVSeed as unknown as { dimensions: MeasureTree }).dimensions
  const result = { ...spec } as ListTableConstructorOptions
  const eachNode = (node: Measure | MeasureGroup) => {
    if ('children' in node) {
      return {}
    }

    return {
      width: 'auto',
    }
  }
  const columns = treeTreeToColumns<Dimension, DimensionGroup>(dimensions, eachNode)

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
