import { VBI } from '@visactor/vbi'
import { VBIDSL } from 'src/types/dsl'

describe('VBI', () => {
  test('build', () => {
    const dsl = {} as VBIDSL
    const builder = VBI.from(dsl)
    builder.measures.addMeasure('sales', (node) => {
      node.setAlias('Max Sales').setAggregate({ func: 'max' }).setEncoding('yAxis')
    })
    builder.dimensions.addDimension('area', (node) => {
      node.setAlias('Area')
    })

    expect(builder.build()).toMatchInlineSnapshot(`
      {
        "dimensions": [
          {
            "alias": "Area",
            "field": "area",
          },
        ],
        "measures": [
          {
            "aggregate": {
              "func": "max",
            },
            "alias": "Max Sales",
            "encoding": "yAxis",
            "field": "sales",
          },
        ],
      }
    `)
  })
})
