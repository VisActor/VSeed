import type { Dataset, Measure } from '@visactor/vseed'
import { foldMeasures } from '@visactor/vseed'

describe('foldMeasures', () => {
  test('0 dimensions, 0 measures', () => {
    const dataset: Dataset = []
    const measures: Measure[] = []
    const result = foldMeasures(dataset, measures)
    const newDataset = result.dataset
    expect(newDataset.length).toBe(dataset.length * measures.length)
    expect(result).toMatchSnapshot()
  })

  test('0 dimensions, 1 measures', () => {
    const dataset: Dataset = [{ profit: 10 }]
    const measures: Measure[] = [{ id: 'profit', alias: 'Profit' }]
    const result = foldMeasures(dataset, measures)
    const newDataset = result.dataset
    expect(newDataset.length).toBe(dataset.length * measures.length)
    expect(result).toMatchSnapshot()
  })

  test('0 dimensions, 2 measures', () => {
    const dataset: Dataset = [{ profit: 10, sales: 100 }]
    const measures: Measure[] = [
      { id: 'profit', alias: 'Profit' },
      { id: 'sales', alias: 'Sales' },
    ]
    const result = foldMeasures(dataset, measures)
    const newDataset = result.dataset
    expect(newDataset.length).toBe(dataset.length * measures.length)
    expect(result).toMatchSnapshot()
  })

  test('0 dimensions, 5 measures', () => {
    const dataset: Dataset = [{ profit: 10, sales: 100, number: 1, price: 100, cost: 33 }]
    const measures: Measure[] = [
      { id: 'profit', alias: 'Profit' },
      { id: 'sales', alias: 'Sales' },
      { id: 'number', alias: 'Number' },
      { id: 'price', alias: 'Price' },
      { id: 'cost', alias: 'Cost' },
    ]
    const result = foldMeasures(dataset, measures)
    const newDataset = result.dataset
    expect(newDataset.length).toBe(dataset.length * measures.length)
    expect(result).toMatchSnapshot()
  })

  test('1 dimensions, 1 measures', () => {
    const dataset: Dataset = [
      { date: '2019', sales: 100 },
      { date: '2020', sales: 3200 },
      { date: '2021', sales: 300 },
      { date: '2022', sales: 2400 },
      { date: '2023', sales: 500 },
      { date: '2019', sales: 100 },
      { date: '2020', sales: 3200 },
      { date: '2021', sales: 300 },
      { date: '2022', sales: 2400 },
      { date: '2023', sales: 500 },
    ]
    const measures: Measure[] = [{ id: 'profit', alias: 'Profit' }]
    const result = foldMeasures(dataset, measures)
    const newDataset = result.dataset
    expect(newDataset.length).toBe(dataset.length * measures.length)
    expect(result).toMatchSnapshot()
  })

  test('2 dimensions, 1 measures', () => {
    const dataset: Dataset = [
      { date: '2019', type: 'A', profit: 10, sales: 100 },
      { date: '2020', type: 'A', profit: 30, sales: 3200 },
      { date: '2021', type: 'A', profit: 30, sales: 300 },
      { date: '2022', type: 'A', profit: 50, sales: 2400 },
      { date: '2023', type: 'A', profit: 40, sales: 500 },
      { date: '2019', type: 'B', profit: 10, sales: 100 },
      { date: '2020', type: 'B', profit: 30, sales: 3200 },
      { date: '2021', type: 'B', profit: 30, sales: 300 },
      { date: '2022', type: 'B', profit: 50, sales: 2400 },
      { date: '2023', type: 'B', profit: 40, sales: 500 },
    ]
    const measures: Measure[] = [{ id: 'profit', alias: 'Profit' }]
    const result = foldMeasures(dataset, measures)
    const newDataset = result.dataset
    expect(newDataset.length).toBe(dataset.length * measures.length)
    expect(result).toMatchSnapshot()
  })

  test('2 dimensions, 2 measures', () => {
    const dataset: Dataset = [
      { date: '2019', type: 'A', profit: 10, sales: 100 },
      { date: '2020', type: 'A', profit: 30, sales: 3200 },
      { date: '2021', type: 'A', profit: 30, sales: 300 },
      { date: '2022', type: 'A', profit: 50, sales: 2400 },
      { date: '2023', type: 'A', profit: 40, sales: 500 },
      { date: '2019', type: 'B', profit: 10, sales: 100 },
      { date: '2020', type: 'B', profit: 30, sales: 3200 },
      { date: '2021', type: 'B', profit: 30, sales: 300 },
      { date: '2022', type: 'B', profit: 50, sales: 2400 },
      { date: '2023', type: 'B', profit: 40, sales: 500 },
    ]
    const measures: Measure[] = [
      { id: 'profit', alias: 'Profit' },
      { id: 'sales', alias: 'Sales' },
    ]
    const result = foldMeasures(dataset, measures)
    const newDataset = result.dataset
    expect(newDataset.length).toBe(dataset.length * measures.length)
    expect(result).toMatchSnapshot()
  })
})
