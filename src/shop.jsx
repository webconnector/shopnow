import React, { useState } from "react";


// Products define 
const products = [
  { id: 1, name: "Camino Real Tequila Gold 75cl", price: 7000, image: "Camino.jpg" },
  { id: 2, name: "Wireless Lavalier Microphone", price: 55000, image: "UlanziNoiceCancelingwirelessmic.jpg" },
  { id: 3, name: "Golden Penny Macaroni 500g", price: 800, image: "GoldenPennyMacaroni500g.jpg" },
  { id: 4, name: "Mortein LED Complete Insecticide", price: 6000, image: "MorteinLEDCompleteInsecticide.jpg" },
  { id: 5, name: "ADIDAS Daily Ii Backpack Unisex", price: 12000, image: "ADIDASDailyIiBackpackUnisex.jpg" },
  { id: 6, name: "USB Microphone Cardioid Condenser Mic With Tripod Stand", price: 11500, image: "USBMicrophone.jpg" },
  { id: 7, name: "Sony PlayStation 5 Console - Standard Edition", price: 590000, image: "SonyPlayStation5.jpg" },
  { id: 8, name: "NIVEA Dry Comfort Roll-on For Women, 72h- 50ml", price: 2800, image: "NIVEADryComfort.jpg" }
];


// Set the number of items per page
const itemsPerPage = 8; 

function Shop({ onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="shop container">
      {/* Search box */}
      <div className="search-box mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-full outline-none"
        />
      </div>

      {/* shop content  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Map over current items and render product boxes */}
        {currentItems.map((product) => (
          <div className="product-box p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105" key={product.id}>
            <img src={`./images/${product.image}`} alt={product.name} className="product-img hover:opacity-75" />
            <h2 className="product-name text-gray-800">{product.name}</h2>
            <span className="price text-gray-700">{`N${product.price}`}</span>
            <i className="bx bxs-shopping-bag add-cart" onClick={() => onAddToCart(product)}> Add To Cart</i>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Shop;