import { useState, useEffect } from 'react';
import { VBIBuilder } from '@visactor/vbi';
import { VSeed } from '@visactor/vseed';
import { defaultBuilder } from 'src/utils/demoConnector';

export const useVBI = (builder: VBIBuilder = defaultBuilder) => {
  const [vseed, setVSeed] = useState<VSeed>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!builder) {
      return;
    }
    const updateHandler = async () => {
      console.log('debug update doc', builder.doc.getMap('dsl').toJSON());

      setLoading(true);
      try {
        const newVSeed = await builder.buildVSeed();
        setVSeed(() => newVSeed);
      } finally {
        setLoading(false);
      }
    };
    builder.doc.on('update', updateHandler);

    return () => {
      builder.doc.off('update', updateHandler);
    };
  }, [builder]);

  useEffect(() => {
    const initialize = async () => {
      if (!builder) {
        return;
      }
      setLoading(true);
      try {
        const newVSeed = await builder.buildVSeed();
        setVSeed(() => newVSeed);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, [builder]);

  return { vseed, builder, loading };
};
