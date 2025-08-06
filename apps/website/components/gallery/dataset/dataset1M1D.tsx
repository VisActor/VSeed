import { VSeed } from '@visactor/vseed'
import { VSeedRender } from '../../render/VSeedRender'
import { memo } from 'react'

export const Dataset1M1D = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    dataset: [
      { date: '2019', profit: 10 },
      { date: '2020', profit: 30 },
      { date: '2021', profit: 30 },
      { date: '2022', profit: 50 },
      { date: '2023', profit: 40 },
    ],
  }
  return <VSeedRender vseed={vseed} />
})
