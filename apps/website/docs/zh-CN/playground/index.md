---
title: 标题
playgroundDirection: horizontal
pageType: custom
---

```tsx
import { useRef, useEffect } from 'react'
import { useDark } from 'rspress/runtime'
import VChart from '@visactor/vchart'
import { ListTable, PivotChart, register } from '@visactor/vtable'
import { registerAll, VSeed, Builder, isPivotChart, isVChart, isVTable, zVSeed } from '@visactor/vseed'

registerAll()
register.chartModule('vchart', VChart)

const Demo = () => {
  const vseed: VSeed = {
    chartType: 'line',
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
  }

  if (zVSeed.safeParse(vseed).success) {
    console.log('zVSeed parse success!!!')
  } else {
    console.error('zVSeed parse error!!!')
  }

  return <SimpleVSeedRender vseed={ vseed } />
}

const SimpleVSeedRender = (props: { vseed: VSeed }) => {
  const { vseed } = props
  const ref = useRef<HTMLDivElement>(null)
  const builderRef = useRef<Builder>()
  const dark = useDark()
  useEffect(() => {
    if (!ref.current) {
      return
    }
    const theme = dark ? 'dark' : 'light'
    const builder = Builder.from({ ...vseed, theme })
    const spec = builder.build()

    builderRef.current = builder
    if (isPivotChart(vseed)) {
      const tableInstance = new PivotChart(ref.current, spec)
      return () => tableInstance.release()
    } else if (isVChart(vseed)) {
      const vchart = new VChart(spec, { dom: ref.current })
      vchart.renderSync()
      return () => vchart.release()
    } else if (isVTable(vseed)) {
      const tableInstance = new ListTable(ref.current, spec)
      return () => tableInstance.release()
    }
  }, [vseed, dark])

  return <div ref={ ref } style = {{ height: 300, width: '100%' }
} onClick = {() => {
  console.group(`selected ${vseed.chartType}`)
  console.log('builder', builderRef.current)
  console.log('spec', builderRef.current.spec)
  console.log('vseed', builderRef.current.vseed)
  console.log('advancedVSeed', builderRef.current.advancedVSeed)
  console.groupEnd()
}}> </div>
}

export default Demo
```