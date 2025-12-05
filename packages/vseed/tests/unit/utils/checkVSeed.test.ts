import { describe, it, expect } from 'vitest'
import { checkVSeed } from 'src/pipeline/utils/valid'
import type { VSeed } from 'src/types'

// helper to call checkVSeed with unknown to avoid compile-time narrowing on purposefully invalid shapes
const call = (v: unknown) => () => checkVSeed(v as VSeed)

const baseValid: VSeed = {
  chartType: 'table',
  dataset: [{}],
}

describe('checkVSeed', () => {
  it('passes with minimal valid vseed', () => {
    expect(call(baseValid)).not.toThrow()
  })

  it('throws when chartType is missing', () => {
    const { dataset } = baseValid
    const bad = { dataset }
    expect(call(bad)).toThrowError('chartType is required')
  })

  it('throws when dataset is missing', () => {
    const bad = { chartType: 'table' }
    expect(call(bad)).toThrowError('dataset is required, and must be an array')
  })

  it('throws when dataset is empty array', () => {
    const bad = { chartType: 'table', dataset: [] }
    expect(call(bad)).toThrowError('dataset is required, and must be an array')
  })

  it('throws when dimensions is not array', () => {
    const bad = { ...baseValid, dimensions: {} }
    expect(call(bad)).toThrowError('dimensions must be an array')
  })

  it('throws when measures is not array', () => {
    const bad = { ...baseValid, measures: {} }
    expect(call(bad)).toThrowError('measures must be an array')
  })
})
