import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { memo } from 'react'
import { PivotChart } from 'components/render'

export const SortLegendBySelf = memo(() => {
  const vseed: VSeed = {
    chartType: 'column',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 15 },
      { date: '2020', profit: 30, sales: 60, count: 33 },
      { date: '2021', profit: 30, sales: 60, count: 22 },
      { date: '2022', profit: 50, sales: 100, count: 14 },
      { date: '2023', profit: 40, sales: 80, count: 30 },
    ],
    dimensions: [{ id: 'date', alias: '日期',   }],
    measures: [
      { id: 'count', alias: '数量' },
      { id: 'sales', alias: '销售额' },
      { id: 'profit', alias: '利润' },
    ],
    sortLegend: {
      order: 'desc',
    },
  }
  return <VChartRender vseed={vseed} />
})

export const SortLegendByMeasure = memo(() => {
  const vseed: VSeed = {
    chartType: 'line',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 15 },
      { date: '2020', profit: 30, sales: 60, count: 33 },
      { date: '2021', profit: 30, sales: 60, count: 22 },
      { date: '2022', profit: 50, sales: 100, count: 14 },
      { date: '2023', profit: 40, sales: 80, count: 30 },
    ],
    dimensions: [{ id: 'date', alias: '日期',   }],
    measures: [
      { id: 'count', alias: '数量' },
      {
        id: 'group',
        alias: '分组',
        children: [
          { id: 'sales', alias: '销售额' },
          { id: 'profit', alias: '利润' },
        ],
      },
    ],
    sortLegend: {
      order: 'desc',
      orderBy: 'sales',
    },
  }
  return <PivotChart vseed={vseed} />
})

export const SortLegendByDimension = memo(() => {
  const vseed: VSeed = {
    chartType: 'line',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    dimensions: [{ id: 'date', alias: '日期',   }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
    sortLegend: {
      order: 'desc',
      orderBy: 'date',
    },
  }
  return <VChartRender vseed={vseed} />
})

export const SortLegendByCustom = memo(() => {
  const vseed: VSeed = {
    chartType: 'line',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    dimensions: [{ id: 'date', alias: '日期',   }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
    sortLegend: {
      customOrder: ['销售额', '数量', '利润'],
    },
  }
  return <VChartRender vseed={vseed} />
})

export const SortLegendByCustomId = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    dataset: [
      { date: '2019', profit: 10, sales: 20, count: 50 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    dimensions: [{ id: 'date', alias: '日期',   }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
    sortLegend: {
      customOrder: ['数量-count', '销售额-sales', '利润-profit'],
    },
  }
  return <VChartRender vseed={vseed} />
})
