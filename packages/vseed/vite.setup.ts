import { beforeAll, vi } from 'vitest'
import 'vitest-canvas-mock'

beforeAll(() => {
  const createGradientMock = () => {
    return {
      addColorStop: vi.fn(),
    }
  }
  CanvasRenderingContext2D.prototype.createLinearGradient = createGradientMock
  CanvasRenderingContext2D.prototype.createRadialGradient = createGradientMock

  // Mock ResizeObserver for Node.js environment
  if (typeof ResizeObserver === 'undefined') {
    window.ResizeObserver = class ResizeObserver {
      callback: any
      constructor(callback) {
        this.callback = callback
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  }
})