import { useState, useEffect } from 'react';
import { VBI, VBIBuilder } from '@visactor/vbi';
import {
  DatasetColumn,
  RawDatasetSource,
  VQuery,
  VQueryDSL,
} from '@visactor/vquery';
import { VSeed } from '@visactor/vseed';

export const useVBI = () => {
  const [vseed, setVSeed] = useState<VSeed>();
  const [vbiBuilder, setVBIBuilder] = useState<VBIBuilder | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const vquery = new VQuery();
    const connectorId = 'demo';

    VBI.registerConnector(connectorId, async () => {
      return {
        discoverSchema: async () => {
          return [
            { name: 'id', type: 'string' },
            { name: 'order_id', type: 'string' },
            { name: 'order_date', type: 'date' },
            { name: 'delivery_date', type: 'date' },
            { name: 'delivery_method', type: 'string' },
            { name: 'customer_id', type: 'string' },
            { name: 'customer_name', type: 'string' },
            { name: 'customer_type', type: 'string' },
            { name: 'city', type: 'string' },
            { name: 'province', type: 'string' },
            { name: 'country_or_region', type: 'string' },
            { name: 'area', type: 'string' },
            { name: 'product_id', type: 'string' },
            { name: 'product_type', type: 'string' },
            { name: 'product_sub_type', type: 'string' },
            { name: 'product_name', type: 'string' },

            { name: 'sales', type: 'number' },
            { name: 'amount', type: 'number' },
            { name: 'discount', type: 'number' },
            { name: 'profit', type: 'number' },
          ];
        },
        query: async ({ queryDSL, schema }) => {
          if (!(await vquery.hasDataset(connectorId))) {
            const url =
              'https://visactor.github.io/VSeed/dataset/supermarket.csv';
            const datasetSource = { type: 'csv', rawDataset: url };
            await vquery.createDataset(
              connectorId,
              schema as DatasetColumn[],
              datasetSource as RawDatasetSource,
            );
          }
          const dataset = await vquery.connectDataset(connectorId);
          const queryResult = await dataset.query(
            queryDSL as VQueryDSL<Record<string, string | number>>,
          );

          return {
            dataset: queryResult.dataset,
          };
        },
      };
    });

    const builder = VBI.from(VBI.generateEmptyDSL(connectorId));
    setVBIBuilder(builder);
  }, []);

  useEffect(() => {
    if (!vbiBuilder) {
      return;
    }

    vbiBuilder.doc.on('update', async () => {
      setLoading(true);
      try {
        const newVSeed = await vbiBuilder.buildVSeed();
        console.log('debug newVSeed', newVSeed);
        setVSeed(() => newVSeed);
      } finally {
        setLoading(false);
      }
    });
  }, [vbiBuilder]);

  return { vseed, vbiBuilder, loading };
};
