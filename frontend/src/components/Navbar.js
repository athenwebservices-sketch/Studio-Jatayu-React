import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import CountdownTimer from './CountdownTimer';
import UserProfileDropdown from './UserProfileDropdown';
import styled from 'styled-components';

const Nav = styled.nav`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ffd700;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem;
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${props => props.isOpen ? '1' : '0'};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  
  &:hover {
    color: #ffd700;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #ffd700;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const CartIcon = styled(Link)`
  color: white;
  text-decoration: none;
  position: relative;
  font-size: 1.2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ffd700;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
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
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  
  span {
    width: 25px;
    height: 3px;
    background: white;
    margin: 3px 0;
    transition: 0.3s;
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const CountdownContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-size: 0.9rem;
  margin-left: 1rem;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">E-Commerce</Logo>
        
        <Hamburger onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </Hamburger>
        
        <NavMenu isOpen={isOpen}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/store" onClick={() => setIsOpen(false)}>Store</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink to="/gallery" onClick={() => setIsOpen(false)}>Gallery</NavLink>
          <NavLink to="/projects" onClick={() => setIsOpen(false)}>Projects</NavLink>
          <NavLink to="/movies" onClick={() => setIsOpen(false)}>Movies</NavLink>
          
          <CartIcon to="/cart" onClick={() => setIsOpen(false)}>
            🛒
            {getCartCount() > 0 && (
              <CartBadge>{getCartCount()}</CartBadge>
            )}
          </CartIcon>
          
          {isAuthenticated ? (
            <UserProfileDropdown user={user} onLogout={handleLogout} />
          ) : (
            <>
              <NavLink to="/register" onClick={() => setIsOpen(false)}>Register</NavLink>
              <NavLink to="/admin" onClick={() => setIsOpen(false)}>Admin</NavLink>
            </>
          )}
          
          <CountdownContainer>
            <CountdownTimer />
          </CountdownContainer>
        </NavMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;