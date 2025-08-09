import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { memo } from 'react'

export const BaseConfigLegend = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    legend: {
      enable: false,
    },
    dataset: [
      { date: '2019', profit: 10, sales: 20 },
      { date: '2020', profit: 30, sales: 60 },
      { date: '2021', profit: 30, sales: 60 },
      { date: '2022', profit: 50, sales: 100 },
      { date: '2023', profit: 40, sales: 80 },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const BaseConfigLegendPosition = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    legend: {
      enable: true,
      position: 'bl',
    },
    dataset: [
      { date: '2019', profit: 10, sales: 20 },
      { date: '2020', profit: 30, sales: 60 },
      { date: '2021', profit: 30, sales: 60 },
      { date: '2022', profit: 50, sales: 100 },
      { date: '2023', profit: 40, sales: 80 },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const BaseConfigLegendMaxSize = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    legend: {
      enable: true,
      position: 'rt',
      maxSize: 2,
    },
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
  return <VChartRender vseed={vseed} />
})

export const BaseConfigLegendLabel = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    legend: {
      enable: true,
      position: 'rt',
      labelFontSize: 12,
      labelFontColor: '#000',
      labelFontWeight: 'bold',
    },
    dataset: [
      { date: '2019', profit: 10, sales: 20 },
      { date: '2020', profit: 30, sales: 60 },
      { date: '2021', profit: 30, sales: 60 },
      { date: '2022', profit: 50, sales: 100 },
      { date: '2023', profit: 40, sales: 80 },
    ],
  }
  return <VChartRender vseed={vseed} />
})

export const BaseConfigLegendBorder = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    legend: {
      enable: true,
      position: 'rt',
      border: false,
    },
    dataset: [
      { date: '2019', profit: 10, sales: 20 },
      { date: '2020', profit: 30, sales: 60 },
      { date: '2021', profit: 30, sales: 60 },
      { date: '2022', profit: 50, sales: 100 },
      { date: '2023', profit: 40, sales: 80 },
    ],
  }
  return <VChartRender vseed={vseed} />
})
