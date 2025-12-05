import fs from 'fs/promises'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const rootDir = path.resolve(__dirname, '../packages/vseed')

async function generateTests() {
  try {
    const testsDir = path.join(rootDir, './tests/integration')

    // 递归查找所有JSON文件的函数
    async function findAllJsonFiles(dir) {
      const jsonFiles = []
      const entries = await fs.readdir(dir, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)

        if (entry.isDirectory() && entry.name !== '__snapshots__') {
          // 递归处理子目录
          const subFiles = await findAllJsonFiles(fullPath)
          jsonFiles.push(...subFiles)
        } else if (entry.isFile() && entry.name.endsWith('.json') && entry.name !== 'tsconfig.json') {
          jsonFiles.push(fullPath)
        }
      }

      return jsonFiles
    }

    // 获取所有JSON文件
    const allJsonFiles = await findAllJsonFiles(testsDir)
    console.log(`Found ${allJsonFiles.length} JSON files to process`)

    // 处理每个JSON文件
    for (const jsonPath of allJsonFiles) {
      const testPath = jsonPath.replace('.json', '.test.ts')
      const testName = path.basename(jsonPath, '.json')
      const relativeJsonPath = path.relative(path.dirname(testPath), jsonPath)

      try {
        await fs.unlink(testPath)
        console.log(`Removed existing test file: ${testPath}`)
      } catch (error) {
        console.error(error)
        if (error.code !== 'ENOENT') {
          throw error
        }
      }

      const testContent = `import type { VSeed } from '@visactor/vseed'
import { Builder, isPivotChart, isPivotTable, isTable, registerAll } from '@visactor/vseed'
import type { ISpec } from '@visactor/vchart'
import { VChart } from '@visactor/vchart'
import * as VTable from '@visactor/vtable'

import vseed from './${relativeJsonPath}'

VTable.register.chartModule('vchart', VChart)

test('${testName}', () => {
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
`
      await fs.writeFile(testPath, testContent)
      console.log(`Generated test file: ${testPath}`)
    }
  } catch (err) {
    console.error('Error generating tests:', err)
  }
}

generateTests()
