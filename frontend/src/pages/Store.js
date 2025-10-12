import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const StoreContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 20px;
`;

const StoreHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StoreTitle = styled.h1`
  color: #2c3e50;
`;

const SearchAndFilter = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  width: 300px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SortSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#5a67d8' : '#f8f9fa'};
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  position: relative;
`;

const ProductBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #e74c3c;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #7f8c8d;
  font-size: 1rem;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #f39c12;
`;

const ProductButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ProductButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
`;

const AddToCartButton = styled(ProductButton)`
  background: #667eea;
  color: white;
  
  &:hover {
    background: #5a67d8;
  }
`;

const ViewDetailsButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0.5rem;
  background: #f8f9fa;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;
  
  &:hover {
    background: #e9ecef;
  }
`;

const NoProducts = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Store = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    // Mock product data
    const mockProducts = [
      { 
        id: 1, 
        name: 'Premium Laptop', 
        price: 999, 
        originalPrice: 1299,
        category: 'Electronics', 
        rating: 4.5, 
        reviews: 128,
        badge: 'Sale',
        icon: '💻',
        description: 'High-performance laptop with latest features'
      },
      { 
        id: 2, 
        name: 'Wireless Headphones', 
        price: 199, 
        originalPrice: null,
        category: 'Audio', 
        rating: 4.3, 
        reviews: 89,
        badge: null,
        icon: '🎧',
        description: 'Premium noise-cancelling headphones'
      },
      { 
        id: 3, 
        name: 'Smart Watch', 
        price: 299, 
        originalPrice: 399,
        category: 'Wearables', 
        rating: 4.7, 
        reviews: 234,
        badge: 'Hot',
        icon: '⌚',
        description: 'Feature-rich smartwatch with health tracking'
      },
      { 
        id: 4, 
        name: 'Camera', 
        price: 799, 
        originalPrice: null,
        category: 'Electronics', 
        rating: 4.8, 
        reviews: 156,
        badge: null,
        icon: '📷',
        description: 'Professional DSLR camera'
      },
      { 
        id: 5, 
        name: 'Tablet', 
        price: 499, 
        originalPrice: 599,
        category: 'Electronics', 
        rating: 4.4, 
        reviews: 98,
        badge: 'Sale',
        icon: '📱',
        description: 'High-resolution tablet for work and entertainment'
      },
      { 
        id: 6, 
        name: 'Gaming Console', 
        price: 399, 
        originalPrice: null,
        category: 'Gaming', 
        rating: 4.6, 
        reviews: 312,
        badge: 'New',
        icon: '🎮',
        description: 'Latest gaming console with 4K support'
      },
      { 
        id: 7, 
        name: 'Bluetooth Speaker', 
        price: 79, 
        originalPrice: null,
        category: 'Audio', 
        rating: 4.2, 
        reviews: 67,
        badge: null,
        icon: '🔊',
        description: 'Portable waterproof speaker'
      },
      { 
        id: 8, 
        name: 'Fitness Tracker', 
        price: 149, 
        originalPrice: 199,
        category: 'Wearables', 
        rating: 4.1, 
        reviews: 145,
        badge: 'Sale',
        icon: '🏃',
        description: 'Advanced fitness and health tracker'
      },
    ];
    
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const categories = ['all', 'Electronics', 'Audio', 'Wearables', 'Gaming'];

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('✨');
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push('☆');
    }
    
    return stars.join('');
  };

  return (
    <StoreContainer>
      <StoreHeader>
        <StoreTitle>Our Store</StoreTitle>
        <SearchAndFilter>
          <SearchInput
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </SortSelect>
        </SearchAndFilter>
      </StoreHeader>

      <FilterButtons>
        {categories.map(category => (
          <FilterButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </FilterButton>
        ))}
      </FilterButtons>

      {filteredProducts.length === 0 ? (
        <NoProducts>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </NoProducts>
      ) : (
        <ProductsGrid>
          {filteredProducts.map(product => (
            <ProductCard key={product.id}>
              <ProductImage>
                {product.icon}
                {product.badge && (
                  <ProductBadge>{product.badge}</ProductBadge>
                )}
              </ProductImage>
              <ProductInfo>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductPrice>
                  <CurrentPrice>${product.price}</CurrentPrice>
                  {product.originalPrice && (
                    <OriginalPrice>${product.originalPrice}</OriginalPrice>
                  )}
                </ProductPrice>
                <ProductRating>
                  <span>{renderStars(product.rating)}</span>
                  <span>({product.reviews})</span>
                </ProductRating>
                <ProductButtons>
                  <AddToCartButton onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </AddToCartButton>
                  <ViewDetailsButton to={`/product/${product.id}`}>
                    View Details
                  </ViewDetailsButton>
                </ProductButtons>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      )}
    </StoreContainer>
  );
};

export default Store;