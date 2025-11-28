import type { Measure, MeasureGroup, MeasureTree } from 'src/types'
import { preorderTraverse } from '../tree'

export const findMeasureById = (measures: MeasureTree = [], id: string): Measure | undefined => {
  if (!measures) return undefined
  let result: Measure | undefined

  preorderTraverse<Measure, 'children'>(measures, (node) => {
    if (!('children' in node)) {
      if (node.id === id) {
        result = node
        return true
      }
    }
    return false
  })
  return result
}

export const findFirstMeasure = (measures: MeasureTree = []): Measure | undefined => {
  if (!measures) return undefined
  let result: Measure | undefined
  preorderTraverse<Measure, 'children'>(measures, (node) => {
    if (!('children' in node)) {
      result = node
      return true
    }
    return false
  })
  return result
}

export const findAllMeasures = (measures: MeasureTree = []): Measure[] => {
  if (!measures) return []
  const result: Measure[] = []
  preorderTraverse<Measure, 'children'>(measures, (node) => {
    if (!('children' in node)) {
      result.push(node)
    }
    return false
  })
  return result
}

export const hasMultipleMeasureInSingleView = (measures: MeasureTree = []): boolean => {
  if (measures.every((m) => !('children' in m))) {
    return measures.length > 1
  }
  let found = false
  preorderTraverse<Measure, 'children'>(measures, (node) => {
    if ((node as MeasureGroup).children && (node as MeasureGroup).children!.length > 1) {
      found = true
      return true
    }
    return false
  })
  return found
}
