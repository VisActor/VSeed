import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { memo } from 'react'

export const SelectorBarValue = memo(() => {
  const vseed: VSeed = {
    chartType: 'column',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    barStyle: {
      selector: ['2019', '2020'],
      barColor: 'lightpink',
      barColorOpacity: 0.8,
      barBorderColor: 'lightpink',
      barBorderWidth: 4,
      barBorderStyle: 'dashed',
      barRadius: [8, 8, 0, 0],
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

export const SelectorBarPartialDatum = memo(() => {
  const vseed: VSeed = {
    chartType: 'bar',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    barStyle: {
      selector: [{ date: '2019' }, { profit: 40, sales: 80, count: 50 }, { sales: 60 }],
      barColor: 'lightblue',
      barColorOpacity: 0.8,
      barBorderColor: 'lightblue',
      barBorderWidth: 4,
      barBorderStyle: 'dashed',
      barRadius: [8, 8, 0, 0],
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

export const SelectorBarDimensionCondition = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    barStyle: {
      selector: [
        {
          field: 'date',
          operator: '=',
          value: '2019',
        },
      ],
      barColor: 'gray',
      barColorOpacity: 0.8,
      barBorderColor: 'gray',
      barBorderWidth: 4,
      barBorderStyle: 'dashed',
      barRadius: [8, 8, 0, 0],
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

export const SelectorBarMeasureCondition = memo(() => {
  const vseed: VSeed = {
    chartType: 'barParallel',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    barStyle: {
      selector: {
        field: 'profit',
        operator: 'between',
        value: [20, 40],
      },
      barColor: 'lightgreen',
      barColorOpacity: 0.8,
      barBorderColor: 'lightgreen',
      barBorderWidth: 4,
      barBorderStyle: 'dashed',
      barRadius: [8, 8, 0, 0],
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
