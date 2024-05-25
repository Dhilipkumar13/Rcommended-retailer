import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ id, name, description, price, inCount }) => {
  return (
    <div className="product">
      <Link to={`products/${id}`}>
        <h2>{name}</h2>
        <p>{(description.length) <= 25 ? description : `${(description.slice(0, 25))}...`}</p>
        <p>Price: &#8377; {price}</p>
      </Link>
      <button onClick={() => inCount(id)}>Add to Cart</button>
    </div>
  );
};

export default Product;
