import { inlineParameters } from 'src/sql-builder/compile/inlineParameters'

describe('inlineParameters extra paths', () => {
  it('params exist but no placeholders', () => {
    const sql = 'select 1'
    const out = inlineParameters(sql, [123])
    expect(out).toBe('select 1')
  })
})
