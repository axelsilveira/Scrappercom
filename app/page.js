"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import './page.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback((search = '') => {
    setLoading(true);
    setError(null);
    console.log(`Fetching products with search term: "${search}"`);
    fetch(`/api/products?search=${encodeURIComponent(search)}`)
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
  
        if (Array.isArray(data)) {
          console.log(`Received ${data.length} products`);
          setProducts(data);
          setError(null);
        } else {
          console.error('Received data is not an array:', data);
          throw new Error('Invalid data format received from server');
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Failed to load products: ' + error.message);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    fetchProducts(searchTerm);
  }, [fetchProducts, searchTerm]);

  const handleSearch = (newSearchTerm) => {
    console.log(`Search term changed to: "${newSearchTerm}"`);
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className="App">
      <Header searchTerm={searchTerm} setSearchTerm={handleSearch} />
      {error && <div className="error-message">{error}</div>}
      {loading && <div>Loading...</div>}
      {!loading && products.length === 0 && <div>No products found matching your search</div>}
      <ProductGrid products={products} />
    </div>
  );
};

export default App;
