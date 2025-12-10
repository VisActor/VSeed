const setWholeIcon = (shapeContainer: any, color: string) => {
  shapeContainer.style.backgroundColor = color
  shapeContainer.style.borderColor = color
  shapeContainer.style.width = '4px'
  shapeContainer.style.height = '100%'
  shapeContainer.style.display = 'inline-block'
  shapeContainer.style.borderRadius = '2px'
  shapeContainer.style.marginRight = '6px'

  const shapeElements = shapeContainer.children

  for (let i = 0; i < shapeElements.length; i++) {
    const shapeElement = shapeElements[i]
    const svgElement = shapeElement.children[0]

    if (svgElement) {
      svgElement.style.visibility = 'hidden'
    }

    shapeElement.style.background = 'transparent'
    shapeElement.style.borderColor = 'transparent'
  }
}

export const updateTooltipElement = (tooltipElement: any, actualTooltip: any) => {
  if (!tooltipElement || !tooltipElement.querySelector || !actualTooltip) {
    return
  }

  const shapeContainer = tooltipElement.querySelector('.vchart-tooltip-shape-column')

  if (!shapeContainer) {
    return
  }

  if (actualTooltip.activeType === 'mark') {
    const color = (actualTooltip.content[0].shapeFill as string) ?? 'transparent'

    setWholeIcon(shapeContainer, color)
  } else if (actualTooltip.activeType === 'dimension') {
    shapeContainer.style.background = 'transparent'
    shapeContainer.style.borderColor = 'transparent'
    shapeContainer.style.width = 'auto'
    shapeContainer.style.height = 'auto'
    shapeContainer.style.display = 'inline-block'
    shapeContainer.style.marginRight = '2px'

    const shapeElements = shapeContainer.children

    for (let i = 0; i < shapeElements.length; i++) {
      const shapeElement = shapeElements[i]
      const svgElement = shapeElement.children[0]
      if (svgElement) {
        svgElement.style.visibility = 'hidden'
      }
      const color = actualTooltip.content[i]?.shapeFill ?? 'transparent'

      shapeElement.style.width = '4px'
      shapeElement.style.height = '100%'
      shapeElement.style.borderRadius = '2px'
      shapeElement.style.marginRight = '4px'
      shapeElement.style.backgroundColor = color
      shapeElement.style.borderColor = color
    }
  }

  const title = tooltipElement.querySelector('.vchart-tooltip-title')

  if (title) {
    title.style.marginBottom = '8px'
  }
}

export const updateMarkTooltipElement = (tooltipElement: any, actualTooltip: any) => {
  if (!tooltipElement || !tooltipElement.querySelector || !actualTooltip) {
    return
  }

  const shapeContainer = tooltipElement.querySelector('.vchart-tooltip-shape-column')

  if (!shapeContainer) {
    return
  }

  const color = (actualTooltip.content[0].shapeFill as string) ?? 'transparent'

  setWholeIcon(shapeContainer, color)
}
