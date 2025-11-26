import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { memo } from 'react'

export const HistogramKde = memo(() => {
  const vseed: VSeed = {
    chartType: 'histogram',
    dataset: [{ v: 1 }, { v: 1 }, { v: 1 }, { v: 2 }, { v: 5 }, { v: 7 }, { v: 8 }, { v: 9 }, { v: 10 }],
    kdeRegressionLine: {
      color: 'red',
      text: 'KDE 回归线',
    },
  }
  return <VChartRender vseed={vseed} />
})
