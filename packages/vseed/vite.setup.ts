import { beforeAll, vi } from 'vitest'
import 'vi-canvas-mock'

beforeAll(async () => {
  await import('@visactor/vchart')
  await import('@visactor/vtable')
})

beforeAll(() => {
  // 2. 优化 Canvas mock
  vi.spyOn(CanvasRenderingContext2D.prototype, 'createLinearGradient').mockImplementation(() => ({
    addColorStop: vi.fn(),
  }))

  vi.spyOn(CanvasRenderingContext2D.prototype, 'createRadialGradient').mockImplementation(() => ({
    addColorStop: vi.fn(),
  }))

  // 3. 优化 ResizeObserver
  if (!window.ResizeObserver) {
    window.ResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
  }
})
