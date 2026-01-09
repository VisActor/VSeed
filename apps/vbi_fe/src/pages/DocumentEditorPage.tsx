import { memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Layout, Spin, Typography, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { APP } from 'demo';
import { useCollaborativeBuilder } from '../hooks/useCollaborativeBuilder';
import { Collaborators } from '../components/Collaborators';

const { Header, Content } = Layout;
const { Text } = Typography;

export const DocumentEditorPage: React.FC = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userName =
    new URLSearchParams(window.location.search).get('userName') || 'unknown';

  // We use the ID from the route as the roomName
  const { builder, provider } = useCollaborativeBuilder(id || '', userName);

  if (!id) {
    return <div>Invalid Document ID</div>;
  }

  if (!builder || !provider) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#fff',
          padding: '0 20px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
            Back
          </Button>
          <Text strong>Document: {id}</Text>
        </Space>

        <Collaborators provider={provider} />
      </Header>
      <Content style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <APP builder={builder} />
      </Content>
    </Layout>
  );
});
