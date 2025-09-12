import { useDark } from 'rspress/runtime'

import { useRef, useEffect, memo } from 'react'
import VChart, { ISpec } from '@visactor/vchart'
import { registerAll, VSeed, Builder } from '@visactor/vseed'
registerAll()

export const VChartRender = memo((props: { vseed: VSeed }) => {
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
          
        },
        {
          id: 'type',
          alias: '类型',
          
        },
      ],
      measures: [
        { id: 'profit', alias: '利润' },
        { id: 'sales', alias: '销售额' },
      ],
    },
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const builderRef = useRef<Builder>(
    Builder.from({
      chartType: 'line',
      dataset: [],
    }),
  )

  const dark = useDark()

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const builder = Builder.from({ ...vseed, theme: dark ? 'dark' : 'light' })
    builderRef.current = builder

    const spec = builder.build() as ISpec
    console.group(`render ${vseed.chartType}`)
    console.info('builder performance', builder.performance)

    const start = performance.now()
    const vchart = new VChart(spec, { dom: ref.current })
    vchart.renderSync()
    const end = performance.now()
    console.info('render time', end - start)
    console.groupEnd()

    return () => vchart.release()
  }, [dark])

  return (
    <div
      onClick={() => {
        console.group(`selected ${vseed.chartType}`)
        console.info('builder', builderRef.current)
        console.info('spec', builderRef.current.spec)
        console.info('vseed', builderRef.current.vseed)
        console.info('advancedVSeed', builderRef.current.advancedVSeed)
        console.groupEnd()
      }}
      style={{
        padding: '1rem 1.25rem',
        height: 300,
        width: '100%',
        border: '1px solid var(--rp-c-divider-light)',
        borderRadius: '1rem',
        overflow: 'hidden',
      }}
    >
      <div
        ref={ref}
        style={{
          height: '100%',
          width: '100%',
        }}
      ></div>
    </div>
  )
})
