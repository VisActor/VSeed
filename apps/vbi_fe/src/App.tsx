import './App.css';
import { APP } from 'demo';
import { memo } from 'react';

import { useCollaborativeBuilder } from './hooks/useCollaborativeBuilder';
import { registerDemoConnector } from './utils/demoConnector';
import { Collaborators } from './components/Collaborators';

// Register once (or safely re-register)
registerDemoConnector();

const UserA = memo(({ userName }: { userName: string }) => {
  const { builder, provider } = useCollaborativeBuilder(
    'vbi-demo-room',
    userName,
  );
  if (!builder || !provider) {
    return <div>Loading User A...</div>;
  }
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Collaborators provider={provider} />
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <APP builder={builder} />
      </div>
    </div>
  );
});

const App = memo(() => {
  console.log('debug APP');
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get('userName') || 'User A';
  return <UserA userName={userName} />;
});

export default App;
