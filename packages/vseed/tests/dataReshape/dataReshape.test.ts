import {
  dataReshape,
  type Dataset,
  type Dimension,
  type Measure,
} from '@visactor/vseed'
import { describe, test } from 'vitest'

describe('dataReshape', () => {
  test('dataReshape 2dimensions 1measure', () => {
    const dataset: Dataset = [
      { date: '2019', type: '商品', profit: 10, sales: 100 },
      { date: '2020', type: '商品', profit: 30, sales: 3200 },
      { date: '2021', type: '商品', profit: 30, sales: 300 },
      { date: '2022', type: '商品', profit: 50, sales: 2400 },
      { date: '2023', type: '商品', profit: 40, sales: 500 },

      { date: '2019', type: '家具', profit: 10, sales: 100 },
      { date: '2020', type: '家具', profit: 30, sales: 3200 },
      { date: '2021', type: '家具', profit: 30, sales: 300 },
      { date: '2022', type: '家具', profit: 50, sales: 2400 },
      { date: '2023', type: '家具', profit: 40, sales: 500 },
    ]
    const measures: Measure[] = [
      { id: 'sales', alias: '销售额' },
      { id: 'profit', alias: '利润' },
    ]
    const dimensions: Dimension[] = [
      { id: 'date', alias: 'Date', location: 'dimension' },
      { id: 'type', alias: 'Type', location: 'dimension' },
    ]

    const result = dataReshape(dataset, dimensions, measures)
    debugger
  })
})
