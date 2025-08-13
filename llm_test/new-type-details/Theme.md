`Theme` 是一个字符串，用于定义图表的主题。

```typescript
/**
 * 主题
 * @default light
 * @description 内置 light、dark 两种主题, 新的主题可以通过registerTheme自定义主题.
 */
export type Theme = 'light' | 'dark' | string;
```