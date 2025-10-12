import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease 0.2s;
  animation-fill-mode: both;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: #ffd700;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease 0.4s;
  animation-fill-mode: both;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 0;
  background: #f8f9fa;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
`;

const ProductsSection = styled.section`
  padding: 4rem 0;
`;

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.p`
  color: #667eea;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ProductButton = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;
  
  &:hover {
    background: #5a67d8;
  }
`;

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Mock products data
    const mockProducts = [
      { id: 1, name: 'Premium Laptop', price: 999, icon: '💻' },
      { id: 2, name: 'Wireless Headphones', price: 199, icon: '🎧' },
      { id: 3, name: 'Smart Watch', price: 299, icon: '⌚' },
      { id: 4, name: 'Camera', price: 799, icon: '📷' },
    ];
    setProducts(mockProducts);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Welcome to Our E-Commerce Store</HeroTitle>
          <HeroSubtitle>Discover amazing products at unbeatable prices</HeroSubtitle>
          <CTAButton to="/store">Shop Now</CTAButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>Why Choose Us</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>🚚</FeatureIcon>
              <FeatureTitle>Fast Delivery</FeatureTitle>
              <FeatureDescription>
                Free shipping on orders over $50. Quick and reliable delivery to your doorstep.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>💎</FeatureIcon>
              <FeatureTitle>Quality Products</FeatureTitle>
              <FeatureDescription>
                We offer only the highest quality products from trusted brands and manufacturers.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🔒</FeatureIcon>
              <FeatureTitle>Secure Payment</FeatureTitle>
              <FeatureDescription>
                Your payment information is safe with our encrypted and secure payment system.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <ProductsSection>
        <ProductsContainer>
          <SectionTitle>Featured Products</SectionTitle>
          <ProductsGrid>
            {products.map(product => (
              <ProductCard key={product.id}>
                <ProductImage>{product.icon}</ProductImage>
                <ProductInfo>
                  <ProductTitle>{product.name}</ProductTitle>
                  <ProductPrice>${product.price}</ProductPrice>
                  <ProductButton to={`/product/${product.id}`}>
                    View Details
                  </ProductButton>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsGrid>
        </ProductsContainer>
      </ProductsSection>
    </div>
  );
};

export default Home;