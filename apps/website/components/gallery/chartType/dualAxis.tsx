import { memo } from 'react'
import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { PivotChart } from '../../render/PivotChart'

export const DualAxisChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'dualAxis',
    dataset: [
      { date: '2019', profit: 10, sales: 200 },
      { date: '2020', profit: 30, sales: 600 },
      { date: '2021', profit: 30, sales: 600 },
      { date: '2022', profit: 50, sales: 1000 },
      { date: '2023', profit: 40, sales: 800 },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const CombinationDualAxisChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'dualAxis',
    dataset: [
      { date: '2019', profit: 10, sales: 100, ratio: 301, returnRatio: 301 },
      { date: '2020', profit: 30, sales: 3200, ratio: 302, returnRatio: 302 },
      { date: '2021', profit: 30, sales: 300, ratio: 303, returnRatio: 303 },
      { date: '2022', profit: 50, sales: 2400, ratio: 304, returnRatio: 304 },
      { date: '2023', profit: 40, sales: 500, ratio: 305, returnRatio: 305 },
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
        primaryAlias: 'profit',
        secondaryAlias: 'sales',
        primaryMeasures: [{ id: 'profit' }],
        secondaryMeasures: [{ id: 'sales' }],
      },
      {
        primaryAlias: 'ratio',
        secondaryAlias: 'returnRatio',
        primaryMeasures: [{ id: 'ratio' }],
        secondaryMeasures: [{ id: 'returnRatio' }],
      },
    ],
  }
  return <PivotChart vseed={vseed} />
})

export const PivotDualAxisChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'dualAxis',
    dataset: [
      { date: '2019', type: 'A', test: 'TEST-A', profit: 10, sales: 100, ratio: 301, returnRatio: 301 },
      { date: '2020', type: 'A', test: 'TEST-A', profit: 30, sales: 3200, ratio: 302, returnRatio: 302 },
      { date: '2021', type: 'A', test: 'TEST-A', profit: 30, sales: 300, ratio: 303, returnRatio: 303 },
      { date: '2022', type: 'A', test: 'TEST-A', profit: 50, sales: 2400, ratio: 304, returnRatio: 304 },
      { date: '2023', type: 'A', test: 'TEST-A', profit: 40, sales: 500, ratio: 305, returnRatio: 305 },
      { date: '2019', type: 'A', test: 'TEST-B', profit: 10, sales: 100, ratio: 301, returnRatio: 301 },
      { date: '2020', type: 'A', test: 'TEST-B', profit: 30, sales: 3200, ratio: 302, returnRatio: 302 },
      { date: '2021', type: 'A', test: 'TEST-B', profit: 30, sales: 300, ratio: 303, returnRatio: 303 },
      { date: '2022', type: 'A', test: 'TEST-B', profit: 50, sales: 2400, ratio: 304, returnRatio: 304 },
      { date: '2023', type: 'A', test: 'TEST-B', profit: 40, sales: 500, ratio: 305, returnRatio: 305 },

      { date: '2019', type: 'B', test: 'TEST-C', profit: 10, sales: 100, ratio: 301, returnRatio: 301 },
      { date: '2020', type: 'B', test: 'TEST-C', profit: 30, sales: 3200, ratio: 302, returnRatio: 302 },
      { date: '2021', type: 'B', test: 'TEST-C', profit: 30, sales: 300, ratio: 303, returnRatio: 303 },
      { date: '2022', type: 'B', test: 'TEST-C', profit: 50, sales: 2400, ratio: 304, returnRatio: 304 },
      { date: '2023', type: 'B', test: 'TEST-C', profit: 40, sales: 500, ratio: 305, returnRatio: 305 },
      { date: '2019', type: 'B', test: 'TEST-D', profit: 10, sales: 100, ratio: 301, returnRatio: 301 },
      { date: '2020', type: 'B', test: 'TEST-D', profit: 30, sales: 3200, ratio: 302, returnRatio: 302 },
      { date: '2021', type: 'B', test: 'TEST-D', profit: 30, sales: 300, ratio: 303, returnRatio: 303 },
      { date: '2022', type: 'B', test: 'TEST-D', profit: 50, sales: 2400, ratio: 304, returnRatio: 304 },
      { date: '2023', type: 'B', test: 'TEST-D', profit: 40, sales: 500, ratio: 305, returnRatio: 305 },
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
        location: 'rowDimension',
      },
      {
        id: 'test',
        alias: '测试',
        location: 'columnDimension',
      },
    ],
    measures: [
      {
        primaryAlias: 'profit',
        secondaryAlias: 'sales',
        primaryMeasures: [{ id: 'profit' }],
        secondaryMeasures: [{ id: 'sales' }],
      },
      {
        primaryAlias: 'ratio',
        secondaryAlias: 'returnRatio',
        primaryMeasures: [{ id: 'ratio' }],
        secondaryMeasures: [{ id: 'returnRatio' }],
      },
    ],
  }
  return <PivotChart vseed={vseed} />
})
