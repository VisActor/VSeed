import type { Measure, MeasureGroup, Measures } from 'src/types'

export function findMeasureById(measures: Measures, id: string): Measure | undefined {
  if (!measures) return undefined

  // Use a stack to avoid recursion
  const stack: (Measure | MeasureGroup)[] = [...measures]

  while (stack.length > 0) {
    const current = stack.pop()

    if (!current) continue

    // Check if current item matches the ID
    if (current.id === id && !('children' in current)) {
      return current
    }

    // If it's a group with children, add them to the stack
    if ('children' in current && current.children) {
      stack.push(...current.children)
    }
  }

  return undefined
}
