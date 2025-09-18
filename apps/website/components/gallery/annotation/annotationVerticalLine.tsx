import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { memo } from 'react'

export const AnnotationVerticalLineSelector = memo(() => {
  const vseed: VSeed = {
    chartType: 'line',
    dataset: [
      { date: '2019', profit: 100, sales: 200, count: 500 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    annotationVerticalLine: {
      selector: {
        field: 'date',
        operator: 'not in',
        value: ['2019'],
      },
      text: '下降趋势',
    },
    dimensions: [{ id: 'date', alias: '日期' }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const AnnotationVerticalLineValue = memo(() => {
  const vseed: VSeed = {
    chartType: 'area',
    dataset: [
      { date: '2019', profit: 100, sales: 200, count: 500 },
      { date: '2020', profit: 30, sales: 60, count: 50 },
      { date: '2021', profit: 30, sales: 60, count: 50 },
      { date: '2022', profit: 50, sales: 100, count: 50 },
      { date: '2023', profit: 40, sales: 80, count: 50 },
    ],
    annotationVerticalLine: {
      xValue: '2022',
      text: '下降开始',
    },
    dimensions: [{ id: 'date', alias: '日期' }],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售额' },
      { id: 'count', alias: '数量' },
    ],
  }
  return <VChartRender vseed={vseed} />
})
