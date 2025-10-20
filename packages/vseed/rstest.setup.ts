import 'rstest-canvas-mock'
import { beforeAll, rs } from '@rstest/core'

beforeAll(() => {
  const createGradientMock = () => {
    return {
      addColorStop: rs.fn(),
    }
  }
  CanvasRenderingContext2D.prototype.createLinearGradient = createGradientMock
  CanvasRenderingContext2D.prototype.createRadialGradient = createGradientMock

  // Mock ResizeObserver for Node.js environment
  if (typeof ResizeObserver === 'undefined') {
    window.ResizeObserver = class ResizeObserver {
      callback: any
      constructor(callback: any) {
        this.callback = callback
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  }
})
