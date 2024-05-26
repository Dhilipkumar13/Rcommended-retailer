import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = ({ products, handleDelete }) => {
  const { id } = useParams();
  const product = products.find(product => product.id.toString() === id);
  const handleDeleteClick = () => {
    handleDelete(id); // Call the handleDelete function with the product id
  };

  return (
    <div className='edit-detail'>
      <article>
        {product ? (
          <>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: &#8377; {product.price}</p>
            <Link to={`/editproduct/${product.id}`} ><button className='editButton' > Edit </button> </Link>
            <button className='deleteButton' onClick={handleDeleteClick}>Delete</button>
          </>
        ) : (
          <>
            <h2>404, Page Not Found</h2>
            <p>Visit your web page</p>
          </>
        )}
      </article>
    </div>
  );
};

export default ProductDetail;
