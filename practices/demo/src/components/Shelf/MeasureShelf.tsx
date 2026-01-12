import { DeleteOutlined } from '@ant-design/icons';
import { VBIBuilder, VBIMeasure } from '@visactor/vbi';
import { Button, Flex, Space } from 'antd';

export const MeasureShelf = ({
  builder,
  style,
}: {
  builder: VBIBuilder;
  style?: React.CSSProperties;
}) => {
  const measures = builder.measures.getMeasures();
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
