import type { Measure, MeasureGroup, MeasureTree } from 'src/types'
import { preorderTraverse } from '../tree'

export const findMeasureById = (measures: MeasureTree = [], id: string): Measure | undefined => {
  if (!measures) return undefined
  let result: Measure | undefined
  preorderTraverse<Measure, MeasureGroup>(measures, (node) => {
    if (!('children' in node)) {
      if (node.id === id) {
        result = node as Measure
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
  preorderTraverse<Measure, MeasureGroup>(measures, (node) => {
    if (!('children' in node)) {
      result = node as Measure
      return true
    }
    return false
  })
  return result
}

export const findAllMeasures = (measures: MeasureTree = []): Measure[] => {
  if (!measures) return []
  const result: Measure[] = []
  preorderTraverse<Measure, MeasureGroup>(measures, (node) => {
    if (!('children' in node)) {
      result.push(node as Measure)
    }
    return false
  })
  return result
}
