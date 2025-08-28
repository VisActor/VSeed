const path = require('path')
const fs = require('fs')
const { Project, SyntaxKind } = require('ts-morph')

// ==================================================================================
// Constants
// ==================================================================================

const outputDir = path.resolve(__dirname, '../docs/zh-CN/option')
const chartTypesDir = path.resolve(__dirname, '../../../packages/vseed/src/types/chartType')
const tsConfigPath = path.resolve(__dirname, '../../../packages/vseed/tsconfig.json')

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
  const jsDocs = chartInterface.getJsDocs()
  const tags = parseJsDocTags(jsDocs)

  const chartDir = path.join(outputDir, chartName)
  ensureDir(chartDir)

  const mdPath = path.join(chartDir, `${chartName}.md`)
  fs.writeFileSync(mdPath, generateMarkdown(chartName, tags), 'utf-8')

  // Process all properties of the interface recursively
  processInterface(project, chartInterface, chartDir, [])

  console.log(`文档生成完成 for ${chartName}, 目录：`, chartDir)
}

// ==================================================================================
// Recursive AST Processing
// ==================================================================================

function processInterface(project, interfaceDec, baseDir, parentPath = []) {
  const props = interfaceDec.getProperties()

  const simpleProps = []
  const complexProps = []

  props.forEach((prop) => {
    if (prop.getName().startsWith('[Symbol')) {
      return
    }
    const typeNode = prop.getTypeNode()
    const typesToProcess = typeNode ? extractObjectTypes(typeNode.getType()) : []
    if (typesToProcess.length > 0) {
      complexProps.push(prop)
    } else {
      simpleProps.push(prop)
    }
  })

  const currentDir = path.join(baseDir, ...parentPath)
  ensureDir(currentDir)

  simpleProps.forEach((prop) => {
    const propName = prop.getName()
    const mdPath = path.join(currentDir, `${propName}.md`)
    const jsDocs = prop.getJsDocs()
    const tags = parseJsDocTags(jsDocs)
    const propType = prop.getType()
    let propTypeText

    if (propType.isUnion() && propType.getUnionTypes().every((t) => t.isLiteral())) {
      propTypeText = propType
        .getUnionTypes()
        .map((t) => t.getText())
        .join(' | ')
    } else {
      propTypeText = propType.getText(prop).replace(/\n/g, ' ').replace(/\s+/g, ' ')
    }
    const markdownContent = generateMarkdown(propName, tags, propTypeText)
    fs.writeFileSync(mdPath, markdownContent, 'utf-8')
  })

  complexProps.forEach((prop) => {
    processProperty(project, prop, baseDir, parentPath)
  })
}

function processProperty(project, prop, baseDir, parentPath) {
  const propName = prop.getName()
  if (propName === 'children' && parentPath.includes('children')) {
    return
  }
  const typeNode = prop.getTypeNode()
  const jsDocs = prop.getJsDocs()
  const tags = parseJsDocTags(jsDocs)

  const propDir = path.join(baseDir, ...parentPath, propName)
  ensureDir(propDir)

  // Always create a markdown file for the property itself
  const mdPath = path.join(propDir, `${propName}.md`)
  fs.writeFileSync(mdPath, generateMarkdown(propName, tags), 'utf-8')

  if (!typeNode) {
    return // Leaf property, no need to recurse
  }

  const newParentPath = [...parentPath, propName]

  if (newParentPath.length > 20) {
    return
  }

  const type = typeNode.getType()

  const typesToProcess = extractObjectTypes(type)

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
      const fakeInterface = {
        getProperties: () => uniqueDeclarations,
      }
      processInterface(project, fakeInterface, baseDir, newParentPath)
    }
  }
}

// ==================================================================================
// File & Metadata Generation
// ==================================================================================

function generateMarkdown(propName, tags, propType) {
  const description = (tags.description || []).join('\n\n') || '无描述'

  if (propType) {
    return `# ${propName}\n\n**类型:** \`${propType}\`\n\n## 描述\n${description}`
  }

  const example = (tags.example || []).join('\n\n') || '无示例'
  const type = (tags.type || []).join('\n\n') || '无类型'

  return `# ${propName}\n## 描述\n${description}\n`
}

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
    if (entry.name === '_meta.json' || (isRoot && (entry.name === 'index.md' || entry.name === 'index.mdx'))) {
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
    meta.unshift({ type: 'file', name: 'index', label: 'Overview' })
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

function getInterfaceFromProject(project, name) {
  for (const sourceFile of project.getSourceFiles()) {
    const iface = sourceFile.getInterface(name)
    if (iface) {
      return iface
    }
  }
  return undefined
}

function getTypeAliasFromProject(project, typeAliasName) {
  for (const sourceFile of project.getSourceFiles()) {
    const alias = sourceFile.getTypeAlias(typeAliasName)
    if (alias) {
      return alias
    }
  }
  return null
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
