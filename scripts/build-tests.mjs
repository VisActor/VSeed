import fs from 'fs/promises'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const rootDir = path.resolve(__dirname, '../packages/vseed')

async function generateTests() {
  try {
    const testsDir = path.join(rootDir, './tests')

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
        if (error.code !== 'ENOENT') {
          throw error
        }
      }

      const testContent = `import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll } from '@visactor/vseed'
import vseed from './${relativeJsonPath}'

test('${testName}', () => {
  try {
    registerAll()
    const builder = Builder.from(vseed as VSeed)
    const advanced = builder.buildAdvanced()
    if (!advanced) {
      throw new Error('Failed to build advanced configuration')
    }
    const spec = builder.buildSpec(advanced)

    const colorIdMap = builder.getColorIdMap()
    const colorItems = builder.getColorItems()
    const advancedPipeline = Builder.getAdvancedPipeline(builder.vseed.chartType)
    const specPipeline = Builder.getSpecPipeline(builder.vseed.chartType)
    const theme = Builder.getTheme(builder.vseed.theme)
    const themeMap = Builder.getThemeMap()

    expect(advanced).toMatchSnapshot()
    expect(spec).toMatchSnapshot()
    expect({ colorIdMap, colorItems, advancedPipeline, specPipeline, theme, themeMap }).toMatchSnapshot()
  } catch (e) {
    expect({expectError: true}).toMatchSnapshot()
    expect(e).toBeInstanceOf(Error)
  }
});
`
      await fs.writeFile(testPath, testContent)
      console.log(`Generated test file: ${testPath}`)
    }
  } catch (err) {
    console.error('Error generating tests:', err)
  }
}

generateTests()
