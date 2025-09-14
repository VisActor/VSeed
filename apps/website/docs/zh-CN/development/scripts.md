# 脚本

根目录的 `package.json` 中定义的脚本如下:

```json title="package.json"
{
  "scripts": {
    "dev": "pnpm -r --color --parallel dev",
    "dev:rsdoctor": "pnpm --filter=@visactor/vseed run dev:rsdoctor",
    "build": "pnpm -r build",
    "build:vseed": "pnpm --filter=@visactor/vseed run build",
    "build:rsdoctor": "pnpm --filter=@visactor/vseed run build:rsdoctor",
    "build:docs": "node ./scripts/build-docs.js",
    "build:test": "node ./scripts/build-tests.mjs",
    "build:canvasTest": "node ./scripts/build-tests-with-canvas.mjs",
    "test": "pnpm --filter=@visactor/vseed test",
    "rstest": "pnpm --filter=@visactor/vseed rstest",
    "test:coverage": "pnpm --filter=@visactor/vseed test:coverage && node scripts/build-coverage-badge.mjs",
    "publish:vseed": "pnpm run build:vseed && pnpm publish --filter=@visactor/vseed --access=public"
  },
}
```

## 本地开发

### dev

用于本地开发与调试

同时启动 `@visactor/vseed` 项目和 `apps/website` 项目, 并监听文件变化, 

```bash
pnpm dev
```

### test

执行单元测试

```bash
pnpm test
```

### test:coverage

执行单元测试并生成覆盖率报告

```bash
pnpm test:coverage
```

## 构建

### build

逐个构建 `@visactor/vseed` 项目和 `apps/website` 项目

```bash
pnpm build
```

### build:vseed

构建 `@visactor/vseed` 项目

```bash
pnpm build:vseed
```

### build:docs

根据`vseed`类型自动构建`配置项`文档, 文档会自动生成到 `apps/website/docs/[locale]/option` 目录下

```bash
pnpm build:docs
```

### build:test

构建 `@visactor/vseed` 项目的测试代码, 测试代码会自动生成到 `packages/vseed/test` 目录下, 每个用例包含`spec` 和 `advancedVseed` 的快照

```bash
pnpm build:test
```

### build:canvasTest

`build:test`的基础上, 每个用例会创建图表实例, 因此可以获得更高的测试覆盖率.

```bash
pnpm build:canvasTest
```

## 构建分析

主要用于分析 `@visactor/vseed` 项目的构建过程

### dev:rsdoctor

调试时用于诊断和分析 `@visactor/vseed` 项目的构建过程, 了解包体积、依赖关系等

```bash
pnpm dev:rsdoctor
```

### build:rsdoctor

构建时用于诊断和分析 `@visactor/vseed` 项目的构建过程, 了解包体积、依赖关系等, 会自动打开esm,cjs,umd三种产物的分析页面

```bash
pnpm build:rsdoctor
```

## 发布

### publish:vseed

发布 `@visactor/vseed` 项目到 npm  registry, 发布前会先构建项目

```bash
pnpm publish:vseed
```
