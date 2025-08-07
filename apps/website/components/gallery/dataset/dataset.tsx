import { VSeed } from '@visactor/vseed'
import { VSeedRender } from '../../render/Chart'
import { memo } from 'react'

export const Dataset = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售量' },
    ],
    dimensions: [
      { id: 'date', alias: '日期', location: 'dimension' },
      { id: 'region', alias: '区域', location: 'dimension' },
    ],
    dataset: [
      { date: '2019', region: 'east', profit: 10, sales: 20 },
      { date: '2020', region: 'east', profit: 30, sales: 60 },
      { date: '2021', region: 'east', profit: 30, sales: 60 },
      { date: '2022', region: 'east', profit: 50, sales: 100 },
      { date: '2023', region: 'east', profit: 40, sales: 80 },

      { date: '2019', region: 'north of east', profit: 10, sales: 20 },
      { date: '2020', region: 'north of east', profit: 30, sales: 60 },
      { date: '2021', region: 'north of east', profit: 30, sales: 60 },
      { date: '2022', region: 'north of east', profit: 50, sales: 100 },
      { date: '2023', region: 'north of east', profit: 40, sales: 80 },
    ],
  }
  return <VSeedRender vseed={vseed} />
})
