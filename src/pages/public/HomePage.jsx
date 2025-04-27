// ... existing code ...
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlantCard from '../../components/plants/PlantCard';
import awsConfig from '../../aws-config';
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from '../../services/aws-client';
import './HomePage.css';

const HomePage = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch a few plants for homepage showcase
    const fetchPlants = async () => {
      try {
        const command = new ScanCommand({
          TableName: awsConfig.dynamoDB.tableName,
          Limit: 4 // Show only 4 plants
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

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to Sharda Nursery 🌱</h1>
        <p>Your one-stop shop for beautiful plants and garden essentials!</p>
        <Link to="/plants" className="shop-btn">Shop All Plants</Link>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Fresh Plants</h3>
          <p>Wide variety of healthy and fresh plants for your home and garden.</p>
        </div>
        <div className="feature-card">
          <h3>Expert Advice</h3>
          <p>Tips and tricks from gardening professionals to help you grow better.</p>
        </div>
        <div className="feature-card">
          <h3>Fast Delivery</h3>
          <p>Get your plants delivered fast and safe across India.</p>
        </div>
        <div className="feature-card">
          <h3>Eco-Friendly</h3>
          <p>We use sustainable packaging and support green initiatives.</p>
        </div>
      </section>

      <section className="home-plants-section">
        <div className="home-plants-header">
          <h2>Featured Plants</h2>
          <Link to="/plants" className="view-all-link">View All Plants &rarr;</Link>
        </div>
        {loading ? (
          <div className="loading-spinner">Loading plants...</div>
        ) : (
          <div className="home-plants-grid">
            {plants.map(plant => (
              <PlantCard
                key={plant.id}
                plant={plant}
                imageUrl={`https://${awsConfig.s3.bucketName}.s3.${awsConfig.region}.amazonaws.com/${plant.imageKey}`}
              />
            ))}
          </div>
        )}
      </section>

      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Beautiful, healthy plants and super fast delivery. Highly recommend!"</p>
            <span>- Priya S.</span>
          </div>
          <div className="testimonial-card">
            <p>"The variety is amazing and the support team is very helpful."</p>
            <span>- Rahul M.</span>
          </div>
          <div className="testimonial-card">
            <p>"My balcony garden looks stunning thanks to Sharda Nursery!"</p>
            <span>- Anjali K.</span>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for gardening tips and exclusive offers!</p>
        <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Your email address" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <footer className="footer">
        <p>© 2025 Sharda Nursery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
