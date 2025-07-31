import type { SpecPipeline } from 'src/types'
import { initColumn } from '../pipes/init'

export const columnSpecPipeline: SpecPipeline = [initColumn]
