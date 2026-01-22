import { Flex, Spin, Card } from 'antd';
import { useState } from 'react';
import { VSeedRender } from 'src/components/Render';
import { MeasuresList } from 'src/components/Fields/MeasuresList';
import { DimensionsList } from 'src/components/Fields/DimensionsList';
import { VBIBuilder } from '@visactor/vbi';
import { ChartTypeSelector } from 'src/components/ChartType';
import './App.css';

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

  const [leftWidth, setLeftWidth] = useState(180);
  const middleWidth = 200;
  const [isResizing, setIsResizing] = useState(false);
  const [height, setHeight] = useState(600);
  const [isDraggingHeight, setIsDraggingHeight] = useState(false);
  const [builderCollapsed, setBuilderCollapsed] = useState(false);

  useEffect(() => {
    return initialize(props.builder);
  }, []);

  useEffect(() => {
    if (!isResizing) return;

    const onMove = (e: MouseEvent) => {
      setLeftWidth((prev) => {
        const next = prev + e.movementX;
        return Math.max(120, Math.min(400, next));
      });
    };

    const onUp = () => {
      setIsResizing(false);
      document.body.style.userSelect = '';
    };

    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [isResizing]);

  useEffect(() => {
    if (!isDraggingHeight) return;

    const onMove = (e: MouseEvent) => {
      setHeight((prev) => Math.max(300, Math.min(900, prev + e.movementY)));
    };

    const onUp = () => {
      setIsDraggingHeight(false);
      document.body.style.userSelect = '';
    };

    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [isDraggingHeight]);

  if (!initialized) {
    return <Spin tip="Initializing..." fullscreen />;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#08091f',
      }}
    >
      <Flex
        vertical={false}
        onClick={() => {
          console.group(`selected vbi`);
          console.log('state', useVBIStore.getState());
          console.groupEnd();
        }}
        style={{
          overflow: 'hidden',
          backgroundColor: '#1A1A23',
          border: '1px solid #9A7E87',
          borderRadius: '8px',
          height: height,
        }}
      >
        {/* Builder Panel */}
        {!builderCollapsed && (
          <>
            {/* 左列 */}
            <Flex
              vertical={true}
              gap={20}
              style={{
                width: leftWidth,
                minWidth: 120,
                padding: '12px 0 12px 0',
              }}
            >
              <Card
                bordered={false}
                title={<span style={{ color: '#e0e0e0' }}>Data</span>}
                style={{ flex: 1, minHeight: 0 }}
                classNames={{
                  body: 'left-scroll-body',
                }}
                styles={{
                  root: {
                    backgroundColor: '#1A1A23',
                  },
                  body: {
                    padding: '0 8px 10px 8px',
                    height: 'calc(100% - 48px)',
                    overflowY: 'auto',
                    minHeight: 0,
                    backgroundColor: '#1A1A23',
                    color: '#e0e0e0',
                  },
                  header: {
                    minHeight: '48px',
                    backgroundColor: '#1A1A23',
                  },
                }}
              >
                <Flex vertical={true} gap={6}>
                  <div
                    style={{
                      marginBottom: 4,
                      marginLeft: 8,
                      fontWeight: 500,
                      fontSize: 11,
                      color: '#999',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Measures
                  </div>
                  <MeasuresList style={{ height: 'auto' }} />
                  <div
                    style={{
                      marginTop: 8,
                      marginBottom: 4,
                      marginLeft: 8,
                      fontWeight: 500,
                      fontSize: 11,
                      color: '#999',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Dimensions
                  </div>
                  <DimensionsList style={{ height: 'auto' }} />
                </Flex>
              </Card>
            </Flex>

            {/* 左中拖拽分割线 */}
            <VerticalDragger onMouseDown={() => setIsResizing(true)} />

            {/* 中列（固定） */}
            <Flex
              vertical={true}
              gap={20}
              style={{
                width: middleWidth,
                minWidth: middleWidth,
                padding: '20px',
                position: 'relative',
              }}
            >
              <button
                onClick={() => setBuilderCollapsed(true)}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: 'transparent',
                  border: 'none',
                  color: '#aaa',
                  cursor: 'pointer',
                  fontSize: 14,
                }}
                title="Collapse panel"
              >
                ⟨
              </button>
              <ChartTypeSelector style={{ flexBasis: 32, minHeight: 0 }} />
              <Card
                bordered={false}
                styles={{
                  root: {
                    backgroundColor: '#1A1A23',
                  },
                  body: {
                    padding: '12px',
                    backgroundColor: '#1A1A23',
                  },
                  header: {
                    backgroundColor: '#1A1A23',
                  },
                }}
              >
                <Flex vertical={true} gap={8}>
                  <Flex vertical={true} gap={4}>
                    <div style={{ fontWeight: 500, color: '#e0e0e0' }}>
                      Dimensions
                    </div>
                    <DimensionShelf style={{ flex: 1, minHeight: 0 }} />
                  </Flex>
                  <Flex vertical={true} gap={4}>
                    <div style={{ fontWeight: 500, color: '#e0e0e0' }}>
                      Measures
                    </div>
                    <MeasureShelf style={{ flex: 1, minHeight: 0 }} />
                  </Flex>
                </Flex>
              </Card>
            </Flex>
          </>
        )}

        {/* 中右分割线 */}
        <div
          style={{
            width: 1,
            backgroundColor: 'rgba(255,255,255,0.12)',
          }}
        />

        {/* 右列（自适应） */}
        <Flex
          vertical={true}
          gap={20}
          style={{ flex: 1, minWidth: 0, padding: '20px' }}
        >
          <ChartWrapper
            builderCollapsed={builderCollapsed}
            onExpandBuilder={() => setBuilderCollapsed(false)}
          />
        </Flex>
      </Flex>

      {/* 高度拖拽条 */}
      <div
        onMouseDown={() => setIsDraggingHeight(true)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 20,
          cursor: 'ns-resize',
          userSelect: 'none',
          backgroundColor: '#08091f',
        }}
      >
        <div
          style={{
            width: 50,
            height: 4,
            backgroundColor: '#333',
            borderRadius: 2,
            transition: isDraggingHeight ? 'none' : 'background-color 200ms',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.backgroundColor = '#666';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.backgroundColor = '#333';
          }}
          title="Drag to resize height"
        />
      </div>
    </div>
  );
};

const VerticalDragger = ({ onMouseDown }: { onMouseDown: () => void }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        width: 6,
        cursor: 'col-resize',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          width: 1,
          backgroundColor: isHover
            ? 'rgba(255,255,255,0.25)'
            : 'rgba(255,255,255,0.12)',
          transition: 'background-color 200ms',
        }}
      />
    </div>
  );
};

const ChartWrapper = ({
  builderCollapsed,
  onExpandBuilder,
}: {
  builderCollapsed: boolean;
  onExpandBuilder: () => void;
}) => {
  const vseed = useVBIStore((state) => state.vseed);
  const loading = useVBIStore((state) => state.loading);
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {builderCollapsed && (
        <button
          onClick={onExpandBuilder}
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 10,
            background: 'transparent',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
            fontSize: 14,
          }}
          title="Expand panel"
        >
          ⟩
        </button>
      )}
      <Card
        bordered={false}
        loading={loading}
        styles={{
          root: {
            height: '100%',
            backgroundColor: '#1A1A23',
          },
          body: {
            padding: '12px',
            height: '100%',
            backgroundColor: '#1A1A23',
          },
          header: {
            backgroundColor: '#1A1A23',
          },
        }}
      >
        {vseed && <VSeedRender vseed={vseed} />}
      </Card>
    </div>
  );
};
