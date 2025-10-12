import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #ffd700;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  ul {
    list-style: none;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #ecf0f1;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ffd700;
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  text-align: center;
  color: #bdc3c7;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    &:hover {
      background: #ffd700;
      color: #2c3e50;
      transform: translateY(-3px);
    }
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  
  input {
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    
    &::placeholder {
      color: #bdc3c7;
    }
  }
  
  button {
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    background: #ffd700;
    color: #2c3e50;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
    
    &:hover {
      background: #f39c12;
    }
  }
`;

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert('Thank you for subscribing!');
    e.target.reset();
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About Us</h3>
          <p>
            We are a leading e-commerce platform providing quality products and exceptional service to our customers worldwide.
          </p>
          <SocialIcons>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </SocialIcons>
        </FooterSection>
        
        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/store">Store</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/movies">Movies</Link></li>
          </ul>
        </FooterSection>
        
        <FooterSection>
          <h3>Customer Service</h3>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/returns">Returns</Link></li>
          </ul>
        </FooterSection>
        
        <FooterSection>
          <h3>Newsletter</h3>
          <p>Subscribe to get special offers and updates</p>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
            <button type="submit">Subscribe</button>
          </NewsletterForm>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; 2024 E-Commerce Platform. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;