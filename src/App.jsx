import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Layout, Row, Col, Card } from 'antd';
import './styles/App.css';

const { Meta } = Card;
const { Header, Content } = Layout;

const App = () => {
  const [products, setProducts] = useState([]);

  const initiate = async() => {
    const fetchProducts = await axios.get('https://react-workshop-v1.herokuapp.com/products');
    setProducts(fetchProducts.data);
  };

  useEffect(() => {
    initiate();
  }, []);

  const mapProducts = products.map((product) => ({ ...product, images: product.images.split('|') }));

  const renderedProducts = mapProducts.map((mapProduct) =>
    <Col
      key={mapProduct.id}
      span={24}
      md={8}
      style={{ marginTop: '12px', marginBottom: '12px' }}>
      <Card
        hoverable
        cover={<img alt={mapProduct.postName} src={mapProduct.images[0]} />}
      >
        <Meta
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span>{mapProduct.postTitle}</span>
              <span style={{ fontSize: '24px' }}>${mapProduct.regularPrice || 0}</span>
            </div>}
          description={
            <div className="line-clamp-2">{mapProduct.postContent}</div>
          }
        />
      </Card>
    </Col>
  );

  return (
    <Layout>
      <Header style={{ color: 'white', fontSize: '24px', textAlign: 'center' }}>
        React Workshop
      </Header>
      <Content style={{ maxWidth: '1024px', width: '100%', margin: 'auto', padding: '32px' }}>
        <Input placeholder="Search Products" style={{ borderRadius: '16px' }} />
        {
          mapProducts
            ? <Row style={{ marginTop: '12px' }} gutter={{ xs: 8, sm: 16, md: 24 }}>
              {renderedProducts}
            </Row>
            : undefined
        }
      </Content>
    </Layout>
  );
};

export default App;
