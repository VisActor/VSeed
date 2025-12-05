import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll } from '@visactor/vseed'
import vseed from './suffixAndPrefix.json'

test('suffixAndPrefix', () => {
  try {
    registerAll()
    const builder = Builder.from(vseed as VSeed)
    const advanced = builder.buildAdvanced()
    if (!advanced) {
      throw new Error('Failed to build advanced configuration')
    }
    const spec = builder.buildSpec(advanced)

    const colorIdMap = builder.getColorIdMap()
    const colorItems = builder.getColorItems()
    const advancedPipeline = Builder.getAdvancedPipeline(builder.vseed.chartType)
    const specPipeline = Builder.getSpecPipeline(builder.vseed.chartType)
    const theme = Builder.getTheme(builder.vseed.theme)
    const themeMap = Builder.getThemeMap()

    expect(advanced).toMatchSnapshot()
    expect(spec).toMatchSnapshot()
    expect({ colorIdMap, colorItems, advancedPipeline, specPipeline, theme, themeMap }).toMatchSnapshot()
  } catch (e) {
    expect({expectError: true}).toMatchSnapshot()
    expect(e).toBeInstanceOf(Error)
  }
});
