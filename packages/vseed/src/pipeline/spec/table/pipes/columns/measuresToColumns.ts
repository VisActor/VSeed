import type { ColumnsDefine, ListTableConstructorOptions } from '@visactor/vtable'
import type { FieldFormat } from '@visactor/vtable/es/ts-types'
import { isEmpty } from 'remeda'
import { autoFormatter, createFormatter, isMeasure } from 'src/pipeline/utils'
import type { MeasureGroup, Measure, MeasureTree, SpecPipe, Datum, Locale } from 'src/types'

export const measureTreeToColumns: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { locale } = advancedVSeed
  const measures = (advancedVSeed as unknown as { measures: MeasureTree }).measures
  const result = { ...spec } as ListTableConstructorOptions

  const eachNode = (node: Measure | MeasureGroup) => {
    if (isMeasure(node)) {
      return {
        width: 'auto',
        fieldFormat: fieldFormat(node, locale),
      }
    }

    return {}
  }
  const columns = treeTreeToColumns<Measure, MeasureGroup>(measures, eachNode)
  return {
    ...result,
    columns: [...(result.columns || []), ...columns] as ListTableConstructorOptions['columns'],
  }
}

const fieldFormat =
  (node: Measure, locale: Locale): FieldFormat =>
  (datum: Datum) => {
    const { format = {}, autoFormat = true, id } = node
    const value = datum[id] as number | string | undefined
    if (!isEmpty(format)) {
      const formatter = createFormatter(format)
      return formatter(value)
    }

    if (autoFormat) {
      return autoFormatter(value, locale)
    }

    return
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
