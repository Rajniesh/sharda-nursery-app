import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { Cart3, ChevronDown, Person, BoxArrowRight } from "react-bootstrap-icons";
import "./NavBar.css";
import logo from "../../assets/images/logo.png";

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  // Handle login/profile click
  const handleProfileClick = () => {
    if (currentUser) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="fk-navbar">
      <div className="fk-navbar-container">
        {/* Logo */}
        <Link to="/" className="fk-navbar-logo">
          <img src={logo} alt="Sharda Nursery Logo" />
        </Link>
        {/* Search Bar */}
        <form className="fk-navbar-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for plants, categories and more"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 17 18" className="fk-search-icon">
              <g fill="#2874f0" fillRule="evenodd">
                <path className="_34RNph" d="M7.5 14c3.038 0 5.5-2.462 5.5-5.5S10.538 3 7.5 3 2 5.462 2 8.5 4.462 14 7.5 14zm0 1C4.462 15 2 12.538 2 9.5S4.462 4 7.5 4s5.5 2.462 5.5 5.5S10.538 15 7.5 15z"></path>
                <path className="_34RNph" d="M12.297 13.707a1 1 0 0 1 1.414-1.414l3.999 3.999a1 1 0 0 1-1.414 1.414l-3.999-3.999z"></path>
              </g>
            </svg>
          </button>
        </form>
        {/* More Dropdown */}
        <div
          className="fk-navbar-more"
          onMouseEnter={() => setMoreOpen(true)}
          onMouseLeave={() => setMoreOpen(false)}
        >
          <span>
            More <ChevronDown size={16} />
          </span>
          {moreOpen && (
            <div className="fk-navbar-more-dropdown">
              <Link to="/notifications">Notification Preferences</Link>
              <Link to="/customer-care">24x7 Customer Care</Link>
              <Link to="/about">About Us</Link>
              <Link to="/download-app">Download App</Link>
            </div>
          )}
        </div>
        {/* Profile/Login */}
        <div className="fk-navbar-profile">
          <button className="fk-profile-btn" onClick={handleProfileClick}>
            <Person size={20} />
            <span>{currentUser ? currentUser.displayName || "My Account" : "Login"}</span>
            <ChevronDown size={16} />
          </button>
          {/* Profile Dropdown */}
          {currentUser && (
            <div className="fk-navbar-profile-dropdown">
              <Link to="/profile">My Profile</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/wishlist">Wishlist</Link>
              <button onClick={handleLogout} className="fk-logout-btn">
                <BoxArrowRight size={16} /> Logout
              </button>
            </div>
          )}
        </div>
        {/* Cart */}
        <Link to="/cart" className="fk-navbar-cart">
          <Cart3 size={22} />
          <span>Cart</span>
          {cartCount > 0 && <span className="fk-cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;