import { useRef, useEffect } from 'react'
import VChart from '@visactor/vchart'
import { registerColumn, VSeed, Builder } from '@visactor/vseed'
registerColumn()

function Demo() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const vseed: VSeed = {
      chartType: 'column',
      dataset: [
        { date: '2019', type: 'A', profit: 10, sales: 100 },
        { date: '2020', type: 'A', profit: 30, sales: 3200 },
        { date: '2021', type: 'A', profit: 30, sales: 300 },
        { date: '2022', type: 'A', profit: 50, sales: 2400 },
        { date: '2023', type: 'A', profit: 40, sales: 500 },

        { date: '2019', type: 'B', profit: 10, sales: 100 },
        { date: '2020', type: 'B', profit: 30, sales: 3200 },
        { date: '2021', type: 'B', profit: 30, sales: 300 },
        { date: '2022', type: 'B', profit: 50, sales: 2400 },
        { date: '2023', type: 'B', profit: 40, sales: 500 },
      ],
      dimensions: [
        {
          id: 'date',
          alias: '日期',
        },
      ],
      measures: [
        {
          id: 'measure-group1',
          children: [{ id: 'profit', alias: '利润' }],
        },
        {
          id: 'measure-group2',
          children: [{ id: 'sales', alias: '销售额' }],
        },
      ],
    }

    const spec = Builder.from(vseed).build()

    const vchart = new VChart(spec, { dom: ref.current })

    vchart.renderSync()

    return () => vchart.release()
  })

  return <div ref={ref} style={{ height: 300, width: '100%' }}></div>
}

export default Demo
