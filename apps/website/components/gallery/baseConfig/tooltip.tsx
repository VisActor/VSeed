import { VChartRender } from '../../render/Chart'
import { memo } from 'react'
import { ColumnParallel } from '@visactor/vseed'

export const BaseConfigTooltip = memo(() => {
  const vseed: ColumnParallel = {
    chartType: 'columnParallel',
    tooltip: {
      enable: false,
    },
    dataset: [
      { date: '2019', profit: 10, sales: 20 },
      { date: '2020', profit: 30, sales: 60 },
      { date: '2021', profit: 30, sales: 60 },
      { date: '2022', profit: 50, sales: 100 },
      { date: '2023', profit: 40, sales: 80 },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
        
      },
    ],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
    ],
  }
  return <VChartRender vseed={vseed} />
})
