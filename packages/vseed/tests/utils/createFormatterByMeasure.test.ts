import { describe, it, expect } from 'vitest'
import { createFormatterByMeasure } from 'src/pipeline/utils/format/createFormatterByMeasure'
import type { Measure, NumFormat } from 'src/types'

const fmt = (f: (v: number | string) => string, v: number | string) => f(v)

describe('createFormatterByMeasure', () => {
  it('returns identity stringifier when measure is undefined', () => {
    const formatter = createFormatterByMeasure(undefined)
    expect(fmt(formatter, 1234)).toBe('1234')
    expect(fmt(formatter, 'abc')).toBe('abc')
  })

  it('uses autoFormatter when autoFormat is true', () => {
    const measure: Measure = { id: 'm', autoFormat: true }
    const formatter = createFormatterByMeasure(measure)
    // autoFormatter should do a reasonable default formatting; we just assert it changes numeric formatting
    expect(fmt(formatter, 1000)).not.toBe('1000')
  })

  it('uses autoFormatter when autoFormat is nullish and no format provided', () => {
    const measure: Measure = { id: 'm' }
    const formatter = createFormatterByMeasure(measure)
    expect(fmt(formatter, 1000)).not.toBe('1000')
  })

  it('prefers numFormat over format when both provided', () => {
    const numFormat: NumFormat = { type: 'percent', fractionDigits: 1 }
    const redundantFormat: NumFormat = { type: 'number', fractionDigits: 0 }
    const measure: Measure = { id: 'm', numFormat, format: redundantFormat }
    const formatter = createFormatterByMeasure(measure)
    expect(fmt(formatter, 0.1234)).toContain('%')
  })

  it('uses format when only format is provided', () => {
    const formatOnly: NumFormat = { type: 'number', fractionDigits: 1 }
    const measure: Measure = { id: 'm', format: formatOnly }
    const formatter = createFormatterByMeasure(measure)
    expect(fmt(formatter, 1.23)).toMatch(/1\.2|1\.23|1\.3/) // allow locale rounding variance
  })

  it('falls back to identity when autoFormat=false and empty numFormat', () => {
    // empty numFormat object should be treated as empty -> createFormatterByMeasure will not auto-format and returns identity
    const emptyNumFormat: NumFormat = {}
    const measure: Measure = { id: 'm', autoFormat: false, numFormat: emptyNumFormat }
    const formatter = createFormatterByMeasure(measure)
    expect(fmt(formatter, 'x')).toBe('x')
  })
})
