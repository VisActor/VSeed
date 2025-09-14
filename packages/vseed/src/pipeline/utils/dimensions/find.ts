// TODO: 未来可能有用的函数, 需要时再取消注释

// import type { Dimension, DimensionGroup, DimensionTree } from 'src/types'
// import { preorderTraverse } from '../tree'

// export const findDimensionById = (dimensions: DimensionTree = [], id: string): Dimension | undefined => {
//   if (!dimensions) return undefined
//   let result: Dimension | undefined
//   preorderTraverse<Dimension, DimensionGroup>(dimensions, (node) => {
//     if (!('children' in node)) {
//       if (node.id === id) {
//         result = node as Dimension
//         return true
//       }
//     }
//     return false
//   })
//   return result
// }

// export const findFirstDimension = (dimensions: DimensionTree = []): Dimension | undefined => {
//   if (!dimensions) return undefined
//   let result: Dimension | undefined
//   preorderTraverse<Dimension, DimensionGroup>(dimensions, (node) => {
//     if (!('children' in node)) {
//       result = node as Dimension
//       return true
//     }
//     return false
//   })
//   return result
// }

// export const findAllDimensions = (dimensions: DimensionTree = []): Dimension[] => {
//   if (!dimensions) return []
//   const result: Dimension[] = []
//   preorderTraverse<Dimension, DimensionGroup>(dimensions, (node) => {
//     if (!('children' in node)) {
//       result.push(node as Dimension)
//     }
//     return false
//   })
//   return result
// }
