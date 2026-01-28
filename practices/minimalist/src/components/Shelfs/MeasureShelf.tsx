import { ObserveCallback, VBIMeasure } from '@visactor/vbi';
import { Flex, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import { useVBIStore } from 'src/model';

export const MeasureShelf = ({ style }: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder);
  const [isOver, setIsOver] = useState(false);

  const [measures, setMeasures] = useState<VBIMeasure[]>(
    builder.measures.getMeasures(),
  );

  useEffect(() => {
    const updateMeasures: ObserveCallback = () => {
      setMeasures(builder.measures.getMeasures());
    };
    builder.measures.observe(updateMeasures);
    return () => {
      builder.measures.unobserve(updateMeasures);
    };
  }, [builder]);

  const deleteMeasure = (field: VBIMeasure['field']) => {
    builder.measures.removeMeasure(field);
  };

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
      if (type === 'measure') {
        const exists = builder.measures
          .getMeasures()
          .find((m) => m.field === field);
        if (!exists) {
          try {
            builder.measures.addMeasure(field);
          } catch (error) {
            console.error('Add measure failed:', error);
          }
        }
      } else {
        message.warning('无法将维度放入指标栏');
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
        borderBottom: isOver ? '2px solid #00b42a' : '1px solid #e5e6eb',
        background: isOver ? '#f0fff5' : 'transparent',
        minHeight: 32,
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        borderRadius: 4,
      }}
    >
      <Flex gap={4} wrap="wrap">
        {measures.length === 0 && !isOver && (
          <span style={{ color: '#c9cdd4', fontSize: 12 }}>拖拽指标至此</span>
        )}
        {measures.map((measure) => (
          <Tag
            closable
            onClose={() => deleteMeasure(measure.field)}
            key={measure.field}
            color="green"
            style={{ marginInlineEnd: 4, borderRadius: 12 }}
          >
            {measure.field}
          </Tag>
        ))}
      </Flex>
    </div>
  );
};
