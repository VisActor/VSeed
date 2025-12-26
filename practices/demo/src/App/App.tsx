import { VBI } from '@visactor/vbi';
import { VQuery } from '@visactor/vquery';

import { VSeed } from '@visactor/vseed';
import { useEffect, useState } from 'react';
import { VSeedRender } from 'src/VSeedRender';

export const APP = () => {
  const [vseed, setVSeed] = useState<VSeed>();

  const [vbiBuilder, setVBIBuilder] = useState<VBI | null>(null);

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
            await vquery.createDataset(connectorId, schema, datasetSource);
          }
          const dataset = await vquery.connectDataset(connectorId);
          const queryResult = await dataset.query(queryDSL);

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

    vbiBuilder.on('update', async () => {
      const newVSeed = await vbiBuilder.buildVSeed();
      console.log('debug newVSeed', newVSeed);
      setVSeed(() => newVSeed);
    });
  }, [vbiBuilder]);

  if (!vbiBuilder) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MeasuresList builder={vbiBuilder} />
      <div
        style={{ width: '960px', height: '600px', border: '1px solid #eee' }}
      >
        {vseed && <VSeedRender vseed={vseed} />}
      </div>
    </div>
  );
};

const MeasuresList = ({ builder }: { builder: VBI }) => {
  const [schema, setSchema] = useState([]);

  useEffect(() => {
    const run = async () => {
      const schema = await builder.getSchema();
      setSchema(schema);
    };
    run();
  }, []);

  const addMeasure = (measureName: string) => () => {
    builder.doc.transact(() => {
      builder.measures.addMeasure(measureName, (node) => {
        node.setAlias(measureName);
        node.setAggregate({
          func: 'sum',
        });
      });
    });
  };

  return (
    <div>
      {schema
        .filter((d) => d.type === 'number')
        .map((item) => {
          return (
            <div>
              <button onClick={addMeasure(item.name)}>{item.name}</button>
            </div>
          );
        })}
    </div>
  );
};
