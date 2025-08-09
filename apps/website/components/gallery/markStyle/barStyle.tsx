import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { memo } from 'react'

export const SelectorBarValue = memo(() => {
  const vseed: VSeed = {
    chartType: 'column',
    dataset: [
      { date: '2019', profit: 10, sales: 20, discount: 0.1 },
      { date: '2020', profit: 30, sales: 60, discount: 0.2 },
      { date: '2021', profit: 30, sales: 60, discount: 0.1 },
      { date: '2022', profit: 50, sales: 100, discount: 0.2 },
      { date: '2023', profit: 40, sales: 80, discount: 0.3 },
    ],
    barStyle: {
      selector: ['2019', '2020'],
      barColor: 'lightpink',
      barColorOpacity: 0.8,
      barBorderColor: 'lightblue',
      barBorderWidth: 1,
      barBorderStyle: 'dashed',
      barRadius: [4, 4, 8, 8],
    },
    dimensions: [{ id: 'date', alias: '日期', location: 'dimension' }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'discount', alias: '折扣' },
    ],
  }
  return <VChartRender vseed={vseed} />
})
