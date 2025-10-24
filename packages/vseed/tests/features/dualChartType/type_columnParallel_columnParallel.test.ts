import type { VSeed } from '@visactor/vseed'
import { Builder, isPivotChart, isPivotTable, isTable, registerAll } from '@visactor/vseed'
import type { ISpec } from '@visactor/vchart'
import { VChart } from '@visactor/vchart'
import * as VTable from '@visactor/vtable'

import vseed from './type_columnParallel_columnParallel.json'

VTable.register.chartModule('vchart', VChart)

test('type_columnParallel_columnParallel', () => {
  registerAll()

  try{
    const builder = Builder.from(vseed as VSeed)
    const advanced = builder.buildAdvanced()
    if (!advanced) {
      throw new Error('Failed to build advanced configuration')
    }
    let spec = builder.buildSpec(advanced)
    spec = builder.build()

    const colorIdMap = builder.getColorIdMap()
    const colorItems = builder.getColorItems()
    const advancedPipeline = Builder.getAdvancedPipeline(builder.vseed.chartType)
    const specPipeline = Builder.getSpecPipeline(builder.vseed.chartType)
    const hasTheme = !!Builder.getTheme(builder.vseed.theme)
    const themeMapKeys = Object.keys(Builder.getThemeMap())

    expect(advanced).toMatchSnapshot()
    expect(spec).toMatchSnapshot()
    expect({ colorIdMap, colorItems, advancedPipeline, specPipeline, hasTheme, themeMapKeys }).toMatchSnapshot()

    const div = document.createElement('div') as unknown as HTMLDivElement
    document.body.appendChild(div)
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
        void vtable.release()
      } else if (isTable(builder.vseed)) {
        const vtable = new VTable.ListTable(div, spec as VTable.ListTableConstructorOptions)
        void vtable.updateOption(spec as VTable.ListTableConstructorOptions)
        void vtable.release()
      } else if (isPivotTable(builder.vseed)) {
        const vtable = new VTable.PivotTable(div, spec as VTable.PivotTableConstructorOptions)
        void vtable.updateOption(spec as VTable.PivotTableConstructorOptions)
        void vtable.release()
      } else {
        const vchart = new VChart(spec as ISpec, {
          dom: div,
          dpr: 2,
        })
        void vchart.renderSync()
        void vchart.updateSpec(spec as ISpec)
        void vchart.release()
      }
    } catch (e) {
      console.error(e)
      throw e
    }
  } catch (e) {
    console.error(e)
    expect({expectError: true, message: (e as Error).message}).toMatchSnapshot()
    expect(e).toBeInstanceOf(Error)
  }
})
