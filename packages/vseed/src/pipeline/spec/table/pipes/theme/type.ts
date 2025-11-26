export type ThemeLike = {
  bodyStyle?: unknown
  headerStyle?: unknown
  rowHeaderStyle?: unknown
  cornerHeaderStyle?: unknown
  frameStyle?: unknown
  selectionStyle?: unknown
  scrollStyle?: unknown
  [key: string]: unknown
}

export type WithTheme = { theme?: ThemeLike }
