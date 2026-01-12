import { Flex, Spin, Card } from 'antd';
import { VSeedRender } from 'src/components/VSeedRender';
import { MeasuresList } from 'src/components/MeasuresList';
import { DimensionsList } from 'src/components/DimensionsList';
import { useVBI } from 'src/hooks/useVBI';
import { VBIBuilder } from '@visactor/vbi';
import { ChartTypeSelector } from 'src/components/ChartType';

import './App.css';
import { MeasureShelf } from 'src/components/Shelf/MeasureShelf';
import { DimensionShelf } from 'src/components/Shelf/DimensionShelf';

interface APPProps {
  builder?: VBIBuilder;
}
export const APP = (props: APPProps) => {
  const { vseed, builder, loading } = useVBI(props.builder);
  if (!builder) {
    return <Spin tip="Initializing..." fullscreen />;
  }

  return (
    <Flex
      vertical={false}
      onClick={() => {
        console.group(`selected vbi`);
        console.log('builder', builder);
        console.log('dsl', builder.build());
        console.groupEnd();
      }}
      style={{
        padding: '20px',
        gap: '20px',
      }}
    >
      <Flex vertical={true} gap={20} style={{ flexBasis: 300 }}>
        <ChartTypeSelector
          builder={builder}
          style={{ flexBasis: 32, minHeight: 0 }}
        />
        <DimensionsList builder={builder} style={{ flex: 1, minHeight: 0 }} />
        <MeasuresList builder={builder} style={{ flex: 1, minHeight: 0 }} />
      </Flex>
      <Flex vertical={true} gap={20} style={{ flexGrow: 1 }}>
        <Card>
          <Flex vertical={true} gap={8}>
            <Flex align="center">
              <div style={{ width: 100, fontWeight: 500 }}>Dimensions</div>
              <DimensionShelf
                builder={builder}
                style={{ flex: 1, minHeight: 0 }}
              />
            </Flex>
            <Flex align="center">
              <div style={{ width: 100, fontWeight: 500 }}>Measures</div>
              <MeasureShelf
                builder={builder}
                style={{ flex: 1, minHeight: 0 }}
              />
            </Flex>
          </Flex>
        </Card>
        <Card
          loading={loading}
          styles={{
            root: {
              height: '100%',
            },
            body: {
              height: '100%',
            },
          }}
        >
          {vseed && <VSeedRender vseed={vseed} />}
        </Card>
      </Flex>
    </Flex>
  );
};
