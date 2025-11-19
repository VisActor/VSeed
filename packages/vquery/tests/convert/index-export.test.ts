import * as convert from 'src/dataset/convert'

describe('convert index export', () => {
  it('has convertDSLToSQL function', () => {
    expect(typeof convert.convertDSLToSQL).toBe('function')
  })
})
