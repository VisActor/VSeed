import { Splitter } from 'antd';
import './App.css';
import { APP } from 'demo';
import { memo, useEffect, useState } from 'react';
import { VBI, VBIBuilder } from '@visactor/vbi';
import {
  VQuery,
  type DatasetColumn,
  type RawDatasetSource,
  type VQueryDSL,
} from '@visactor/vquery';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const App = memo(() => {
  console.log('debug APP');
  return (
    <Splitter>
      <Splitter.Panel defaultSize="50%" min="30%" max="70%">
        <UserA />
      </Splitter.Panel>
      <Splitter.Panel defaultSize="50%">
        <UserB />
      </Splitter.Panel>
    </Splitter>
  );
});

const connectorId = 'demo';
const registerDemoConnector = () => {
  const vquery = new VQuery();
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
  return connectorId;
};

// Register once (or safely re-register)
registerDemoConnector();

const useCollaborativeBuilder = (roomName: string) => {
  const [builder, setBuilder] = useState<VBIBuilder | null>(null);

  useEffect(() => {
    const doc = new Y.Doc();
    const provider = new WebsocketProvider(
      'ws://localhost:3030',
      'yjs/ws',
      doc,
      { params: { room: roomName } },
    );
    const connectorId = 'demo';

    provider.on('sync', (isSynced: boolean) => {
      if (isSynced) {
        const dsl = doc.getMap('dsl');
        if (dsl.size === 0) {
          const empty = VBI.generateEmptyDSL(connectorId);
          doc.transact(() => {
            if (empty.connectorId) dsl.set('connectorId', empty.connectorId);
            if (empty.chartType) dsl.set('chartType', empty.chartType);
            if (empty.theme) dsl.set('theme', empty.theme);
            if (empty.locale) dsl.set('locale', empty.locale);
            if (empty.version) dsl.set('version', empty.version);

            if (!dsl.get('measures')) {
              dsl.set('measures', new Y.Array());
            }
            if (!dsl.get('dimensions')) {
              dsl.set('dimensions', new Y.Array());
            }
          });
        }
        setBuilder(new VBIBuilder(doc));
      }
    });

    return () => {
      provider.destroy();
      doc.destroy();
    };
  }, [roomName]);

  return builder;
};

const UserA = memo(() => {
  const builder = useCollaborativeBuilder('vbi-demo-room');
  if (!builder) {
    return <div>Loading User A...</div>;
  }
  return <APP builder={builder} />;
});

const UserB = memo(() => {
  const builder = useCollaborativeBuilder('vbi-demo-room');
  if (!builder) {
    return <div>Loading User B...</div>;
  }
  return <APP builder={builder} />;
});

export default App;
