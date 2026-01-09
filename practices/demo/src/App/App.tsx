import { Spin } from 'antd';
import { VSeedRender } from 'src/components/VSeedRender';
import { MeasuresList } from 'src/components/MeasuresList';
import { DimensionsList } from 'src/components/DimensionsList';
import { useVBI } from 'src/hooks/useVBI';
import { VBIBuilder } from '@visactor/vbi';

interface APPProps {
  builder?: VBIBuilder;
}
export const APP = (props: APPProps) => {
  const { vseed, builder, loading } = useVBI(props.builder);
  if (!builder) {
    return <Spin tip="Initializing..." fullscreen />;
  }

  return (
    <div
      onClick={() => {
        console.group(`selected vbi`);
        console.log('builder', builder);
        console.log('dsl', builder.build());

        console.groupEnd();
      }}
      style={{
        display: 'flex',
        height: 'calc(100vh - 72px)',
        overflow: 'hidden',
        padding: '20px',
        gap: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '280px',
          minWidth: '280px',
          height: '100%',
          overflow: 'hidden',
          gap: '20px',
        }}
      >
        <DimensionsList builder={builder} style={{ flex: 1, minHeight: 0 }} />
        <MeasuresList builder={builder} style={{ flex: 1, minHeight: 0 }} />
      </div>
      <div
        style={{
          flex: 1,
          height: '100%',
          border: '1px solid #eee',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px',
        }}
      >
        {loading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.7)',
              zIndex: 10,
            }}
          >
            <Spin size="large" />
          </div>
        )}
        {vseed && <VSeedRender vseed={vseed} />}
      </div>
    </div>
  );
};
