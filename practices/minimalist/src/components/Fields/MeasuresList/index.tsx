import { Flex } from 'antd';

export const MeasuresList = ({ style }: { style?: React.CSSProperties }) => {
  const demoMeasures = ['sales', 'amount', 'discount', 'profit', 'quantity'];

  const handleDragStart = (e: React.DragEvent, field: string) => {
    e.dataTransfer.setData('field', field);
    e.dataTransfer.setData('type', 'measure'); // 标记类型为指标
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <Flex vertical gap={6} style={{ ...style }}>
      {demoMeasures.map((field) => (
        <div
          key={field}
          draggable
          onDragStart={(e) => handleDragStart(e, field)}
          style={{
            cursor: 'grab',
            padding: '4px 8px',
            background: '#f7f8fa',
            border: '1px solid #e5e6eb',
            borderRadius: 4,
            fontSize: 12,
            color: '#1d2129',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.2s',
            userSelect: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#00b42a';
            e.currentTarget.style.background = '#eafff1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e5e6eb';
            e.currentTarget.style.background = '#f7f8fa';
          }}
        >
          {/* # 图标 */}
          <span
            style={{
              width: 16,
              height: 16,
              background: '#00b42a',
              color: '#fff',
              fontSize: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              marginRight: 8,
            }}
          >
            #
          </span>
          {field}
        </div>
      ))}
    </Flex>
  );
};
