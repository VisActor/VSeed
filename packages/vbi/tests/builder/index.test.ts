import { VBI } from '@visactor/vbi'
import { VBIDSL } from 'src/types/dsl'

describe('VBIBuilder', () => {
  test('build', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    expect(builder.build()).toMatchInlineSnapshot(`
      {
        "measures": [],
      }
    `)
  })
})
