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

    builder.doc.on('update', async () => {
      setLoading(true);
      try {
        const newVSeed = await builder.buildVSeed();
        setVSeed(() => newVSeed);
      } finally {
        setLoading(false);
      }
    });
  }, [builder]);

  return { vseed, builder, loading };
};
