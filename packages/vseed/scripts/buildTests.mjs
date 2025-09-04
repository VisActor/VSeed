import fs from 'fs/promises';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const rootDir = path.resolve(__dirname, '../');

async function generateTests() {
  try {
    const absolutePipelineDir = path.join(rootDir, './tests/pipeline/chartType');
    const entries = await fs.readdir(absolutePipelineDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subDir = path.join(absolutePipelineDir, entry.name);
        const files = await fs.readdir(subDir);

        for (const file of files) {
          if (file.endsWith('.json')) {
            const jsonPath = path.join(subDir, file);
            const testPath = jsonPath.replace('.json', '.test.ts');
            const testName = path.basename(file, '.json');

            try {
              await fs.unlink(testPath);
              console.log(`Removed existing test file: ${testPath}`);
            } catch (error) {
              if (error.code !== 'ENOENT') {
                throw error;
              }
            }

            const testContent = `import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll } from '@visactor/vseed'
import vseed from './${testName}.json'

test('${testName}', () => {
  registerAll()
  const builder = Builder.from(vseed as VSeed)
  const advanced = builder.buildAdvanced()
  if (!advanced) {
    throw new Error('Failed to build advanced configuration')
  }
  const spec = builder.buildSpec(advanced)
  expect(advanced).toMatchSnapshot()
  expect(spec).toMatchSnapshot()
});
`;
            await fs.writeFile(testPath, testContent);
            console.log(`Generated test file: ${testPath}`);
          }
        }
      }
    }
  } catch (err) {
    console.error('Error generating tests:', err);
  }
}

generateTests();