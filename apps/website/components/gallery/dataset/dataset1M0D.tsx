import { VSeed } from '@visactor/vseed'
import { VSeedRender } from '../../render/Chart'
import { memo } from 'react'

export const Dataset1M0D = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    dataset: [{ profit: 10 }],
  }
  return <VSeedRender vseed={vseed} />
})
