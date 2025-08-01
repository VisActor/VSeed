import { dataReshapeFor2M1D, type Dataset, type Dimension, type Measure } from '@visactor/vseed'
import { describe, expect, test } from 'vitest'

describe('dataReshape', () => {
  // zero dimensions
  test('0dimensions 0measure', () => {
    const dataset: Dataset = []
    const measures: Measure[] = []
    const dimensions: Dimension[] = []

    const result = dataReshapeFor2M1D(dataset, dimensions, measures)
    expect(result.dataset).matchSnapshot()
  })

  test('0dimensions 1measure', () => {
    const dataset: Dataset = [{ sales: 100 }]
    const measures: Measure[] = [{ id: 'sales', alias: '销售额' }]
    const dimensions: Dimension[] = []

    const result = dataReshapeFor2M1D(dataset, dimensions, measures)
    expect(result.dataset).matchSnapshot()
  })

  test('0dimensions 2measure', () => {
    const dataset: Dataset = [{ profit: 10, sales: 100 }]
    const measures: Measure[] = [
      { id: 'sales', alias: '销售额' },
      { id: 'profit', alias: '利润' },
    ]
    const dimensions: Dimension[] = []

    const result = dataReshapeFor2M1D(dataset, dimensions, measures)
    expect(result.dataset).matchSnapshot()
  })

  // one dimensions
  // test('1dimensions 0measure', () => {
  //   const dataset: Dataset = [
  //     { date: '2019' },
  //     { date: '2020' },
  //     { date: '2021' },
  //     { date: '2022' },
  //     { date: '2023' },
  //     { date: '2019' },
  //     { date: '2020' },
  //     { date: '2021' },
  //     { date: '2022' },
  //     { date: '2023' },
  //   ]
  //   const measures: Measure[] = []
  //   const dimensions: Dimension[] = [{ id: 'date', alias: 'Date', location: 'dimension' }]

  //   const result = dataReshape2M1D(dataset, dimensions, measures)
  //   expect(result.dataset).matchSnapshot()
  // })

  // test('1dimensions 1measure', () => {
  //   const dataset: Dataset = [
  //     { date: '2019', sales: 100 },
  //     { date: '2020', sales: 3200 },
  //     { date: '2021', sales: 300 },
  //     { date: '2022', sales: 2400 },
  //     { date: '2023', sales: 500 },
  //     { date: '2019', sales: 100 },
  //     { date: '2020', sales: 3200 },
  //     { date: '2021', sales: 300 },
  //     { date: '2022', sales: 2400 },
  //     { date: '2023', sales: 500 },
  //   ]
  //   const measures: Measure[] = [{ id: 'sales', alias: '销售额' }]
  //   const dimensions: Dimension[] = [{ id: 'date', alias: 'Date', location: 'dimension' }]

  //   const result = dataReshape2M1D(dataset, dimensions, measures)
  //   expect(result.dataset).matchSnapshot()
  // })

  // test('1dimensions 2measure', () => {
  //   const dataset: Dataset = [
  //     { date: '2019', profit: 10, sales: 100 },
  //     { date: '2020', profit: 30, sales: 3200 },
  //     { date: '2021', profit: 30, sales: 300 },
  //     { date: '2022', profit: 50, sales: 2400 },
  //     { date: '2023', profit: 40, sales: 500 },
  //     { date: '2019', profit: 10, sales: 100 },
  //     { date: '2020', profit: 30, sales: 3200 },
  //     { date: '2021', profit: 30, sales: 300 },
  //     { date: '2022', profit: 50, sales: 2400 },
  //     { date: '2023', profit: 40, sales: 500 },
  //   ]
  //   const measures: Measure[] = [
  //     { id: 'sales', alias: '销售额' },
  //     { id: 'profit', alias: '利润' },
  //   ]
  //   const dimensions: Dimension[] = [{ id: 'date', alias: 'Date', location: 'dimension' }]

  //   const result = dataReshape2M1D(dataset, dimensions, measures)
  //   expect(result.dataset).matchSnapshot()
  // })

  // two dimensions
  // test('2dimensions 0measure', () => {
  //   const dataset: Dataset = [
  //     { date: '2019', type: '商品' },
  //     { date: '2020', type: '商品' },
  //     { date: '2021', type: '商品' },
  //     { date: '2022', type: '商品' },
  //     { date: '2023', type: '商品' },
  //     { date: '2019', type: '家具' },
  //     { date: '2020', type: '家具' },
  //     { date: '2021', type: '家具' },
  //     { date: '2022', type: '家具' },
  //     { date: '2023', type: '家具' },
  //   ]
  //   const measures: Measure[] = []
  //   const dimensions: Dimension[] = [
  //     { id: 'date', alias: 'Date', location: 'dimension' },
  //     { id: 'type', alias: 'Type', location: 'dimension' },
  //   ]
  //   const result = dataReshape2M1D(dataset, dimensions, measures)
  //   expect(result.dataset).matchSnapshot()
  // })

  // test('2dimensions 1measure', () => {
  //   const dataset: Dataset = [
  //     { date: '2019', type: '商品', profit: 10 },
  //     { date: '2020', type: '商品', profit: 30 },
  //     { date: '2021', type: '商品', profit: 30 },
  //     { date: '2022', type: '商品', profit: 50 },
  //     { date: '2023', type: '商品', profit: 40 },
  //     { date: '2019', type: '家具', profit: 10 },
  //     { date: '2020', type: '家具', profit: 30 },
  //     { date: '2021', type: '家具', profit: 30 },
  //     { date: '2022', type: '家具', profit: 50 },
  //     { date: '2023', type: '家具', profit: 40 },
  //   ]
  //   const measures: Measure[] = [{ id: 'profit', alias: '利润' }]
  //   const dimensions: Dimension[] = [
  //     { id: 'date', alias: 'Date', location: 'dimension' },
  //     { id: 'type', alias: 'Type', location: 'dimension' },
  //   ]

  //   const result = dataReshape2M1D(dataset, dimensions, measures)
  //   expect(result.dataset).matchSnapshot()
  // })

  // test('2dimensions 2measure', () => {
  //   const dataset: Dataset = [
  //     { date: '2019', type: '商品', profit: 10, sales: 100 },
  //     { date: '2020', type: '商品', profit: 30, sales: 3200 },
  //     { date: '2021', type: '商品', profit: 30, sales: 300 },
  //     { date: '2022', type: '商品', profit: 50, sales: 2400 },
  //     { date: '2023', type: '商品', profit: 40, sales: 500 },
  //     { date: '2019', type: '家具', profit: 10, sales: 100 },
  //     { date: '2020', type: '家具', profit: 30, sales: 3200 },
  //     { date: '2021', type: '家具', profit: 30, sales: 300 },
  //     { date: '2022', type: '家具', profit: 50, sales: 2400 },
  //     { date: '2023', type: '家具', profit: 40, sales: 500 },
  //   ]
  //   const measures: Measure[] = [
  //     { id: 'sales', alias: '销售额' },
  //     { id: 'profit', alias: '利润' },
  //   ]
  //   const dimensions: Dimension[] = [
  //     { id: 'date', alias: 'Date', location: 'dimension' },
  //     { id: 'type', alias: 'Type', location: 'dimension' },
  //   ]

  //   const result = dataReshape2M1D(dataset, dimensions, measures)
  //   expect(result.dataset).matchSnapshot()
  // })

  /**
   * 2022	中国	小型企业	办公用品	东北	54,865.44	213	11,126.50
2022	中国	公司	办公用品	东北	67,674.80	409	3,010.06
2022	中国	小型企业	办公用品	中南	69,494.43	324	13,903.23
2022	中国	小型企业	家具	中南	101,600.79	156	25,954.31
2022	中国	小型企业	家具	东北	32,654.71	64	5,600.13
2022	中国	公司	家具	中南	133,046.81	196	11,458.21
2022	中国	公司	家具	东北	115,925.85	158	6,270.42
2022	中国	公司	办公用品	中南	144,334.20	615	24,766.78
2023	中国	小型企业	家具	东北	9,820.30	7	2,877.70
2023	中国	公司	办公用品	中南	30,842.00	108	8,001.42
2023	中国	小型企业	办公用品	东北	3,769.75	30	767.03
2023	中国	公司	办公用品	东北	7,817.57	49	1,870.23
2023	中国	小型企业	办公用品	中南	4,901.82	44	684.60
2023	中国	公司	家具	中南	27,387.23	18	4,949.01
2023	中国	小型企业	家具	中南	3,677.80	6	771.68
2023	中国	公司	家具	东北	41,296.65	56	6,550.89
   */
  test('5dimensions 3measure', () => {
    const dataset: Dataset = [
      {
        date: '2022',
        region: '中国',
        type: '小型企业',
        category: '办公用品',
        area: '东北',
        profit: 54865.44,
        sales: 213,
        cost: 11126.5,
      },
      {
        date: '2022',
        region: '中国',
        type: '公司',
        category: '办公用品',
        area: '东北',
        profit: 67674.8,
        sales: 409,
        cost: 3010.06,
      },
      {
        date: '2022',
        region: '中国',
        type: '小型企业',
        category: '办公用品',
        area: '中南',
        profit: 69494.43,
        sales: 324,
        cost: 13903.23,
      },
      {
        date: '2022',
        region: '中国',
        type: '小型企业',
        category: '家具',
        area: '中南',
        profit: 101600.79,
        sales: 156,
        cost: 25954.31,
      },
      {
        date: '2022',
        region: '中国',
        type: '公司',
        category: '家具',
        area: '东北',
        profit: 115925.85,
        sales: 158,
        cost: 6270.42,
      },
      {
        date: '2022',
        region: '中国',
        type: '公司',
        category: '办公用品',
        area: '中南',
        profit: 144334.2,
        sales: 615,
        cost: 24766.78,
      },
      {
        date: '2023',
        region: '中国',
        type: '公司',
        category: '家具',
        area: '东北',
        profit: 41296.65,
        sales: 56,
        cost: 6550.89,
      },
      {
        date: '2023',
        region: '中国',
        type: '公司',
        category: '办公用品',
        area: '中南',
        profit: 30842.0,
        sales: 108,
        cost: 8001.42,
      },
      {
        date: '2023',
        region: '中国',
        type: '公司',
        category: '办公用品',
        area: '东北',
        profit: 7817.57,
        sales: 49,
        cost: 1870.23,
      },
      {
        date: '2023',
        region: '中国',
        type: '公司',
        category: '办公用品',
        area: '中南',
        profit: 4901.82,
        sales: 44,
        cost: 684.6,
      },
      {
        date: '2023',
        region: '中国',
        type: '公司',
        category: '家具',
        area: '中南',
        profit: 27387.23,
        sales: 18,
        cost: 4949.01,
      },
      {
        date: '2023',
        region: '中国',
        type: '公司',
        category: '家具',
        area: '东北',
        profit: 3677.8,
        sales: 6,
        cost: 771.68,
      },
      {
        date: '2023',
        region: '中国',
        type: '公司',
        category: '家具',
        area: '中南',
        profit: 32654.71,
        sales: 64,
        cost: 5600.13,
      },
      {
        date: '2023',
        region: '中国',
        type: '公司',
        category: '家具',
        area: '东北',
        profit: 133046.81,
        sales: 196,
        cost: 11458.21,
      },
      {
        date: '2023',
        region: '中国',
        type: '公司',
        category: '办公用品',
        area: '东北',
        profit: 9820.3,
        sales: 7,
        cost: 2877.7,
      },
      {
        date: '2023',
        region: '中国',
        type: '公司',
        category: '办公用品',
        area: '中南',
        profit: 3769.75,
        sales: 30,
        cost: 767.03,
      },
      {
        date: '2023',
        region: '中国',
        type: '公司',
        category: '家具',
        area: '东北',
        profit: 115925.85,
        sales: 158,
        cost: 6270.42,
      },
    ]
    const measures: Measure[] = [
      { id: 'sales', alias: '销售额' },
      { id: 'profit', alias: '利润' },
      { id: 'cost', alias: '开销' },
    ]
    const dimensions: Dimension[] = [
      { id: 'date', alias: '日期', location: 'dimension' },
      { id: 'region', alias: '国家', location: 'dimension' },
      { id: 'category', alias: '类目', location: 'dimension' },
      { id: 'area', alias: '区域', location: 'dimension' },
      { id: 'type', alias: '类型', location: 'dimension' },
    ]

    const result = dataReshapeFor2M1D(dataset, dimensions, measures)
    expect(result.dataset).matchSnapshot()
  })
})
