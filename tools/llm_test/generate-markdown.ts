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
    'boxPlot',
    'column',
    'columnParallel',
    'columnPercent',
    'donut',
    'dualAxis',
    'funnel',
    'heatmap',
    'histogram',
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
    const chartTypePath = path.resolve(
      __dirname,
      `../../packages/vseed/src/types/chartType/${chartType}/${chartType}.ts`,
    )
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

  'BarMaxWidth',
  'BarGapInGroup',
  'WhiskersConfig',

  // 图表特定类型（在 generateChartSpecificTypes 中处理）
  'ColumnDimension',
  'ColumnMeasure',
  'BarDimension',
  'BarMeasure',
  'LineDimension',
  'LineMeasure',
  'AreaDimension',
  'AreaMeasure',
  'PieDimension',
  'PieMeasure',
  'DonutDimension',
  'DonutMeasure',
  'FunnelDimension',
  'FunnelMeasure',
  'RadarDimension',
  'RadarMeasure',
  'RoseDimension',
  'RoseMeasure',
  'RoseParallelDimension',
  'RoseParallelMeasure',
  'HeatmapDimension',
  'HeatmapMeasure',
  'ScatterDimension',
  'ScatterMeasure',
  'HistogramDimension',
  'HistogramMeasure',
  'BoxPlotDimension',
  'BoxPlotMeasure',
  'DualAxisDimension',
  'DualAxisMeasure',
  'TableDimension',
  'TableMeasure',
  'ColumnParallelDimension',
  'ColumnParallelMeasure',
  'ColumnPercentDimension',
  'ColumnPercentMeasure',
  'BarParallelDimension',
  'BarParallelMeasure',
  'BarPercentDimension',
  'BarPercentMeasure',
]

function generateComponentMarkdown() {
  const dir = path.resolve(__dirname, '../../packages/vseed/src/types/properties/')
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
      if (!keyPath.description) {
        throw new Error(
          `Property ${keyPath.name} without description, please check (packages/vseed/src/types/chartType/${file.replace('.json', '')})`,
        )
      }
      topKeyDesc[keyPath.componentName] = keyPath.description
      if (!keyPath.componentName) {
        return
      }
      topKeySet.add(keyPath.componentName)
    })
  })

  // NumFormat
  const numFormatDir = path.resolve(__dirname, '../../packages/vseed/src/types/properties/format/numFormat.ts')
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
    if (
      topKeyLower === 'boolean' ||
      topKeyLower === 'string' ||
      topKeyLower === 'number' ||
      topKeyLower.startsWith("'")
    ) {
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
  const numFormatDir = path.resolve(__dirname, '../../packages/vseed/src/types/properties/format/numFormat.ts')
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

  const bandAxisDir = path.resolve(__dirname, '../../packages/vseed/src/types/properties/config/axes/bandAxis.ts')
  const linearAxisDir = path.resolve(__dirname, '../../packages/vseed/src/types/properties/config/axes/linearAxis.ts')
  const bandAxisFileContent = fs.readFileSync(bandAxisDir)
  const linearAxisFileContent = fs.readFileSync(linearAxisDir)
  const bandAxisFileContentStr = bandAxisFileContent.toString()
  const linearAxisFileContentStr = linearAxisFileContent.toString()
  const outputDir = path.resolve(__dirname, './new-type')

  // 提取bandAxisFileContent中的export type XBandAxis = {...} 部分
  const xBandAxisSignature = 'export type XBandAxis'
  let xStartIndex = bandAxisFileContentStr.indexOf(xBandAxisSignature)
  if (xStartIndex === -1) {
    xStartIndex = bandAxisFileContentStr.indexOf('type XBandAxis')
  }
  let xBandAxisDefinition = ''
  if (xStartIndex !== -1) {
    const xDefStartIndex = bandAxisFileContentStr.indexOf('{', xStartIndex)
    if (xDefStartIndex !== -1) {
      let braceCount = 1
      let xDefEndIndex = -1
      for (let i = xDefStartIndex + 1; i < bandAxisFileContentStr.length; i++) {
        const ch = bandAxisFileContentStr[i]
        if (ch === '{') {
          braceCount++
        } else if (ch === '}') {
          braceCount--
          if (braceCount === 0) {
            xDefEndIndex = i
            break
          }
        }
      }
      if (xDefEndIndex !== -1) {
        xBandAxisDefinition = bandAxisFileContentStr.substring(xStartIndex, xDefEndIndex + 1)
      } else {
        console.log('Could not find matching closing brace for XBandAxis in bandAxis.ts')
        xBandAxisDefinition = bandAxisFileContentStr.substring(xStartIndex)
      }
    } else {
      console.log('Could not find opening brace for XBandAxis in bandAxis.ts')
      xBandAxisDefinition = bandAxisFileContentStr.substring(xStartIndex)
    }
  } else {
    console.log('Could not find type definition for XBandAxis in bandAxis.ts')
  }
  fs.writeFileSync(
    path.resolve(outputDir, 'XBandAxis.md'),
    '### XBandAxis\n类目轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.\n```typescript\n' +
      xBandAxisDefinition +
      '\n```',
  )

  const yBandAxisSignature = 'export type YBandAxis'
  let yStartIndex = bandAxisFileContentStr.indexOf(yBandAxisSignature)
  if (yStartIndex === -1) {
    yStartIndex = bandAxisFileContentStr.indexOf('type YBandAxis')
  }
  let yBandAxisDefinition = ''
  if (yStartIndex !== -1) {
    const yDefStartIndex = bandAxisFileContentStr.indexOf('{', yStartIndex)
    if (yDefStartIndex !== -1) {
      let braceCount = 1
      let yDefEndIndex = -1
      for (let i = yDefStartIndex + 1; i < bandAxisFileContentStr.length; i++) {
        const ch = bandAxisFileContentStr[i]
        if (ch === '{') {
          braceCount++
        } else if (ch === '}') {
          braceCount--
          if (braceCount === 0) {
            yDefEndIndex = i
            break
          }
        }
      }
      if (yDefEndIndex !== -1) {
        yBandAxisDefinition = bandAxisFileContentStr.substring(yStartIndex, yDefEndIndex + 1)
      } else {
        console.log('Could not find matching closing brace for YBandAxis in bandAxis.ts')
        yBandAxisDefinition = bandAxisFileContentStr.substring(yStartIndex)
      }
    } else {
      console.log('Could not find opening brace for YBandAxis in bandAxis.ts')
      yBandAxisDefinition = bandAxisFileContentStr.substring(yStartIndex)
    }
  } else {
    console.log('Could not find type definition for YBandAxis in bandAxis.ts')
  }
  fs.writeFileSync(
    path.resolve(outputDir, 'YBandAxis.md'),
    '### YBandAxis\n类目轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.\n```typescript\n' +
      yBandAxisDefinition +
      '\n```',
  )

  const xLinearAxisSignature = 'export type XLinearAxis'
  let xLinearStartIndex = linearAxisFileContentStr.indexOf(xLinearAxisSignature)
  if (xLinearStartIndex === -1) {
    xLinearStartIndex = linearAxisFileContentStr.indexOf('type XLinearAxis')
  }
  let xLinearAxisDefinition = ''
  if (xLinearStartIndex !== -1) {
    const xLinearDefStartIndex = linearAxisFileContentStr.indexOf('{', xLinearStartIndex)
    if (xLinearDefStartIndex !== -1) {
      let braceCount = 1
      let xLinearDefEndIndex = -1
      for (let i = xLinearDefStartIndex + 1; i < linearAxisFileContentStr.length; i++) {
        const ch = linearAxisFileContentStr[i]
        if (ch === '{') {
          braceCount++
        } else if (ch === '}') {
          braceCount--
          if (braceCount === 0) {
            xLinearDefEndIndex = i
            break
          }
        }
      }
      if (xLinearDefEndIndex !== -1) {
        xLinearAxisDefinition = linearAxisFileContentStr.substring(xLinearStartIndex, xLinearDefEndIndex + 1)
      } else {
        console.log('Could not find matching closing brace for XLinearAxis in linearAxis.ts')
        xLinearAxisDefinition = linearAxisFileContentStr.substring(xLinearStartIndex)
      }
    } else {
      console.log('Could not find opening brace for XLinearAxis in linearAxis.ts')
      xLinearAxisDefinition = linearAxisFileContentStr.substring(xLinearStartIndex)
    }
  } else {
    console.log('Could not find type definition for XLinearAxis in linearAxis.ts')
  }
  fs.writeFileSync(
    path.resolve(outputDir, 'XLinearAxis.md'),
    '### XLinearAxis\n数值轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.\n```typescript\n' +
      numFormatDefinition +
      '\n' +
      xLinearAxisDefinition +
      '\n```',
  )

  const yLinearAxisSignature = 'export type YLinearAxis'
  let yLinearStartIndex = linearAxisFileContentStr.indexOf(yLinearAxisSignature)
  if (yLinearStartIndex === -1) {
    yLinearStartIndex = linearAxisFileContentStr.indexOf('type YLinearAxis')
  }
  let yLinearAxisDefinition = ''
  if (yLinearStartIndex !== -1) {
    const yLinearDefStartIndex = linearAxisFileContentStr.indexOf('{', yLinearStartIndex)
    if (yLinearDefStartIndex !== -1) {
      let braceCount = 1
      let yLinearDefEndIndex = -1
      for (let i = yLinearDefStartIndex + 1; i < linearAxisFileContentStr.length; i++) {
        const ch = linearAxisFileContentStr[i]
        if (ch === '{') {
          braceCount++
        } else if (ch === '}') {
          braceCount--
          if (braceCount === 0) {
            yLinearDefEndIndex = i
            break
          }
        }
      }
      if (yLinearDefEndIndex !== -1) {
        yLinearAxisDefinition = linearAxisFileContentStr.substring(yLinearStartIndex, yLinearDefEndIndex + 1)
      } else {
        console.log('Could not find matching closing brace for YLinearAxis in linearAxis.ts')
        yLinearAxisDefinition = linearAxisFileContentStr.substring(yLinearStartIndex)
      }
    } else {
      console.log('Could not find opening brace for YLinearAxis in linearAxis.ts')
      yLinearAxisDefinition = linearAxisFileContentStr.substring(yLinearStartIndex)
    }
  } else {
    console.log('Could not find type definition for YLinearAxis in linearAxis.ts')
  }
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
  const numFormatDir = path.resolve(__dirname, '../../packages/vseed/src/types/properties/format/numFormat.ts')
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
    '../../packages/vseed/src/types/properties/encoding/measureEncoding.ts',
  )
  const measureEncodingFileContent = fs.readFileSync(measureEncodingDir)
  const measureEncodingContent = measureEncodingFileContent.toString()

  // MeasureTree & Measures
  const measureDir = path.resolve(__dirname, '../../packages/vseed/src/types/properties/measures/measures.ts')
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
}

function generateDimensionMarkdown() {
  // DimensionEncoding
  const dimensionEncodingDir = path.resolve(
    __dirname,
    '../../packages/vseed/src/types/properties/encoding/dimensionEncoding.ts',
  )
  const dimensionEncodingFileContent = fs.readFileSync(dimensionEncodingDir)
  const dimensionEncodingContent = dimensionEncodingFileContent.toString()

  // Dimensions & DimensionTree
  const dimensionDir = path.resolve(__dirname, '../../packages/vseed/src/types/properties/dimensions/dimensions.ts')
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
  const linearColorDir = path.resolve(__dirname, '../../packages/vseed/src/types/properties/config/color/color.ts')
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

function generateChartSpecificTypes() {
  const outputDir = path.resolve(__dirname, './new-type')

  // 读取 dimensions.ts 文件
  const dimensionsPath = path.resolve(__dirname, '../../packages/vseed/src/types/properties/dimensions/dimensions.ts')
  const dimensionsContent = fs.readFileSync(dimensionsPath, 'utf-8')

  // 读取 measures.ts 文件
  const measuresPath = path.resolve(__dirname, '../../packages/vseed/src/types/properties/measures/measures.ts')
  const measuresContent = fs.readFileSync(measuresPath, 'utf-8')

  // 提取 BaseDimension 定义
  const baseDimensionRegex = /export type BaseDimension[\s\S]*?(?=\n\n\/\*\*|\nexport)/
  const baseDimensionMatch = dimensionsContent.match(baseDimensionRegex)
  const baseDimensionContent = baseDimensionMatch ? baseDimensionMatch[0] : ''

  // 提取 BaseMeasure 定义
  const baseMeasureRegex = /export type BaseMeasure[\s\S]*?(?=\n\n\/\*\*|\nexport)/
  const baseMeasureMatch = measuresContent.match(baseMeasureRegex)
  const baseMeasureContent = baseMeasureMatch ? baseMeasureMatch[0] : ''

  // 定义需要提取的图表特定类型
  const chartTypes = [
    'Column',
    'Bar',
    'Line',
    'Area',
    'Pie',
    'Donut',
    'Funnel',
    'Radar',
    'Rose',
    'RoseParallel',
    'Heatmap',
    'Scatter',
    'Histogram',
    'BoxPlot',
    'DualAxis',
    'Table',
    'ColumnParallel',
    'ColumnPercent',
    'BarParallel',
    'BarPercent',
  ]

  chartTypes.forEach((chartType) => {
    // 提取 Dimension 类型定义
    const dimensionTypeName = `${chartType}Dimension`
    // 精确匹配单行类型定义（只匹配到行尾）
    const dimensionRegex = new RegExp(`export type ${dimensionTypeName}\\s*=\\s*[^\\n]+`, 'g')
    const dimensionMatch = dimensionsContent.match(dimensionRegex)

    if (dimensionMatch && dimensionMatch[0]) {
      const dimensionDef = dimensionMatch[0]

      // 检查是否是类型别名（简单赋值，如 LineDimension = ColumnDimension）
      const simpleAliasMatch = dimensionDef.match(/export type \w+\s*=\s*(\w+)\s*$/)

      if (simpleAliasMatch && simpleAliasMatch[1]) {
        // 这是一个简单类型别名，查找它引用的类型
        const baseTypeName = simpleAliasMatch[1]
        const baseTypeRegex = new RegExp(
          `export type ${baseTypeName}\\s*=\\s*BaseDimension\\s*&\\s*\\{[\\s\\S]*?\\n\\}`,
          'g',
        )
        const baseTypeMatch = dimensionsContent.match(baseTypeRegex)
        if (baseTypeMatch && baseTypeMatch[0]) {
          const content = `### ${dimensionTypeName}\n\`\`\`typescript\n${baseDimensionContent}\n\n${dimensionDef}\n\n${baseTypeMatch[0]}\n\`\`\``
          fs.writeFileSync(path.resolve(outputDir, `${dimensionTypeName}.md`), content)
        }
      } else {
        // 这是一个完整的类型定义，提取整个类型体
        const fullTypeRegex = new RegExp(
          `export type ${dimensionTypeName}\\s*=\\s*BaseDimension\\s*&\\s*\\{[\\s\\S]*?\\n\\}`,
          'g',
        )
        const fullTypeMatch = dimensionsContent.match(fullTypeRegex)
        if (fullTypeMatch && fullTypeMatch[0]) {
          const content = `### ${dimensionTypeName}\n\`\`\`typescript\n${baseDimensionContent}\n\n${fullTypeMatch[0]}\n\`\`\``
          fs.writeFileSync(path.resolve(outputDir, `${dimensionTypeName}.md`), content)
        }
      }
    }

    // 提取 Measure 类型定义
    const measureTypeName = `${chartType}Measure`
    const measureRegex = new RegExp(`export type ${measureTypeName}\\s*=\\s*[^\\n]+`, 'g')
    const measureMatch = measuresContent.match(measureRegex)

    if (measureMatch && measureMatch[0]) {
      const measureDef = measureMatch[0]

      // 检查是否是简单类型别名
      const simpleAliasMatch = measureDef.match(/export type \w+\s*=\s*(\w+)\s*$/)

      if (simpleAliasMatch && simpleAliasMatch[1]) {
        // 这是一个简单类型别名，查找它引用的类型
        const baseTypeName = simpleAliasMatch[1]
        const baseTypeRegex = new RegExp(
          `export type ${baseTypeName}\\s*=\\s*BaseMeasure\\s*&\\s*\\{[\\s\\S]*?\\n\\}`,
          'g',
        )
        const baseTypeMatch = measuresContent.match(baseTypeRegex)
        if (baseTypeMatch && baseTypeMatch[0]) {
          const content = `### ${measureTypeName}\n\`\`\`typescript\n${baseMeasureContent}\n\n${measureDef}\n\n${baseTypeMatch[0]}\n\`\`\``
          fs.writeFileSync(path.resolve(outputDir, `${measureTypeName}.md`), content)
        }
      } else {
        // 这是一个完整的类型定义
        const fullTypeRegex = new RegExp(
          `export type ${measureTypeName}\\s*=\\s*BaseMeasure\\s*&\\s*\\{[\\s\\S]*?\\n\\}`,
          'g',
        )
        const fullTypeMatch = measuresContent.match(fullTypeRegex)
        if (fullTypeMatch && fullTypeMatch[0]) {
          const content = `### ${measureTypeName}\n\`\`\`typescript\n${baseMeasureContent}\n\n${fullTypeMatch[0]}\n\`\`\``
          fs.writeFileSync(path.resolve(outputDir, `${measureTypeName}.md`), content)
        }
      }
    }
  })
}

export async function generateMarkdown() {
  generateChartTypeMarkdown()
  generateComponentMarkdown()
  generateAxisMarkdown()
  generateMeasureMarkdown()
  // generateLinearColor()
  generateDimensionMarkdown()
  generateChartSpecificTypes()
}

// generateMarkdown()
