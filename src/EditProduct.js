import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = ({ products, editName, setEditName, editDescrip, setEditDescrip, editPrice, setEditPrice, handleEditClick }) => {
  const { id } = useParams();
  const product = products.find(product => product.id.toString() === id);
  // console.log(product)
  // console.log(products)
  useEffect(() => {
    if (product) {
      setEditName(product.name);
      setEditDescrip(product.description);
      setEditPrice(product.price);
    }
  }, [product, setEditName, setEditDescrip, setEditPrice]);

  return (
    <div className='edit-detail'>
      <h2>Edit Product</h2>
      <form className="addproductform" onSubmit={(e) => handleEditClick(e, id)}>
        <label htmlFor="editName">Product Name:</label>
        <input
          type="text"
          id="editName"
          required
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />

        <label htmlFor="editDescrip">Description:</label>
        <input
          type="text"
          id="editDescrip"
          required
          value={editDescrip}
          onChange={(e) => setEditDescrip(e.target.value)}
        />

        <label htmlFor="editPrice">Price:</label>
        <input
          type="text"
          id="editPrice"
          required
          value={editPrice}
          onChange={(e) => setEditPrice(e.target.value)}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
