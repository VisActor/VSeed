import { VSeed } from '@visactor/vseed'
import { VSeedRender } from '../../render/Chart'
import { memo } from 'react'

export const Dataset3M3D = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    dataset: [
      { date: '2019', region: 'east', city: 'A', profit: 1, sales: 2, discount: 0.5 },
      { date: '2019', region: 'east', city: 'B', profit: 3, sales: 6, discount: 0.5 },
      { date: '2019', region: 'east', city: 'C', profit: 3, sales: 6, discount: 0.5 },
      { date: '2019', region: 'east', city: 'D', profit: 5, sales: 10, discount: 0.5 },
      { date: '2019', region: 'east', city: 'E', profit: 4, sales: 8, discount: 0.5 },

      { date: '2020', region: 'north of east', city: 'A', profit: 1, sales: 2, discount: 0.5 },
      { date: '2020', region: 'north of east', city: 'B', profit: 3, sales: 6, discount: 0.5 },
      { date: '2020', region: 'north of east', city: 'C', profit: 3, sales: 6, discount: 0.5 },
      { date: '2020', region: 'north of east', city: 'D', profit: 5, sales: 10, discount: 0.5 },
      { date: '2020', region: 'north of east', city: 'E', profit: 4, sales: 8, discount: 0.5 },
    ],
  }
  return <VSeedRender vseed={vseed} />
})
