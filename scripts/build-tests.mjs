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

        if (entry.isDirectory() && entry.name === '__snapshots__') {
          // 删除残留的 __snapshots__ 目录
          await fs.rmdir(fullPath, { recursive: true })
          console.log(`Removed directory: ${fullPath}`)
        } else if (entry.isDirectory()) {
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
   registerAll()
  const builder = Builder.from(vseed as VSeed)
  const advanced = builder.buildAdvanced()
  
  expect(advanced).toBeDefined()
  expect(advanced).not.toBeNull()
  
  const spec = builder.buildSpec(advanced!)
  
  expect(spec).toBeDefined()
  expect(spec).not.toBeNull()
  
  // Verify builder methods return valid results
  expect(builder.getColorIdMap()).toBeDefined()
  expect(builder.getColorItems()).toBeDefined()
  expect(Builder.getAdvancedPipeline(builder.vseed.chartType)).toBeDefined()
  expect(Builder.getSpecPipeline(builder.vseed.chartType)).toBeDefined()
  expect(Builder.getTheme(builder.vseed.theme)).toBeDefined()
  expect(Builder.getThemeMap()).toBeDefined()
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
