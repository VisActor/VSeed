const path = require('path')
const fs = require('fs')
const { Project, SyntaxKind } = require('ts-morph')

// ==================================================================================
// Constants
// ==================================================================================

const outputDir = path.resolve(__dirname, '../apps/website/docs/zh-CN/option')
const chartTypesDir = path.resolve(__dirname, '../packages/vseed/src/types/chartType')
const tsConfigPath = path.resolve(__dirname, '../packages/vseed/tsconfig.json')

// ==================================================================================
// Main Orchestration
// ==================================================================================

function main() {
  // 1. Clean and prepare output directory
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true })
  }
  ensureDir(outputDir)

  // 2. Initialize ts-morph project
  const project = new Project({
    tsConfigFilePath: tsConfigPath,
  })

  // 3. Process each chart type
  const chartTypeFolders = fs
    .readdirSync(chartTypesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  chartTypeFolders.forEach((chartName) => {
    processChartType(project, chartName)
  })

  // 4. Generate root files
  fs.writeFileSync(path.join(outputDir, 'index.md'), '---\noverview: true\n---', 'utf-8')
  generateMetaJsonRecursive(outputDir)

  console.log('所有文档生成完成，目录：', outputDir)
}

function processChartType(project, chartName) {
  const inputFile = path.join(chartTypesDir, chartName, `${chartName}.ts`)
  if (!fs.existsSync(inputFile)) {
    console.log(`Skipping ${chartName}: ${inputFile} does not exist.`)
    return
  }

  project.addSourceFileAtPath(inputFile)
  const sourceFile = project.getSourceFileOrThrow(inputFile)

  // Find the main interface for the chart
  const interfaceName = chartName.charAt(0).toUpperCase() + chartName.slice(1)
  let chartInterface = sourceFile.getInterface(interfaceName)

  if (!chartInterface) {
    const interfaces = sourceFile.getInterfaces().filter((i) => i.isExported())
    if (interfaces.length > 0) {
      chartInterface = interfaces[0] // Fallback to the first exported interface
      console.warn(
        `Could not find interface "${interfaceName}", using "${chartInterface.getName()}" instead for chart type "${chartName}".`,
      )
    }
  }

  if (!chartInterface) {
    console.error(`未找到可导出的接口 in ${inputFile}`)
    return
  }

  // Generate a markdown file for the chart type itself
  let content = generateMarkdownContent(chartInterface, project)

  // Process all properties of the interface.
  const props = chartInterface.getProperties()
  props.forEach((prop) => {
    const propName = prop.getName()
    if (propName.startsWith('[Symbol')) {
      return
    }
    const markdownContent = generateMarkdownContent(prop, project, 2)
    if (markdownContent) {
      content += '\n' + markdownContent
    }
  })

  const mdPath = path.join(outputDir, `${chartName}.md`)
  fs.writeFileSync(mdPath, content, 'utf-8')

  console.log(`文档生成完成 for ${chartName}, 文件：`, mdPath)
}

// ==================================================================================
// Markdown Generation
// ==================================================================================
function generateMarkdownContent(node, project, level = 1, visited = new Set()) {
  const isInterface = node.getKind() === SyntaxKind.InterfaceDeclaration
  const isProperty =
    node.getKind() === SyntaxKind.PropertySignature || node.getKind() === SyntaxKind.PropertyDeclaration

  if (!isInterface && !isProperty) {
    return ''
  }

  const name = node.getName()
  if (name.startsWith('[Symbol')) {
    return ''
  }

  // To prevent infinite recursion for some cases like `children` -> `children`
  if (level > 10 || visited.has(name)) {
    return ''
  }

  // Stop recursion for children of measures to prevent infinite nesting
  if (visited.has('measures') && visited.has('children')) {
    return ''
  }

  visited.add(name)

  const jsDocs = node.getJsDocs()
  const tags = parseJsDocTags(jsDocs)

  let markdown = `${'#'.repeat(level)} ${name}\n\n`

  if (isProperty) {
    const propType = node.getType()
    let propTypeText

    if (propType.isUnion() && propType.getUnionTypes().every((t) => t.isLiteral())) {
      propTypeText = propType
        .getUnionTypes()
        .map((t) => t.getText())
        .join(' | ')
    } else {
      propTypeText = propType.getText(node).replace(/\n/g, ' ').replace(/\s+/g, ' ')
    }
    markdown += `**Type:** \`${propTypeText}\`\n\n`
  }

  const description = (tags.description || []).join('\n\n').replace(/\n/g, '\n\n').replace(/\-/g, '\\-') || ''
  const example = (tags.example || []).join('\n\n').replace(/\n/g, '\n').replace(/\-/g, '\\-') || ''
  const recommend = (tags.recommend || []).join('\n\n').replace(/\n/g, '\n\n').replace(/\-/g, '\\-') || ''
  const encoding = (tags.encoding || []).join('\n\n').replace(/\n/g, '\n\n').replace(/\-/g, '\\-') || ''
  const note = (tags.note || []).join('\n\n').replace(/\n/g, '\n\n').replace(/\-/g, '\\-') || ''

  const danger = (tags.danger || []).join('\n\n').replace(/\n/g, '\n\n').replace(/\-/g, '\\-') || ''
  const info = (tags.info || []).join('\n\n').replace(/\n/g, '\n\n').replace(/\-/g, '\\-') || ''
  const warning = (tags.warning || []).join('\n\n').replace(/\n/g, '\n\n').replace(/\-/g, '\\-') || ''
  const tip = (tags.tip || []).join('\n\n'.replace(/\n/g, '\n\n').replace(/\-/g, '\\-')) || ''

  if (recommend) {
    markdown += `:::info{title=推荐}\n${recommend}\n\n:::`
    markdown += '\n\n'
  }
  if (encoding) {
    markdown += `:::info{title=编码映射}\n${encoding}\n\n:::`
    markdown += '\n\n'
  }
  if (description) {
    markdown += `:::note{title=描述}\n${description}\n\n:::`
    markdown += '\n\n'
  }
  if (example) {
    markdown += `**示例**\n${example}\n\n`
    markdown += '\n\n'
  }
  if (info) {
    markdown += `:::info{title=Info}\n${info}\n\n:::`
    markdown += '\n\n'
  }
  if (tip) {
    markdown += `:::tip{title=Tip}\n${tip}\n\n:::`
    markdown += '\n\n'
  }
  if (note) {
    markdown += `:::note{title=Note}\n${note}\n\n:::`
    markdown += '\n\n'
  }
  if (warning) {
    markdown += `:::warning{title=Warning}\n${warning}\n\n:::`
    markdown += '\n\n'
  }
  if (danger) {
    markdown += `:::danger{title=Danger}\n${danger}\n\n:::`
    markdown += '\n\n'
  }

  if (isProperty) {
    const propType = node.getType()
    const typesToProcess = extractObjectTypes(propType)

    if (typesToProcess.length > 0) {
      const allProperties = typesToProcess.flatMap((t) => t.getApparentProperties())

      const propertyDeclarations = allProperties
        .flatMap((p) => {
          const declarations = p.getDeclarations()
          return declarations || []
        })
        .filter(
          (d) => d && (d.getKind() === SyntaxKind.PropertySignature || d.getKind() === SyntaxKind.PropertyDeclaration),
        )

      const uniqueDeclarations = [...new Map(propertyDeclarations.map((item) => [item.getName(), item])).values()]

      if (uniqueDeclarations.length > 0) {
        markdown += '\n'
        uniqueDeclarations.forEach((subProp) => {
          markdown += generateMarkdownContent(subProp, project, level + 1, new Set(visited))
        })
      }
    }
  }
  return markdown
}

// ==================================================================================
// File & Metadata Generation
// ==================================================================================

function generateMetaJsonRecursive(directory) {
  // 1. Recurse into subdirectories first to build from the bottom up.
  const entries = fs.readdirSync(directory, { withFileTypes: true })
  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      generateMetaJsonRecursive(path.join(directory, entry.name))
    }
  })

  // 2. Process the current directory's entries.
  const isRoot = path.resolve(directory) === path.resolve(outputDir)
  const subdirectories = new Set(entries.filter((e) => e.isDirectory()).map((e) => e.name))

  const dirsForMeta = []
  const filesForMeta = []

  entries.forEach((entry) => {
    if (entry.name === '_meta.json' || entry.name === 'index.md' || entry.name === 'index.mdx') {
      return
    }

    if (entry.isDirectory()) {
      dirsForMeta.push({ type: 'dir', name: entry.name, label: `${entry.name} `, collapsed: true })
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      const name = entry.name.replace(/\.mdx?$/, '')
      // A file is not listed if a directory with the same name exists.
      if (!subdirectories.has(name)) {
        filesForMeta.push({ type: 'file', name: name, label: `${name} ` })
      }
    }
  })

  // 3. Sort and combine.
  dirsForMeta.sort((a, b) => a.name.localeCompare(b.name))
  filesForMeta.sort((a, b) => a.name.localeCompare(b.name))

  let meta = [...filesForMeta, ...dirsForMeta]

  // 4. Add the root index file.
  if (isRoot) {
    meta.unshift({ type: 'file', name: 'index', label: 'Overview' }, { type: 'divider' })
  }

  // 5. Write the _meta.json file.
  if (meta.length > 0) {
    fs.writeFileSync(path.join(directory, '_meta.json'), JSON.stringify(meta, null, 2))
  }
}

// ==================================================================================
// Utility Helpers
// ==================================================================================

function extractObjectTypes(type) {
  if (!type) {
    return []
  }
  if (type.isIntersection()) {
    return [type]
  }
  if (type.isObject() && !type.isArray() && !type.isUnion()) {
    return [type]
  }
  if (type.isUnion()) {
    return type.getUnionTypes().flatMap((t) => extractObjectTypes(t))
  }
  if (type.isArray()) {
    return extractObjectTypes(type.getArrayElementType())
  }
  return []
}

function parseJsDocTags(jsDocs) {
  const tags = {}
  jsDocs.forEach((jsDoc) => {
    const description = jsDoc.getDescription()
    if (description) {
      tags.description = [description.trim()]
    }
    jsDoc.getTags().forEach((tag) => {
      const tagName = tag.getTagName()
      const tagText = tag.getCommentText() || ''
      if (!tags[tagName]) {
        tags[tagName] = []
      }
      tags[tagName].push(tagText.trim())
    })
  })
  return tags
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// ==================================================================================
// Script Execution
// ==================================================================================

main()
