import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Sharda Nursery</h2>
      <ul style={styles.links}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/login" style={styles.link}>Login</Link></li>
        <li><Link to="/register" style={styles.link}>Register</Link></li>
        {/* Add more links here later, like Shop or Admin */}
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    color: '#fff'
  },
  logo: {
    margin: 0
  },
  links: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
};

export default Navbar;
