import { useRef, useEffect, memo } from 'react'
import { PivotTable as VTablePivotTable, PivotTableConstructorOptions } from '@visactor/vtable'
import { registerAll, VSeed, Builder, UnfoldDimensionGroupId } from '@visactor/vseed'
import { useDark } from 'rspress/runtime'

registerAll()

export const PivotTable = memo((props: { vseed: VSeed }) => {
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

    const spec = builder.build() as PivotTableConstructorOptions
    const tableInstance = new VTablePivotTable(ref.current, spec)

    tableInstance.on('legend_item_click', (args) => {
      console.log('LEGEND_ITEM_CLICK', args)
      tableInstance.updateFilterRules([
        {
          filterKey: UnfoldDimensionGroupId,
          filteredValues: args.value,
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
