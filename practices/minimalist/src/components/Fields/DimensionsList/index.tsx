import { Flex } from 'antd';

export const DimensionsList = ({ style }: { style?: React.CSSProperties }) => {
  // 模拟字段数据
  const demoDimensions = [
    'order_date',
    'delivery_date',
    'customer_name',
    'city',
    'province',
    'product_name',
    'product_type',
    'area',
    'country',
  ];

  // 1. 开始拖拽时的处理
  const handleDragStart = (e: React.DragEvent, field: string) => {
    e.dataTransfer.setData('field', field);
    e.dataTransfer.setData('type', 'dimension'); // 标记类型为维度
    e.dataTransfer.effectAllowed = 'copy';

    // 设置拖拽时的幽灵图像（可选，浏览器默认会有）
    // const img = new Image();
    // img.src = '...';
    // e.dataTransfer.setDragImage(img, 0, 0);
  };

  return (
    <Flex vertical gap={6} style={{ ...style }}>
      {demoDimensions.map((field) => (
        <div
          key={field}
          draggable // 开启拖拽
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
            e.currentTarget.style.borderColor = '#165dff';
            e.currentTarget.style.background = '#e8f3ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e5e6eb';
            e.currentTarget.style.background = '#f7f8fa';
          }}
        >
          {/* T 图标 */}
          <span
            style={{
              width: 16,
              height: 16,
              background: '#165dff',
              color: '#fff',
              fontSize: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              marginRight: 8,
            }}
          >
            T
          </span>
          {field}
        </div>
      ))}
    </Flex>
  );
};
