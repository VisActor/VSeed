import { DeleteOutlined } from '@ant-design/icons';
import { ObserveCallback, VBIMeasure } from '@visactor/vbi';
import { Button, Flex, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useVBIStore } from 'src/model';

export const MeasureShelf = ({ style }: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder);
  const [measures, setMeasures] = useState<VBIMeasure[]>(
    builder.measures.getMeasures(),
  );

  useEffect(() => {
    const updateMeasures: ObserveCallback = (event, transaction) => {
      console.info('[observe] measures', event, transaction);
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

  return (
    <Flex vertical={true} gap={5} style={{ ...style }}>
      {measures.map((measure) => (
        <Space.Compact key={`measure-shelf-${measure.field}`}>
          <Button
            style={{
              color: '#4ade80',
              backgroundColor: '#1a1a23',
              borderColor: '#333',
            }}
          >
            {measure.field}
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteMeasure(measure.field)}
            style={{
              backgroundColor: '#1a1a23',
              borderColor: '#333',
              color: '#e0e0e0',
            }}
          />
        </Space.Compact>
      ))}
    </Flex>
  );
};
