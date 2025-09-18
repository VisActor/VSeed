import { VSeed } from '@visactor/vseed'
import { PivotChart } from 'components/render'
import { memo } from 'react'

export const MeasureGroups = memo(() => {
  const vseed: VSeed = {
    chartType: 'column',
    measures: [
      {
        id: 'group1',
        alias: '分组1',
        children: [
          { id: 'profit', alias: '利润' },
          { id: 'sales', alias: '销售额' },
        ],
      },
      {
        id: 'group2',
        alias: '分组2',
        children: [{ id: 'discount', alias: '折扣' }],
      },
      { id: 'rateOfReturn', alias: '回报率' },
    ],
    dimensions: [{ id: 'date', alias: '日期' }],
    dataset: [
      { date: '2019', profit: 10, sales: 20, discount: 0.5, rateOfReturn: 0.1 },
      { date: '2020', profit: 20, sales: 40, discount: 0.2, rateOfReturn: 0.2 },
      { date: '2021', profit: 30, sales: 60, discount: 0.4, rateOfReturn: 0.3 },
      { date: '2022', profit: 40, sales: 80, discount: 0.2, rateOfReturn: 0.4 },
      { date: '2023', profit: 50, sales: 100, discount: 0.05, rateOfReturn: 0.5 },
    ],
  }
  return <PivotChart vseed={vseed} />
})
