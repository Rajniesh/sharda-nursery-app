// src/pages/user/ProfilePage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // your AuthContext
import './ProfilePage.css';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('info');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={currentUser?.photoURL || '/default-avatar.png'}
          alt="Profile"
          className="profile-avatar"
        />
        <h2>{currentUser?.displayName || 'Guest User'}</h2>
        <p className="email">{currentUser?.email}</p>
        <button className="edit-profile-btn">Edit Profile</button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="profile-tabs">
        <button onClick={() => setActiveTab('info')} className={activeTab === 'info' ? 'active' : ''}>Info</button>
        <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}>Orders</button>
        <button onClick={() => setActiveTab('wishlist')} className={activeTab === 'wishlist' ? 'active' : ''}>Wishlist</button>
        <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>Settings</button>
      </div>

      <div className="tab-content">
        {activeTab === 'info' && (
          <div className="info-tab">
            <h3>Profile Information</h3>
            <p><strong>Name:</strong> {currentUser?.displayName || '-'}</p>
            <p><strong>Email:</strong> {currentUser?.email}</p>
            {/* Add phone, address fields later if needed */}
          </div>
        )}
        {activeTab === 'orders' && (
          <div className="orders-tab">
            <h3>Your Orders</h3>
            <p>(Order list will go here...)</p>
          </div>
        )}
        {activeTab === 'wishlist' && (
          <div className="wishlist-tab">
            <h3>Wishlist</h3>
            <p>(Saved plants will go here...)</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="settings-tab">
            <h3>Account Settings</h3>
            <button className="change-password-btn">Change Password</button>
            {/* More settings like Notification preferences can go here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
