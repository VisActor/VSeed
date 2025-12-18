import { z } from 'zod'
import { compile } from 'json-schema-to-typescript'
import {
  zDataset,
  // zDimensions,
  // zMeasures,
  zBackgroundColor,
  zCrosshairLine,
  zTheme,
  zLocale,
  zCrosshairRect,
  zStackCornerRadius,
  zSelector,
  zSelectors,
  zAreaSelector,
  zAreaSelectors,
  // zDimensionTree,
  // zMeasureTree,
  zColorLegend,
  // zDualMeasures,
  zBarMaxWidth,
  zBarGapInGroup,
  zWhiskersConfig,
} from '@visactor/vseed'
import fs from 'fs'
import path from 'path'

export async function generateSchema() {
  const topKeyDir = path.resolve(__dirname, './top-key')
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

  // Dataset
  const datasetSchema = await compile(z.toJSONSchema(zDataset) as any, 'Dataset', {
    bannerComment: '',
  })
  fs.writeFileSync(
    path.join(__dirname, './new-type/Dataset.md'),
    `
### Dataset
${topKeyDesc['Dataset']}
\`\`\`typescript
${datasetSchema}
\`\`\`
  `,
  )

  //   // Dimensions
  //   const dimensionsSchema = await compile(z.toJSONSchema(zDimensions) as any, 'Dimensions', {
  //     bannerComment: ''
  //   });
  //   fs.writeFileSync(path.join(__dirname, './new-type/Dimensions.md'), `
  // ### Dimensions
  // \`\`\`typescript
  // ${dimensionsSchema}
  // \`\`\`
  //   `);

  //   // Measures
  //   const measuresSchema = await compile(z.toJSONSchema(zMeasures) as any, 'Measures', {
  //     bannerComment: ''
  //   });
  //   fs.writeFileSync(path.join(__dirname, './new-type/Measures.md'), `
  // ### Measures
  // \`\`\`typescript
  // ${measuresSchema}
  // \`\`\`
  //   `);

  // BackgroundColor
  const backgroundColorSchema = await compile(z.toJSONSchema(zBackgroundColor) as any, 'BackgroundColor', {
    bannerComment: '',
  })
  fs.writeFileSync(
    path.join(__dirname, './new-type/BackgroundColor.md'),
    `
### BackgroundColor
${topKeyDesc['BackgroundColor']}
\`\`\`typescript
${backgroundColorSchema}
\`\`\`
  `,
  )

  //   // CrosshairLine
  //   const crosshairLineSchema = await compile(z.toJSONSchema(zCrosshairLine) as any, 'CrosshairLine', {
  //     bannerComment: ''
  //   });
  //   fs.writeFileSync(path.join(__dirname, './new-type/CrosshairLine.md'), `
  // ### CrosshairLine
  // ${topKeyDesc['CrosshairLine']}
  // \`\`\`typescript
  // ${crosshairLineSchema}
  // \`\`\`
  //   `);

  // Theme
  const themeSchema = await compile(z.toJSONSchema(zTheme) as any, 'Theme', {
    bannerComment: '',
  })
  fs.writeFileSync(
    path.join(__dirname, './new-type/Theme.md'),
    `
### Theme
${topKeyDesc['Theme']}
\`\`\`typescript
${themeSchema}
\`\`\`
  `,
  )

  // Locale
  const localeSchema = await compile(z.toJSONSchema(zLocale) as any, 'Locale', {
    bannerComment: '',
  })
  fs.writeFileSync(
    path.join(__dirname, './new-type/Locale.md'),
    `
### Locale
${topKeyDesc['Locale']}
\`\`\`typescript
${localeSchema}
\`\`\`
  `,
  )

  //   // CrosshairRect
  //   const crosshairRectSchema = await compile(z.toJSONSchema(zCrosshairRect) as any, 'CrosshairRect', {
  //     bannerComment: ''
  //   });
  //   fs.writeFileSync(path.join(__dirname, './new-type/CrosshairRect.md'), `
  // ### CrosshairRect
  // ${topKeyDesc['CrosshairRect']}
  // \`\`\`typescript
  // ${crosshairRectSchema}
  // \`\`\`
  //   `);

  // StackCornerRadius
  const stackCornerRadiusSchema = await compile(z.toJSONSchema(zStackCornerRadius) as any, 'StackCornerRadius', {
    bannerComment: '',
  })
  fs.writeFileSync(
    path.join(__dirname, './new-type/StackCornerRadius.md'),
    `
### StackCornerRadius
${topKeyDesc['StackCornerRadius']}
\`\`\`typescript
${stackCornerRadiusSchema}
\`\`\`
  `,
  )

  // Selector
  const selectorSchema = await compile(z.toJSONSchema(zSelector) as any, 'Selector', {
    bannerComment: '',
  })
  // Selectors
  const selectorsSchema = await compile(z.toJSONSchema(zSelectors) as any, 'Selectors', {
    bannerComment: '',
  })
  fs.writeFileSync(
    path.join(__dirname, './new-type/Selector.md'),
    `
### Selector
\`\`\`typescript
${selectorSchema}
\`\`\`

### Selectors
\`\`\`typescript
${selectorsSchema}
\`\`\`
  `,
  )

  // AreaSelector
  const areaSelectorSchema = await compile(z.toJSONSchema(zAreaSelector) as any, 'AreaSelector', {
    bannerComment: '',
  })
  // AreaSelectors
  const areaSelectorsSchema = await compile(z.toJSONSchema(zAreaSelectors) as any, 'AreaSelectors', {
    bannerComment: '',
  })
  fs.writeFileSync(
    path.join(__dirname, './new-type/AreaSelector.md'),
    `
### AreaSelector
${topKeyDesc['AreaSelector'] || ''}
\`\`\`typescript
${areaSelectorSchema}
\`\`\`

### AreaSelectors
${topKeyDesc['AreaSelectors'] || ''}
\`\`\`typescript
${areaSelectorsSchema}
\`\`\`
  `,
  )

  //   // DimensionTree
  //   const dimensionTreeSchema = await compile(z.toJSONSchema(zDimensionTree) as any, 'DimensionTree', {
  //     bannerComment: ''
  //   });
  //   fs.writeFileSync(path.join(__dirname, './new-type/DimensionTree.md'), `
  // ### DimensionTree
  // \`\`\`typescript
  // ${dimensionTreeSchema}
  // \`\`\`
  //   `);

  //   // MeasureTree
  //   const measureTreeSchema = await compile(z.toJSONSchema(zMeasureTree) as any, 'MeasureTree', {
  //     bannerComment: ''
  //   });
  //   fs.writeFileSync(path.join(__dirname, './new-type/MeasureTree.md'), `
  // ### MeasureTree
  // \`\`\`typescript
  // ${measureTreeSchema}
  // \`\`\`
  //   `);

  // ColorLegend
  const colorLegendSchema = await compile(z.toJSONSchema(zColorLegend) as any, 'ColorLegend', {
    bannerComment: '',
  })
  fs.writeFileSync(
    path.join(__dirname, './new-type/ColorLegend.md'),
    `
### ColorLegend
${topKeyDesc['ColorLegend']}
\`\`\`typescript
${colorLegendSchema}
\`\`\`
  `,
  )

  //   // DualMeasures
  //   const dualMeasuresSchema = await compile(z.toJSONSchema(zDualMeasures) as any, 'DualMeasures', {
  //     bannerComment: ''
  //   });
  //   fs.writeFileSync(path.join(__dirname, './new-type/DualMeasures.md'), `
  // ### DualMeasures
  // ${topKeyDesc['DualMeasures']}
  // \`\`\`typescript
  // ${dualMeasuresSchema}
  // \`\`\`
  //   `);

  // BarMaxWidth
  const barMaxWidthSchema = await compile(z.toJSONSchema(zBarMaxWidth) as any, 'BarMaxWidth', {
    bannerComment: '',
  })
  fs.writeFileSync(
    path.join(__dirname, './new-type/BarMaxWidth.md'),
    `
### BarMaxWidth
${topKeyDesc['BarMaxWidth']}
\`\`\`typescript
${barMaxWidthSchema}
\`\`\`
  `,
  )

  // BarGapInGroup
  const barGapInGroupSchema = await compile(z.toJSONSchema(zBarGapInGroup) as any, 'BarGapInGroup', {
    bannerComment: '',
  })
  fs.writeFileSync(
    path.join(__dirname, './new-type/BarGapInGroup.md'),
    `
### BarGapInGroup
${topKeyDesc['BarGapInGroup']}
\`\`\`typescript
${barGapInGroupSchema}
\`\`\`
  `,
  )

  // WhiskersConfig
  const whiskersConfigSchema = await compile(z.toJSONSchema(zWhiskersConfig) as any, 'WhiskersConfig', {
    bannerComment: '',
  })
  fs.writeFileSync(
    path.join(__dirname, './new-type/WhiskersConfig.md'),
    `
### WhiskersConfig
${topKeyDesc['WhiskersConfig']}
\`\`\`typescript
${whiskersConfigSchema}
\`\`\`
  `,
  )
}

// generateSchema().then(() => {
//   console.log('generate schema success');
// });
