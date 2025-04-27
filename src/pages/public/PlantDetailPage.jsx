import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import awsConfig from "../../aws-config";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../services/aws-client";
import "./PlantDetailPage.css";

const PlantDetailPage = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      setLoading(true);
      try {
        const command = new GetCommand({
          TableName: awsConfig.dynamoDB.tableName,
          Key: { id }
        });
        const response = await docClient.send(command);
        setPlant(response.Item);
      } catch (err) {
        setPlant(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]);

  if (loading) {
    return <div className="plant-detail-loading">Loading...</div>;
  }

  if (!plant) {
    return <div className="plant-detail-error">Plant not found.</div>;
  }

  return (
    <div className="plant-detail-container">
      <div className="plant-detail-image">
        <img
          src={`https://${awsConfig.s3.bucketName}.s3.${awsConfig.region}.amazonaws.com/${plant.imageKey}`}
          alt={plant.name}
        />
      </div>
      <div className="plant-detail-info">
        <h1>{plant.name}</h1>
        <p className="plant-detail-category">{plant.category}</p>
        <p className="plant-detail-price">₹{plant.price}</p>
        <p className="plant-detail-description">{plant.description}</p>
        {plant.care && (
          <div className="plant-detail-care">
            <h3>Care Instructions</h3>
            <p>{plant.care}</p>
          </div>
        )}
        <button className="plant-detail-addcart">Add to Cart</button>
      </div>
    </div>
  );
};

export default PlantDetailPage;