import React from 'react';
import Product from './Product';

const ProductList = ({ products, inCount }) => {
    // Filter products with count greater than 3
    const recommendedProducts = products.filter(product => product.count > 3);

    // Sort recommended products based on count
    recommendedProducts.sort((a, b) => b.count - a.count);
  

  return (
    <>
      <h2>Recommended for you:</h2>
      <div className='product-height'>
        <br />
        <div className="product-list">
          {recommendedProducts.length ? (
            recommendedProducts.map(product => (
              <Product
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                inCount={inCount}
              />
            ))
          ) : (
            <p>No recommended products at the moment.</p>
          )}
        </div>
      </div>
      <br />
      <h2>Today's Offers:</h2>
      <div className='product-height'>
        <br />
        <div className="product-list">
          {products.map(product => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              inCount={inCount}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
