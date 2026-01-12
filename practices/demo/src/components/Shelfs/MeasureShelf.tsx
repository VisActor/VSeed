import { DeleteOutlined } from '@ant-design/icons';
import { ObserveCallback, VBIBuilder, VBIMeasure } from '@visactor/vbi';
import { Button, Flex, Space } from 'antd';
import { useEffect, useState } from 'react';

export const MeasureShelf = ({
  builder,
  style,
}: {
  builder: VBIBuilder;
  style?: React.CSSProperties;
}) => {
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
    <Flex vertical={false} gap={5} style={{ flexBasis: 300, ...style }}>
      {measures.map((measure) => (
        <Space.Compact key={`measure-shelf-${measure.field}`}>
          <Button style={{ color: 'green' }}>{measure.field}</Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteMeasure(measure.field)}
          />
        </Space.Compact>
      ))}
    </Flex>
  );
};
