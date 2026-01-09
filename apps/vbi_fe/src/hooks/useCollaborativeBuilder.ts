import { useState, useEffect } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { VBIBuilder } from '@visactor/vbi';

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
      `ws://${window.location.host}`,
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

    doc.on('update', () => {
      console.log('debug load success', doc.getMap('dsl').toJSON());
    });
    provider.on('synced', (isSynced: boolean) => {
      if (isSynced) {
        setBuilder(() => new VBIBuilder(provider.doc));
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
