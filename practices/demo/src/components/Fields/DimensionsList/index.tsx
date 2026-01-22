import { List } from 'antd';
import { memo, useEffect, useState } from 'react';
import { CalendarOutlined, FontSizeOutlined } from '@ant-design/icons';
import { useVBIStore } from 'src/model';

export const DimensionsList = memo(
  ({ style }: { style?: React.CSSProperties }) => {
    const builder = useVBIStore((state) => state.builder);
    console.log('debug DimensionsList rerender');

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
      <List
        size="small"
        dataSource={dimensions}
        split={false}
        style={{ ...style }}
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
                color: '#e0e0e0',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  'rgba(255, 255, 255, 0.1)')
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
    );
  },
);
