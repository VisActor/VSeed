import { VSeed } from '@visactor/vseed'
import { PivotChart } from 'components/render'
import { memo } from 'react'

export const PivotDimensions = memo(() => {
  const vseed: VSeed = {
    chartType: 'columnParallel',
    dimensions: [
      { id: 'category', alias: '类别',   },
      { id: 'date', alias: '日期', encoding: 'column' },
      { id: 'region', alias: '区域', encoding: 'row' },
    ],
    measures: [{ id: 'profit', alias: '利润' }],
    dataset: [
      { date: '2019', region: 'east', category: 'Grocery', profit: 10 },
      { date: '2019', region: 'east', category: 'Beverages', profit: 30 },
      { date: '2019', region: 'east', category: 'Dairy', profit: 30 },
      { date: '2019', region: 'east', category: 'Household', profit: 50 },
      { date: '2019', region: 'east', category: 'Personal', profit: 40 },
      { date: '2019', region: 'west', category: 'Grocery', profit: 10 },
      { date: '2019', region: 'west', category: 'Beverages', profit: 30 },
      { date: '2019', region: 'west', category: 'Dairy', profit: 30 },
      { date: '2019', region: 'west', category: 'Household', profit: 50 },
      { date: '2019', region: 'west', category: 'Personal', profit: 40 },

      { date: '2020', region: 'east', category: 'Grocery', profit: 10 },
      { date: '2020', region: 'east', category: 'Beverages', profit: 30 },
      { date: '2020', region: 'east', category: 'Dairy', profit: 30 },
      { date: '2020', region: 'east', category: 'Household', profit: 50 },
      { date: '2020', region: 'east', category: 'Personal', profit: 40 },
      { date: '2020', region: 'west', category: 'Grocery', profit: 10 },
      { date: '2020', region: 'west', category: 'Beverages', profit: 30 },
      { date: '2020', region: 'west', category: 'Dairy', profit: 30 },
      { date: '2020', region: 'west', category: 'Household', profit: 50 },
      { date: '2020', region: 'west', category: 'Personal', profit: 40 },
    ],
  }
  return <PivotChart vseed={vseed} />
})
