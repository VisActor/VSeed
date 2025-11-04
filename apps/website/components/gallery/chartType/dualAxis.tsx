import { memo } from 'react'
import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { PivotChart } from '../../render/PivotChart'

export const SimpleDualAxisChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'dualAxis',
    dataset: [
      { date: '2019', profit: 20, sales: 100 },
      { date: '2020', profit: 30, sales: 600 },
      { date: '2021', profit: 30, sales: 600 },
      { date: '2022', profit: 50, sales: 500 },
      { date: '2023', profit: 10, sales: 800 },
    ],
    measures: [
      { id: 'sales', alias: '销售额' },
      { id: 'profit', alias: '利润' },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const DualAxisChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'dualAxis',
    dataset: [
      { date: '2019', profit: 20, sales: 100 },
      { date: '2020', profit: 30, sales: 600 },
      { date: '2021', profit: 30, sales: 600 },
      { date: '2022', profit: 50, sales: 500 },
      { date: '2023', profit: 10, sales: 800 },
    ],
    measures: [
      { id: 'sales', alias: '销售额' },
      { id: 'profit', alias: '利润' },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const CombinationDualAxisChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'dualAxis',
    measures: [
      { id: 'profit', alias: '利润', encoding: 'primaryYAxis', parentId: 'first' },
      { id: 'sales', alias: '销售额', encoding: 'secondaryYAxis', parentId: 'first' },
      { id: 'ratio', alias: '比率', encoding: 'primaryYAxis', parentId: 'second' },
      { id: 'returnRatio', alias: '回报率', encoding: 'secondaryYAxis', parentId: 'second' },
    ],
    dataset: [
      { date: '2019', profit: 10, sales: 100, ratio: 301, returnRatio: 301 },
      { date: '2020', profit: 30, sales: 3200, ratio: 32, returnRatio: 30 },
      { date: '2021', profit: 30, sales: 300, ratio: 103, returnRatio: 503 },
      { date: '2022', profit: 50, sales: 2400, ratio: 30, returnRatio: 24 },
      { date: '2023', profit: 40, sales: 500, ratio: 305, returnRatio: 305 },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
      },
    ],
  }
  return <PivotChart vseed={vseed} />
})

export const PivotDualAxisChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'dualAxis',
    dataset: [
      { date: '2019', type: 'A', test: 'TEST-A', profit: 10, sales: 100, ratio: 1, returnRatio: 301 },
      { date: '2020', type: 'A', test: 'TEST-A', profit: 30, sales: 3200, ratio: 2, returnRatio: 30 },
      { date: '2021', type: 'A', test: 'TEST-A', profit: 30, sales: 300, ratio: 3, returnRatio: 303 },
      { date: '2022', type: 'A', test: 'TEST-A', profit: 50, sales: 2400, ratio: 4, returnRatio: 34 },
      { date: '2023', type: 'A', test: 'TEST-A', profit: 40, sales: 500, ratio: 5, returnRatio: 305 },
      { date: '2019', type: 'A', test: 'TEST-D', profit: 10, sales: 100, ratio: 5, returnRatio: 30 },
      { date: '2020', type: 'A', test: 'TEST-D', profit: 30, sales: 3200, ratio: 4, returnRatio: 302 },
      { date: '2021', type: 'A', test: 'TEST-D', profit: 30, sales: 300, ratio: 3, returnRatio: 30 },
      { date: '2022', type: 'A', test: 'TEST-D', profit: 50, sales: 2400, ratio: 2, returnRatio: 304 },
      { date: '2023', type: 'A', test: 'TEST-D', profit: 40, sales: 500, ratio: 1, returnRatio: 35 },

      { date: '2019', type: 'B', test: 'TEST-A', profit: 10, sales: 100, ratio: 11, returnRatio: 301 },
      { date: '2020', type: 'B', test: 'TEST-A', profit: 30, sales: 3200, ratio: 12, returnRatio: 30 },
      { date: '2021', type: 'B', test: 'TEST-A', profit: 30, sales: 300, ratio: 13, returnRatio: 303 },
      { date: '2022', type: 'B', test: 'TEST-A', profit: 50, sales: 2400, ratio: 14, returnRatio: 34 },
      { date: '2023', type: 'B', test: 'TEST-A', profit: 40, sales: 500, ratio: 15, returnRatio: 305 },
      { date: '2019', type: 'B', test: 'TEST-D', profit: 10, sales: 100, ratio: 51, returnRatio: 30 },
      { date: '2020', type: 'B', test: 'TEST-D', profit: 30, sales: 3200, ratio: 51, returnRatio: 32 },
      { date: '2021', type: 'B', test: 'TEST-D', profit: 30, sales: 300, ratio: 52, returnRatio: 303 },
      { date: '2022', type: 'B', test: 'TEST-D', profit: 50, sales: 2400, ratio: 5, returnRatio: 34 },
      { date: '2023', type: 'B', test: 'TEST-D', profit: 40, sales: 500, ratio: 1, returnRatio: 35 },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
      },
      {
        id: 'type',
        alias: '类型',
        encoding: 'row',
      },
      {
        id: 'test',
        alias: '测试',
        encoding: 'column',
      },
    ],
    measures: [
      { id: 'profit', alias: '利润', encoding: 'primaryYAxis', parentId: 'first' },
      { id: 'sales', alias: '销售额', encoding: 'secondaryYAxis', parentId: 'first' },
      { id: 'ratio', alias: '比率', encoding: 'primaryYAxis', parentId: 'second' },
      { id: 'returnRatio', alias: '回报率', encoding: 'secondaryYAxis', parentId: 'second' },
    ],
  }
  return <PivotChart vseed={vseed} />
})

export const DualChartType = memo(() => {
  const vseed: VSeed = {
    chartType: 'dualAxis',
    dataset: [
      { date: '2019', profit: 20, sales: 100 },
      { date: '2020', profit: 30, sales: 600 },
      { date: '2021', profit: 30, sales: 600 },
      { date: '2022', profit: 50, sales: 500 },
      { date: '2023', profit: 10, sales: 800 },
    ],
    measures: [
      { id: 'sales', alias: '销售额', encoding: 'primaryYAxis' },
      { id: 'profit', alias: '利润', encoding: 'secondaryYAxis' },
    ],
    dualChartType: {
      primary: 'area',
      secondary: 'scatter',
    },
  }
  return <VChartRender vseed={vseed} />
})

export const DualChartTypeArray = memo(() => {
  const vseed: VSeed = {
    chartType: 'dualAxis',
    dualChartType: [
      {
        primary: 'area',
        secondary: 'scatter',
      },
      {
        primary: 'column',
        secondary: 'line',
      },
    ],
    measures: [
      { id: 'profit', alias: '利润', encoding: 'primaryYAxis', parentId: 'first' },
      { id: 'sales', alias: '销售额', encoding: 'secondaryYAxis', parentId: 'first' },
      { id: 'ratio', alias: '比率', encoding: 'primaryYAxis', parentId: 'second' },
      { id: 'returnRatio', alias: '回报率', encoding: 'secondaryYAxis', parentId: 'second' },
    ],
    dataset: [
      { date: '2019', profit: 10, sales: 100, ratio: 301, returnRatio: 301 },
      { date: '2020', profit: 30, sales: 3200, ratio: 32, returnRatio: 30 },
      { date: '2021', profit: 30, sales: 300, ratio: 103, returnRatio: 503 },
      { date: '2022', profit: 50, sales: 2400, ratio: 30, returnRatio: 24 },
      { date: '2023', profit: 40, sales: 500, ratio: 305, returnRatio: 305 },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
      },
    ],
  }
  return <PivotChart vseed={vseed} />
})

export const DualYAxisArray = memo(() => {
  const vseed: VSeed = {
    chartType: 'dualAxis',
    primaryYAxis: [
      {
        title: {
          visible: true,
          titleText: '利润',
        },
      },
      {
        title: {
          visible: true,
          titleText: '销售额',
        },
      },
    ],
    secondaryYAxis: [
      {
        title: {
          visible: true,
          titleText: '比率',
        },
      },
      {
        title: {
          visible: true,
          titleText: '回报率',
        },
      },
    ],
    measures: [
      { id: 'profit', alias: '利润', encoding: 'primaryYAxis', parentId: 'first' },
      { id: 'sales', alias: '销售额', encoding: 'secondaryYAxis', parentId: 'first' },
      { id: 'ratio', alias: '比率', encoding: 'primaryYAxis', parentId: 'second' },
      { id: 'returnRatio', alias: '回报率', encoding: 'secondaryYAxis', parentId: 'second' },
    ],
    dataset: [
      { date: '2019', profit: 10, sales: 100, ratio: 301, returnRatio: 301 },
      { date: '2020', profit: 30, sales: 3200, ratio: 32, returnRatio: 30 },
      { date: '2021', profit: 30, sales: 300, ratio: 103, returnRatio: 503 },
      { date: '2022', profit: 50, sales: 2400, ratio: 30, returnRatio: 24 },
      { date: '2023', profit: 40, sales: 500, ratio: 305, returnRatio: 305 },
    ],

    dimensions: [
      {
        id: 'date',
        alias: '日期',
      },
    ],
  }
  return <PivotChart vseed={vseed} />
})
