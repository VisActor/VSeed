import { generateSchema } from "./generate-from-zod"
import { generateMarkdown } from "./generate-markdown"
import * as fs from 'fs/promises';
import * as path from 'path';

async function checkFiles() {
  const topKeyDir = path.join(__dirname, 'top-key');
  const newTypeDir = path.join(__dirname, 'new-type');

  const topKeyFiles = await fs.readdir(topKeyDir);
  const newTypeFiles = await fs.readdir(newTypeDir);

  const newTypeFileNames = new Set(newTypeFiles);
  const missingComponents: string[] = [];

  for (const topKeyFile of topKeyFiles) {
    if (path.extname(topKeyFile) === '.json') {
      // 读取top-key文件
      const topKeyFilePath = path.join(topKeyDir, topKeyFile);
      const topKeyFileContent = await fs.readFile(topKeyFilePath, 'utf8');
      const topKeyData = JSON.parse(topKeyFileContent);
      topKeyData.forEach((item: any) => {
        const componentName = item.componentName;
        const expectedNewTypeFile = componentName.charAt(0).toUpperCase() + componentName.slice(1) + '.md';
        // componentName 为基础类型，跳过
        if (componentName === 'string' || componentName === 'number' || componentName === 'boolean') {
          return;
        }
        if (!newTypeFileNames.has(expectedNewTypeFile)) {
          missingComponents.push(componentName);
        }
      })
    }
  }

  if (missingComponents.length > 0) {
    console.log('\x1b[31m%s\x1b[0m', 'Missing componentName(s) in new-type:');
    missingComponents.forEach(name => console.log('\x1b[31m%s\x1b[0m', name));
  } else {
    console.log('All top-key components have corresponding files in new-type.');
  }
}

async function generateDoc() {
  await generateSchema()
  console.log('generate schema success')
  await generateMarkdown()

  // 检查llm_test/top-key内所有的componentName在llm_test/new-type中都有对应的文件
  await checkFiles();
}

generateDoc().then(() => {
  console.log('generate doc success')
})