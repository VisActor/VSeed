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
    "build:docs": "node ./apps/website/scripts/generateDocs.js",
    "test": "pnpm -r test",
    "publish:vseed": "pnpm run build:vseed && pnpm publish --filter=@visactor/vseed --access=public"
  }
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

## 构建分析

主要用于分析 `@visactor/vseed` 项目的构建过程

### dev:rsdoctor

调试时用于诊断和分析 `@visactor/vseed` 项目的构建过程, 了解包体积、依赖关系等

```bash
pnpm dev:rsdoctor
```

### build:rsdoctor

构建时用于诊断和分析 `@visactor/vseed` 项目的构建过程, 了解包体积、依赖关系等

```bash
pnpm build:rsdoctor
```

## 发布

### publish:vseed

发布 `@visactor/vseed` 项目到 npm  registry, 发布前会先构建项目

```bash
pnpm publish:vseed
```
