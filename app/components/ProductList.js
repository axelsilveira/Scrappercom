"use client";

import React, { useState } from 'react';
import Papa from 'papaparse';
import styles from './ProductList.css'; // Import CSS Module

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setProducts(result.data);
        },
        error: (error) => {
          console.error('Error parsing the CSV file:', error);
          setError('Failed to load products');
        },
      });
    }
  };

  return (
    <div>
      <h2>All Products</h2>
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileUpload} 
      />
      {error && <div>{error}</div>}
      <div className={styles.productContainer}> {/* Use CSS Module class */}
        {products.map((product, index) => (
          <div key={index} className={styles.productCard}> {/* Use CSS Module class */}
            <img src={product.imageUrl || 'placeholder.jpg'} alt={product.name} className={styles.productImage} />
            <h3 className={styles.productTitle}>
              <a href={product.link || '#'}>{product.name}</a>
            </h3>
            <p className={styles.productPrice}>
              <span className={styles.productLowestPrice}>${product.lowest_price}</span>
              {product.mrp && (
                <span className={styles.productMrp}>
                  <del>${product.mrp}</del>
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
