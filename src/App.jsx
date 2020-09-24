import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Layout } from 'antd';
import HomeView from './views/HomeView';
import ProductDetailView from './views/ProductDetailView';
import './styles/main.css';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Header style={{ color: 'white', fontSize: '24px', textAlign: 'center' }}>
          One Million Store
        </Header>
        <Content style={{ maxWidth: '1024px', width: '100%', margin: 'auto', padding: '32px', minHeight: 'calc(100vh - 64px)' }}>
          <Switch>
            <Route path="/products/:id">
              <ProductDetailView />
            </Route>
            <Route path="/">
              <HomeView />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
