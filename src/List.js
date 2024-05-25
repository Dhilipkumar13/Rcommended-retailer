import React from 'react';
import ProductList from './ProductList';

const List = ({ products, inCount }) => {
  return (
    <>
      <div className='product-container'>
        {products.length ? (
          <ProductList products={products} inCount={inCount} />
        ) : (
          <p>No List is to display</p>
        )}
      </div>
    </>
  );
};

export default List;
