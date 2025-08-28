const path = require('path')
const fs = require('fs')
const { Project, SyntaxKind } = require('ts-morph')

const outputDir = path.resolve(__dirname, '../docs/zh-CN/option')
// const outputDir = path.resolve(__dirname, './docs')
const tsConfigPath = path.resolve(__dirname, '../../../packages/vseed/tsconfig.json')
// 确保目录存在
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// 解析JSDoc标签，返回一个对象，key是标签名，value是数组（可能有多个同名标签）
function parseJsDocTags(jsDocs) {
  const tags = {}
  jsDocs.forEach((jsDoc) => {
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

// 生成Markdown内容
function generateMarkdown(propName, tags) {
  const description = (tags.description || []).join('\n\n') || '无描述'
  const example = (tags.example || []).join('\n\n') || '无示例'
  const type = (tags.type || []).join('\n\n') || '无类型'

  return `# ${propName}\n## 描述\n${description}\n`
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
  let result = null
  for (const sourceFile of project.getSourceFiles()) {
    const alias = sourceFile.getTypeAlias(typeAliasName)
    if (alias) {
      return alias
    }
  }
  return result
}

// 递归处理接口属性
function processInterface(project, interfaceDec, baseDir, parentPath = []) {
  const props = interfaceDec.getProperties()

  props.forEach((prop) => {
    const propName = prop.getName()
    const typeNode = prop.getTypeNode()
    const jsDocs = prop.getJsDocs()
    const tags = parseJsDocTags(jsDocs)

    // 生成当前属性的目录路径
    const dir = path.join(baseDir, ...parentPath)
    ensureDir(dir)

    if (!typeNode) {
      // 没有类型节点，认为是叶子，生成md
      const mdPath = path.join(dir, `${propName}.md`)
      fs.writeFileSync(mdPath, generateMarkdown(propName, tags), 'utf-8')
      return
    }

    const kind = typeNode.getKind()

    if (kind === SyntaxKind.TypeLiteral) {
      // 内嵌对象类型，为其自身创建md文件
      const mdPath = path.join(dir, `${propName}.md`)
      fs.writeFileSync(mdPath, generateMarkdown(propName, tags), 'utf-8')

      // 递归进入子属性
      const members = typeNode.getMembers().filter((m) => m.getKind() === SyntaxKind.PropertySignature)
      const fakeInterface = {
        getProperties: () => members,
      }
      processInterface(project, fakeInterface, baseDir, [...parentPath, propName])
    } else if (kind === SyntaxKind.TypeReference) {
      // 引用类型，尝试找到对应接口或类型别名
      const typeName = typeNode.getText()
      const refInterface = getInterfaceFromProject(project, typeName)
      if (refInterface) {
        // 为引用接口自身创建md
        const mdPath = path.join(dir, `${propName}.md`)
        fs.writeFileSync(mdPath, generateMarkdown(propName, tags), 'utf-8')
        // 递归进入引用接口
        processInterface(project, refInterface, baseDir, [...parentPath, propName])
      } else {
        const typeAlias = getTypeAliasFromProject(project, typeName)
        if (typeAlias) {
          const aliasTypeNode = typeAlias.getTypeNode()
          if (aliasTypeNode && aliasTypeNode.getKind() === SyntaxKind.TypeLiteral) {
            // 为类型别名自身创建md
            const mdPath = path.join(dir, `${propName}.md`)
            fs.writeFileSync(mdPath, generateMarkdown(propName, tags), 'utf-8')

            const members = aliasTypeNode.getMembers().filter((m) => m.getKind() === SyntaxKind.PropertySignature)
            const fakeInterface = {
              getProperties: () => members,
            }
            processInterface(project, fakeInterface, baseDir, [...parentPath, propName])
          } else {
            // 类型别名不是对象字面量，认为是叶子，生成md
            const mdPath = path.join(dir, `${propName}.md`)
            fs.writeFileSync(mdPath, generateMarkdown(propName, tags), 'utf-8')
          }
        } else {
          // 找不到引用接口或类型别名，认为是叶子，生成md
          const mdPath = path.join(dir, `${propName}.md`)
          fs.writeFileSync(mdPath, generateMarkdown(propName, tags), 'utf-8')
        }
      }
    } else {
      // 其他类型，认为是叶子，生成md
      const mdPath = path.join(dir, `${propName}.md`)
      fs.writeFileSync(mdPath, generateMarkdown(propName, tags), 'utf-8')
    }
  })
}

function generateMetaJsonRecursive(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true })

  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      generateMetaJsonRecursive(path.join(directory, entry.name))
    }
  })

  const dirNames = new Set(entries.filter((e) => e.isDirectory()).map((e) => e.name))
  const isRoot = path.resolve(directory) === path.resolve(outputDir)

  const dirs = []
  const files = []

  entries.forEach((entry) => {
    if (entry.name === '_meta.json') {
      return
    }

    if (isRoot && (entry.name === 'index.md' || entry.name === 'index.mdx')) {
      return
    }

    if (entry.isDirectory()) {
      dirs.push({
        type: 'dir',
        name: entry.name,
        label: `${entry.name} `,
        collapsed: true,
      })
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      const name = entry.name.replace(/\.mdx?$/, '')
      if (!dirNames.has(name)) {
        files.push({
          type: 'file',
          name: name,
          label: `${name} `,
        })
      }
    }
  })

  dirs.sort((a, b) => a.name.localeCompare(b.name))
  files.sort((a, b) => a.name.localeCompare(b.name))

  let meta = [...dirs, ...files]

  if (isRoot) {
    const indexFile = {
      type: 'file',
      name: 'index',
      label: 'Overview',
    }
    meta = [indexFile, ...dirs, ...files]
  }

  if (meta.length > 0) {
    fs.writeFileSync(path.join(directory, '_meta.json'), JSON.stringify(meta, null, 2))
  }
}

function main() {
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true })
  }
  const project = new Project({
    tsConfigFilePath: tsConfigPath,
  })

  const chartTypesDir = path.resolve(__dirname, '../../../packages/vseed/src/types/chartType')
  const chartTypeFolders = fs
    .readdirSync(chartTypesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  ensureDir(outputDir)

  chartTypeFolders.forEach((chartName) => {
    const inputFile = path.join(chartTypesDir, chartName, `${chartName}.ts`)
    if (!fs.existsSync(inputFile)) {
      console.log(`Skipping ${chartName}: ${inputFile} does not exist.`)
      return
    }

    project.addSourceFileAtPath(inputFile)
    const sourceFile = project.getSourceFileOrThrow(inputFile)

    const interfaceName = chartName.charAt(0).toUpperCase() + chartName.slice(1)
    let chartInterface = sourceFile.getInterface(interfaceName)

    if (!chartInterface) {
      const interfaces = sourceFile.getInterfaces().filter((i) => i.isExported())
      if (interfaces.length > 0) {
        chartInterface = interfaces[0] // take the first exported one
        console.warn(
          `Could not find interface "${interfaceName}", using "${chartInterface.getName()}" instead for chart type "${chartName}".`,
        )
      }
    }

    if (!chartInterface) {
      console.error(`未找到可导出的接口 in ${inputFile}`)
      return
    }

    processInterface(project, chartInterface, outputDir, [chartName])

    console.log(`文档生成完成 for ${chartName}, 目录：`, path.join(outputDir, chartName))
  })
  fs.writeFileSync(path.join(outputDir, 'index.md'), '---\noverview: true\n---', 'utf-8')
  generateMetaJsonRecursive(outputDir)
  console.log('所有文档生成完成，目录：', outputDir)
}

main()
