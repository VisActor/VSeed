import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll } from '@visactor/vseed'
import vseed from './simpleBarParallel.json'

test('simpleBarParallel', () => {
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
