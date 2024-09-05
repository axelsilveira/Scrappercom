import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  // Parsing prices and handling missing values
  const cromaPrice = parseFloat(product.croma_price?.replace('₹', '').replace(',', '')) || 0;
  const reliancePrice = parseFloat(product.reliance_price?.replace('₹', '').replace(',', '')) || 0;
  const cromaMrpPrice = parseFloat(product.croma_mrp?.replace('₹', '').replace(',', '')) || 0;
  const relianceMrpPrice = parseFloat(product.reliance_mrp?.replace('₹', '').replace(',', '')) || 0;
  const lowestPrice = Math.min(cromaPrice, reliancePrice);

  // Determine if the product is available on both websites
  const isAvailableOnBoth = cromaPrice > 0 && reliancePrice > 0;

  // Function to get the lowest price label
  const getLowestPriceLabel = () => {
    if (cromaPrice === reliancePrice) return "Same price on both sites";
    return cromaPrice < reliancePrice ? "Lowest at Croma" : "Lowest at Reliance";
  };

  // Function to calculate discount percentage
  const calculateDiscount = (price, mrp) => {
    if (price && mrp) {
      return Math.round(((mrp - price) / mrp) * 100);
    }
    return 0;
  };

  return (
    <div className="product-card border rounded-lg p-4 shadow-md">
      <h2 className="product-title text-lg font-semibold mb-2">{product.unique_name}</h2>
      
      <div className="image-container flex justify-between mb-4">
        <img
          src={product.croma_img || 'placeholder-image-url.jpg'}
          alt={`${product.crome_name} - Croma`}
          className="product-image w-1/2 h-40 object-contain"
        />
        <img
          src={product.reliance_img || 'placeholder-image-url.jpg'}
          alt={`${product.reliance_name} - Reliance`}
          className="product-image w-1/2 h-40 object-contain"
        />
      </div>
      
      {isAvailableOnBoth && (
        <div className="lowest-price-info bg-yellow-100 p-2 rounded mb-2">
          <p className="font-bold">{getLowestPriceLabel()}</p>
          <p className="text-2xl font-bold text-green-600">₹{lowestPrice.toFixed(2)}</p>
        </div>
      )}

      <div className="price-comparison grid grid-cols-2 gap-4">
        {/* Croma Pricing Section */}
        <div className="croma-section">
          <h3 className="text-lg font-semibold">
            <a href={product.croma_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Croma
            </a>
          </h3>
          <p className="text-xl font-bold">₹{cromaPrice.toFixed(2)}</p>
          <p className="text-sm">
            MRP: <del>₹{cromaMrpPrice.toFixed(2)}</del>
          </p>
          <p className="text-sm text-green-600">
            {calculateDiscount(cromaPrice, cromaMrpPrice)}% off
          </p>
        </div>

        {/* Reliance Pricing Section */}
        <div className="reliance-section">
          <h3 className="text-lg font-semibold">
            <a href={product.reliance_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Reliance
            </a>
          </h3>
          <p className="text-xl font-bold">₹{reliancePrice.toFixed(2)}</p>
          <p className="text-sm">
            MRP: <del>₹{relianceMrpPrice.toFixed(2)}</del>
          </p>
          <p className="text-sm text-green-600">
            {calculateDiscount(reliancePrice, relianceMrpPrice)}% off
          </p>
        </div>
      </div>

      {/* Comparison section */}
      {isAvailableOnBoth && (
        <div className="comparison-section mt-4 border-t pt-2">
          <h3 className="text-lg font-semibold mb-2">Comparison</h3>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="font-semibold">Name:</td>
                <td>{product.crome_name}</td>
                <td>{product.reliance_name}</td>
              </tr>
              <tr>
                <td className="font-semibold">Discount:</td>
                <td>{product.croma_discount || 'N/A'}</td>
                <td>{product.reliance_discount || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
