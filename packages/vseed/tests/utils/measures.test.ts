import { describe, it, expect } from 'vitest'
import {
	findMeasureById,
	findFirstMeasure,
	findAllMeasures,
	measureDepth,
	deleteMeasureTreeByCallback,
	isMeasure,
	isMeasureGroup,
	isMeasures,
} from 'src/pipeline/utils/measures'
import type { Measure, MeasureTree } from 'src/types'

describe('measures utils', () => {
	it('findMeasureById / findFirstMeasure / findAllMeasures / measureDepth', () => {
		const measures = [
			{ id: 'm1' },
			{ id: 'g1', children: [{ id: 'm2' }, { id: 'm3' }] },
			{ id: 'm4' },
		] as MeasureTree

		const found = findMeasureById(measures, 'm3')
		expect(found).toBeDefined()
		expect(found?.id).toBe('m3')

		const first = findFirstMeasure(measures)
		expect(first).toBeDefined()
		expect(first?.id).toBe('m1')

		const all = findAllMeasures(measures).map((m) => m.id)
		expect(all).toEqual(['m1', 'm2', 'm3', 'm4'])

		// Depth: root -> group children => depth 2
		expect(measureDepth(measures)).toBe(2)
	})

	it('deleteMeasureTreeByCallback removes matching measure', () => {
		const measures = [
			{ id: 'm1' },
			{ id: 'g1', children: [{ id: 'm2' }, { id: 'm3' }] },
			{ id: 'm4' },
		] as MeasureTree

		deleteMeasureTreeByCallback(measures, (measure) => measure.id === 'm2')

		expect(findMeasureById(measures, 'm2')).toBeUndefined()
		expect(findAllMeasures(measures).map((m) => m.id)).toEqual(['m1', 'm3', 'm4'])
	})

	it('type guards work as expected', () => {
		const m = { id: 'mm' } as Measure
		const g = { id: 'gg', children: [m] }

		expect(isMeasure(m)).toBe(true)
		expect(isMeasureGroup(g)).toBe(true)
		expect(isMeasures([m as any, { id: 'm2' } as any])).toBe(true)
		expect(isMeasures([m as any, g as any])).toBe(false)
	})

	it('edge cases: empty / undefined inputs', () => {
		expect(findMeasureById([], 'x')).toBeUndefined()
		expect(findFirstMeasure([])).toBeUndefined()
		expect(findAllMeasures([])).toEqual([])

		// measureDepth([]) returns 1 (function treats empty array as depth 1)
		expect(measureDepth([])).toBe(1)
		// undefined parameter uses default and returns depth 1
		expect(measureDepth(undefined)).toBe(1)

		expect(deleteMeasureTreeByCallback(undefined as any)).toBeUndefined()
	})
})
