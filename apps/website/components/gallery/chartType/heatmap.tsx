import { memo } from 'react'
import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { PivotChart } from '../../render/PivotChart'

export const HeatmapChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'heatmap',
    dataset: [
      {
        type: 'A',
        subType: 'a',
        value: 98,
      },
      {
        type: 'A',
        subType: 'b',
        value: 71,
      },
      {
        type: 'A',
        subType: 'c',
        value: 22,
      },
      {
        type: 'A',
        subType: 'd',
        value: 49,
      },
      {
        type: 'A',
        subType: 'e',
        value: 92,
      },
      {
        type: 'B',
        subType: 'a',
        value: 85,
      },
      {
        type: 'B',
        subType: 'b',
        value: 45,
      },
      {
        type: 'B',
        subType: 'c',
        value: 19,
      },
      {
        type: 'B',
        subType: 'd',
        value: 58,
      },
      {
        type: 'B',
        subType: 'e',
        value: 26,
      },
      {
        type: 'C',
        subType: 'a',
        value: 44,
      },
      {
        type: 'C',
        subType: 'b',
        value: 23,
      },
      {
        type: 'C',
        subType: 'c',
        value: 6,
      },
      {
        type: 'C',
        subType: 'd',
        value: 42,
      },
      {
        type: 'C',
        subType: 'e',
        value: 27,
      },
      {
        type: 'D',
        subType: 'a',
        value: 79,
      },
      {
        type: 'D',
        subType: 'b',
        value: 89,
      },
      {
        type: 'D',
        subType: 'c',
        value: 65,
      },
      {
        type: 'D',
        subType: 'd',
        value: 56,
      },
      {
        type: 'D',
        subType: 'e',
        value: 1,
      },
      {
        type: 'E',
        subType: 'a',
        value: 59,
      },
      {
        type: 'E',
        subType: 'b',
        value: 94,
      },
      {
        type: 'E',
        subType: 'c',
        value: 45,
      },
      {
        type: 'E',
        subType: 'd',
        value: 80,
      },
      {
        type: 'E',
        subType: 'e',
        value: 47,
      },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const CombinationHeatmapChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'heatmap',
    dataset: [
      { date: '2019', profit: 10, sales: 20, rateOfReturn: 0.1 },
      { date: '2020', profit: 20, sales: 40, rateOfReturn: 0.2 },
      { date: '2021', profit: 30, sales: 60, rateOfReturn: 0.3 },
      { date: '2022', profit: 40, sales: 80, rateOfReturn: 0.4 },
      { date: '2023', profit: 50, sales: 100, rateOfReturn: 0.5 },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
        location: 'dimension',
      },
    ],
    measures: [
      {
        id: 'sales-and-profit',
        alias: '销售额与利润',
        children: [
          {
            id: 'sales',
            alias: 'sales',
          },
          {
            id: 'profit',
            alias: '利润',
          },
        ],
      },
      {
        id: 'ratio',
        alias: '比率',
        children: [
          {
            id: 'rateOfReturn',
            alias: '回报率',
          },
        ],
      },
    ],
  }
  return <PivotChart vseed={vseed} />
})

export const PivotHeatmapChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'heatmap',
    dimensions: [
      { id: 'category', alias: '类别', location: 'dimension' },
      { id: 'date', alias: '日期', location: 'columnDimension' },
      { id: 'region', alias: '区域', location: 'rowDimension' },
    ],
    measures: [
      {
        id: 'group-sales',
        alias: '销售额分组',
        children: [{ id: 'sales', alias: '销售额' }],
      },
      { id: 'profit', alias: '利润' },
    ],
    dataset: [
      { date: '2019', region: 'east', category: 'Grocery', profit: 10, sales: 100 },
      { date: '2019', region: 'east', category: 'Beverages', profit: 30, sales: 3200 },
      { date: '2019', region: 'east', category: 'Dairy', profit: 30, sales: 300 },
      { date: '2019', region: 'east', category: 'Household', profit: 50, sales: 2400 },
      { date: '2019', region: 'east', category: 'Personal', profit: 40, sales: 500 },
      { date: '2019', region: 'west', category: 'Grocery', profit: 10, sales: 100 },
      { date: '2019', region: 'west', category: 'Beverages', profit: 30, sales: 3200 },
      { date: '2019', region: 'west', category: 'Dairy', profit: 30, sales: 300 },
      { date: '2019', region: 'west', category: 'Household', profit: 50, sales: 2400 },
      { date: '2019', region: 'west', category: 'Personal', profit: 40, sales: 500 },

      { date: '2020', region: 'east', category: 'Grocery', profit: 10, sales: 100 },
      { date: '2020', region: 'east', category: 'Beverages', profit: 30, sales: 3200 },
      { date: '2020', region: 'east', category: 'Dairy', profit: 30, sales: 300 },
      { date: '2020', region: 'east', category: 'Household', profit: 50, sales: 2400 },
      { date: '2020', region: 'east', category: 'Personal', profit: 40, sales: 500 },
      { date: '2020', region: 'west', category: 'Grocery', profit: 10, sales: 100 },
      { date: '2020', region: 'west', category: 'Beverages', profit: 30, sales: 3200 },
      { date: '2020', region: 'west', category: 'Dairy', profit: 30, sales: 300 },
      { date: '2020', region: 'west', category: 'Household', profit: 50, sales: 2400 },
      { date: '2020', region: 'west', category: 'Personal', profit: 40, sales: 500 },
    ],
  }
  return <PivotChart vseed={vseed} />
})
