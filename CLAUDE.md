# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

VSeed 是一个数据可视化组合器库（VisActor 生态的一部分），以声明式方式搭建图表与可视化。核心由 Builder 流水线与插件系统组成，将用户输入逐步转换为 VChart 规范。

## 常用开发命令（Monorepo 根目录执行）

- 构建

```bash
pnpm run build:all                 # 构建所有包（排除 tools）
pnpm run build:vseed               # 构建 @visactor/vseed
pnpm run build:vquery              # 构建 @visactor/vquery
pnpm run build:vbi                 # 构建 @visactor/vbi
pnpm run build:rsdoctor            # 构建并开启 RSDOCTOR 分析
```

- 开发

```bash
pnpm run dev                       # 启动网站开发（apps/website）
pnpm --filter=@visactor/vseed run dev         # vseed 包 watch
pnpm run dev:rsdoctor             # vseed 包 RSDOCTOR 开发模式
```

- 网站（apps/website）

```bash
pnpm --filter=website run dev      # Rspress 开发服务器
pnpm --filter=website run build    # 站点构建
pnpm --filter=website run preview  # 构建后本地预览
```

- 代码质量

```bash
pnpm run lint                      # 全仓库并行 lint
pnpm run type-check                # 并行类型检查（含 LLM 测试生成）
pnpm run format                    # 使用 Prettier 格式化
```

## 测试（重点在 @visactor/vseed 包）

- 统一入口（根目录转发到 vseed 包）

```bash
pnpm run test                      # Vitest 单元测试
pnpm run rstest                    # Rstest 集成/场景测试
pnpm run test:update               # 更新 Vitest 快照
pnpm run rstest:update             # 更新 Rstest 快照
pnpm run test:coverage             # Vitest 覆盖率并生成徽章
pnpm run rstest:coverage           # Rstest 覆盖率
```

- 直接在 @visactor/vseed 包内运行（更细粒度）

```bash
pnpm --filter=@visactor/vseed run test:unit                    # 仅运行 tests/unit
pnpm --filter=@visactor/vseed run test:integration            # 仅运行 tests/integration
pnpm --filter=@visactor/vseed run test:unit:coverage          # 单元测试覆盖率
pnpm --filter=@visactor/vseed run test:integration:coverage   # 集成测试覆盖率
```

- 运行单个测试文件或指定用例（Vitest）

```bash
# 指定单个测试文件（相对包根目录路径）
pnpm --filter=@visactor/vseed vitest run tests/unit/foo.test.ts

# 仅运行名称匹配的用例（-t 支持用例名过滤）
pnpm --filter=@visactor/vseed vitest run -t "should build spec"

# 更新指定文件的快照
pnpm --filter=@visactor/vseed vitest run tests/integration/bar.test.ts --update
```

说明：Vitest 命令在包 scripts 中直接调用（packages/vseed/package.json:30-37），因此可在 filter 作用域下使用原生命令进行文件/用例级选择。Rstest 用于更偏渲染/交互场景的集成测试，覆盖率与快照更新已在脚本中提供。

- 覆盖率报告查看
  Vitest 与 Rstest 覆盖率脚本均会输出 coverage/index.html（部分脚本还自动 open 该页面）。

## 发布与辅助脚本

```bash
pnpm run publish:ci                # CI 发布（vseed+vquery），使用 changeset
pnpm run build:docs                # 生成文档资源
pnpm run build:test                # 生成测试资源
pnpm run build:canvasTest          # 生成含 Canvas Mock 的测试资源
pnpm run sync-bugserver-cases      # 同步外部缺陷用例
```

## 架构总览（大图景）

- Builder 模式：核心 Builder 提供链式 API 管理从高级配置到最终 VChart/VTable spec的转换。
- 流水线分层：
  - AdvancedPipeline：负责高层图表配置与数据转换。
  - SpecPipeline：将高级配置落地为低层 VChart/VTable spec。
- 插件系统：图表类型以插件形式注册，插件包含默认配置、数据处理与到 VChart/VTable 的转换规则。
- 数据流：
  Raw Data → DataReshape → DataSelector → AdvancedPipeline → SpecPipeline → VChart/VTable Spec

- 关键包与角色：
  - @visactor/vseed：核心 Builder、注册与流水线实现（rslib 构建，提供 ESM/CJS/UMD）。
  - @visactor/vquery：查询引擎，提供 Node/Browser 双入口导出（DuckDB WASM、Kysely 等）。
  - @visactor/vbi：业务组件与工具，私有包，依赖 vseed 与 vquery。
  - apps/website：Rspress 驱动的站点与 Playground。

- 测试策略：
  - 单元测试（Vitest）：tests/unit 与 tests/integration 两层粒度（vseed 包中有独立脚本）。
  - 集成/场景测试（Rstest）：结合 Canvas Mock（rstest-canvas-mock）验证渲染相关逻辑与规格输出。
  - 快照测试：用于校验生成的图表规格与渲染输出。

## 仓库与构建系统

- Bundler：Rslib（基于 Rspack），输出 ESM/CJS/UMD。
- Monorepo：Pnpm workspaces + Turbo（根脚本使用 turbo 并行/过滤构建）。
- 包管理器：pnpm（packageManager 已锁定版本）。
- 代码规范：TypeScript 严格模式，所有包采用 ES modules（"type": "module"）。
- 预提交：Husky + lint-staged（格式化与 lint）。

## 环境要求

- Node.js >= 24.12.0
- pnpm >= 10.26.1

## 目录与重要路径提示

- packages/vseed/src/
  - builder/：Builder 实现与图表注册
  - dataReshape/：数据转换工具
  - dataSelector/：数据选择与过滤
  - pipeline/：Advanced/Spec 流水线及工具
  - theme/：主题系统
  - i18n/：国际化
  - types/：类型定义
- apps/website：文档与 Playground（Rspress）

以上信息均来源于实际脚本与包配置（根 package.json:11-35；packages/vseed/package.json:19-37；packages/vquery/package.json:30-38；apps/website/package.json:5-10），未臆造命令或约定。
