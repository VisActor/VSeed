import { VSeed } from '@visactor/vseed'
import { Table as VTableTable } from 'components/render'
import { memo } from 'react'

export const TableBodyCellStyle = memo(() => {
  const vseed: VSeed = {
    chartType: 'table',
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
        selector: { field: 'sales', operator: '>=', value: 150 },
        textColor: 'red',
      },
    ],
  }
  return <VTableTable vseed={vseed} />
})

export const TableBodyCellStyleGlobal = memo(() => {
  const vseed: VSeed = {
    chartType: 'table',
    dataset: [
      { date: '2019', type: 'A', goalProfit: 10, profit: 10, sales: 100, leftCount: 1, salesCount: 100 },
      { date: '2020', type: 'A', goalProfit: 30, profit: 30, sales: 320, leftCount: 2, salesCount: 200 },
      { date: '2021', type: 'A', goalProfit: 30, profit: 30, sales: 300, leftCount: 3, salesCount: 300 },
      { date: '2022', type: 'A', goalProfit: 50, profit: 50, sales: 240, leftCount: 4, salesCount: 400 },
      { date: '2023', type: 'A', goalProfit: 40, profit: 40, sales: 500, leftCount: 5, salesCount: 500 },
    ],
    bodyCellStyle: {
      backgroundColor: '#f8f9fa',
      textColor: '#333',
    },
  }
  return <VTableTable vseed={vseed} />
})

export const TableBodyCellStyleByValue = memo(() => {
  const vseed: VSeed = {
    chartType: 'table',
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
        backgroundColor: '#fff3cd',
        textColor: '#a15c00',
      },
    ],
  }
  return <VTableTable vseed={vseed} />
})

export const TableBodyCellStyleMulti = memo(() => {
  const vseed: VSeed = {
    chartType: 'table',
    dataset: [
      { date: '2019', type: 'A', goalProfit: 10, profit: 10, sales: 100, leftCount: 1, salesCount: 100 },
      { date: '2020', type: 'A', goalProfit: 30, profit: 30, sales: 320, leftCount: 2, salesCount: 200 },
      { date: '2021', type: 'A', goalProfit: 30, profit: 30, sales: 300, leftCount: 3, salesCount: 300 },
      { date: '2022', type: 'A', goalProfit: 50, profit: 50, sales: 240, leftCount: 4, salesCount: 400 },
      { date: '2023', type: 'A', goalProfit: 40, profit: 40, sales: 500, leftCount: 5, salesCount: 500 },
    ],
    bodyCellStyle: [
      {
        // fallback/global style when no selector matched
        backgroundColor: 'pink',
      },
      {
        selector: { type: 'A' },
        backgroundColor: 'red',
      },
      {
        selector: { field: 'sales', operator: 'between', value: [200, 400] },
        backgroundColor: '#e6fcf5',
        textColor: '#0b7285',
      },
    ],
  }
  return <VTableTable vseed={vseed} />
})
