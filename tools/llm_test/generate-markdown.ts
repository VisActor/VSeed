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
    const interfaceSignature = `export interface ${topKey}`
    let startIndex = fileContentStr.indexOf(`export ${typeSignature}`)
    if (startIndex === -1) {
      startIndex = fileContentStr.indexOf(typeSignature)
    }
    if (startIndex === -1) {
      startIndex = fileContentStr.indexOf(interfaceSignature)
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

          // Generic dependency resolution: check if type extends another type in same folder
          let dependencyTypes = ''
          const extendsMatch = typeDefinition.match(/^export type \w+ = (\w+) &/)
          if (extendsMatch && extendsMatch[1]) {
            const baseTypeName = extendsMatch[1]
            const baseTypeFile = path.resolve(
              dir,
              path.dirname(fileName),
              `${baseTypeName.charAt(0).toLowerCase() + baseTypeName.slice(1)}.ts`,
            )
            if (fs.existsSync(baseTypeFile)) {
              const baseContent = fs.readFileSync(baseTypeFile).toString()
              const baseTypeSignature = `type ${baseTypeName}`
              let baseStartIndex = baseContent.indexOf(`export ${baseTypeSignature}`)
              if (baseStartIndex === -1) {
                baseStartIndex = baseContent.indexOf(baseTypeSignature)
              }
              if (baseStartIndex !== -1) {
                const baseDefStartIndex = baseContent.indexOf('{', baseStartIndex)
                if (baseDefStartIndex !== -1) {
                  let baseBraceCount = 1
                  let baseDefEndIndex = -1
                  for (let i = baseDefStartIndex + 1; i < baseContent.length; i++) {
                    if (baseContent[i] === '{') {
                      baseBraceCount++
                    } else if (baseContent[i] === '}') {
                      baseBraceCount--
                      if (baseBraceCount === 0) {
                        baseDefEndIndex = i
                        break
                      }
                    }
                  }
                  if (baseDefEndIndex !== -1) {
                    dependencyTypes = baseContent.substring(baseStartIndex, baseDefEndIndex + 1) + '\n\n'
                  }
                }
              }
            }
          }

          let mdContent =
            `### ${topKey}\n${topKeyDesc[topKey]}\n\`\`\`typescript\n` +
            (hasNumFormat ? numFormatDefinition + '\n' : '') +
            typeDefinition +
            (dependencyTypes ? '\n\n' + dependencyTypes : '') +
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

  // Read baseMeasure.ts for BaseMeasure and Measure
  const baseMeasureDir = path.resolve(__dirname, '../../packages/vseed/src/types/properties/measures/baseMeasure.ts')
  const baseMeasureFileContent = fs.readFileSync(baseMeasureDir)
  const baseMeasureContentStr = baseMeasureFileContent.toString()

  // Extract BaseMeasure and Measure definitions
  const baseMeasureStart = baseMeasureContentStr.indexOf('export type BaseMeasure')
  const baseMeasureContent = baseMeasureStart !== -1 ? baseMeasureContentStr.substring(baseMeasureStart) : ''

  // Read tableMeasure.ts for TableMeasure
  const tableMeasureDir = path.resolve(__dirname, '../../packages/vseed/src/types/properties/measures/tableMeasure.ts')
  const tableMeasureFileContent = fs.readFileSync(tableMeasureDir)
  const tableMeasureContentStr = tableMeasureFileContent.toString()

  // Extract TableMeasure definition (skip the import line)
  const tableMeasureStart = tableMeasureContentStr.indexOf('export type TableMeasure')
  const tableMeasureContent = tableMeasureStart !== -1 ? tableMeasureContentStr.substring(tableMeasureStart).trim() : ''

  // Read measureTree.ts for MeasureGroup and MeasureTree
  const measureTreeDir = path.resolve(__dirname, '../../packages/vseed/src/types/properties/measures/measureTree.ts')
  const measureTreeFileContent = fs.readFileSync(measureTreeDir)
  const measureTreeContentStr = measureTreeFileContent.toString()

  // Extract MeasureGroup and MeasureTree (skip the import line)
  const measureGroupStart = measureTreeContentStr.indexOf('export type MeasureGroup')
  const measureTreeContent = measureGroupStart !== -1 ? measureTreeContentStr.substring(measureGroupStart) : ''

  const outputDir = path.resolve(__dirname, './new-type')

  const measureTreeFullContent = baseMeasureContent + '\n\n' + tableMeasureContent + '\n\n' + measureTreeContent

  fs.writeFileSync(
    path.resolve(outputDir, 'MeasureTree.md'),
    '### Measure\n指标\n```typescript\n' +
      numFormatDefinition +
      '\n' +
      measureEncodingContent +
      '\n' +
      measureTreeFullContent +
      '\n```',
  )
  fs.writeFileSync(
    path.resolve(outputDir, 'Measures.md'),
    '### Measure\n指标\n```typescript\n' +
      numFormatDefinition +
      '\n' +
      measureEncodingContent +
      '\n' +
      baseMeasureContent +
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

  // Read baseDimension.ts for BaseDimension, Dimension, and Dimensions
  const baseDimensionDir = path.resolve(
    __dirname,
    '../../packages/vseed/src/types/properties/dimensions/baseDimension.ts',
  )
  const baseDimensionFileContent = fs.readFileSync(baseDimensionDir)
  const baseDimensionContentStr = baseDimensionFileContent.toString()
  const startIndex = baseDimensionContentStr.indexOf('export type BaseDimension')
  const baseDimensionContent = baseDimensionContentStr.substring(startIndex)

  // Read tableDimension.ts for TableDimension, DimensionGroup and DimensionTree
  const tableDimensionDir = path.resolve(
    __dirname,
    '../../packages/vseed/src/types/properties/dimensions/tableDimension.ts',
  )
  const tableDimensionFileContent = fs.readFileSync(tableDimensionDir)
  const tableDimensionContentStr = tableDimensionFileContent.toString()

  // Extract TableDimension definition
  const tableDimensionStart = tableDimensionContentStr.indexOf('export type TableDimension')
  const tableDimensionContent =
    tableDimensionStart !== -1 ? tableDimensionContentStr.substring(tableDimensionStart) : ''

  const outputDir = path.resolve(__dirname, './new-type')

  fs.writeFileSync(
    path.resolve(outputDir, 'Dimensions.md'),
    '### Dimensions\n```typescript\n' + dimensionEncodingContent + '\n' + baseDimensionContent + '\n```',
  )
  fs.writeFileSync(
    path.resolve(outputDir, 'DimensionTree.md'),
    '### DimensionTree\n```typescript\n' +
      dimensionEncodingContent +
      '\n' +
      baseDimensionContent +
      '\n\n' +
      tableDimensionContent +
      '\n```',
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
  const dimensionsDir = path.resolve(__dirname, '../../packages/vseed/src/types/properties/dimensions')
  const measuresDir = path.resolve(__dirname, '../../packages/vseed/src/types/properties/measures')

  // 读取 baseDimension.ts 文件
  const baseDimensionPath = path.resolve(dimensionsDir, 'baseDimension.ts')
  const baseDimensionContent = fs.readFileSync(baseDimensionPath, 'utf-8')

  // 读取 baseMeasure.ts 文件
  const baseMeasurePath = path.resolve(measuresDir, 'baseMeasure.ts')
  const baseMeasureContent = fs.readFileSync(baseMeasurePath, 'utf-8')

  // 提取 BaseDimension 定义
  const baseDimensionRegex = /export type BaseDimension[\s\S]*?(?=\n\n\/\*\*|\nexport|$)/
  const baseDimensionMatch = baseDimensionContent.match(baseDimensionRegex)
  const baseDimensionDef = baseDimensionMatch ? baseDimensionMatch[0] : ''

  // 提取 BaseMeasure 定义
  const baseMeasureRegex = /export type BaseMeasure[\s\S]*?(?=\n\n\/\*\*|\nexport|$)/
  const baseMeasureMatch = baseMeasureContent.match(baseMeasureRegex)
  const baseMeasureDef = baseMeasureMatch ? baseMeasureMatch[0] : ''

  // 定义图表类型到文件的映射
  const dimensionFileMap: Record<string, string> = {
    Column: 'columnDimension.ts',
    ColumnParallel: 'columnDimension.ts',
    ColumnPercent: 'columnDimension.ts',
    Bar: 'barDimension.ts',
    BarParallel: 'barDimension.ts',
    BarPercent: 'barDimension.ts',
    Line: 'lineDimension.ts',
    Area: 'areaDimension.ts',
    AreaPercent: 'areaDimension.ts',
    Pie: 'pieDimension.ts',
    Donut: 'donutDimension.ts',
    Funnel: 'funnelDimension.ts',
    Radar: 'radarDimension.ts',
    Rose: 'roseDimension.ts',
    RoseParallel: 'roseDimension.ts',
    Heatmap: 'heatmapDimension.ts',
    Scatter: 'scatterDimension.ts',
    Histogram: 'histogramDimension.ts',
    BoxPlot: 'boxPlotDimension.ts',
    DualAxis: 'dualAxisDimension.ts',
    Table: 'tableDimension.ts',
  }

  const measureFileMap: Record<string, string> = {
    Column: 'columnMeasure.ts',
    ColumnParallel: 'columnMeasure.ts',
    ColumnPercent: 'columnMeasure.ts',
    Bar: 'barMeasure.ts',
    BarParallel: 'barMeasure.ts',
    BarPercent: 'barMeasure.ts',
    Line: 'lineMeasure.ts',
    Area: 'areaMeasure.ts',
    AreaPercent: 'areaMeasure.ts',
    Pie: 'pieMeasure.ts',
    Donut: 'pieMeasure.ts',
    Funnel: 'funnelMeasure.ts',
    Radar: 'radarMeasure.ts',
    Rose: 'radarMeasure.ts',
    RoseParallel: 'radarMeasure.ts',
    Heatmap: 'heatmapMeasure.ts',
    Scatter: 'scatterMeasure.ts',
    Histogram: 'histogramMeasure.ts',
    BoxPlot: 'boxPlotMeasure.ts',
    DualAxis: 'dualAxisMeasure.ts',
    Table: 'tableMeasure.ts',
  }

  const chartTypes = Object.keys(dimensionFileMap)

  chartTypes.forEach((chartType) => {
    const dimensionTypeName = `${chartType}Dimension`
    const measureTypeName = `${chartType}Measure`

    // 处理 Dimension 类型
    const dimensionFile = dimensionFileMap[chartType]
    if (dimensionFile) {
      const dimensionPath = path.resolve(dimensionsDir, dimensionFile)
      if (fs.existsSync(dimensionPath)) {
        const dimensionContent = fs.readFileSync(dimensionPath, 'utf-8')

        // 查找当前类型的定义
        const typeRegex = new RegExp(`export type ${dimensionTypeName}[\\s\\S]*?(?=\\n\\nexport|\\n$|$)`, 'g')
        const typeMatch = dimensionContent.match(typeRegex)

        if (typeMatch && typeMatch[0]) {
          let typeDef = typeMatch[0].trim()

          // 如果是类型别名，需要查找引用的类型
          const aliasMatch = typeDef.match(/export type \w+\s*=\s*(\w+)\s*$/)
          if (aliasMatch && aliasMatch[1]) {
            // 这是一个别名，查找引用的类型
            const baseTypeName = aliasMatch[1]

            // 首先在当前文件中查找
            let baseTypeRegex = new RegExp(`export type ${baseTypeName}[\\s\\S]*?(?=\\n\\nexport|\\n$|$)`, 'g')
            let baseTypeMatch = dimensionContent.match(baseTypeRegex)

            // 如果当前文件中找不到，尝试从映射中找到对应的文件
            if (!baseTypeMatch || !baseTypeMatch[0]) {
              // 尝试找到引用类型所在的文件
              const baseTypeFileName = dimensionFileMap[baseTypeName.replace('Dimension', '')]
              if (baseTypeFileName && baseTypeFileName !== dimensionFile) {
                const baseTypePath = path.resolve(dimensionsDir, baseTypeFileName)
                if (fs.existsSync(baseTypePath)) {
                  const baseTypeContent = fs.readFileSync(baseTypePath, 'utf-8')
                  baseTypeRegex = new RegExp(`export type ${baseTypeName}[\\s\\S]*?(?=\\n\\nexport|\\n$|$)`, 'g')
                  baseTypeMatch = baseTypeContent.match(baseTypeRegex)
                }
              }
            }
            if (baseTypeMatch && baseTypeMatch[0]) {
              const content = `### ${dimensionTypeName}\n\`\`\`typescript\n${baseDimensionDef}\n\n${typeDef}\n\n${baseTypeMatch[0].trim()}\n\`\`\``
              fs.writeFileSync(path.resolve(outputDir, `${dimensionTypeName}.md`), content)
            }
          } else {
            // 这是完整的类型定义
            const content = `### ${dimensionTypeName}\n\`\`\`typescript\n${baseDimensionDef}\n\n${typeDef}\n\`\`\``
            fs.writeFileSync(path.resolve(outputDir, `${dimensionTypeName}.md`), content)
          }
        }
      }
    }

    // 处理 Measure 类型
    const measureFile = measureFileMap[chartType]
    if (measureFile) {
      const measurePath = path.resolve(measuresDir, measureFile)
      if (fs.existsSync(measurePath)) {
        const measureContent = fs.readFileSync(measurePath, 'utf-8')

        // 查找当前类型的定义
        const typeRegex = new RegExp(`export type ${measureTypeName}[\\s\\S]*?(?=\\n\\nexport|\\n$|$)`, 'g')
        const typeMatch = measureContent.match(typeRegex)

        if (typeMatch && typeMatch[0]) {
          let typeDef = typeMatch[0].trim()

          // 如果是类型别名，需要查找引用的类型
          const aliasMatch = typeDef.match(/export type \w+\s*=\s*(\w+)\s*$/)
          if (aliasMatch && aliasMatch[1]) {
            // 这是一个别名，查找引用的类型
            const baseTypeName = aliasMatch[1]

            // 首先在当前文件中查找
            let baseTypeRegex = new RegExp(`export type ${baseTypeName}[\\s\\S]*?(?=\\n\\nexport|\\n$|$)`, 'g')
            let baseTypeMatch = measureContent.match(baseTypeRegex)

            // 如果当前文件中找不到，尝试从映射中找到对应的文件
            if (!baseTypeMatch || !baseTypeMatch[0]) {
              // 尝试找到引用类型所在的文件
              const baseTypeFileName = measureFileMap[baseTypeName.replace('Measure', '')]
              if (baseTypeFileName && baseTypeFileName !== measureFile) {
                const baseTypePath = path.resolve(measuresDir, baseTypeFileName)
                if (fs.existsSync(baseTypePath)) {
                  const baseTypeContent = fs.readFileSync(baseTypePath, 'utf-8')
                  baseTypeRegex = new RegExp(`export type ${baseTypeName}[\\s\\S]*?(?=\\n\\nexport|\\n$|$)`, 'g')
                  baseTypeMatch = baseTypeContent.match(baseTypeRegex)
                }
              }
            }
            if (baseTypeMatch && baseTypeMatch[0]) {
              const content = `### ${measureTypeName}\n\`\`\`typescript\n${baseMeasureDef}\n\n${typeDef}\n\n${baseTypeMatch[0].trim()}\n\`\`\``
              fs.writeFileSync(path.resolve(outputDir, `${measureTypeName}.md`), content)
            }
          } else {
            // 这是完整的类型定义
            const content = `### ${measureTypeName}\n\`\`\`typescript\n${baseMeasureDef}\n\n${typeDef}\n\`\`\``
            fs.writeFileSync(path.resolve(outputDir, `${measureTypeName}.md`), content)
          }
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
