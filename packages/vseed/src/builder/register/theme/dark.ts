import { darkTheme } from '../../../theme'
import { registerCustomTheme } from './custom'

export const registerDarkTheme = () => {
  registerCustomTheme('dark', darkTheme())
}
