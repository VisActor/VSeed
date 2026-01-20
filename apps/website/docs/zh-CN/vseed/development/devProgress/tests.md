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

## 测试分类

VSeed 的测试分为两类：

### 单元测试（Unit Tests）

位于 `packages/vseed/tests/unit/` 目录下，针对独立函数、工具类、管道函数等进行单元级别的测试。

**特点：**
- 测试粒度细，专注单一功能
- 运行速度快
- 无需依赖完整的 VSeed 配置
- 易于定位问题

**运行命令：**
```bash
# 运行所有单元测试
pnpm test:unit

# 运行单元测试并生成覆盖率报告
pnpm test:unit:coverage
```

### 集成测试（Integration Tests）

位于 `packages/vseed/tests/integration` 目录下，基于完整的 VSeed 配置进行端到端测试。

**特点：**
- 测试完整的数据流转和图表生成
- 通过快照验证最终输出
- 覆盖真实使用场景

**运行命令：**
```bash
# 运行所有集成测试
pnpm test:integration

# 运行集成测试并更新快照
pnpm test:integration:update

# 运行集成测试并生成覆盖率报告
pnpm test:integration:coverage
```

## 集成测试用例

在目录`packages/vseed/tests/integration`内包含所有的集成测试用例
- 每个用例是一个`json`文件, 包含一个完整的 `vseed` 配置
- 每个`json`文件的文件名即为测试用例的名称
- 每个 `*.test.ts` 文件均为自动生成, 请勿手动维护
- 修改任何`json`文件, 请重新执行 `pnpm run build:canvasTest`

:::tip
仅维护 `json`配置, 极大的提升测试用例的可维护性, 并降低测试用例的编写成本
:::

## 单元测试用例

在目录 `packages/vseed/tests/unit/` 内包含所有的单元测试用例
- 每个测试文件手动编写，针对特定函数或模块
- 测试文件命名为 `*.test.ts`
- 使用 Vitest 测试框架
- 专注于测试独立功能，不依赖完整配置

**目录结构：**
```
tests/unit/
├── pipes/          # 管道函数测试
│   └── dual/
│       └── dualChartType.test.ts
└── utils/          # 工具函数测试
    ├── checkVSeed.test.ts
    ├── createFormatterByMeasure.test.ts
    ├── findFunctions.test.ts
    └── measures.test.ts
```

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
# 所有测试的覆盖率
pnpm test:coverage

# 仅单元测试的覆盖率
pnpm test:unit:coverage

# 仅集成测试的覆盖率
pnpm test:integration:coverage
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

## 测试命令总览

| 命令 | 说明 |
|------|------|
| `pnpm test` | 运行所有测试（单元测试 + 集成测试） |
| `pnpm test:unit` | 仅运行单元测试 |
| `pnpm test:unit:coverage` | 运行单元测试并生成覆盖率报告 |
| `pnpm test:integration` | 仅运行集成测试 |
| `pnpm test:integration:update` | 运行集成测试并更新快照 |
| `pnpm test:integration:coverage` | 运行集成测试并生成覆盖率报告 |
| `pnpm test:update` | 运行所有测试并更新快照 |
| `pnpm test:coverage` | 运行所有测试并生成覆盖率报告 |