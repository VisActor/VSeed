import { useRef, useEffect, memo } from 'react'
import VChart from '@visactor/vchart'
import { register, PivotChart as VTablePivotChart, PivotChartConstructorOptions } from '@visactor/vtable'
import { registerAll, VSeed, Builder, UnfoldDimensionGroup } from '@visactor/vseed'

register.chartModule('vchart', VChart)
registerAll()

export const PivotChart = memo((props: { vseed: VSeed }) => {
  const { vseed } = props
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const spec = Builder.from(vseed).build() as PivotChartConstructorOptions
    const tableInstance = new VTablePivotChart(ref.current, spec)

    tableInstance.on('legend_item_click', (args) => {
      console.log('LEGEND_ITEM_CLICK', args)
      tableInstance.updateFilterRules([
        {
          filterKey: UnfoldDimensionGroup,
          filteredValues: args.value,
        },
      ])
    })

    return () => tableInstance.release()
  })

  return (
    <div
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
