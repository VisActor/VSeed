import path from 'path';
import { Project } from 'ts-morph';
import fs from 'fs';

const project = new Project();
const dir = path.resolve(__dirname, '../packages/vseed/src/types/chartType/');
const outDir = path.resolve(__dirname, './top-key');
const files = fs.readdirSync(dir, {recursive: true});
files.forEach((file: any) => {
  // console.log(file, typeof file);
  if (!file.endsWith('.ts') || file.endsWith('index.ts')) {
    return;
  }

  const chartType = file.split('/')[0];
  const className = chartType.charAt(0).toUpperCase() + chartType.slice(1);
  const sourceFileDir = project.addSourceFileAtPath(path.resolve(dir, file));
  const areaInterface = sourceFileDir.getInterface(className);
  if (areaInterface) {
    const keyPaths: any[] = []
    const properties = areaInterface.getProperties();
    properties.forEach(property => {
      const keyPath: any = {}
      const name = property.getName();
      // console.log(`name: ${name}`);
      if (name === 'chartType') {
        return;
      }
      keyPath.name = name;
      const datasetType = property.getTypeNode()?.getText().split(' | ')[0];
      // console.log(`datasetType: ${datasetType}`);
      keyPath.componentName = datasetType;
      const jsDoc = property.getJsDocs();
      if (jsDoc.length > 0) {
        // all tag 
        const allTag = jsDoc[0]?.getTags();
        // console.log(allTag?.map(tag => tag.getTagName()))
        const descriptionTag = allTag?.find(tag => tag.getTagName() === 'description');
        if (descriptionTag) {
          // console.log(`描述: ${descriptionTag.getCommentText()}`);
          keyPath.description = descriptionTag.getCommentText();
        }
      }

      keyPaths.push(keyPath)
    });

    // 保存文件
    fs.writeFileSync(path.resolve(outDir, `${chartType}.json`), JSON.stringify(keyPaths, null, 2));
  }
});

console.log('generate top key success')