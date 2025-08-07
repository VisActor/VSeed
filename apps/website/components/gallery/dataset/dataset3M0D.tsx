import { VSeed } from '@visactor/vseed'
import { VSeedRender } from '../../render/Chart'
import { memo } from 'react'

export const Dataset3M0D = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    dataset: [{ profit: 1, sales: 2, discount: 0.1 }],
  }
  return <VSeedRender vseed={vseed} />
})
