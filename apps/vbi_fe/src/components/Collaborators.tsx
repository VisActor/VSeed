import { List, Typography, Avatar, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { WebsocketProvider } from 'y-websocket';
import { funnel } from 'remeda';

interface User {
  id: string;
  name: string;
  color: string;
  updatedAt: number;
  cursor?: {
    x: number;
    y: number;
  };
}

interface UserState extends User {
  clientId: number;
}

export const Collaborators = ({
  provider,
}: {
  provider: WebsocketProvider;
}) => {
  const [users, setUsers] = useState<UserState[]>([]);

  useEffect(() => {
    const awareness = provider.awareness;

    // --- Mouse Move Logic ---
    const mouseMoveFunnel = funnel<[MouseEvent], MouseEvent>(
      (e: MouseEvent) => {
        const { clientX, clientY } = e;
        // Normalize coordinates
        const x = clientX / window.innerWidth;
        const y = clientY / window.innerHeight;

        const localState = awareness.getLocalState() as { user?: User };
        // Only update if we have a user (which we should after init)
        if (localState?.user) {
          // Merge cursor into the user object
          awareness.setLocalStateField('user', {
            ...localState.user,
            cursor: { x, y },
            updatedAt: Date.now(), // Update timestamp to keep this client active/latest
          });
        }
      },
      {
        minGapMs: 50,
        triggerAt: 'both',
        reducer: (_prev, event: MouseEvent) => event,
      },
    );

    const handleMouseMove = (e: MouseEvent) => mouseMoveFunnel.call(e);
    window.addEventListener('mousemove', handleMouseMove);

    // --- Awareness Change Logic ---
    const updateUsers = () => {
      const states = awareness.getStates();
      const uniqueUsers = new Map<string, UserState>();

      states.forEach((state, clientId) => {
        const user = (state as { user: User }).user;

        if (!user || !user.id) return;

        const userWithClient: UserState = { ...user, clientId };
        const existing = uniqueUsers.get(user.id);

        // Keep the user state with the latest timestamp
        if (!existing || user.updatedAt > existing.updatedAt) {
          uniqueUsers.set(user.id, userWithClient);
        }
      });

      setUsers(Array.from(uniqueUsers.values()));
    };

    updateUsers();
    awareness.on('change', updateUsers);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      awareness.off('change', updateUsers);
      mouseMoveFunnel.cancel();
    };
  }, [provider]);

  return (
    <>
      {/* User List Section */}
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

      {/* Cursor Overlay Section */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999,
          overflow: 'hidden',
        }}
      >
        {users.map((user) => {
          // Filter out the current client's own cursor
          if (user.clientId === provider.awareness.clientID) return null;
          if (!user.cursor) return null;

          const { x, y } = user.cursor;
          const { name, color } = user;

          return (
            <div
              key={user.id} // Use user.id as key since we deduplicated by ID
              style={{
                position: 'absolute',
                left: `${x * 100}%`,
                top: `${y * 100}%`,
                pointerEvents: 'none',
                transition: 'left 0.1s linear, top 0.1s linear',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  display: 'block',
                  filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))',
                }}
              >
                <path
                  d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                  fill={color}
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                style={{
                  backgroundColor: color,
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  marginTop: '4px',
                  marginLeft: '12px',
                  boxShadow: '0px 2px 2px rgba(0,0,0,0.2)',
                }}
              >
                {name}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
