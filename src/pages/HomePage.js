// src/pages/HomePage.js
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to Sharda Nursery 🌱</h1>
        <p>Your one-stop shop for beautiful plants and garden essentials!</p>
        <button className="shop-btn">Shop Now</button>
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
      </section>

      <footer className="footer">
        <p>© 2025 Sharda Nursery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
