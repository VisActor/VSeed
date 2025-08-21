import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { memo } from 'react'

export const SelectorAreaValue = memo(() => {
  const vseed: VSeed = {
    chartType: 'area',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    areaStyle: [
      {
        selector: '2019',
        areaColorOpacity: 0.05,
      },
    ],
    dimensions: [{ id: 'date', alias: '日期', location: 'dimension' }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const SelectorAreaPartialDatum = memo(() => {
  const vseed: VSeed = {
    chartType: 'areaPercent',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    areaStyle: {
      selector: [ { sales: 60 }],
      areaColor: 'red',
    },
    dimensions: [{ id: 'date', alias: '日期', location: 'dimension' }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const SelectorAreaDimensionCondition = memo(() => {
  const vseed: VSeed = {
    chartType: 'area',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    areaStyle: {
      selector: [
        {
          field: 'date',
          operator: 'in',
          value: ['2019', '2023'],
        },
      ],
      areaColorOpacity: 0.8,
    },
    lineStyle: {
      selector: [
        {
          field: 'date',
          operator: 'in',
          value: ['2019', '2023'],
        },
      ],
    },
    dimensions: [{ id: 'date', alias: '日期', location: 'dimension' }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const SelectorAreaMeasureCondition = memo(() => {
  const vseed: VSeed = {
    chartType: 'areaPercent',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    areaStyle: {
      selector: {
        field: 'profit',
        operator: 'between',
        value: [20, 40],
      },
      areaColorOpacity: 1,
    },
    dimensions: [{ id: 'date', alias: '日期', location: 'dimension' }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const MultiAreaStyle = memo(() => {
  const vseed: VSeed = {
    chartType: 'area',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    areaStyle: [
      {
        areaColor: 'red',
        areaColorOpacity: 0.5,
      },
      {
        selector: [100, 80],
        areaColorOpacity: 0.05,
      },
    ],
    dimensions: [{ id: 'date', alias: '日期', location: 'dimension' }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
  }
  return <VChartRender vseed={vseed} />
})
