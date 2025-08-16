---
title: 发布
---


# 发布

要生成新的 changesets，请在仓库的根目录中执行 pnpm changeset。 .changeset 目录中生成的 markdown 文件应被提交到存储库。
```bash
pnpm changeset
```

指定版本，并更新变更日志文件。
```bash
pnpm changeset version
```

更新依赖和lock file
```bash
pnpm install
```

提交更改, 并推送至远程仓库的main分支
```bash
git add .
git commit -m "chore: release message"
git push
```

合入至main分支后, 自动触发 changesets workflow, 进行打包与发布工作.