import { Splitter } from 'antd';
import './App.css';
import { APP } from 'demo';
const App = () => {
  return (
    <Splitter
      style={{ height: '100vh', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
    >
      <Splitter.Panel defaultSize="50%" min="30%" max="70%">
        <APP />
      </Splitter.Panel>
      <Splitter.Panel>
        <APP />
      </Splitter.Panel>
    </Splitter>
  );
};

export default App;
