import { DeleteOutlined } from '@ant-design/icons';
import { ObserveCallback, VBIBuilder, VBIDimension } from '@visactor/vbi';
import { Button, Flex, Space } from 'antd';
import { useEffect, useState } from 'react';

export const DimensionShelf = ({
  builder,
  style,
}: {
  builder: VBIBuilder;
  style?: React.CSSProperties;
}) => {
  const deleteDimension = (field: VBIDimension['field']) => {
    builder.dimensions.removeDimension(field);
  };

  const [dimensions, setDimensions] = useState<VBIDimension[]>(
    builder.dimensions.getDimensions(),
  );

  useEffect(() => {
    const updateDimensions: ObserveCallback = (event, transaction) => {
      console.info('[observe] dimensions', event, transaction);
      setDimensions(builder.dimensions.getDimensions());
    };

    builder.dimensions.observe(updateDimensions);
    return () => {
      builder.dimensions.unobserve(updateDimensions);
    };
  }, [builder]);

  return (
    <Flex vertical={false} gap={5} style={{ flexBasis: 300, ...style }}>
      {dimensions.map((dimension) => (
        <Space.Compact key={`dimension-shelf-${dimension.field}`}>
          <Button style={{ color: 'blue' }}>{dimension.field}</Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteDimension(dimension.field)}
          />
        </Space.Compact>
      ))}
    </Flex>
  );
};
