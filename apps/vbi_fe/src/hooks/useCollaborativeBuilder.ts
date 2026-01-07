import { useState, useEffect } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { VBI, VBIBuilder } from '@visactor/vbi';

const getRandomColor = () => {
  const colors = [
    '#f56a00',
    '#7265e6',
    '#ffbf00',
    '#00a2ae',
    '#1890ff',
    '#52c41a',
    '#f5222d',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const useCollaborativeBuilder = (roomName: string, userName: string) => {
  const [builder, setBuilder] = useState<VBIBuilder | null>(null);
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);

  useEffect(() => {
    const doc = new Y.Doc();
    const provider = new WebsocketProvider(
      'ws://localhost:3030',
      'collaboration/ws',
      doc,
      { params: { room: roomName } },
    );

    // Set user awareness
    provider.awareness.setLocalStateField('user', {
      id: userName,
      name: userName,
      color: getRandomColor(),
      updatedAt: Date.now(),
    });

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
        setProvider(provider);
      }
    });

    return () => {
      provider.destroy();
      doc.destroy();
    };
  }, [roomName, userName]);

  return { builder, provider };
};
