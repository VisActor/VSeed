# 快速启动

## 环境准备

[Node Install](https://nodejs.org/zh-cn/download)
```bash title="node"
nvm install 20
nvm use 20
```

[Pnpm Install](https://pnpm.io/zh/installation#%E4%BD%BF%E7%94%A8-corepack)
```bash title="pnpm"
corepack enable pnpm
```



## 启动项目

启动站点, 可同时开发调试vseed
```bash title="开发"
pnpm install

pnpm dev
```

构建
```bash title="构建"
pnpm build 
```

使用 `rsdoctor` 分析产物
```bash title="分析"
pnpm build:rsdoctor 
# or
pnpm dev:rsdoctor
```
