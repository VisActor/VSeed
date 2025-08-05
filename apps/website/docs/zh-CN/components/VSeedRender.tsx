import { useRef, useEffect, memo } from 'react'
import VChart from '@visactor/vchart'
import { registerAll, VSeed, Builder } from '@visactor/vseed'
registerAll()

export const VSeedRender = memo((props: { vseed: VSeed }) => {
  const {
    vseed = {
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
          location: 'dimension',
        },
        {
          id: 'type',
          alias: '类型',
          location: 'dimension',
        },
      ],
      measures: [
        { id: 'profit', alias: '利润' },
        { id: 'sales', alias: '销售额' },
      ],
    },
  } = props
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const spec = Builder.from(vseed).build()

    const vchart = new VChart(spec, { dom: ref.current })

    vchart.renderSync()

    return () => vchart.release()
  })

  return (
    <div
      ref={ref}
      style={{
        padding: '8px 1.25rem 0 1.25rem',
        height: 200,
        width: '100%',
        border: '1px solid #e5e7eb',
        borderRadius: '1rem',
        boxSizing: 'content-box',
        overflow: 'hidden',
      }}
    ></div>
  )
})
