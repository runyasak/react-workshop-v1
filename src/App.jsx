import React from 'react';
import { Input, Layout } from 'antd';
import './styles/App.css';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header style={{ color: 'white', fontSize: '24px', textAlign: 'center' }}>
        React Workshop
      </Header>
      <Content style={{ maxWidth: '1024px', width: '100%', margin: 'auto', padding: '32px' }}>
        <Input placeholder="Search Products"></Input>
      </Content>
    </Layout>
  );
};

export default App;
