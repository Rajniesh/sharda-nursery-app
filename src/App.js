import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedLayout from './components/ProtectedLayout';
import Navbar from './components/NavBar';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import AddPlantPage from './pages/AddPlantPage';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/shop" element={<ShopPage />} />
        
        {/* Protected routes using layout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/addplant" element={<AddPlantPage />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; 