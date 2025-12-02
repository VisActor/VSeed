import { VBI } from '@visactor/vbi'
import { VBIDSL } from 'src/types/dsl'

describe('VBIBuilder', () => {
  test('build', () => {
    const vbiDSL = {} as VBIDSL
    const vbiBuilder = VBI.from(vbiDSL)
    const newVBIDSL = vbiBuilder.build()
    expect(newVBIDSL).toEqual(vbiDSL)
  })
})
