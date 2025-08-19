import path from 'path'
import fs from 'fs'

function generateChartTypeMarkdown() {
  const chartTypes = [
    'area',
    'areaPercent',
    'areaRange',
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
  const localeMd = fs.readFileSync(path.resolve(__dirname, './new-type/Locale.md')).toString();

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
        console.log(`Generated markdown for ${pascalCaseChartType}`)
      } else {
        console.log(`Could not find matching closing brace for ${pascalCaseChartType} in ${chartType}.ts`)
      }
    } else {
      console.log(`Could not find opening brace for ${pascalCaseChartType} in ${chartType}.ts`)
    }
  })
}

const skipTopKeys = [
  'Dimensions',
  'Measures',
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
      topKeyDesc[keyPath.componentName] = keyPath.description
    })
  })

  console.log(Array.from(topKeySet).length)

  // 读取dir目录下的所有文件
  const files = fs.readdirSync(dir, { recursive: true })

  // 加载Selector.md
  const selectorMd = fs.readFileSync(path.resolve(__dirname, './new-type/Selector.md')).toString();

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
          let mdContent = `### ${topKey}\n${topKeyDesc[topKey]}\n\`\`\`typescript\n` + typeDefinition + '\n```'
          if (mdContent.includes('Selector')) {
            // 补充selector的描述
            mdContent += `\n${selectorMd}`
          }
          fs.writeFileSync(path.resolve(outputDir, `${topKey}.md`), mdContent)
          console.log(`Generated markdown for ${topKey}`)
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
  const axisDir = path.resolve(__dirname, '../packages/vseed/src/types/properties/config/axes/axis.ts')
  const fileContent = fs.readFileSync(axisDir)
  const fileContentStr = fileContent.toString()
  const outputDir = path.resolve(__dirname, './new-type')

  const interfaceSignature = `export type Axis`
  const interfaceIndex = fileContentStr.indexOf(interfaceSignature)

  if (interfaceIndex === -1) {
    console.log(`Could not find interface definition export type Axis in axis.ts`)
    return
  }

  const startIndex = interfaceIndex
  let axisDefinition = '';

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
      axisDefinition = definition;
      const mdContent = '```typescript\n' + definition + '\n```'
      const outputFilePath = path.resolve(outputDir, `Axis.md`)
      fs.writeFileSync(outputFilePath, mdContent)
      console.log(`Generated markdown for Axis`)
    } else {
      console.log(`Could not find matching closing brace for Axis in axis.ts`)
    }
  } else {
    console.log(`Could not find opening brace for Axis in axis.ts`)
  }

  if (!axisDefinition) {
    return
  }

  const removeProperties = (typeDefinition: string, propertiesToRemove: string[]): string => {
    let newDefinition = typeDefinition;
    for (const prop of propertiesToRemove) {
      const propSignature = `${prop}?:`;
      let propIndex = newDefinition.indexOf(propSignature);
      if (propIndex === -1) {
        const propSignature2 = `${prop}:`;
        propIndex = newDefinition.indexOf(propSignature2);
        if (propIndex === -1) {
            console.warn(`Property ${prop} not found in Axis definition.`);
            continue;
        }
      }

      const commentStartIndex = newDefinition.lastIndexOf('/**', propIndex);
      if (commentStartIndex === -1) {
        console.warn(`Could not find comment for property ${prop}.`);
        continue;
      }

      let blockEndIndex = newDefinition.indexOf('\n', propIndex);
      if (blockEndIndex === -1) {
        blockEndIndex = newDefinition.length;
      }
      
      newDefinition = newDefinition.substring(0, commentStartIndex) + newDefinition.substring(blockEndIndex + 1);
    }
    return newDefinition;
  };

  const bandAxisOmit = ['min', 'max', 'nice', 'zero'];
  const bandAxisDefinition = removeProperties(axisDefinition, bandAxisOmit);
  
  const xBandAxisDefinition = bandAxisDefinition.replace('export type Axis', 'export type XBandAxis');
  fs.writeFileSync(path.resolve(outputDir, 'XBandAxis.md'), '### XBandAxis\n类目轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.\n```typescript\n' + xBandAxisDefinition + '\n```');
  console.log('Generated markdown for XBandAxis');

  const yBandAxisDefinition = bandAxisDefinition.replace('export type Axis', 'export type YBandAxis');
  fs.writeFileSync(path.resolve(outputDir, 'YBandAxis.md'), '### YBandAxis\n类目轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.\n```typescript\n' + yBandAxisDefinition + '\n```');
  console.log('Generated markdown for YBandAxis');

  const linearAxisOmit = ['labelAutoHide', 'labelAutoHideGap', 'labelAutoRotate', 'labelAutoRotateAngleRange', 'labelAutoLimit', 'labelAutoLimitLength'];
  const linearAxisDefinition = removeProperties(axisDefinition, linearAxisOmit);

  const xLinearAxisDefinition = linearAxisDefinition.replace('export type Axis', 'export type XLinearAxis');
  fs.writeFileSync(path.resolve(outputDir, 'XLinearAxis.md'), '### XLinearAxis\n数值轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.\n```typescript\n' + xLinearAxisDefinition + '\n```');
  console.log('Generated markdown for XLinearAxis');

  const yLinearAxisDefinition = linearAxisDefinition.replace('export type Axis', 'export type YLinearAxis');
  fs.writeFileSync(path.resolve(outputDir, 'YLinearAxis.md'), '### YLinearAxis\n数值轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.\n```typescript\n' + yLinearAxisDefinition + '\n```');
  console.log('Generated markdown for YLinearAxis');
}

export async function generateMarkdown() {
  generateChartTypeMarkdown()
  generateComponentMarkdown()
  generateAxisMarkdown()
}

// generateMarkdown()