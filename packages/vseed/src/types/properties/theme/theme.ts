import { z } from 'zod'

export const zTheme = z.string()

type Light = 'light' & { readonly brand: unique symbol }
type Dark = 'dark' & { readonly brand: unique symbol }

/**
 * 主题
 * @default light
 * @description 内置 light、dark 两种主题, 新的主题可以通过registerTheme自定义主题.
 */
export type Theme = Light | Dark | string
