import { VBI } from '@visactor/vbi'
import { VBIDSL } from 'src/types/dsl'

describe('VBI YJS Integration', () => {
  test('sync between two builders', () => {
    // 1. Create initial state
    // Using VBI.from pattern which is safer as it's the public API
    const b1 = VBI.from({} as VBIDSL)
    const b2 = VBI.from({} as VBIDSL)

    // Initial sync to ensure b2 knows about b1's structure
    b2.applyUpdate(b1.encodeStateAsUpdate())
    b1.applyUpdate(b2.encodeStateAsUpdate())

    // 2. Setup sync
    b1.on('update', (update) => {
      b2.applyUpdate(update)
    })

    // 3. Make changes in b1
    b1.measures.addMeasure('sales', (node) => {
      node.setAlias('Sales')
    })

    expect(b2.build()).toMatchInlineSnapshot(`
      {
        "dimensions": [],
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "Sales",
            "encoding": "yAxis",
            "field": "sales",
          },
        ],
      }
    `)
  })

  test('encodeStateAsUpdate', () => {
    const b1 = VBI.from({} as VBIDSL)
    const b2 = VBI.from({} as VBIDSL)
    b2.on('update', () => {
      expect(b2.build()).toMatchInlineSnapshot(`
        {
          "dimensions": [],
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

    b1.measures.addMeasure('sales', (node) => {
      node.setAlias('Max Sales').setAggregate({ func: 'max' }).setEncoding('yAxis')
    })

    b1.on('update', () => {
      const update = b1.encodeStateAsUpdate()
      console.log('debug update', update)
      b2.applyUpdate(update)
      expect(update).toBeInstanceOf(Uint8Array)
      expect(update.length).toBeGreaterThan(0)
    })
  })
})
