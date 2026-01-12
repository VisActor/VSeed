import { DeleteOutlined } from '@ant-design/icons';
import { VBIBuilder, VBIDimension } from '@visactor/vbi';
import { Button, Flex, Space } from 'antd';

export const DimensionShelf = ({
  builder,
  style,
}: {
  builder: VBIBuilder;
  style?: React.CSSProperties;
}) => {
  const dimensions = builder.dimensions.getDimensions();
  const deleteDimension = (field: VBIDimension['field']) => {
    builder.dimensions.removeDimension(field);
  };
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
