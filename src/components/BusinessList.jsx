import React, { useState, useEffect } from "react";
import axios from "axios";

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const response = await axios.get(
      `https://api.yelp.com/v3/businesses/search?term=${searchTerm}&categories=${filterCategory}&location=YourLocation&page=${page}`,
      {
        headers: {
          Authorization: "Bearer YOUR_YELP_API_KEY",
        },
      }
    );
    setBusinesses(response.data.businesses);
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, filterCategory, page]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <h2>List of Businesses</h2>
      <input
        type="text"
        placeholder="Search businesses"
        value={searchTerm}
        onChange={handleSearch}
      />
      <select onChange={handleCategoryChange} value={filterCategory}>
        <option value="">All Categories</option>
        <option value="restaurant">Restaurant</option>
        <option value="cafe">Cafe</option>
        <option value="bar">Bar</option>
        {/* Tambahkan kategori lain sesuai kebutuhan */}
      </select>
      <ul>
        {businesses.map((business) => (
          <li key={business.id}>{business.name}</li>
        ))}
      </ul>
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => handlePageChange(page + 1)}>Next</button>
    </div>
  );
};

export default BusinessList;
