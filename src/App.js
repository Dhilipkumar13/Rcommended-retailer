import React, { useEffect, useState } from 'react';
import Header from './Header';
import Nav from './Nav';
import List from './List';
import AddProduct from './AddProduct';
import Footer from './Footer';
import About from './About';
import Missing from './Missing';
import { Routes, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail';

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 10, count: 0 },
    { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 20, count: 0 },
    { id: 3, name: 'Product 3', description: 'Description of Product 3', price: 30, count: 0 },
  ]);

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescrip, setProductDescrip] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = products.length ? products[products.length - 1].id + 1 : 0;
    const newProduct = { id, name: productName, description: productDescrip, price: productPrice, count: 0 };
    setProducts([...products, newProduct]);
    setProductName('');
    setProductDescrip('');
    setProductPrice('');
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const inCount = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, count: product.count + 1 } : product
    ));
  };

  useEffect(() => {
    // Filter products based on search input
    const filteredResults = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filteredResults.reverse());
  }, [products, search]);

  return (
    <div className="App">
      <Header title="Online Retailer" />
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <br />
      <Routes>
        <Route path="/" element={<List products={searchResult} inCount={inCount} />} />
        <Route path="products" >
          <Route index element={<AddProduct
            productName={productName}
            setProductName={setProductName}
            productDescrip={productDescrip}
            setProductDescrip={setProductDescrip}
            productPrice={productPrice}
            setProductPrice={setProductPrice}
            handleSubmit={handleSubmit}
          />} />
          <Route path=':id' element={
            <ProductDetail
              products={products}
              handleDelete={handleDelete}
            />
          } />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
