import { VBIBuilder, VBIDSL } from '@visactor/vbi';
import { VSeed } from '@visactor/vseed';
import { defaultBuilder } from 'src/utils/demoConnector';
import { create } from 'zustand';

type DestroyCallback = () => void;

interface BearState {
  loading: boolean;
  vseed: VSeed | null;
  builder: VBIBuilder;
  initialized: boolean;

  dsl: VBIDSL;

  initialize: (builder?: VBIBuilder) => DestroyCallback;
  bindEvent: () => DestroyCallback;

  setDsl: (dsl: VBIDSL) => void;
  setLoading: (loading: boolean) => void;
  setVSeed: (vseed: VSeed | null) => void;
}

export const useVBIStore = create<BearState>((set, get) => ({
  loading: false,
  vseed: null,
  initialized: false,
  builder: defaultBuilder,
  dsl: defaultBuilder.dsl.toJSON() as VBIDSL,

  setLoading: (loading: boolean) => set({ loading }),
  setVSeed: (vseed: VSeed | null) => set({ vseed }),
  setDsl: (dsl: VBIDSL) => set({ dsl }),

  // 初始化
  initialize: (builder?: VBIBuilder) => {
    if (builder) {
      set({ builder });
    }
    set({ initialized: true });

    const callback = get().bindEvent();

    return () => {
      callback();
      set({ loading: false, vseed: null, initialized: false });
    };
  },

  bindEvent: () => {
    const { builder, setLoading, setVSeed, setDsl } = get();
    const updateAll = async () => {
      setLoading(true);
      try {
        const newVSeed = await builder.buildVSeed();
        setVSeed(newVSeed);
        setDsl(builder.dsl.toJSON() as VBIDSL);
      } finally {
        setLoading(false);
      }
    };

    builder.doc.on('update', updateAll);
    return () => {
      builder.doc.off('update', updateAll);
    };
  },
}));
