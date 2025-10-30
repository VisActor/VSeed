# 测试

## 测试的意义


:::info 一、提前发现不符合预期的变化
如果我们的改动会导致pipeline输出结果变化, **通过快照可以轻松的捕捉到每一行代码对最终结果的影响, 可以轻松提前发现`不符合预期`的变化**
:::


:::info 二、大型重构的基石
反之, 如果确定代码不会改变pipeline的输出结果, 例如一个大型重构, **就可以安心的进行大刀阔斧的调整代码逻辑, 每一个测试用例都是大型重构的基石**
:::

:::tip
鼓励用多个小的commit, 代替一个大的commit, 否则快照变化会庞大到无法review
:::

## 测试用例

在目录`packages/vseed/tests`内包含所有的测试用例
- 每个用例是一个`json`文件, 包含一个完整的 `vseed` 配置
- 每个`json`文件的文件名即为测试用例的名称
- 每个 `*.test.ts` 文件均为自动生成, 请勿手动维护
- 修改任何`json`文件, 请重新执行 `pnpm run build:canvasTest`

:::tip
仅维护 `json`配置, 极大的提升测试用例的可维护性, 并降低测试用例的编写成本
:::

## build:test

根据每一个`vseed`, 生成测试用例, 每个用例包含`spec` 和 `advancedVseed` 的快照

```bash title="source: scripts/build-tests.mjs"
pnpm run build:canvasTest
```

## build:canvasTest

根据每一个vseed dsl, 生成测试用例, 每个用例包含`spec` 和 `advancedVseed` 的快照, 并创建图表实例, 获得更高的测试覆盖率

> spec 内存在一些回调函数, 创建图表实例, 才能触发回调函数

```bash title="source: scripts/build-tests-with-canvas.mjs"
pnpm run build:canvasTest
```

## 测试覆盖率

运行测试并生成覆盖率报告后, 会自动生成覆盖率徽章到README.md文件, 并打开覆盖率报告页面

```bash
pnpm test:coverage
```

- **HTML 报告**: `packages/vseed/coverage/index.html`
- **JSON 数据**: `packages/vseed/coverage/coverage-summary.json`
- **徽章**: README.md 文件顶部的覆盖率徽章

:::tip
徽章使用 shields.io 动态生成，格式为：

```bash title="source: scripts/build-coverage-badge.mjs"
https://img.shields.io/badge/Coverage-{percentage}%-{color}.svg
```
:::