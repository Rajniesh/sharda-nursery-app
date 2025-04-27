import React from "react";
import { Link } from "react-router-dom";
import awsConfig from "../../aws-config";
import "./PlantCard.css";

const PlantCard = ({ plant }) => {
  if (!plant) return null;

  const imageUrl = plant.imageKey
    ? `https://${awsConfig.s3.bucketName}.s3.${awsConfig.region}.amazonaws.com/${plant.imageKey}`
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <Link to={`/plants/${plant.id}`} className="plant-card-link">
      <div className="plant-card">
        <div className="plant-card-image">
          <img src={imageUrl} alt={plant.name} />
        </div>
        <div className="plant-card-info">
          <h3 className="plant-card-title">{plant.name}</h3>
          <p className="plant-card-category">{plant.category}</p>
          <div className="plant-card-bottom">
            <span className="plant-card-price">₹{plant.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;