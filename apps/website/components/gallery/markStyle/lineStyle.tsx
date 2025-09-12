import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { memo } from 'react'

export const SelectorLineValue = memo(() => {
  const vseed: VSeed = {
    chartType: 'area',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    lineStyle: [
      {
        selector: [40, 80],
        lineColor: 'red',
        lineWidth: 2,
        lineStyle: 'solid',
        lineSmooth: true,
      },
    ],
    dimensions: [{ id: 'date', alias: '日期',   }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const SelectorLinePartialDatum = memo(() => {
  const vseed: VSeed = {
    chartType: 'area',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    lineStyle: {
      selector: [ { sales: 60 }],
      lineColor: 'red',
      lineWidth: 2,
      lineStyle: 'solid',
    },
    dimensions: [{ id: 'date', alias: '日期',   }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const SelectorLineDimensionCondition = memo(() => {
  const vseed: VSeed = {
    chartType: 'line',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    lineStyle: {
      selector: [
        {
          field: 'date',
          operator: 'in',
          value: ['2019'],
        },
      ],
      lineColor: 'red',
      lineWidth: 2,
      lineStyle: 'solid',
    },
    dimensions: [{ id: 'date', alias: '日期',   }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const SelectorLineMeasureCondition = memo(() => {
  const vseed: VSeed = {
    chartType: 'areaPercent',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    lineStyle: {
      selector: {
        field: 'profit',
        operator: 'between',
        value: [20, 40],
      },
      lineColor: 'red',
      lineWidth: 2,
      lineStyle: 'solid',
    },
    dimensions: [{ id: 'date', alias: '日期',   }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const MultiLineStyle = memo(() => {
  const vseed: VSeed = {
    chartType: 'line',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    lineStyle: [
      {
        lineColor: 'red',
        lineWidth: 2,
        lineStyle: 'solid',
      },
      {
        selector: [100, 80],
        lineColor: 'blue',
        lineWidth: 2,
        lineStyle: 'dashed',
        lineSmooth: true,
      },
    ],
    dimensions: [{ id: 'date', alias: '日期',   }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
  }
  return <VChartRender vseed={vseed} />
})
