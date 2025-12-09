import { VBI } from '@visactor/vbi'
import { VBIDSL } from 'src/types/dsl'

describe('DimensionsBuilder', () => {
  test('addDimension', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.dimensions.addDimension('category').setAlias('类别')

    expect(builder.build()).toMatchInlineSnapshot(`
      {
        "dimensions": [
          {
            "alias": "类别",
            "field": "category",
          },
        ],
        "measures": [],
      }
    `)
  })

  test('addDimension callback', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.dimensions
      .addDimension('region', (node) => {
        node.setAlias('地区')
      })
      .addDimension('city', (node) => {
        node.setAlias('城市')
      })

    expect(builder.build()).toMatchInlineSnapshot(`
      {
        "dimensions": [
          {
            "alias": "地区",
            "field": "region",
          },
          {
            "alias": "城市",
            "field": "city",
          },
        ],
        "measures": [],
      }
    `)
  })
})
