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
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#f5f7fa',
      }}
    >
      {/* 左侧面板：Chart Source（数据集与字段列表） */}
      <Card
        title={
          <div style={{ fontSize: '14px', fontWeight: 600 }}>
            <span style={{ marginRight: '8px' }}>📊</span>
            Chart Source
          </div>
        }
        size="small"
        style={{
          width: 280,
          height: '100%',
          borderRadius: 0,
          borderRight: '1px solid #e8e8e8',
          boxShadow: '2px 0 8px rgba(0,0,0,0.04)',
        }}
        bodyStyle={{
          padding: '12px',
          paddingTop: '8px',
          overflow: 'auto',
        }}
      >
        {/* Dataset 信息 */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 12,
              color: '#8c8c8c',
              marginBottom: 4,
              fontWeight: 500,
            }}
          >
            DATASET
          </div>
          <div
            style={{
              background: '#f0f5ff',
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            public.wb_health_population
          </div>
        </div>

        {/* Columns（维度字段） */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 12,
              color: '#8c8c8c',
              marginBottom: 8,
              fontWeight: 500,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>COLUMNS</span>
            <span style={{ color: '#1890ff', cursor: 'pointer' }}>+ Add</span>
          </div>
          <DimensionsList style={{ height: 220 }} />
        </div>

        {/* Metrics（度量字段） */}
        <div>
          <div
            style={{
              fontSize: 12,
              color: '#8c8c8c',
              marginBottom: 8,
              fontWeight: 500,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>METRICS</span>
            <span style={{ color: '#1890ff', cursor: 'pointer' }}>+ Add</span>
          </div>
          <MeasuresList style={{ height: 220 }} />
        </div>
      </Card>

      {/* 中间面板：DATA（核心配置区） - 压缩到280px */}
      <div
        style={{
          width: 280,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Card
          size="small"
          style={{
            flex: 1,
            margin: '16px 0',
            marginLeft: '8px',
            marginRight: '8px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
          bodyStyle={{
            flex: 1,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 简化版标签页 - 只显示DATA */}
          <div
            style={{
              padding: '0 16px',
              marginBottom: 0,
              backgroundColor: '#fafafa',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
            }}
          >
            <div
              style={{
                padding: '12px 4px',
                fontWeight: 600,
                color: '#1890ff',
                borderBottom: '2px solid #1890ff',
                fontSize: '14px',
              }}
            >
              DATA
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: '16px',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {/* 图表类型选择器 */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#595959',
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                CHART TYPE
              </div>
              <div
                style={{
                  background: '#fafafa',
                  padding: '12px',
                  borderRadius: 6,
                  border: '1px solid #d9d9d9',
                }}
              >
                <ChartTypeSelector />
              </div>
            </div>

            {/* DIMENSION 配置 */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#595959',
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                DIMENSION
              </div>
              <div
                style={{
                  background: '#fafafa',
                  padding: '12px',
                  borderRadius: 6,
                  border: '1px solid #d9d9d9',
                  minHeight: '60px',
                }}
              >
                <DimensionShelf style={{ minHeight: 40 }} />
              </div>
            </div>

            {/* MEASURES 配置 */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#595959',
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                MEASURES
              </div>
              <div
                style={{
                  background: '#fafafa',
                  padding: '12px',
                  borderRadius: 6,
                  border: '1px solid #d9d9d9',
                  minHeight: '60px',
                }}
              >
                <MeasureShelf style={{ minHeight: 40 }} />
              </div>
            </div>

            {/* X AXIS 配置 */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#595959',
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                X AXIS
              </div>
              <div
                style={{
                  background: '#fafafa',
                  padding: '12px',
                  borderRadius: 6,
                  border: '1px dashed #d9d9d9',
                  color: '#8c8c8c',
                  fontSize: '12px',
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Drag a measure here
              </div>
            </div>

            {/* Y AXIS 配置 */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#595959',
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                Y AXIS
              </div>
              <div
                style={{
                  background: '#fafafa',
                  padding: '12px',
                  borderRadius: 6,
                  border: '1px dashed #d9d9d9',
                  color: '#8c8c8c',
                  fontSize: '12px',
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Drag a measure here
              </div>
            </div>

            {/* 筛选器区域 */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: '#595959',
                  marginBottom: 8,
                  fontWeight: 500,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>FILTERS</span>
                <span style={{ color: '#1890ff', cursor: 'pointer' }}>
                  + Add filter
                </span>
              </div>
              <div
                style={{
                  background: '#fafafa',
                  padding: '12px',
                  borderRadius: 6,
                  border: '1px dashed #d9d9d9',
                  color: '#8c8c8c',
                  fontSize: '12px',
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                No filters applied
              </div>
            </div>

            {/* 更新按钮 */}
            <div
              style={{
                marginTop: 'auto',
                paddingTop: 16,
                borderTop: '1px solid #f0f0f0',
              }}
            >
              <button
                onClick={() => {
                  console.log('Update chart');
                }}
                style={{
                  background: 'linear-gradient(90deg, #1890ff, #096dd9)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 28px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  boxShadow: '0 2px 8px rgba(24,144,255,0.3)',
                  transition: 'all 0.3s',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow =
                    '0 4px 12px rgba(24,144,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow =
                    '0 2px 8px rgba(24,144,255,0.3)';
                }}
              >
                UPDATE CHART
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* 右侧面板：图表预览与数据 - 自适应宽度 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minWidth: 0,
        }}
      >
        {/* 图表预览 */}
        <Card
          title={
            <div style={{ fontSize: '14px', fontWeight: 600 }}>
              <span style={{ marginRight: '8px' }}>📈</span>
              Chart Preview
            </div>
          }
          size="small"
          style={{
            flex: 2,
            margin: '16px 0',
            marginLeft: '8px',
            marginRight: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
          bodyStyle={{
            flex: 1,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ChartWrapper />
        </Card>

        {/* 数据表格预览 */}
        <Card
          title={
            <div style={{ fontSize: '14px', fontWeight: 600 }}>
              <span style={{ marginRight: '8px' }}>📋</span>
              RESULTS
            </div>
          }
          size="small"
          style={{
            flex: 1,
            margin: '0 16px 16px 8px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
          bodyStyle={{
            flex: 1,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 简化版数据表格 */}
          <div
            style={{
              padding: '12px',
              overflow: 'auto',
              fontSize: '13px',
              flex: 1,
            }}
          >
            {/* 表格头部 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                background: '#fafafa',
                padding: '8px 12px',
                borderBottom: '1px solid #f0f0f0',
                fontWeight: 600,
                fontSize: '12px',
                color: '#595959',
                position: 'sticky',
                top: 0,
              }}
            >
              <div>待接入</div>
              <div>待接入</div>
              <div>待接入</div>
            </div>

            {/* 表格数据 */}
            {[].map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  padding: '8px 12px',
                  borderBottom: '1px solid #f0f0f0',
                  backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
                }}
              ></div>
            ))}
          </div>
        </Card>
      </div>
    </Flex>
  );
};

const ChartWrapper = () => {
  const vseed = useVBIStore((state) => state.vseed);
  const loading = useVBIStore((state) => state.loading);
  return (
    <div
      style={{
        flex: 1,
        position: 'relative',
        padding: '16px',
        backgroundColor: loading ? '#fafafa' : 'white',
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
            background: 'rgba(255,255,255,0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <Spin size="large" />
          <div style={{ marginTop: 16, color: '#595959', fontWeight: 500 }}>
            Rendering chart...
          </div>
        </div>
      )}
      {vseed ? (
        <div style={{ height: '100%' }}>
          <VSeedRender vseed={vseed} />
        </div>
      ) : (
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8c8c8c',
            border: '2px dashed #d9d9d9',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
          <div
            style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}
          >
            Chart Preview
          </div>
          <div
            style={{ fontSize: '13px', textAlign: 'center', maxWidth: '300px' }}
          >
            Configure dimensions and measures, then click UPDATE CHART to render
            visualization
          </div>
        </div>
      )}
    </div>
  );
};
