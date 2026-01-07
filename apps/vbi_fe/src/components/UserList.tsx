import { List, Typography, Avatar, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { WebsocketProvider } from 'y-websocket';

export interface User {
  id: string;
  name: string;
  color: string;
  updatedAt: number;
}

export const UserList = ({ provider }: { provider: WebsocketProvider }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const awareness = provider.awareness;

    const updateUsers = () => {
      const states = awareness.getStates();
      const uniqueUsers = new Map<string, User>();

      states.forEach((state) => {
        const user = (state as { user: User }).user;
        console.log('debug user', user);
        if (!user || !user.id) return;

        const existing = uniqueUsers.get(user.id);
        // Keep the user state with the latest timestamp
        if (!existing || user.updatedAt > existing.updatedAt) {
          uniqueUsers.set(user.id, user);
        }
      });

      setUsers(Array.from(uniqueUsers.values()));
    };

    updateUsers();

    awareness.on('change', updateUsers);

    return () => {
      awareness.off('change', updateUsers);
    };
  }, [provider]);

  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #f0f0f0' }}>
      <Typography.Title level={5}>
        Online Users ({users.length})
      </Typography.Title>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <Tag color={user.color}>
              <Avatar
                style={{ backgroundColor: user.color, marginRight: 8 }}
                size="small"
              >
                {user.name[0]}
              </Avatar>
              {user.name}
            </Tag>
          </List.Item>
        )}
      />
    </div>
  );
};
