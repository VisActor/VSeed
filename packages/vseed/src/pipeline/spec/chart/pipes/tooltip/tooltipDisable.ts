import type { SpecPipe } from 'src/types'

export const tooltipDisable: SpecPipe = (spec) => {
  const result = { ...spec }

  result.tooltip = {
    visible: false,
  }
  return result
}
