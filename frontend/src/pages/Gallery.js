import React, { useState } from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 20px;
`;

const GalleryTitle = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const GalleryItem = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const GalleryImage = styled.div`
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
`;

const GalleryInfo = styled.div`
  padding: 1rem;
  background: white;
`;

const GalleryItemTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const GalleryItemDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
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

const LoadMoreButton = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #5a67d8;
  }
`;

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [items, setItems] = useState([
    { id: 1, title: 'Product Showcase', category: 'products', description: 'Latest product collection', icon: '📱' },
    { id: 2, title: 'Team Building', category: 'events', description: 'Company team activities', icon: '👥' },
    { id: 3, title: 'Office Space', category: 'office', description: 'Our modern workspace', icon: '🏢' },
    { id: 4, title: 'Technology', category: 'tech', description: 'Cutting-edge solutions', icon: '💻' },
    { id: 5, title: 'Customer Success', category: 'customers', description: 'Happy customers', icon: '😊' },
    { id: 6, title: 'Innovation Lab', category: 'tech', description: 'R&D department', icon: '🔬' },
    { id: 7, title: 'Product Launch', category: 'events', description: 'New product release', icon: '🚀' },
    { id: 8, title: 'Meeting Room', category: 'office', description: 'Collaboration space', icon: '🤝' },
    { id: 9, title: 'Awards', category: 'achievements', description: 'Our achievements', icon: '🏆' },
  ]);

  const categories = ['all', 'products', 'events', 'office', 'tech', 'customers', 'achievements'];

  const filteredItems = activeFilter === 'all' 
    ? items 
    : items.filter(item => item.category === activeFilter);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
  };

  const loadMore = () => {
    // Simulate loading more items
    const newItems = [
      { id: items.length + 1, title: 'New Item 1', category: 'products', description: 'Description', icon: '📦' },
      { id: items.length + 2, title: 'New Item 2', category: 'events', description: 'Description', icon: '🎉' },
    ];
    setItems([...items, ...newItems]);
  };

  return (
    <GalleryContainer>
      <GalleryTitle>Gallery</GalleryTitle>
      
      <FilterButtons>
        {categories.map(category => (
          <FilterButton
            key={category}
            active={activeFilter === category}
            onClick={() => handleFilterChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </FilterButton>
        ))}
      </FilterButtons>

      <GalleryGrid>
        {filteredItems.map(item => (
          <GalleryItem key={item.id}>
            <GalleryImage>{item.icon}</GalleryImage>
            <GalleryInfo>
              <GalleryItemTitle>{item.title}</GalleryItemTitle>
              <GalleryItemDescription>{item.description}</GalleryItemDescription>
            </GalleryInfo>
          </GalleryItem>
        ))}
      </GalleryGrid>

      <LoadMoreButton>
        <Button onClick={loadMore}>Load More</Button>
      </LoadMoreButton>
    </GalleryContainer>
  );
};

export default Gallery;