import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import CountdownTimer from './CountdownTimer';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const userName = user?.displayName || 'User';
  const cartCount = getCartCount();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .navbar {
          background-color: #000;
          color: #fff;
          position: relative;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          border-bottom: 1px solid #fff;
        }

        .navbar-container {
          max-width: 1920px;
          margin: 0 5%;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-container img {
          height: 90px;
          width: auto;
        }

        .countdown-section {
          flex: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: -60px;
        }

        .nav-links {
          display: flex;
          gap: 30px;
          margin: 0 40px;
        }

        .nav-link {
          color: #fff;
          text-decoration: none;
          font-size: 18px;
          font-weight: 500;
          transition: opacity 0.3s ease;
        }

        .nav-link:hover {
          opacity: 0.8;
        }

        .nav-actions {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .right-section {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .cart-container {
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          position: relative;
        }

        .cart-icon {
          width: 24px;
          height: 24px;
        }

        .cart-count {
          position: absolute;
          top: -5px;
          right: -10px;
          background: #ff4757;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .login-button {
          background-color: #000;
          border: 1px solid #fff;
          color: #fff;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .login-button:hover {
          background-color: #333;
        }

        .profile-container {
          position: relative;
          margin-left: 1rem;
        }

        .profile-dropdown {
          position: relative;
          cursor: pointer;
        }

        .profile-icon {
          width: 24px;
          height: 24px;
          transition: opacity 0.2s ease;
        }

        .profile-icon:hover {
          opacity: 0.8;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.2s ease;
          z-index: 1000;
        }

        .dropdown-menu.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-header {
          padding: 12px 16px;
          border-bottom: 1px solid #eee;
        }

        .username {
          font-weight: 500;
          color: #333;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .username:hover {
          color: #666;
        }

        .dropdown-item {
          display: block;
          padding: 12px 16px;
          color: #333;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }

        .dropdown-item:hover {
          background-color: #f5f5f5;
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          z-index: 1001;
          color: #fff;
        }

        .toggle-icon {
          display: block;
          width: 25px;
          height: 2px;
          background-color: #fff;
          position: relative;
        }

        .toggle-icon::before,
        .toggle-icon::after {
          content: '';
          position: absolute;
          width: 25px;
          height: 2px;
          background-color: #fff;
        }

        .toggle-icon::before {
          top: -6px;
        }

        .toggle-icon::after {
          bottom: -6px;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: #000;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
        }

        .mobile-menu.active {
          transform: translateX(0);
        }

        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 20px;
        }

        .mobile-nav-links a {
          color: #fff;
          font-size: 20px;
          text-decoration: none;
          margin: 10px 0;
          transition: color 0.3s ease;
        }

        .mobile-nav-links a:hover {
          color: #ccc;
        }

        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block;
            margin-left: auto;
          }
          .nav-links,
          .nav-actions,
          .countdown-section {
            display: none;
          }
          .navbar-container {
            margin: 0 auto;
            padding: 0 15px;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="logo-container">
            <Link to="/" className="logo">
              <img src="assets/logo/logo.svg" alt="Studio Jatayu Logo" />
            </Link>
          </div>

          {/* Countdown */}
          <div className="countdown-section">
            <CountdownTimer />
          </div>

          {/* Nav Links */}
          <div className="nav-links">
            <Link to="/" className="nav-link">HOME</Link>
            <Link to="/about" className="nav-link">ABOUT</Link>
            <Link to="/projects" className="nav-link">PROJECTS</Link>
            <Link to="/gallery" className="nav-link">GALLERY</Link>
            <Link to="/store" className="nav-link">STORE</Link>
          </div>

          {/* Actions */}
          <div className="nav-actions">
            <div className="right-section">
              <Link to="/cart" className="cart-container">
                <img src="assets/icons/cart.svg" alt="Cart" className="cart-icon" />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>

              {!isAuthenticated ? (
                <button className="login-button" onClick={() => navigate('/login')}>
                  LOGIN
                </button>
              ) : (
                <div className="profile-container">
                  <div className="profile-dropdown">
                    <img
                      src="assets/icons/profile.svg"
                      alt="Profile"
                      className="profile-icon"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    />
                    <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                      <div className="dropdown-header">
                        <Link to="/profile" className="username" onClick={() => setIsDropdownOpen(false)}>
                          {userName}
                        </Link>
                      </div>
                      <Link to="/user-dashboard" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                        ORDERS
                      </Link>
                      <span className="dropdown-item" onClick={handleLogout}>LOGOUT</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span className="toggle-icon"></span>
          </button>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <div className="mobile-menu-content">
              <div className="mobile-nav-links">
                <Link to="/" onClick={toggleMobileMenu}>HOME</Link>
                <Link to="/about" onClick={toggleMobileMenu}>ABOUT</Link>
                <Link to="/projects" onClick={toggleMobileMenu}>PROJECTS</Link>
                <Link to="/gallery" onClick={toggleMobileMenu}>GALLERY</Link>
                <Link to="/store" onClick={toggleMobileMenu}>STORE</Link>
                <Link to="/cart" onClick={toggleMobileMenu}>CART</Link>
              </div>

              {!isAuthenticated ? (
                <div className="mobile-auth-links">
                  <Link to="/login" onClick={toggleMobileMenu}>LOGIN</Link>
                  <Link to="/register" onClick={toggleMobileMenu}>REGISTER</Link>
                </div>
              ) : (
                <div className="mobile-profile-links">
                  <div className="mobile-user-info">
                    <img src="assets/icons/profile.svg" alt="Profile" className="profile-icon" />
                    <span>{userName}</span>
                  </div>
                  <Link to="/user-dashboard" onClick={toggleMobileMenu}>ORDERS</Link>
                  <span onClick={handleLogout}>LOGOUT</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
