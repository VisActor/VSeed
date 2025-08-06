import { VSeed } from '@visactor/vseed'
import { VSeedRender } from '../../render/VSeedRender'
import { memo } from 'react'

export const Dataset1M3D = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    dataset: [
      { date: '2019', region: 'east', city: 'A', profit: 10 },
      { date: '2019', region: 'east', city: 'B', profit: 30 },
      { date: '2019', region: 'east', city: 'C', profit: 30 },
      { date: '2019', region: 'east', city: 'D', profit: 50 },
      { date: '2019', region: 'east', city: 'E', profit: 40 },

      { date: '2020', region: 'north of east', city: 'A', profit: 10 },
      { date: '2020', region: 'north of east', city: 'B', profit: 30 },
      { date: '2020', region: 'north of east', city: 'C', profit: 30 },
      { date: '2020', region: 'north of east', city: 'D', profit: 50 },
      { date: '2020', region: 'north of east', city: 'E', profit: 40 },
    ],
  }
  return <VSeedRender vseed={vseed} />
})
