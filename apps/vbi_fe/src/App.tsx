import './App.css';
import { APP } from 'demo';
import { memo, useState } from 'react';

import { useCollaborativeBuilder } from './hooks/useCollaborativeBuilder';
import { registerDemoConnector } from './utils/demoConnector';
import { Collaborators } from './components/Collaborators';
import { DocumentList } from './components/DocumentList';

// Register once (or safely re-register)
registerDemoConnector();

const DocumentEditor = memo(
  ({
    userName,
    roomName,
    onBack,
  }: {
    userName: string;
    roomName: string;
    onBack: () => void;
  }) => {
    const { builder, provider } = useCollaborativeBuilder(roomName, userName);
    if (!builder || !provider) {
      return <div>Loading Editor...</div>;
    }
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            padding: 10,
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <button onClick={onBack}>&larr; Back to List</button>
          <span>
            Room: {roomName} | User: {userName}
          </span>
          <Collaborators provider={provider} />
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <APP builder={builder} />
        </div>
      </div>
    );
  },
);

const App = memo(() => {
  console.log('debug APP');
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get('userName') || 'User A';

  const [currentDocId, setCurrentDocId] = useState<string | null>(null);

  if (currentDocId) {
    return (
      <DocumentEditor
        userName={userName}
        roomName={currentDocId}
        onBack={() => setCurrentDocId(null)}
      />
    );
  }

  return <DocumentList onSelect={setCurrentDocId} />;
});

export default App;
