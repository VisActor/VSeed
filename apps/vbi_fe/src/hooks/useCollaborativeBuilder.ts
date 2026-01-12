import { useState, useEffect, useEffectEvent } from 'react';
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { VBIBuilder } from '@visactor/vbi';
import { isValidDoc } from 'src/utils';

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
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const createBuilder = useEffectEvent((doc: Y.Doc) => {
    if (!isValidDoc(doc)) {
      return;
    }
    setBuilder(() => new VBIBuilder(doc));
  });

  const destroyBuilder = useEffectEvent(() => {
    setBuilder(null);
  });

  useEffect(() => {
    if (!roomName) {
      return;
    }

    const doc = new Y.Doc();

    const provider = new HocuspocusProvider({
      url: `ws://localhost:3000/collaboration`,
      name: roomName,
      document: doc,
    });

    // 感知协议
    provider.awareness?.setLocalStateField('user', {
      id: userName,
      name: userName,
      color: getRandomColor(),
      updatedAt: Date.now(),
    });

    // 同步状态
    provider.on('synced', ({ state }: { state: boolean }) => {
      console.log('Connection state:', state);
      setIsConnected(state);
      if (state) {
        createBuilder(doc);
        setProvider(provider);
      }
    });

    return () => {
      doc.destroy();
      destroyBuilder();
      if (provider) {
        provider.destroy();
      }
    };
  }, [roomName, userName]);

  return { builder, provider, isConnected };
};
