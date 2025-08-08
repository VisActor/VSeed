import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { memo } from 'react'

export const BaseConfigColorScheme = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    color: {
      colorScheme: ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff'],
    },
    dataset: [
      { date: '2019', type: 'A', profit: 10, sales: 20 },
      { date: '2019', type: 'B', profit: 30, sales: 60 },
      { date: '2019', type: 'C', profit: 30, sales: 60 },
      { date: '2019', type: 'D', profit: 50, sales: 100 },
      { date: '2019', type: 'E', profit: 40, sales: 80 },

      { date: '2020', type: 'A', profit: 10, sales: 20 },
      { date: '2020', type: 'B', profit: 30, sales: 60 },
      { date: '2020', type: 'C', profit: 30, sales: 60 },
      { date: '2020', type: 'D', profit: 50, sales: 100 },
      { date: '2020', type: 'E', profit: 40, sales: 80 },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
        location: 'dimension',
      },
      {
        id: 'type',
        alias: '类型',
        location: 'dimension',
      },
    ],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const BaseConfigColorMapping = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    color: {
      colorMapping: {
        'E-利润': 'blue',
        'E-销售额': 'red',
      },
    },
    dataset: [
      { date: '2019', type: 'A', profit: 10, sales: 20 },
      { date: '2019', type: 'B', profit: 30, sales: 60 },
      { date: '2019', type: 'C', profit: 30, sales: 60 },
      { date: '2019', type: 'D', profit: 50, sales: 100 },
      { date: '2019', type: 'E', profit: 40, sales: 80 },

      { date: '2020', type: 'A', profit: 10, sales: 20 },
      { date: '2020', type: 'B', profit: 30, sales: 60 },
      { date: '2020', type: 'C', profit: 30, sales: 60 },
      { date: '2020', type: 'D', profit: 50, sales: 100 },
      { date: '2020', type: 'E', profit: 40, sales: 80 },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
        location: 'dimension',
      },
      {
        id: 'type',
        alias: '类型',
        location: 'dimension',
      },
    ],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
    ],
  }
  return <VChartRender vseed={vseed} />
})
