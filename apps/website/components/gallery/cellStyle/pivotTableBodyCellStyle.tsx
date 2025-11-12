import { VSeed } from '@visactor/vseed'
import { PivotTable as VTablePivotTable } from 'components/render'
import { memo } from 'react'

export const PivotTableBodyCellStyleBasic = memo(() => {
  const vseed: VSeed = {
    chartType: 'pivotTable',
    dataset: [
      { date: '2019', type: 'A', goalProfit: 10, profit: 10, sales: 100, leftCount: 1, salesCount: 100 },
      { date: '2020', type: 'A', goalProfit: 30, profit: 30, sales: 320, leftCount: 2, salesCount: 200 },
      { date: '2021', type: 'A', goalProfit: 30, profit: 30, sales: 300, leftCount: 3, salesCount: 300 },
      { date: '2022', type: 'A', goalProfit: 50, profit: 50, sales: 240, leftCount: 4, salesCount: 400 },
      { date: '2023', type: 'A', goalProfit: 40, profit: 40, sales: 500, leftCount: 5, salesCount: 500 },
    ],
    bodyCellStyle: {
      backgroundColor: '#faf0e6',
      textColor: '#4d342e',
    },
  }
  return <VTablePivotTable vseed={vseed} />
})

export const PivotTableBodyCellStyleByValue = memo(() => {
  const vseed: VSeed = {
    chartType: 'pivotTable',
    dataset: [
      { date: '2019', type: 'A', goalProfit: 10, profit: 10, sales: 100, leftCount: 1, salesCount: 100 },
      { date: '2020', type: 'A', goalProfit: 30, profit: 30, sales: 320, leftCount: 2, salesCount: 200 },
      { date: '2021', type: 'A', goalProfit: 30, profit: 30, sales: 300, leftCount: 3, salesCount: 300 },
      { date: '2022', type: 'A', goalProfit: 50, profit: 50, sales: 240, leftCount: 4, salesCount: 400 },
      { date: '2023', type: 'A', goalProfit: 40, profit: 40, sales: 500, leftCount: 5, salesCount: 500 },
    ],
    bodyCellStyle: [
      {
        selector: { field: 'sales', operator: '>=', value: 300 },
        backgroundColor: '#e3f2fd',
        textColor: '#0d47a1',
      },
    ],
    dimensions: [
      { id: 'date', alias: '日期', encoding: 'column' },
      { id: 'type', alias: '类型', encoding: 'row' },
    ],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售量' },
    ],
  }
  return <VTablePivotTable vseed={vseed} />
})

export const PivotTableBodyCellStyleMulti = memo(() => {
  const vseed: VSeed = {
    chartType: 'pivotTable',
    dataset: [
      { date: '2019', type: 'A', goalProfit: 10, profit: 10, sales: 100, leftCount: 1, salesCount: 100 },
      { date: '2020', type: 'A', goalProfit: 30, profit: 30, sales: 320, leftCount: 2, salesCount: 200 },
      { date: '2021', type: 'A', goalProfit: 30, profit: 30, sales: 300, leftCount: 3, salesCount: 300 },
      { date: '2022', type: 'A', goalProfit: 50, profit: 50, sales: 240, leftCount: 4, salesCount: 400 },
      { date: '2023', type: 'A', goalProfit: 40, profit: 40, sales: 500, leftCount: 5, salesCount: 500 },
    ],
    bodyCellStyle: [
      {
        selector: { type: 'A' },
        backgroundColor: 'pink',
      },
      {
        selector: { field: 'date', operator: 'in', value: ['2019', '2023'] },
        textColor: 'green',
      },
    ],
    dimensions: [
      { id: 'date', alias: '日期', encoding: 'column' },
      { id: 'type', alias: '类型', encoding: 'row' },
    ],
    measures: [
      { id: 'profit', alias: '利润' },
      { id: 'sales', alias: '销售量' },
    ],
  }
  return <VTablePivotTable vseed={vseed} />
})
