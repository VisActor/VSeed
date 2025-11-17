import path from 'path'
import fs from 'fs'

function generateChartTypeMarkdown() {
  const chartTypes = [
    'area',
    'areaPercent',
    // 'areaRange',
    'bar',
    'barParallel',
    'barPercent',
    'column',
    'columnParallel',
    'columnPercent',
    'donut',
    'dualAxis',
    'funnel',
    'heatmap',
    'line',
    'pie',
    'pivotTable',
    'radar',
    'rose',
    'roseParallel',
    'scatter',
    'table',
  ]
  const outputDir = path.resolve(__dirname, './new-type')

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // 加载Locale.md
  const localeMd = fs.readFileSync(path.resolve(__dirname, './new-type/Locale.md')).toString()

  chartTypes.forEach((chartType) => {
    const chartTypePath = path.resolve(__dirname, `../packages/vseed/src/types/chartType/${chartType}/${chartType}.ts`)
    let fileContentStr
    try {
      fileContentStr = fs.readFileSync(chartTypePath, 'utf-8')
    } catch (e) {
      console.log(`File not found for ${chartType}: ${chartTypePath}`)
      return
    }

    const pascalCaseChartType = chartType.charAt(0).toUpperCase() + chartType.slice(1)
    const interfaceSignature = `export interface ${pascalCaseChartType}`
    const interfaceIndex = fileContentStr.indexOf(interfaceSignature)

    if (interfaceIndex === -1) {
      console.log(`Could not find interface definition for ${pascalCaseChartType} in ${chartType}.ts`)
      return
    }

    const commentStartIndex = fileContentStr.lastIndexOf('/**', interfaceIndex)
    const startIndex = commentStartIndex !== -1 ? commentStartIndex : interfaceIndex

    const definitionStartIndex = fileContentStr.indexOf('{', interfaceIndex)
    if (definitionStartIndex !== -1) {
      let braceCount = 1
      let definitionEndIndex = -1
      for (let i = definitionStartIndex + 1; i < fileContentStr.length; i++) {
        if (fileContentStr[i] === '{') {
          braceCount++
        } else if (fileContentStr[i] === '}') {
          braceCount--
          if (braceCount === 0) {
            definitionEndIndex = i
            break
          }
        }
      }

      if (definitionEndIndex !== -1) {
        const definition = fileContentStr.substring(startIndex, definitionEndIndex + 1)
        let mdContent = '```typescript\n' + definition + '\n```'
        if (mdContent.includes('Locale')) {
          // 补充locale的描述
          mdContent += `\n${localeMd}`
        }
        const outputFilePath = path.resolve(outputDir, `${pascalCaseChartType}.md`)
        fs.writeFileSync(outputFilePath, mdContent)
        // console.log(`Generated markdown for ${pascalCaseChartType}`)
      } else {
        console.log(`Could not find matching closing brace for ${pascalCaseChartType} in ${chartType}.ts`)
      }
    } else {
      console.log(`Could not find opening brace for ${pascalCaseChartType} in ${chartType}.ts`)
    }
  })
}

const skipTopKeys = [
  'Measures',
  'Dataset',
  'measureTree',
  'BackgroundColor',
  'Dimensions',
  'MeasureTree',
  'XBandAxis',
  'YLinearAxis',
  // 'CrosshairLine',
  'Theme',
  'Locale',
  'XLinearAxis',
  'YBandAxis',
  // 'CrosshairRect',
  'StackCornerRadius',
  'ColorLegend',
  'DualChartType',
  'DimensionTree',
  'ScatterMeasures',
  'DualMeasures',
  'LinearColor',
]

function generateComponentMarkdown() {
  const dir = path.resolve(__dirname, '../packages/vseed/src/types/properties/')
  const topKeyDir = path.resolve(__dirname, './top-key')
  const outputDir = path.resolve(__dirname, './new-type')

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // 读取top-key目录下的所有文件
  const keyPathFiles = fs.readdirSync(topKeyDir)
  const topKeySet: Set<string> = new Set()
  const topKeyDesc: Record<string, string> = {}
  keyPathFiles.forEach((file: any) => {
    const keyPaths = fs.readFileSync(path.resolve(topKeyDir, file))
    const keyPathList = JSON.parse(keyPaths.toString())
    keyPathList.forEach((keyPath: any) => {
      topKeySet.add(keyPath.componentName)
      if (keyPath.description) {
        topKeyDesc[keyPath.componentName] = keyPath.description
      }
    })
  })

  // NumFormat
  const numFormatDir = path.resolve(__dirname, '../packages/vseed/src/types/properties/format/numFormat.ts')
  const numFormatFileContent = fs.readFileSync(numFormatDir)
  const numFormatFileContentStr = numFormatFileContent.toString()
  const interfaceNumFormatSignature = `export interface NumFormat`
  const definitionStartIndex = numFormatFileContentStr.indexOf(interfaceNumFormatSignature)
  if (definitionStartIndex === -1) {
    console.log(`Could not find interface definition export interface NumFormat in numFormat.ts`)
    return
  }
  const definitionEndIndex = numFormatFileContentStr.indexOf('}', definitionStartIndex)
  if (definitionEndIndex === -1) {
    console.log(`Could not find matching closing brace for NumFormat in numFormat.ts`)
    return
  }
  const numFormatDefinition = numFormatFileContentStr.substring(definitionStartIndex, definitionEndIndex + 1)

  // 读取dir目录下的所有文件
  const files = fs.readdirSync(dir, { recursive: true })

  // 加载Selector.md
  const selectorMd = fs.readFileSync(path.resolve(__dirname, './new-type/Selector.md')).toString()

  topKeySet.forEach((topKey: string) => {
    if (skipTopKeys.includes(topKey)) {
      return
    }
    // 首字母小写
    const topKeyLower = topKey.charAt(0).toLowerCase() + topKey.slice(1)
    let fileName: string | undefined
    files.forEach((file: any) => {
      if (fileName) {
        return
      }
      if (file.endsWith(topKeyLower + '.ts')) {
        // console.log(topKeyLower, file);
        fileName = file
      }
    })
    // 基础类型跳过
    if (topKeyLower === 'boolean' || topKeyLower === 'string' || topKeyLower === 'number') {
      return
    }
    if (topKeyLower.startsWith('crosshair')) {
      fileName = 'config/crosshair/crosshair.ts'
    }
    if (!fileName) {
      console.log(topKeyLower, 'not found')
      return
    }

    const fileContent = fs.readFileSync(path.resolve(dir, fileName))
    const fileContentStr = fileContent.toString()

    const typeSignature = `type ${topKey}`
    let startIndex = fileContentStr.indexOf(`export ${typeSignature}`)
    if (startIndex === -1) {
      startIndex = fileContentStr.indexOf(typeSignature)
    }

    if (startIndex !== -1) {
      // 提取完整type定义
      const definitionStartIndex = fileContentStr.indexOf('{', startIndex)
      if (definitionStartIndex !== -1) {
        let braceCount = 1
        let definitionEndIndex = -1
        for (let i = definitionStartIndex + 1; i < fileContentStr.length; i++) {
          if (fileContentStr[i] === '{') {
            braceCount++
          } else if (fileContentStr[i] === '}') {
            braceCount--
            if (braceCount === 0) {
              definitionEndIndex = i
              break
            }
          }
        }

        if (definitionEndIndex !== -1) {
          const typeDefinition = fileContentStr.substring(startIndex, definitionEndIndex + 1)
          const hasNumFormat = typeDefinition.includes(': NumFormat')
          let mdContent =
            `### ${topKey}\n${topKeyDesc[topKey]}\n\`\`\`typescript\n` +
            (hasNumFormat ? numFormatDefinition + '\n' : '') +
            typeDefinition +
            '\n```'
          if (mdContent.includes('Selector')) {
            // 补充selector的描述
            mdContent += `\n${selectorMd}`
          }
          fs.writeFileSync(path.resolve(outputDir, `${topKey}.md`), mdContent)
          // console.log(`Generated markdown for ${topKey}`)
        } else {
          console.log(`Could not find matching closing brace for ${topKey} in ${fileName}`)
        }
      } else {
        console.log(`Could not find opening brace for ${topKey} in ${fileName}`)
      }
    } else {
      console.log(`Could not find type definition for ${topKey} in ${fileName}`)
    }
  })
}

function generateAxisMarkdown() {
  // NumFormat
  const numFormatDir = path.resolve(__dirname, '../packages/vseed/src/types/properties/format/numFormat.ts')
  const numFormatFileContent = fs.readFileSync(numFormatDir)
  const numFormatFileContentStr = numFormatFileContent.toString()
  const interfaceNumFormatSignature = `export interface NumFormat`
  const definitionStartIndex = numFormatFileContentStr.indexOf(interfaceNumFormatSignature)
  if (definitionStartIndex === -1) {
    console.log(`Could not find interface definition export interface NumFormat in numFormat.ts`)
    return
  }
  const definitionEndIndex = numFormatFileContentStr.indexOf('}', definitionStartIndex)
  if (definitionEndIndex === -1) {
    console.log(`Could not find matching closing brace for NumFormat in numFormat.ts`)
    return
  }
  const numFormatDefinition = numFormatFileContentStr.substring(definitionStartIndex, definitionEndIndex + 1)

  const bandAxisDir = path.resolve(__dirname, '../packages/vseed/src/types/properties/config/axes/bandAxis.ts')
  const linearAxisDir = path.resolve(__dirname, '../packages/vseed/src/types/properties/config/axes/linearAxis.ts')
  const bandAxisFileContent = fs.readFileSync(bandAxisDir)
  const linearAxisFileContent = fs.readFileSync(linearAxisDir)
  const bandAxisFileContentStr = bandAxisFileContent.toString()
  const linearAxisFileContentStr = linearAxisFileContent.toString()
  const outputDir = path.resolve(__dirname, './new-type')

  const xBandAxisDefinition = bandAxisFileContentStr
    .replace('export type XBandAxis', 'export type XBandAxis')
    .replace('export type YBandAxis = XBandAxis', '')
  fs.writeFileSync(
    path.resolve(outputDir, 'XBandAxis.md'),
    '### XBandAxis\n类目轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.\n```typescript\n' +
      xBandAxisDefinition +
      '\n```',
  )

  const yBandAxisDefinition = bandAxisFileContentStr
    .replace('export type XBandAxis', 'export type YBandAxis')
    .replace('export type YBandAxis = XBandAxis', '')
  fs.writeFileSync(
    path.resolve(outputDir, 'YBandAxis.md'),
    '### YBandAxis\n类目轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.\n```typescript\n' +
      yBandAxisDefinition +
      '\n```',
  )

  const xLinearAxisDefinition = linearAxisFileContentStr
    .replace('export type XLinearAxis', 'export type XLinearAxis')
    .replace('export type YLinearAxis = XLinearAxis', '')
    .replace("import type { NumFormat } from '../../format'", '')
  fs.writeFileSync(
    path.resolve(outputDir, 'XLinearAxis.md'),
    '### XLinearAxis\n数值轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.\n```typescript\n' +
      numFormatDefinition +
      '\n' +
      xLinearAxisDefinition +
      '\n```',
  )

  const yLinearAxisDefinition = linearAxisFileContentStr
    .replace('export type XLinearAxis', 'export type YLinearAxis')
    .replace('export type YLinearAxis = XLinearAxis', '')
    .replace("import type { NumFormat } from '../../format'", '')
  fs.writeFileSync(
    path.resolve(outputDir, 'YLinearAxis.md'),
    '### YLinearAxis\n数值轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.\n```typescript\n' +
      numFormatDefinition +
      '\n' +
      yLinearAxisDefinition +
      '\n```',
  )
}

function generateMeasureMarkdown() {
  // NumFormat
  const numFormatDir = path.resolve(__dirname, '../packages/vseed/src/types/properties/format/numFormat.ts')
  const numFormatFileContent = fs.readFileSync(numFormatDir)
  const numFormatFileContentStr = numFormatFileContent.toString()
  const interfaceNumFormatSignature = `export interface NumFormat`
  const definitionStartIndex = numFormatFileContentStr.indexOf(interfaceNumFormatSignature)
  if (definitionStartIndex === -1) {
    console.log(`Could not find interface definition export interface NumFormat in numFormat.ts`)
    return
  }
  const definitionEndIndex = numFormatFileContentStr.indexOf('}', definitionStartIndex)
  if (definitionEndIndex === -1) {
    console.log(`Could not find matching closing brace for NumFormat in numFormat.ts`)
    return
  }
  const numFormatDefinition = numFormatFileContentStr.substring(definitionStartIndex, definitionEndIndex + 1)

  // MeasureEncoding
  const measureEncodingDir = path.resolve(
    __dirname,
    '../packages/vseed/src/types/properties/encoding/measureEncoding.ts',
  )
  const measureEncodingFileContent = fs.readFileSync(measureEncodingDir)
  const measureEncodingContent = measureEncodingFileContent.toString()

  // MeasureTree & Measures
  const measureDir = path.resolve(__dirname, '../packages/vseed/src/types/properties/measures/measures.ts')
  const fileContent = fs.readFileSync(measureDir)
  const fileContentStr = fileContent.toString()
  const outputDir = path.resolve(__dirname, './new-type')

  const interfaceSignature = `export type Measure`
  const interfaceIndex = fileContentStr.indexOf(interfaceSignature)

  if (interfaceIndex === -1) {
    console.log(`Could not find interface definition export type Measure in measures.ts`)
    return
  }

  const startIndex = interfaceIndex
  const measureContent = fileContentStr.substring(startIndex)
  fs.writeFileSync(
    path.resolve(outputDir, 'MeasureTree.md'),
    '### Measure\n指标\n```typescript\n' +
      numFormatDefinition +
      '\n' +
      measureEncodingContent +
      '\n' +
      measureContent +
      '\n```',
  )
  fs.writeFileSync(
    path.resolve(outputDir, 'Measures.md'),
    '### Measure\n指标\n```typescript\n' +
      numFormatDefinition +
      '\n' +
      measureEncodingContent +
      '\n' +
      measureContent +
      '\n```',
  )

  // ScatterMeasures
  const scatterMeasureDir = path.resolve(
    __dirname,
    '../packages/vseed/src/types/properties/measures/scatterMeasures.ts',
  )
  const scatterFileContent = fs.readFileSync(scatterMeasureDir)
  const scatterFileContentStr = scatterFileContent.toString()
  const scatterInterfaceSignature = `export type ScatterMeasure`
  const scatterInterfaceIndex = scatterFileContentStr.indexOf(scatterInterfaceSignature)

  if (scatterInterfaceIndex === -1) {
    console.log(`Could not find interface definition export type ScatterMeasure in scatterMeasures.ts`)
    return
  }

  const scatterStartIndex = scatterInterfaceIndex
  const scatterMeasureContent = scatterFileContentStr.substring(scatterStartIndex)
  fs.writeFileSync(
    path.resolve(outputDir, 'ScatterMeasures.md'),
    '### ScatterMeasure\n```typescript\n' +
      numFormatDefinition +
      '\n' +
      measureEncodingContent +
      '\n' +
      measureContent +
      '\n' +
      scatterMeasureContent +
      '\n```',
  )

  // DualMeasure
  const dualMeasureDir = path.resolve(__dirname, '../packages/vseed/src/types/properties/measures/dualMeasures.ts')
  const dualFileContent = fs.readFileSync(dualMeasureDir)
  const dualFileContentStr = dualFileContent.toString()
  const dualInterfaceSignature = `export type DualMeasure`
  const dualInterfaceIndex = dualFileContentStr.indexOf(dualInterfaceSignature)

  if (dualInterfaceIndex === -1) {
    console.log(`Could not find interface definition export type DualMeasure in dualMeasure.ts`)
    return
  }

  const dualStartIndex = dualInterfaceIndex
  const dualMeasureContent = dualFileContentStr.substring(dualStartIndex)
  fs.writeFileSync(
    path.resolve(outputDir, 'DualMeasures.md'),
    '### DualMeasure\n```typescript\n' +
      numFormatDefinition +
      '\n' +
      measureEncodingContent +
      '\n' +
      measureContent +
      '\n' +
      dualMeasureContent +
      '\n```',
  )
}

function generateDimensionMarkdown() {
  // DimensionEncoding
  const dimensionEncodingDir = path.resolve(
    __dirname,
    '../packages/vseed/src/types/properties/encoding/dimensionEncoding.ts',
  )
  const dimensionEncodingFileContent = fs.readFileSync(dimensionEncodingDir)
  const dimensionEncodingContent = dimensionEncodingFileContent.toString()

  // Dimensions & DimensionTree
  const dimensionDir = path.resolve(__dirname, '../packages/vseed/src/types/properties/dimensions/dimensions.ts')
  const dimensionFileContent = fs.readFileSync(dimensionDir)
  const dimensionContentStr = dimensionFileContent.toString()
  const startIndex = dimensionContentStr.indexOf('export type Dimension')
  const dimensionContent = dimensionContentStr.substring(startIndex)
  const outputDir = path.resolve(__dirname, './new-type')

  fs.writeFileSync(
    path.resolve(outputDir, 'Dimensions.md'),
    '### Dimensions\n```typescript\n' + dimensionEncodingContent + '\n' + dimensionContent + '\n```',
  )
  fs.writeFileSync(
    path.resolve(outputDir, 'DimensionTree.md'),
    '### DimensionTree\n```typescript\n' + dimensionEncodingContent + '\n' + dimensionContent + '\n```',
  )
}

function generateLinearColor() {
  // LinearColor
  const linearColorDir = path.resolve(__dirname, '../packages/vseed/src/types/properties/config/color/color.ts')
  const linearColorFileContent = fs.readFileSync(linearColorDir)
  const linearColorFileContentStr = linearColorFileContent.toString()
  const linearColorInterfaceSignature = `export type LinearColor`
  const linearColorInterfaceIndex = linearColorFileContentStr.indexOf(linearColorInterfaceSignature)
  const outputDir = path.resolve(__dirname, './new-type')

  if (linearColorInterfaceIndex === -1) {
    console.log(`Could not find interface definition export type LinearColor in linearColor.ts`)
    return
  }

  const linearColorStartIndex = linearColorInterfaceIndex
  const linearColorMeasureContent = linearColorFileContentStr.substring(linearColorStartIndex)
  fs.writeFileSync(
    path.resolve(outputDir, 'LinearColor.md'),
    '### LinearColor\n```typescript\n' + linearColorMeasureContent + '\n```',
  )
}

export async function generateMarkdown() {
  generateChartTypeMarkdown()
  generateComponentMarkdown()
  generateAxisMarkdown()
  generateMeasureMarkdown()
  generateLinearColor()
  generateDimensionMarkdown()
}

// generateMarkdown()
