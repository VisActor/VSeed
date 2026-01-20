import { VBIConnectorId } from 'src/types/connector/connector'
import { VBIDSL } from 'src/types'
import { VBIBuilder } from './vbi-builder'
import { connectorMap, getConnector, registerConnector } from './connector'

import * as Y from 'yjs'

const createVBI = () => {
  return {
    connectorMap: connectorMap,
    registerConnector: registerConnector,
    getConnector: getConnector,
    generateEmptyDSL: (connectorId: VBIConnectorId): VBIDSL => {
      return {
        connectorId: connectorId,
        chartType: 'table',
        measures: [],
        dimensions: [],
        theme: 'light',
        locale: 'zh-CN',
        version: 0,
      }
    },
    from: (vbi: VBIDSL) => {
      const doc = new Y.Doc()
      const dsl = doc.getMap('dsl')

      doc.transact(() => {
        if (vbi.connectorId) dsl.set('connectorId', vbi.connectorId)
        if (vbi.chartType) dsl.set('chartType', vbi.chartType)
        if (vbi.theme) dsl.set('theme', vbi.theme)
        if (vbi.locale) dsl.set('locale', vbi.locale)
        if (vbi.version) dsl.set('version', vbi.version)

        if (!dsl.get('measures')) {
          dsl.set('measures', new Y.Array<any>())
        } else {
          dsl.set('measures', vbi.measures)
        }

        if (!dsl.get('dimensions')) {
          dsl.set('dimensions', new Y.Array<any>())
        } else {
          dsl.set('dimensions', vbi.dimensions)
        }
      })

      return new VBIBuilder(doc)
    },
  }
}

export const VBI = createVBI()
