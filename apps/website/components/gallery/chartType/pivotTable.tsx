import { VSeed } from '@visactor/vseed'
import { PivotTable as VTablePivotTable } from 'components/render'
import { memo } from 'react'

export const PivotTableAuto = memo(() => {
  const vseed: VSeed = {
    chartType: 'pivotTable',
    dataset: [
      { date: '2019', type: 'A', goalProfit: 10, profit: 10, sales: 100, leftCount: 1, salesCount: 100 },
      { date: '2020', type: 'A', goalProfit: 30, profit: 30, sales: 320, leftCount: 2, salesCount: 200 },
      { date: '2021', type: 'A', goalProfit: 30, profit: 30, sales: 300, leftCount: 3, salesCount: 300 },
      { date: '2022', type: 'A', goalProfit: 50, profit: 50, sales: 240, leftCount: 4, salesCount: 400 },
      { date: '2023', type: 'A', goalProfit: 40, profit: 40, sales: 500, leftCount: 5, salesCount: 500 },
    ],
  }
  return <VTablePivotTable vseed={vseed} />
})

export const PivotTableRowDimensions = memo(() => {
  const vseed: VSeed = {
    chartType: 'pivotTable',
    dataset: [
      { date: '2019', type: 'A', goalProfit: 10, profit: 10, sales: 100, leftCount: 1, salesCount: 100 },
      { date: '2020', type: 'A', goalProfit: 30, profit: 30, sales: 320, leftCount: 2, salesCount: 200 },
      { date: '2021', type: 'A', goalProfit: 30, profit: 30, sales: 300, leftCount: 3, salesCount: 300 },
      { date: '2022', type: 'A', goalProfit: 50, profit: 50, sales: 240, leftCount: 4, salesCount: 400 },
      { date: '2023', type: 'A', goalProfit: 40, profit: 40, sales: 500, leftCount: 5, salesCount: 500 },
    ],
    measures: [
      {
        id: 'goalProfit',
        alias: '利润目标',
      },
      {
        id: 'profit',
        alias: '利润',
      },
      {
        id: 'sales',
        alias: '销售量',
      },
      {
        id: 'leftCount',
        alias: '遗留数量',
      },
      {
        id: 'salesCount',
        alias: '销售数',
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
        encoding: 'row',
      },
      {
        id: 'type',
        alias: '类型',
        encoding: 'row',
      },
    ],
  }
  return <VTablePivotTable vseed={vseed} />
})

export const PivotTableColumnDimensions = memo(() => {
  const vseed: VSeed = {
    chartType: 'pivotTable',
    dataset: [
      { date: '2019', type: 'A', goalProfit: 10, profit: 10, sales: 100, leftCount: 1, salesCount: 100 },
      { date: '2020', type: 'A', goalProfit: 30, profit: 30, sales: 320, leftCount: 2, salesCount: 200 },
      { date: '2021', type: 'A', goalProfit: 30, profit: 30, sales: 300, leftCount: 3, salesCount: 300 },
      { date: '2022', type: 'A', goalProfit: 50, profit: 50, sales: 240, leftCount: 4, salesCount: 400 },
      { date: '2023', type: 'A', goalProfit: 40, profit: 40, sales: 500, leftCount: 5, salesCount: 500 },
    ],
    measures: [
      {
        id: 'goalProfit',
        alias: '利润目标',
      },
      {
        id: 'profit',
        alias: '利润',
      },
      {
        id: 'leftCount',
        alias: '遗留数量',
      },
      {
        id: 'salesCount',
        alias: '销售数',
      },
      {
        id: 'sales',
        alias: '销售量',
      },
    ],
    dimensions: [
      {
        id: 'date',
        alias: '日期',
        encoding: 'column',
      },
      {
        id: 'type',
        alias: '类型',
        encoding: 'column',
      },
    ],
  }
  return <VTablePivotTable vseed={vseed} />
})
