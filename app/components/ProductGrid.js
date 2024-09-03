import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  console.log('ProductGrid - Received products:', products);
  return (
    <main className="product-grid">
      {products.length > 0 ? (
        products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </main>
  );
};

export default ProductGrid;
