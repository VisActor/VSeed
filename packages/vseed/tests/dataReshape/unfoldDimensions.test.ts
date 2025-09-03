import type { Dimension } from '@visactor/vseed'
import { unfoldDimensions, type Dataset, type Measure } from '@visactor/vseed'

describe('unfoldMeasures', () => {
  // Zero Dimensions
  test('0 dimensions, 0 measures', () => {
    const dataset: Dataset = []
    const measures: Measure[] = []
    const dimensions: Dimension[] = []
    expect(() => unfoldDimensions(dataset, dimensions, measures, 0)).toThrowError('unfoldStartIndex is out of range')
    expect(() => unfoldDimensions(dataset, dimensions, measures, 1)).toThrowError('unfoldStartIndex is out of range')
  })

  test('0 dimensions, 1 measures', () => {
    const dataset: Dataset = [{ sales: 100 }]
    const measures: Measure[] = [{ id: 'sales', alias: 'Sales' }]
    const dimensions: Dimension[] = []
    expect(() => unfoldDimensions(dataset, dimensions, measures, 0)).toThrowError('unfoldStartIndex is out of range')
  })

  test('0 dimensions, 2 measures', () => {
    const dataset: Dataset = [{ sales: 100, profit: 10 }]
    const measures: Measure[] = [
      { id: 'sales', alias: 'Sales' },
      { id: 'profit', alias: 'Profit' },
    ]
    const dimensions: Dimension[] = []
    expect(() => unfoldDimensions(dataset, dimensions, measures, 1)).toThrowError('unfoldStartIndex is out of range')
  })

  // One Dimension
  test('1 dimensions, 0 measures', () => {
    const dataset: Dataset = [{ date: '2019' }, { date: '2020' }, { date: '2021' }, { date: '2022' }, { date: '2023' }]
    const measures: Measure[] = []
    const dimensions: Dimension[] = [{ id: 'date', alias: 'Date', location: 'dimension' }]
    const result0 = unfoldDimensions(dataset, dimensions, measures, 0)
    expect(result0.dataset as Dataset).matchSnapshot()
  })

  test('1 dimensions, 1 measures', () => {
    const dataset: Dataset = [
      { date: '2019', sales: 100 },
      { date: '2020', sales: 3200 },
      { date: '2021', sales: 300 },
      { date: '2022', sales: 2400 },
      { date: '2023', sales: 500 },
    ]
    const measures: Measure[] = [{ id: 'sales', alias: 'Sales' }]
    const dimensions: Dimension[] = [{ id: 'date', alias: 'Date', location: 'dimension' }]
    const result0 = unfoldDimensions(dataset, dimensions, measures, 0)
    expect(result0.dataset as Dataset).matchSnapshot()

    expect(() => unfoldDimensions(dataset, dimensions, measures, 1)).toThrowError('unfoldStartIndex is out of range')
  })

  test('1 dimensions, 5 measures', () => {
    const dataset: Dataset = [
      {
        date: '2019',
        sales: 100,
        profit: 10,
        count: 10,
        price: 50,
        number: 10,
      },
      {
        date: '2020',
        sales: 3200,
        profit: 20,
        count: 20,
        price: 100,
        number: 20,
      },
      {
        date: '2021',
        sales: 300,
        profit: 30,
        count: 30,
        price: 100,
        number: 30,
      },
      {
        date: '2022',
        sales: 2400,
        profit: 40,
        count: 40,
        price: 100,
        number: 40,
      },
      {
        date: '2023',
        sales: 500,
        profit: 50,
        count: 50,
        price: 100,
        number: 50,
      },
    ]
    const measures: Measure[] = [
      { id: 'sales', alias: 'Sales' },
      { id: 'profit', alias: 'Profit' },
      { id: 'count', alias: 'Count' },
      { id: 'price', alias: 'Price' },
      { id: 'number', alias: 'Number' },
    ]
    const dimensions: Dimension[] = [{ id: 'date', alias: 'Date', location: 'dimension' }]
    const result0 = unfoldDimensions(dataset, dimensions, measures, 0)
    expect(result0.dataset as Dataset).matchSnapshot()

    expect(() => unfoldDimensions(dataset, dimensions, measures, 1)).toThrowError('unfoldStartIndex is out of range')
  })

  // Two Dimensions
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
    const dimensions: Dimension[] = [
      { id: 'date', alias: 'Date', location: 'dimension' },
      { id: 'type', alias: 'Type', location: 'dimension' },
    ]
    const result0 = unfoldDimensions(dataset, dimensions, measures, 0)
    expect(result0.dataset as Dataset).matchSnapshot()

    const result1 = unfoldDimensions(dataset, dimensions, measures, 1)
    expect(result1.dataset as Dataset).matchSnapshot()
  })

  test('2 dimensions, 1 measures', () => {
    const dataset: Dataset = [
      { date: '2019', type: 'A', sales: 100 },
      { date: '2020', type: 'A', sales: 3200 },
      { date: '2021', type: 'A', sales: 300 },
      { date: '2022', type: 'A', sales: 2400 },
      { date: '2023', type: 'A', sales: 500 },
      { date: '2019', type: 'B', sales: 100 },
      { date: '2020', type: 'B', sales: 3200 },
      { date: '2021', type: 'B', sales: 300 },
      { date: '2022', type: 'B', sales: 2400 },
      { date: '2023', type: 'B', sales: 500 },
    ]
    const measures: Measure[] = [{ id: 'sales', alias: 'Sales' }]
    const dimensions: Dimension[] = [
      { id: 'date', alias: 'Date', location: 'dimension' },
      { id: 'type', alias: 'Type', location: 'dimension' },
    ]
    const result0 = unfoldDimensions(dataset, dimensions, measures, 0)
    expect(result0.dataset as Dataset).matchSnapshot()

    const result1 = unfoldDimensions(dataset, dimensions, measures, 1)
    expect(result1.dataset as Dataset).matchSnapshot()
  })

  test('2 dimensions, 0 measures', () => {
    const dataset: Dataset = [
      { date: '2019', type: 'A' },
      { date: '2020', type: 'A' },
      { date: '2021', type: 'A' },
      { date: '2022', type: 'A' },
      { date: '2023', type: 'A' },
      { date: '2019', type: 'B' },
      { date: '2020', type: 'B' },
      { date: '2021', type: 'B' },
      { date: '2022', type: 'B' },
      { date: '2023', type: 'B' },
    ]
    const measures: Measure[] = []
    const dimensions: Dimension[] = [
      { id: 'date', alias: 'Date', location: 'dimension' },
      { id: 'type', alias: 'Type', location: 'dimension' },
    ]
    const result0 = unfoldDimensions(dataset, dimensions, measures, 0)
    expect(result0.dataset as Dataset).matchSnapshot()

    const result1 = unfoldDimensions(dataset, dimensions, measures, 1)
    expect(result1.dataset as Dataset).matchSnapshot()
  })
})
