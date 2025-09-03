# 测试

## 使用方法

```bash
# 运行测试并生成覆盖率报告, 并生成徽章
pnpm test:coverage
```

## 查看报告

- **HTML 报告**: `packages/vseed/coverage/index.html`
- **JSON 数据**: `packages/vseed/coverage/coverage-summary.json`
- **徽章**: README.md 文件顶部的覆盖率徽章

## 徽章颜色规则

覆盖率徽章的颜色根据以下规则确定：

- 🟢 **Bright Green**: 90% 及以上
- 🟢 **Green**: 80-89%
- 🟡 **Yellow Green**: 70-79%
- 🟡 **Yellow**: 60-69%
- 🟠 **Orange**: 50-59%
- 🔴 **Red**: 低于 50%

## 覆盖率计算范围

仅统计`VSeed`包的覆盖率

## 徽章生成

徽章使用 shields.io 动态生成，格式为：
```
https://img.shields.io/badge/Coverage-{percentage}%-{color}.svg
```