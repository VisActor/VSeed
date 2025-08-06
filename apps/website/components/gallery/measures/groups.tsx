import { VSeed } from '@visactor/vseed'
import { VSeedRender } from '../../render/VSeedRender'
import { memo } from 'react'

export const MeasureGroups = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    measures: [
      {
        id: 'group',
        alias: '分组',
        children: [
          { id: 'profit', alias: '利润' },
          { id: 'sales', alias: '销售额' },
        ],
      },
      { id: 'discount', alias: '折扣' },
    ],
    dimensions: [{ id: 'date', alias: '日期', location: 'dimension' }],
    dataset: [
      { date: '2019', profit: 10, sales: 20, discount: 0.1 },
      { date: '2020', profit: 30, sales: 60, discount: 0.2 },
      { date: '2021', profit: 30, sales: 60, discount: 0.1 },
      { date: '2022', profit: 50, sales: 100, discount: 0.2 },
      { date: '2023', profit: 40, sales: 80, discount: 0.3 },
    ],
  }
  return <VSeedRender vseed={vseed} />
})
