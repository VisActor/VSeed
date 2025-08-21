import { registerCustomTheme } from './custom'
import { lightTheme } from '../../../theme'

export const registerLightTheme = () => {
  registerCustomTheme('light', lightTheme())
}
