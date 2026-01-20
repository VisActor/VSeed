import { Flex, Spin, Card } from 'antd';
import { VSeedRender } from 'src/components/Render';
import { MeasuresList } from 'src/components/Fields/MeasuresList';
import { DimensionsList } from 'src/components/Fields/DimensionsList';
import { VBIBuilder } from '@visactor/vbi';
import { ChartTypeSelector } from 'src/components/ChartType';

import { MeasureShelf } from 'src/components/Shelfs/MeasureShelf';
import { DimensionShelf } from 'src/components/Shelfs/DimensionShelf';
import { useVBIStore } from 'src/model';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

interface APPProps {
  builder?: VBIBuilder;
}

export const APP = (props: APPProps) => {
  console.log('debug APP rerender');
  const { initialize, initialized } = useVBIStore(
    useShallow((state) => ({
      initialize: state.initialize,
      initialized: state.initialized,
    })),
  );

  useEffect(() => {
    return initialize(props.builder);
  }, []);

  if (!initialized) {
    return <Spin tip="Initializing..." fullscreen />;
  }

  return (
    <Flex
      vertical={false}
      onClick={() => {
        console.group(`selected vbi`);
        console.log('state', useVBIStore.getState());
        console.groupEnd();
      }}
      style={{
        padding: '20px',
        gap: '20px',
      }}
    >
      <Flex vertical={true} gap={20} style={{ flexBasis: 300 }}>
        <ChartTypeSelector style={{ flexBasis: 32, minHeight: 0 }} />
        <DimensionsList style={{ flex: 1, minHeight: 0 }} />
        <MeasuresList style={{ flex: 1, minHeight: 0 }} />
      </Flex>
      <Flex vertical={true} gap={20} style={{ flexGrow: 1 }}>
        <Card
          styles={{
            body: {
              padding: '12px',
            },
          }}
        >
          <Flex vertical={true} gap={8}>
            <Flex align="center">
              <div style={{ width: 100, fontWeight: 500 }}>Dimensions</div>
              <DimensionShelf style={{ flex: 1, minHeight: 0 }} />
            </Flex>
            <Flex align="center">
              <div style={{ width: 100, fontWeight: 500 }}>Measures</div>
              <MeasureShelf style={{ flex: 1, minHeight: 0 }} />
            </Flex>
          </Flex>
        </Card>
        <ChartWrapper />
      </Flex>
    </Flex>
  );
};

const ChartWrapper = () => {
  const vseed = useVBIStore((state) => state.vseed);
  const loading = useVBIStore((state) => state.loading);
  return (
    <Card
      loading={loading}
      styles={{
        root: {
          height: '100%',
        },
        body: {
          padding: '12px',
          height: '100%',
        },
      }}
    >
      {vseed && <VSeedRender vseed={vseed} />}
    </Card>
  );
};
