import { ObserveCallback, VBIDimension } from '@visactor/vbi';
import { Flex, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import { useVBIStore } from 'src/model';

export const DimensionShelf = ({ style }: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder);
  const [isOver, setIsOver] = useState(false);

  const deleteDimension = (field: VBIDimension['field']) => {
    builder.dimensions.removeDimension(field);
  };

  const [dimensions, setDimensions] = useState<VBIDimension[]>(
    builder.dimensions.getDimensions(),
  );

  useEffect(() => {
    const updateDimensions: ObserveCallback = () => {
      setDimensions(builder.dimensions.getDimensions());
    };
    builder.dimensions.observe(updateDimensions);
    return () => {
      builder.dimensions.unobserve(updateDimensions);
    };
  }, [builder]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);

    const field = e.dataTransfer.getData('field');
    const type = e.dataTransfer.getData('type');

    if (field) {
      if (type === 'dimension') {
        const exists = builder.dimensions
          .getDimensions()
          .find((d) => d.field === field);
        if (!exists) {
          try {
            builder.dimensions.addDimension(field);
          } catch (error) {
            console.error('Add dimension failed:', error);
          }
        }
      } else {
        message.warning('无法将指标放入维度栏');
      }
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        ...style,
        borderBottom: isOver ? '2px solid #165dff' : '1px solid #e5e6eb',
        background: isOver ? '#f0f5ff' : 'transparent',
        minHeight: 32,
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        borderRadius: 4,
      }}
    >
      <Flex gap={4} wrap="wrap">
        {dimensions.length === 0 && !isOver && (
          <span style={{ color: '#c9cdd4', fontSize: 12 }}>拖拽维度至此</span>
        )}
        {dimensions.map((dimension) => (
          <Tag
            closable
            onClose={() => deleteDimension(dimension.field)}
            key={dimension.field}
            color="blue"
            style={{ marginInlineEnd: 4, borderRadius: 12 }}
          >
            {dimension.field}
          </Tag>
        ))}
      </Flex>
    </div>
  );
};
