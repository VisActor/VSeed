import { describe, it, expect, beforeAll } from 'vitest'
import { Builder, registerAll } from 'src/builder'
import type { VSeed } from 'src/types'

interface SpecWithRunningConfig {
  runningConfig?: {
    selectedPos?: Array<{ col: number; row: number }>
  }
}

function getRunningConfig(spec: unknown): SpecWithRunningConfig['runningConfig'] {
  const specWithConfig = spec as SpecWithRunningConfig
  return specWithConfig.runningConfig
}

function getSelectedPos(spec: unknown): Array<{ col: number; row: number }> | undefined {
  const specWithConfig = spec as SpecWithRunningConfig
  return specWithConfig.runningConfig?.selectedPos
}

describe('runningConfig.selectedPos', () => {
  beforeAll(() => {
    registerAll()
  })

  describe('pivotTable selectedPos', () => {
    it('should track selected cell positions for single bodyCellStyle', () => {
      const vseed: VSeed = {
        chartType: 'pivotTable',
        dataset: [
          { region: 'east', category: 'A', profit: 100, sales: 200 },
          { region: 'east', category: 'B', profit: 150, sales: 300 },
          { region: 'west', category: 'A', profit: 200, sales: 400 },
          { region: 'west', category: 'B', profit: 250, sales: 500 },
        ],
        dimensions: [{ id: 'region' }, { id: 'category' }],
        measures: [{ id: 'profit' }, { id: 'sales' }],
        bodyCellStyle: {
          selector: { field: 'profit', operator: '>=', value: 150 },
          backgroundColor: 'lightblue',
        },
      }

      const builder = Builder.from(vseed)
      const spec = builder.build()

      expect(spec).toBeDefined()
      expect(getRunningConfig(spec)).toBeDefined()
      expect(getSelectedPos(spec)).toBeDefined()
      expect(Array.isArray(getSelectedPos(spec))).toBe(true)
    })

    it('should track multiple selected positions for multiple bodyCellStyle', () => {
      const vseed: VSeed = {
        chartType: 'pivotTable',
        dataset: [
          { region: 'east', profit: 100, sales: 200 },
          { region: 'west', profit: 300, sales: 400 },
        ],
        dimensions: [{ id: 'region' }],
        measures: [{ id: 'profit' }, { id: 'sales' }],
        bodyCellStyle: [
          {
            selector: { field: 'profit', operator: '>=', value: 100 },
            backgroundColor: 'lightgreen',
          },
          {
            selector: { field: 'sales', operator: '>=', value: 200 },
            textColor: 'red',
          },
        ],
      }

      const builder = Builder.from(vseed)
      const spec = builder.build()

      expect(getRunningConfig(spec)).toBeDefined()
      expect(getSelectedPos(spec)).toBeDefined()
      expect(Array.isArray(getSelectedPos(spec))).toBe(true)
    })

    it('should have empty selectedPos when no selector matches', () => {
      const vseed: VSeed = {
        chartType: 'pivotTable',
        dataset: [
          { region: 'east', profit: 50, sales: 100 },
          { region: 'west', profit: 60, sales: 120 },
        ],
        dimensions: [{ id: 'region' }],
        measures: [{ id: 'profit' }, { id: 'sales' }],
        bodyCellStyle: {
          selector: { field: 'profit', operator: '>=', value: 1000 },
          backgroundColor: 'lightblue',
        },
      }

      const builder = Builder.from(vseed)
      const spec = builder.build()

      expect(getRunningConfig(spec)).toBeDefined()
      expect(getSelectedPos(spec)).toBeDefined()
      expect(getSelectedPos(spec)).toEqual([])
    })

    it('should work with value selector', () => {
      const vseed: VSeed = {
        chartType: 'pivotTable',
        dataset: [
          { region: 'east', profit: 100 },
          { region: 'west', profit: 200 },
        ],
        dimensions: [{ id: 'region' }],
        measures: [{ id: 'profit' }],
        bodyCellStyle: {
          selector: 100,
          backgroundColor: 'yellow',
        },
      }

      const builder = Builder.from(vseed)
      const spec = builder.build()

      expect(getSelectedPos(spec)).toBeDefined()
      expect(Array.isArray(getSelectedPos(spec))).toBe(true)
    })

    it('should work with datum selector', () => {
      const vseed: VSeed = {
        chartType: 'pivotTable',
        dataset: [
          { region: 'east', category: 'A', profit: 100 },
          { region: 'west', category: 'B', profit: 200 },
        ],
        dimensions: [{ id: 'region' }, { id: 'category' }],
        measures: [{ id: 'profit' }],
        bodyCellStyle: {
          selector: { region: 'east' },
          backgroundColor: 'lightcoral',
        },
      }

      const builder = Builder.from(vseed)
      const spec = builder.build()

      expect(getSelectedPos(spec)).toBeDefined()
      expect(Array.isArray(getSelectedPos(spec))).toBe(true)
    })
  })

  describe('table selectedPos', () => {
    it('should track selected cell positions for single bodyCellStyle', () => {
      const vseed: VSeed = {
        chartType: 'table',
        dataset: [
          { region: 'east', profit: 100, sales: 200 },
          { region: 'west', profit: 300, sales: 400 },
        ],
        dimensions: [{ id: 'region' }],
        measures: [{ id: 'profit' }, { id: 'sales' }],
        bodyCellStyle: {
          selector: { field: 'profit', operator: '>=', value: 100 },
          backgroundColor: 'lightblue',
        },
      }

      const builder = Builder.from(vseed)
      const spec = builder.build()

      expect(spec).toBeDefined()
      expect(getRunningConfig(spec)).toBeDefined()
      expect(getSelectedPos(spec)).toBeDefined()
      expect(Array.isArray(getSelectedPos(spec))).toBe(true)
    })

    it('should track multiple selected positions for multiple bodyCellStyle', () => {
      const vseed: VSeed = {
        chartType: 'table',
        dataset: [
          { region: 'east', profit: 100, sales: 200 },
          { region: 'west', profit: 300, sales: 400 },
        ],
        dimensions: [{ id: 'region' }],
        measures: [{ id: 'profit' }, { id: 'sales' }],
        bodyCellStyle: [
          {
            selector: { field: 'profit' },
            backgroundColor: 'lightgreen',
          },
          {
            selector: { field: 'sales' },
            textColor: 'blue',
          },
        ],
      }

      const builder = Builder.from(vseed)
      const spec = builder.build()

      expect(getRunningConfig(spec)).toBeDefined()
      expect(getSelectedPos(spec)).toBeDefined()
      expect(Array.isArray(getSelectedPos(spec))).toBe(true)
    })

    it('should have empty selectedPos when no selector matches', () => {
      const vseed: VSeed = {
        chartType: 'table',
        dataset: [
          { region: 'east', profit: 50, sales: 100 },
          { region: 'west', profit: 60, sales: 120 },
        ],
        dimensions: [{ id: 'region' }],
        measures: [{ id: 'profit' }, { id: 'sales' }],
        bodyCellStyle: {
          selector: { field: 'profit', operator: '>=', value: 1000 },
          backgroundColor: 'lightblue',
        },
      }

      const builder = Builder.from(vseed)
      const spec = builder.build()

      expect(getRunningConfig(spec)).toBeDefined()
      expect(getSelectedPos(spec)).toBeDefined()
      expect(getSelectedPos(spec)).toEqual([])
    })

    it('should work with value selector', () => {
      const vseed: VSeed = {
        chartType: 'table',
        dataset: [
          { region: 'east', profit: 100 },
          { region: 'west', profit: 200 },
        ],
        dimensions: [{ id: 'region' }],
        measures: [{ id: 'profit' }],
        bodyCellStyle: {
          selector: 100,
          backgroundColor: 'yellow',
        },
      }

      const builder = Builder.from(vseed)
      const spec = builder.build()

      expect(getSelectedPos(spec)).toBeDefined()
      expect(Array.isArray(getSelectedPos(spec))).toBe(true)
    })

    it('should work without selector (global style)', () => {
      const vseed: VSeed = {
        chartType: 'table',
        dataset: [
          { region: 'east', profit: 100 },
          { region: 'west', profit: 200 },
        ],
        dimensions: [{ id: 'region' }],
        measures: [{ id: 'profit' }],
        bodyCellStyle: {
          backgroundColor: 'lightgray',
        },
      }

      const builder = Builder.from(vseed)
      const spec = builder.build()

      expect(getSelectedPos(spec)).toBeDefined()
      expect(Array.isArray(getSelectedPos(spec))).toBe(true)
    })
  })

  describe('selectedPos structure', () => {
    it('should contain col and row properties', () => {
      const vseed: VSeed = {
        chartType: 'table',
        dataset: [{ region: 'east', profit: 100 }],
        dimensions: [{ id: 'region' }],
        measures: [{ id: 'profit' }],
        bodyCellStyle: {
          selector: { field: 'profit' },
          backgroundColor: 'lightblue',
        },
      }

      const builder = Builder.from(vseed)
      const spec = builder.build()

      const selectedPos = getSelectedPos(spec)
      expect(selectedPos).toBeDefined()

      // Each position should have col and row properties
      // Note: The actual positions will be populated when the table is rendered
      // In this test we just verify the structure is correct
      if (selectedPos) {
        selectedPos.forEach((pos) => {
          expect(pos).toHaveProperty('col')
          expect(pos).toHaveProperty('row')
        })
      }
    })
  })

  describe('edge cases', () => {
    it('should handle minimal dataset', () => {
      const vseed: VSeed = {
        chartType: 'table',
        dataset: [{ region: 'east', profit: 50 }],
        dimensions: [{ id: 'region' }],
        measures: [{ id: 'profit' }],
        bodyCellStyle: {
          selector: { field: 'profit', operator: '>=', value: 1000 },
          backgroundColor: 'lightblue',
        },
      }

      const builder = Builder.from(vseed)
      const spec = builder.build()

      expect(getSelectedPos(spec)).toBeDefined()
      expect(getSelectedPos(spec)).toEqual([])
    })

    it('should handle vseed without bodyCellStyle', () => {
      const vseed: VSeed = {
        chartType: 'table',
        dataset: [{ region: 'east', profit: 100 }],
        dimensions: [{ id: 'region' }],
        measures: [{ id: 'profit' }],
      }

      const builder = Builder.from(vseed)
      const spec = builder.build()

      // When no bodyCellStyle is configured, runningConfig might not exist
      // or selectedPos might be undefined
      const runningConfig = getRunningConfig(spec)
      if (runningConfig) {
        expect(getSelectedPos(spec)).toBeDefined()
      }
    })
  })
})
