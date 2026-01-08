# AGENTS.md

本文档旨在为 AI Agent 及项目贡献者提供关键的开发与验证指引。

## 项目概览

VSeed 是一个数据可视化组合器库，属于 VisActor 生态系统。它采用 Monorepo 架构，包含核心库 (`packages/vseed`, `packages/vquery`) 以及应用 (`apps/website`, `apps/vbi_be`, `apps/vbi_fe`)。

## 关键指引

### 1. 包管理器 (Package Manager)

**必须使用 `pnpm`。**

本项目严格锁定使用 `pnpm` (版本 >= 10.26.1)。

- **禁止** 使用 `npm` 或 `yarn`。
- 安装依赖：`pnpm install`
- 运行脚本：`pnpm run <script-name>`

### 2. 验证阶段 (Verification Phase)

在提交代码或认为任务完成之前，**必须** 执行以下验证步骤，并确保全部通过。

#### 2.1 代码风格检查 (Lint)

确保代码符合项目的 ESLint 规则。

```bash
pnpm run lint
```

- 如果遇到错误，请尝试 `pnpm run format` 进行自动修复，或手动修正。
- **必须修复所有 Lint 错误。**

#### 2.2 类型检查 (Type Check)

确保 TypeScript 类型定义正确，无编译错误。

```bash
pnpm run type-check
```

- 此命令会并行检查所有包的类型。
- **必须修复所有类型错误。**

### 3. 其他常用命令

- **构建项目**: `pnpm run build` (主要针对 core 库)
- **运行测试**: `pnpm run test` (主要针对 core 库)
- **启动网站**: `pnpm run dev` (启动 website)

请参阅根目录下的 `CLAUDE.md` 获取更详细的开发命令与架构说明。

## VBI Docker 容器

### 3.1 启动与关闭 VBI Docker 容器

- **启动VBI Docker容器**: `pnpm run vbi:up`
- **构建VBI Docker容器**: `pnpm run vbi:up --build`
- **关闭VBI Docker容器**: `pnpm run vbi:down`
