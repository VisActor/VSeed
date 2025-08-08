import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { memo } from 'react'

export const Dataset3M0D = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    dataset: [{ profit: 1, sales: 2, discount: 0.1 }],
  }
  return <VChartRender vseed={vseed} />
})
