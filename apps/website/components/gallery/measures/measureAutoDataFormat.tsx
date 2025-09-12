import { VSeed } from '@visactor/vseed'
import { memo } from 'react'
import { PivotChart } from 'components/render'

export const MeasureAutoDataFormat = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    measures: [
      {
        id: 'group1',
        alias: 'group1',
        children: [
          {
            id: 'profit',
            alias: '利润',
            autoFormat: false,
          },
          {
            id: 'sales',
            alias: '销售额',
            autoFormat: true,
          },
        ],
      },
      {
        id: 'group2',
        alias: 'group2',
        children: [
          {
            id: 'discount',
            alias: '折扣',
            autoFormat: true,
          },
        ],
      },
      {
        id: 'rateOfReturn',
        alias: '回报率',
        autoFormat: true,
      },
    ],
    dimensions: [{ id: 'date', alias: '日期',   }],
    dataset: [
      { date: '2019', profit: 10000, sales: 200000, discount: 0.5, rateOfReturn: 0.1 },
      { date: '2020', profit: 20000, sales: 400000, discount: 0.2, rateOfReturn: 0.02 },
      { date: '2021', profit: 30000, sales: 600000, discount: 0.4, rateOfReturn: 0.003 },
      { date: '2022', profit: 40000, sales: 800000, discount: 0.2, rateOfReturn: 0.0004 },
      { date: '2023', profit: 50000, sales: 1000000, discount: 0.05, rateOfReturn: 0.00005 },
    ],
  }
  return <PivotChart vseed={vseed} />
})
