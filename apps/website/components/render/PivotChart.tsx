import { useRef, useEffect, memo } from 'react'
import VChart from '@visactor/vchart'
import { register, PivotChart as VTablePivotChart, PivotChartConstructorOptions } from '@visactor/vtable'
import { registerAll, VSeed, Builder, ColorIdEncoding } from '@visactor/vseed'
import { useDark } from 'rspress/runtime'

register.chartModule('vchart', VChart)
registerAll()

export const PivotChart = memo((props: { vseed: VSeed }) => {
  const { vseed } = props
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

    const spec = builder.build() as PivotChartConstructorOptions
    console.log('spec', spec)
    const tableInstance = new VTablePivotChart(ref.current, spec)

    tableInstance.on('legend_item_click', (args) => {
      console.log('LEGEND_ITEM_CLICK', args)
      tableInstance.updateFilterRules([
        {
          filterKey: ColorIdEncoding,
          filteredValues: args.value,
        },
      ])
    })

    tableInstance.on('legend_change', (args) => {
      const maxValue = args.value[1]
      const minValue = args.value[0]
      tableInstance.updateFilterRules([
        {
          filterFunc: (record) => {
            const value = record[record[ColorIdEncoding]]
            console.log('updateFilterRules', record)
            if (value >= minValue && value <= maxValue) {
              return true
            }
            return false
          },
        },
      ])
    })

    return () => tableInstance.release()
  }, [dark])

  return (
    <div
      onClick={() => {
        console.group(`selected ${vseed.chartType}`)
        console.log('builder', builderRef.current)
        console.log('spec', builderRef.current.spec)
        console.log('vseed', builderRef.current.vseed)
        console.log('advancedVSeed', builderRef.current.advancedVSeed)
        console.groupEnd()
      }}
      style={{
        padding: '1rem 1.25rem',
        height: 400,
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
