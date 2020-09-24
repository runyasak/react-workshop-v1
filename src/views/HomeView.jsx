import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Search } = Input;

const HomeView = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const initiate = async() => {
    const fetchProducts = await axios.get('https://react-workshop-v1.herokuapp.com/products');
    setProducts(fetchProducts.data);
  };

  useEffect(() => {
    initiate();
  }, []);

  const onSearchProducts = async(search) => {
    const { data } = await axios.get('https://react-workshop-v1.herokuapp.com/products', { params: { q: search } });
    setProducts(data);
  };

  const mapProducts = products.map((product) => ({ ...product, images: product.images.split('|') }));

  const renderedProducts = mapProducts.map((mapProduct) =>
    <Col
      key={mapProduct.id}
      span={24}
      md={8}
      style={{ marginTop: '12px', marginBottom: '12px' }}>
      <Link to={`/products/${mapProduct.id}`}>
        <Card
          hoverable
          cover={<img alt={mapProduct.postName} src={mapProduct.images[0]} />}
        >
          <Meta
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span>{mapProduct.postTitle}</span>
                <span style={{ fontSize: '24px' }}>${mapProduct.regularPrice || 0}</span>
              </div>
            }
            description={
              <div className="line-clamp-2">{mapProduct.postContent}</div>
            }
          />
        </Card>
      </Link>
    </Col>
  );

  return (
    <div className="home-view">
      <Search
        size="large"
        placeholder="Search Products"
        value={search}
        onChange={e => setSearch(e.target.value)}
        onSearch={value => onSearchProducts(value)}
        enterButton="Search"
      />
      {
        mapProducts
          ? <Row style={{ marginTop: '12px' }} gutter={{ xs: 8, sm: 16, md: 24 }}>
            {renderedProducts}
          </Row>
          : undefined
      }
    </div>
  );
};

export default HomeView;
