import { Splitter } from 'antd';
import './App.css';
import { APP } from 'demo';
import { useEffect, useEffectEvent, useState } from 'react';
import { VBI, type VBIBuilder } from '@visactor/vbi';
import {
  VQuery,
  type DatasetColumn,
  type RawDatasetSource,
  type VQueryDSL,
} from '@visactor/vquery';

const App = () => {
  return (
    <Splitter
      style={{ height: '100vh', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
    >
      <Splitter.Panel defaultSize="50%" min="30%" max="70%">
        <UserA />
      </Splitter.Panel>
      <Splitter.Panel defaultSize="50%">
        <UserB />
      </Splitter.Panel>
    </Splitter>
  );
};

const UserA = () => {
  const [builder, setBuilder] = useState<VBIBuilder | null>(null);

  const update = useEffectEvent((value: VBIBuilder) => {
    setBuilder(value);
  });

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
    update(builder);
  }, []);
  if (!builder) {
    return null;
  }
  return <APP builder={builder} />;
};

const UserB = () => {
  const [builder, setBuilder] = useState<VBIBuilder | null>(null);

  const update = useEffectEvent((value: VBIBuilder) => {
    setBuilder(value);
  });

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
    update(builder);
  }, []);
  if (!builder) {
    return null;
  }
  return <APP builder={builder} />;
};

export default App;
