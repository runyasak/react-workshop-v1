import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Row, Col, Image } from 'antd';

const ProductDetailView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const initiate = async() => {
      const fetchProductById = await axios.get(`https://react-workshop-v1.herokuapp.com/products/${id}`);
      setProduct(fetchProductById.data);
    };

    initiate();
  }, [id]);

  const mapProduct = {
    ...product,
    images: product ? product.images.split('|')[0] : ''
  };

  return (
    <div className="product-detial-view">
      <Button
        type="text"
        onClick={() => history.goBack()}
      >
        {'<'}
      </Button>
      <Row style={{ marginTop: '12px' }} gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col span={12}>
          <Image src={mapProduct.images}></Image>
        </Col>
        <Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '16px', fontWeight: '500' }}>{mapProduct.postTitle}</span>
            <span style={{ fontSize: '24px' }}>${mapProduct.regularPrice || 0}</span>
          </div>
          <div>
            {mapProduct.postContent}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailView;
