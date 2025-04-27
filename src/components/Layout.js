import React from 'react';
import Navbar from './ui/NavBar'; // Make sure this is default export
import Footer from './ui/Footer'; // Make sure this is default export

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

// Must use default export
export default Layout;