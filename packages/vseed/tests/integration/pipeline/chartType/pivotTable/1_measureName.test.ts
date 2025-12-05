import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll } from '@visactor/vseed'
import vseed from './1_measureName.json'

test('1_measureName', () => {
   registerAll()
  const builder = Builder.from(vseed as VSeed)
  const advanced = builder.buildAdvanced()
  
  expect(advanced).toBeDefined()
  expect(advanced).not.toBeNull()
  
  const spec = builder.buildSpec(advanced!)
  
  expect(spec).toBeDefined()
  expect(spec).not.toBeNull()
  
  // Verify builder methods return valid results
  expect(builder.getColorIdMap()).toBeDefined()
  expect(builder.getColorItems()).toBeDefined()
  expect(Builder.getAdvancedPipeline(builder.vseed.chartType)).toBeDefined()
  expect(Builder.getSpecPipeline(builder.vseed.chartType)).toBeDefined()
  expect(Builder.getTheme(builder.vseed.theme)).toBeDefined()
  expect(Builder.getThemeMap()).toBeDefined()
});
