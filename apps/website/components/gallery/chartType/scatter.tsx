import { memo } from 'react'
import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { PivotChart } from '../../render/PivotChart'

export const ScatterChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'scatter',
    dataset: [
      { date: '2019', profit: 10, sales: 20 },
      { date: '2020', profit: 30, sales: 60 },
      { date: '2021', profit: 30, sales: 60 },
      { date: '2022', profit: 50, sales: 100 },
      { date: '2023', profit: 200, sales: 80 },
    ],
    measures: [
      {
        id: 'sales',
        alias: '销售额',
      },
      {
        id: 'profit',
        alias: '利润',
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
        location: 'dimension',
      },
    ],
    label: {
      enable: false,
    },
  }
  return <VChartRender vseed={vseed} />
})

export const CombinationScatterChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'scatter',
    dataset: [
      { date: '2019', profit: 10, sales: 20, rateOfReturn: 0.1 },
      { date: '2020', profit: 20, sales: 40, rateOfReturn: 0.2 },
      { date: '2021', profit: 30, sales: 60, rateOfReturn: 0.3 },
      { date: '2022', profit: 40, sales: 80, rateOfReturn: 0.4 },
      { date: '2023', profit: 200, sales: 100, rateOfReturn: 0.5 },
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
        id: 'salesAndProfit',
        alias: '销售额与利润',
        children: [
          {
            id: 'sales',
            alias: '销售额',
            location: 'measure',
          },
          {
            id: 'profit',
            alias: '利润',
            location: 'measure',
          },
        ],
      },
      {
        id: 'ratio',
        alias: '比率',
        children: [
          {
            id: 'sales',
            alias: '销售额',
            location: 'measure',
          },
          {
            id: 'rateOfReturn',
            alias: '回报率',
            location: 'measure',
          },
        ],
      },
    ],
  }
  return <PivotChart vseed={vseed} />
})

export const PivotScatterChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'scatter',
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
      {
        id: 'group-sales',
        alias: '销售额分组',
        children: [
          { id: 'sales', alias: '销售额' },
          { id: 'profit', alias: '利润' },
        ],
      },
    ],
    label: {
      enable: false,
    },
    dataset: [
      { date: '2019', region: 'east', category: 'Grocery', profit: 10, sales: 100 },
      { date: '2019', region: 'east', category: 'Beverages', profit: 30, sales: 320 },
      { date: '2019', region: 'east', category: 'Dairy', profit: 30, sales: 300 },
      { date: '2019', region: 'east', category: 'Household', profit: 50, sales: 240 },
      { date: '2019', region: 'east', category: 'Personal', profit: 40, sales: 500 },
      { date: '2019', region: 'west', category: 'Grocery', profit: 10, sales: 100 },
      { date: '2019', region: 'west', category: 'Beverages', profit: 30, sales: 320 },
      { date: '2019', region: 'west', category: 'Dairy', profit: 30, sales: 300 },
      { date: '2019', region: 'west', category: 'Household', profit: 50, sales: 240 },
      { date: '2019', region: 'west', category: 'Personal', profit: 200, sales: 500 },

      { date: '2020', region: 'east', category: 'Grocery', profit: 10, sales: 100 },
      { date: '2020', region: 'east', category: 'Beverages', profit: 30, sales: 320 },
      { date: '2020', region: 'east', category: 'Dairy', profit: 30, sales: 300 },
      { date: '2020', region: 'east', category: 'Household', profit: 50, sales: 240 },
      { date: '2020', region: 'east', category: 'Personal', profit: 40, sales: 500 },
      { date: '2020', region: 'west', category: 'Grocery', profit: 10, sales: 100 },
      { date: '2020', region: 'west', category: 'Beverages', profit: 30, sales: 320 },
      { date: '2020', region: 'west', category: 'Dairy', profit: 30, sales: 300 },
      { date: '2020', region: 'west', category: 'Household', profit: 50, sales: 200 },
      { date: '2020', region: 'west', category: 'Personal', profit: 200, sales: 500 },
    ],
  }
  return <PivotChart vseed={vseed} />
})
