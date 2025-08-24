import { memo } from 'react'
import { VSeed } from '@visactor/vseed'
import { VChartRender } from '../../render/Chart'
import { PivotChart } from '../../render/PivotChart'

export const DualAxisChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'dualAxis',
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

export const CombinationDualAxisChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'dualAxis',
    dataset: [
      { date: '2019', category: 'Grocery', profit: 10, sales: 100, ratio: 0.1 },
      { date: '2020', category: 'Beverages', profit: 30, sales: 3200, ratio: 0.2 },
      { date: '2021', category: 'Dairy', profit: 30, sales: 300, ratio: 0.3 },
      { date: '2022', category: 'Household', profit: 50, sales: 2400, ratio: 0.4 },
      { date: '2023', category: 'Personal', profit: 40, sales: 500, ratio: 0.5 },
      { date: '2019', category: 'Grocery', profit: 10, sales: 100, ratio: 0.1 },
      { date: '2020', category: 'Beverages', profit: 30, sales: 3200, ratio: 0.2 },
      { date: '2021', category: 'Dairy', profit: 30, sales: 300, ratio: 0.3 },
      { date: '2022', category: 'Household', profit: 50, sales: 2400, ratio: 0.4 },
      { date: '2023', category: 'Personal', profit: 40, sales: 500, ratio: 0.5 },
    ],
    measures: [
      {
        primaryAlias: 'profit',
        secondaryAlias: 'sales',
        primaryMeasures: [{ id: 'profit' }],
        secondaryMeasures: [{ id: 'sales' }],
      },
      {
        primaryAlias: 'ratio',
        primaryMeasures: [{ id: 'ratio' }],
      },
    ],
  }
  return <PivotChart vseed={vseed} />
})

export const PivotDualAxisChart = memo(() => {
  const vseed: VSeed = {
    chartType: 'dualAxis',
    dataset: [
      { date: '2019', region: 'east', category: 'Grocery', profit: 10, sales: 100 },
      { date: '2019', region: 'east', category: 'Beverages', profit: 30, sales: 3200 },
      { date: '2019', region: 'east', category: 'Dairy', profit: 30, sales: 300 },
      { date: '2019', region: 'east', category: 'Household', profit: 50, sales: 2400 },
      { date: '2019', region: 'east', category: 'Personal', profit: 40, sales: 500 },
      { date: '2019', region: 'west', category: 'Grocery', profit: 10, sales: 100 },
      { date: '2019', region: 'west', category: 'Beverages', profit: 30, sales: 3200 },
      { date: '2019', region: 'west', category: 'Dairy', profit: 30, sales: 300 },
      { date: '2019', region: 'west', category: 'Household', profit: 50, sales: 2400 },
      { date: '2019', region: 'west', category: 'Personal', profit: 40, sales: 500 },

      { date: '2020', region: 'east', category: 'Grocery', profit: 10, sales: 100 },
      { date: '2020', region: 'east', category: 'Beverages', profit: 30, sales: 3200 },
      { date: '2020', region: 'east', category: 'Dairy', profit: 30, sales: 300 },
      { date: '2020', region: 'east', category: 'Household', profit: 50, sales: 2400 },
      { date: '2020', region: 'east', category: 'Personal', profit: 40, sales: 500 },
      { date: '2020', region: 'west', category: 'Grocery', profit: 10, sales: 100 },
      { date: '2020', region: 'west', category: 'Beverages', profit: 30, sales: 3200 },
      { date: '2020', region: 'west', category: 'Dairy', profit: 30, sales: 300 },
      { date: '2020', region: 'west', category: 'Household', profit: 50, sales: 2400 },
      { date: '2020', region: 'west', category: 'Personal', profit: 40, sales: 500 },
    ],
  }
  return <PivotChart vseed={vseed} />
})
