import React from 'react';

const AddProduct = ({
  productName,
  setProductName,
  productDescrip,
  setProductDescrip,
  productPrice,
  setProductPrice,
  handleSubmit
}) => {
  return (
    <div className="addproduct">
      <h2>Add New Product</h2>
      <form className="addproductform" onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          required
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label htmlFor="productDescrip">Description:</label>
        <input
          type="text"
          id="productDescrip"
          required
          value={productDescrip}
          onChange={(e) => setProductDescrip(e.target.value)}
        />

        <label htmlFor="productPrice">Price:</label>
        <input
          type="text"
          id="productPrice"
          required
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />

        <button type="submit" >Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
