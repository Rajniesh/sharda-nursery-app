import { useState } from 'react';

const Filters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 100],
    lightRequirement: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceChange = (e) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [0, parseInt(e.target.value)]
    }));
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  return (
    <div className="filters-sidebar">
      <h3>Filter Plants</h3>
      
      <div className="filter-group">
        <h4>Category</h4>
        <select 
          name="category" 
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          <option value="INDOOR">Indoor</option>
          <option value="OUTDOOR">Outdoor</option>
          <option value="SUCCULENT">Succulent</option>
        </select>
      </div>
      
      <div className="filter-group">
        <h4>Price Range</h4>
        <input
          type="range"
          min="0"
          max="100"
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
        />
        <span>Up to ${filters.priceRange[1]}</span>
      </div>
      
      <div className="filter-group">
        <h4>Light Requirement</h4>
        <select 
          name="lightRequirement" 
          value={filters.lightRequirement}
          onChange={handleChange}
        >
          <option value="">Any Light</option>
          <option value="LOW">Low Light</option>
          <option value="MEDIUM">Medium Light</option>
          <option value="HIGH">Bright Light</option>
        </select>
      </div>
      
      <button 
        onClick={applyFilters}
        className="apply-filters-btn"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;