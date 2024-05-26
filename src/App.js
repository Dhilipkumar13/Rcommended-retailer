import React, { useEffect, useState } from 'react';
import Header from './Header';
import Nav from './Nav';
import List from './List';
import AddProduct from './AddProduct';
import Footer from './Footer';
import About from './About';
import Missing from './Missing';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import api from "./api/Products";
import EditProduct from "./EditProduct";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescrip, setProductDescrip] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [editName, setEditName] = useState('');
  const [editDescrip, setEditDescrip] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = products.length ? products[products.length - 1].id + 1 : 1;
    const newProduct = { id, name: productName, description: productDescrip, price: productPrice, count: 0 };

    try {
      await api.post("/products", newProduct);
      setProducts([...products, newProduct]);
      setProductName('');
      setProductDescrip('');
      setProductPrice('');
      navigate("/");
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id.toString() !== id));
      navigate("/");
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

  const inCount = async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      const updatedProduct = { ...response.data, count: response.data.count + 1 };

      await api.put(`/products/${id}`, updatedProduct);

      setProducts(products.map(product =>
        product.id === id ? updatedProduct : product
      ));
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };


  const handleEditClick = async (e, id) => {
    e.preventDefault();
    try {
      const originalProduct = products.find(product => product.id.toString() === id);
      const editedProduct = { 
        id, 
        name: editName, 
        description: editDescrip, 
        price: editPrice, 
        count: originalProduct ? originalProduct.count : 0 // Ensure count is preserved or initialized
      };
      const response = await api.put(`/products/${id}`, editedProduct);
      setProducts(products.map(product => product.id === id ? { ...response.data } : product));
      setEditDescrip('');
      setEditName('');
      setEditPrice('');
      navigate("/");
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    const filteredResults = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filteredResults.reverse());
  }, [products, search]);

  return (
    <div className="App">
      <Header title="Online Retailer" />
      <Nav search={search} setSearch={setSearch} />
      <br />
      <Routes>
        <Route path="/" element={<List products={searchResult} inCount={inCount} />} />
        <Route path="products">
          <Route index element={<AddProduct
            productName={productName}
            setProductName={setProductName}
            productDescrip={productDescrip}
            setProductDescrip={setProductDescrip}
            productPrice={productPrice}
            setProductPrice={setProductPrice}
            handleSubmit={handleSubmit}
            
          />} />
          <Route path=":id" element={<ProductDetail products={products} handleDelete={handleDelete} />} />
        </Route>
        <Route path='editproduct/:id'element={<EditProduct
          products={products}
          editName={editName}
          setEditName={setEditName}
          editDescrip={editDescrip}
          setEditDescrip={setEditDescrip}
          editPrice={editPrice}
          setEditPrice={setEditPrice}
          handleEditClick={handleEditClick}
        />}/>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
