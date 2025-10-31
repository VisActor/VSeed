import { memo } from 'react'
import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { PivotChart } from '../../render/PivotChart'

export const SimpleHistogram = memo(() => {
  const vseed: VSeed = {
    chartType: 'histogram',
    dataset: [{ v: 1 }, { v: 1 }, { v: 1 }, { v: 2 }, { v: 5 }, { v: 7 }, { v: 8 }, { v: 9 }, { v: 10 }],
  }
  return <VChartRender vseed={vseed} />
})

export const PivotHistogram = memo(() => {
  const vseed: VSeed = {
    chartType: 'histogram',
    dataset: [
      { color: 'red', shape: 'circle', v: 1 },
      { color: 'red', shape: 'circle', v: 1 },
      { color: 'red', shape: 'circle', v: 1 },
      { color: 'red', shape: 'circle', v: 2 },
      { color: 'red', shape: 'circle', v: 5 },
      { color: 'red', shape: 'circle', v: 7 },
      { color: 'red', shape: 'circle', v: 8 },
      { color: 'red', shape: 'circle', v: 9 },
      { color: 'red', shape: 'circle', v: 10 },
      { color: 'blue', shape: 'circle', v: 1 },
      { color: 'blue', shape: 'circle', v: 1 },
      { color: 'blue', shape: 'circle', v: 1 },
      { color: 'blue', shape: 'circle', v: 2 },
      { color: 'blue', shape: 'circle', v: 5 },
      { color: 'blue', shape: 'circle', v: 7 },
      { color: 'blue', shape: 'circle', v: 8 },
      { color: 'blue', shape: 'circle', v: 9 },

      { color: 'red', shape: 'triangle', v: 1 },
      { color: 'red', shape: 'triangle', v: 1 },
      { color: 'red', shape: 'triangle', v: 1 },
      { color: 'red', shape: 'triangle', v: 2 },
      { color: 'red', shape: 'triangle', v: 5 },
      { color: 'red', shape: 'triangle', v: 7 },
      { color: 'red', shape: 'triangle', v: 8 },
      { color: 'red', shape: 'triangle', v: 9 },
      { color: 'blue', shape: 'triangle', v: 1 },
      { color: 'blue', shape: 'triangle', v: 1 },
      { color: 'blue', shape: 'triangle', v: 1 },
      { color: 'blue', shape: 'triangle', v: 2 },
      { color: 'blue', shape: 'triangle', v: 5 },
      { color: 'blue', shape: 'triangle', v: 7 },
      { color: 'blue', shape: 'triangle', v: 8 },
      { color: 'blue', shape: 'triangle', v: 9 },
    ],
    dimensions: [
      {
        id: 'color',
        encoding: 'row',
      },
      {
        id: 'shape',
        encoding: 'column',
      },
    ],
    measures: [
      {
        id: 'v',
        encoding: 'value',
      },
    ],
  }
  return <PivotChart vseed={vseed} />
})
