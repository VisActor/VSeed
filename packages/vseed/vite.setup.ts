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
})
