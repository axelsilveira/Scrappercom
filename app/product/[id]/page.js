import React from 'react';

async function getProductDetails(id) {
  // Replace this with your actual API call
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

export default async function ProductPage({ params }) {
  const product = await getProductDetails(params.id);

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <div className="retailer-details">
        <div className="croma-details">
          <h2>Croma</h2>
          <img src={product.croma_img} alt={`${product.name} - Croma`} />
          <p>Price: ₹{product.croma_price}</p>
          <a href={product.croma_link} target="_blank" rel="noopener noreferrer">Buy from Croma</a>
        </div>
        <div className="reliance-details">
          <h2>Reliance</h2>
          <img src={product.reliance_img} alt={`${product.name} - Reliance`} />
          <p>Price: ₹{product.reliance_price}</p>
          <a href={product.reliance_link} target="_blank" rel="noopener noreferrer">Buy from Reliance</a>
        </div>
      </div>
      <p>MRP: <del>₹{product.mrp}</del></p>
      <p>Discount: {product.discount || product['Discount %']}</p>
    </div>
  );
}