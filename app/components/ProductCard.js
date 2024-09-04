import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  // Parsing prices and handling missing values
  const cromaPrice = parseFloat(product.croma_price?.replace('₹', '').replace(',', '')) || 0;
  const reliancePrice = parseFloat(product.reliance_price?.replace('₹', '').replace(',', '')) || 0;
  const cromaMrpPrice = parseFloat(product.croma_mrp?.replace('₹', '').replace(',', '')) || 0;
  const relianceMrpPrice = parseFloat(product.reliance_mrp?.replace('₹', '').replace(',', '')) || 0;
  const lowestPrice = Math.min(cromaPrice, reliancePrice);

  return (
      <div className="product-card">
        <div className="image-container">
          <img
            src={product.croma_img || 'placeholder-image-url.jpg'}
            alt={`${product.crome_name} - Croma`}
            className="product-image croma-image"
          />
          <img
            src={product.reliance_img || 'placeholder-image-url.jpg'}
            alt={`${product.reliance_name} - Reliance`}
            className="product-image reliance-image"
          />
        </div>
        <h2 className="product-title">{product.unique_name}</h2>
        <div className="price-comparison">
          {/* Croma Pricing Section */}
          <div className="croma-section">
            <p className="croma-price">
              
            <a href={product.croma_link} target="_blank" rel="noopener noreferrer">
            Croma
            </a>: ₹{cromaPrice.toFixed(2)}
              {/* {cromaPrice === lowestPrice && <span className="lowest-price-tag">Lowest</span>} */}
            </p>
            <p className="product-mrp">
              MRP: <del>₹{cromaMrpPrice.toFixed(2) || 'N/A'}</del> {/* Display MRP below price */}
            </p>
            <p className="product-discount">
              Discount: {product.croma_discount || product['Discount %'] || '0%'} {/* Display Discount below price */}
            </p>
          </div>

          {/* Reliance Pricing Section */}
          <div className="reliance-section">
            <p className="reliance-price">
            <a href={product.reliance_link} target="_blank" rel="noopener noreferrer">
            Reliance
            </a>
            : ₹{reliancePrice.toFixed(2)}
              {/* {reliancePrice === lowestPrice && <span className="lowest-price-tag">Lowest</span>} */}
            </p>
            <p className="product-mrp">
              MRP: <del>₹{relianceMrpPrice.toFixed(2) || 'N/A'}</del> {/* Display MRP below price */}
            </p>
            <p className="product-discount">
              Discount: {product.reliance_discount || product['Discount %'] || '0%'} {/* Display Discount below price */}
            </p>
          </div>
        </div>
      </div>
  );
};

export default ProductCard;
