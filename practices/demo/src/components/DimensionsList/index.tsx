import { VBIBuilder } from '@visactor/vbi';
import { List, Card } from 'antd';
import { useEffect, useState } from 'react';
import { CalendarOutlined, FontSizeOutlined } from '@ant-design/icons';

export const DimensionsList = ({
  builder,
  style,
}: {
  builder: VBIBuilder;
  style?: React.CSSProperties;
}) => {
  console.log('debug render DimensionsList');
  const [schema, setSchema] = useState<
    {
      name: string;
      type: string;
    }[]
  >([]);

  useEffect(() => {
    const run = async () => {
      const schema = await builder.getSchema();
      setSchema(schema);
    };
    run();
  }, [builder]);

  const addDimension = (dimensionName: string) => () => {
    builder.doc.transact(() => {
      builder.dimensions.addDimension(dimensionName, (node) => {
        node.setAlias(dimensionName);
      });
    });
  };

  const dimensions = schema.filter((d) => d.type !== 'number');

  const getIcon = (type: string) => {
    if (type === 'date') {
      return <CalendarOutlined style={{ color: '#1890ff' }} />;
    }
    return <FontSizeOutlined style={{ color: '#1890ff' }} />;
  };

  return (
    <Card
      title="Dimensions"
      style={{ ...style }}
      styles={{
        body: {
          padding: '0 0 10px 0',
          flex: 1,
          overflowY: 'auto',
          minHeight: 0,
        },
        header: {
          minHeight: '48px',
        },
      }}
    >
      <List
        size="small"
        dataSource={dimensions}
        split={false}
        renderItem={(item) => (
          <List.Item style={{ padding: 0, marginBottom: 2 }}>
            <div
              onClick={addDimension(item.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '4px 12px',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'transparent')
              }
            >
              <span
                style={{
                  marginRight: 8,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {getIcon(item.type)}
              </span>
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '13px',
                }}
              >
                {item.name}
              </span>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};
