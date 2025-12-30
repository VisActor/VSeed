import { memo } from 'react'
import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'

export const InteractionBrushEnable = memo(() => {
  const vseed: VSeed = {
    chartType: 'column',
    brush: {
      enable: true,
      removeOnClick: true,
    },
    dataset: [
      { date: '2019-01', profit: 10, sales: 20 },
      { date: '2019-02', profit: 30, sales: 60 },
      { date: '2019-03', profit: 30, sales: 55 },
      { date: '2019-04', profit: 50, sales: 100 },
      { date: '2019-05', profit: 40, sales: 80 },
      { date: '2019-06', profit: 15, sales: 30 },
      { date: '2019-07', profit: 35, sales: 70 },
      { date: '2019-08', profit: 22, sales: 45 },
      { date: '2019-09', profit: 60, sales: 110 },
      { date: '2019-10', profit: 42, sales: 78 },
      { date: '2019-11', profit: 18, sales: 28 },
      { date: '2019-12', profit: 55, sales: 95 },
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
      },
    ],
    label: {
      enable: false,
    },
  }

  return <VChartRender vseed={vseed} />
})

export const InteractionBrushKeepSelection = memo(() => {
  const vseed: VSeed = {
    chartType: 'column',
    brush: {
      enable: true,
      removeOnClick: false,
    },
    dataset: [
      { date: '2019-01', profit: 10, sales: 20 },
      { date: '2019-02', profit: 30, sales: 60 },
      { date: '2019-03', profit: 30, sales: 55 },
      { date: '2019-04', profit: 50, sales: 100 },
      { date: '2019-05', profit: 40, sales: 80 },
      { date: '2019-06', profit: 15, sales: 30 },
      { date: '2019-07', profit: 35, sales: 70 },
      { date: '2019-08', profit: 22, sales: 45 },
      { date: '2019-09', profit: 60, sales: 110 },
      { date: '2019-10', profit: 42, sales: 78 },
      { date: '2019-11', profit: 18, sales: 28 },
      { date: '2019-12', profit: 55, sales: 95 },
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
      },
    ],
    label: {
      enable: false,
    },
  }

  return <VChartRender vseed={vseed} />
})
