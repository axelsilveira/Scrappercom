import React from 'react';

const Header = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header className="App-header">
      <h1>Product Price Comparison</h1>
      <input
        name="search_bar"
        type="text"
        placeholder="Search for a product"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          color: 'black', // Set text color to black
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      />
    </header>
  );
};

export default Header;
