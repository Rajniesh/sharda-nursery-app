import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlantCard from '../../components/plants/PlantCard';
import awsConfig from '../../aws-config';
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from '../../services/aws-client';
import './PlantsPage.css';

const categories = [
  "All",
  "Indoor",
  "Outdoor",
  "Flowering",
  "Succulents",
  "Medicinal",
  "Air Purifying"
];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" }
];

const PlantsPage = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      try {
        const command = new ScanCommand({
          TableName: awsConfig.dynamoDB.tableName
        });
        const response = await docClient.send(command);
        setPlants(response.Items || []);
      } catch (err) {
        setPlants([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  useEffect(() => {
    let filtered = [...plants];
    if (selectedCategory !== "All") {
      filtered = filtered.filter(plant =>
        plant.category && plant.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setFilteredPlants(filtered);
  }, [plants, selectedCategory, sortBy]);

  return (
    <div className="plants-shop-container">
      

      <div className="plants-shop-controls">
        <div className="plants-categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn${selectedCategory === cat ? ' active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="plants-sort">
          <label htmlFor="sortBy">Sort by:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading plants...</div>
      ) : (
        <div className="plants-grid">
          {filteredPlants.length === 0 ? (
            <div className="no-plants-msg">No plants found in this category.</div>
          ) : (
            filteredPlants.map(plant => (
              <PlantCard
                key={plant.id}
                plant={plant}
                imageUrl={`https://${awsConfig.s3.bucketName}.s3.${awsConfig.region}.amazonaws.com/${plant.imageKey}`}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PlantsPage;