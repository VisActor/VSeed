import type { VSeed } from '@visactor/vseed'
import { Builder, isPivotChart, isPivotTable, isTable, registerAll } from '@visactor/vseed'
import type { ISpec } from '@visactor/vchart'
import { VChart } from '@visactor/vchart'
import * as VTable from '@visactor/vtable'

import vseed from './null2undefined.json'

VTable.register.chartModule('vchart', VChart)

test('null2undefined', () => {
  registerAll()
  const builder = Builder.from(vseed as VSeed)
  const advanced = builder.buildAdvanced()
  if (!advanced) {
    throw new Error('Failed to build advanced configuration')
  }
  const spec = builder.buildSpec(advanced)
  expect(advanced).toMatchSnapshot()
  expect(spec).toMatchSnapshot()

  const div = document.createElement('div') as unknown as HTMLDivElement
  div.style.width = '960px'
  div.style.height = '600px'
  if (window) {
    window.URL.createObjectURL = () => 'mocked-url'
  }

  try {
    // render
    if (isPivotChart(builder.vseed)) {
      const vtable = new VTable.PivotChart(div, spec as VTable.PivotChartConstructorOptions)
      void vtable.updateOption(spec as VTable.PivotChartConstructorOptions)
    } else if (isTable(builder.vseed)) {
      const vtable = new VTable.ListTable(div, spec as VTable.ListTableConstructorOptions)
      void vtable.updateOption(spec as VTable.ListTableConstructorOptions)
    } else if (isPivotTable(builder.vseed)) {
      const vtable = new VTable.PivotTable(div, spec as VTable.PivotTableConstructorOptions)
      void vtable.updateOption(spec as VTable.PivotTableConstructorOptions)
    } else {
      const vchart = new VChart(spec as ISpec, {
        dom: div,
        dpr: 2,
      })
      void vchart.renderSync()
      void vchart.updateSpec(spec as ISpec)
    }
  } catch (e) {
    console.error(e)
    throw e
  }
})
