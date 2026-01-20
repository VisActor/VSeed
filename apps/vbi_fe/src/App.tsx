import { memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { registerDemoConnector } from './utils/demoConnector';
import { DocumentListPage } from './pages/DocumentListPage';
import { DocumentEditorPage } from './pages/DocumentEditorPage';
import './App.css';

// Register once (or safely re-register)
registerDemoConnector();

const App = memo(() => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DocumentListPage />} />
          <Route path="/edit/:id" element={<DocumentEditorPage />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
});

export default App;
