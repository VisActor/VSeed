import * as convert from 'src/sql-builder'

describe('convert index export', () => {
  it('has convertDSLToSQL function', () => {
    expect(typeof convert.convertDSLToSQL).toBe('function')
  })
})
