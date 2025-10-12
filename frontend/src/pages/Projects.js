import React, { useState } from 'react';
import styled from 'styled-components';

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 20px;
`;

const ProjectsTitle = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const ProjectCategory = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 15px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.5rem;
  background: #f8f9fa;
  color: #6c757d;
  border-radius: 5px;
  font-size: 0.8rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ProjectStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ecf0f1;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-weight: bold;
  color: #2c3e50;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #7f8c8d;
`;

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      description: 'A full-featured e-commerce platform with user authentication, payment processing, and inventory management.',
      icon: '🛒',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: 'https://github.com/example/ecommerce',
      stars: 245,
      forks: 89,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'mobile',
      description: 'A mobile application for task management with real-time collaboration and notifications.',
      icon: '📱',
      tags: ['React Native', 'Firebase', 'Redux'],
      link: 'https://github.com/example/taskapp',
      stars: 156,
      forks: 45,
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Data Analytics Dashboard',
      category: 'data',
      description: 'An interactive dashboard for data visualization and business intelligence analytics.',
      icon: '📊',
      tags: ['Python', 'Django', 'D3.js', 'PostgreSQL'],
      link: 'https://github.com/example/analytics',
      stars: 312,
      forks: 98,
      status: 'completed'
    },
    {
      id: 4,
      title: 'AI Chatbot',
      category: 'ai',
      description: 'An intelligent chatbot powered by machine learning for customer support automation.',
      icon: '🤖',
      tags: ['Python', 'TensorFlow', 'NLP', 'Flask'],
      link: 'https://github.com/example/chatbot',
      stars: 428,
      forks: 156,
      status: 'in-progress'
    },
    {
      id: 5,
      title: 'Social Media Platform',
      category: 'web',
      description: 'A social networking platform with real-time messaging, content sharing, and community features.',
      icon: '🌐',
      tags: ['Vue.js', 'Socket.io', 'Express', 'MySQL'],
      link: 'https://github.com/example/social',
      stars: 567,
      forks: 234,
      status: 'completed'
    },
    {
      id: 6,
      title: 'IoT Home Automation',
      category: 'iot',
      description: 'Smart home automation system with IoT devices and mobile app control.',
      icon: '🏠',
      tags: ['Arduino', 'Raspberry Pi', 'MQTT', 'React'],
      link: 'https://github.com/example/iot-home',
      stars: 189,
      forks: 67,
      status: 'in-progress'
    }
  ]);

  const categories = ['all', 'web', 'mobile', 'data', 'ai', 'iot'];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
  };

  return (
    <ProjectsContainer>
      <ProjectsTitle>Our Projects</ProjectsTitle>
      
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

      <ProjectsGrid>
        {filteredProjects.map(project => (
          <ProjectCard key={project.id}>
            <ProjectImage>{project.icon}</ProjectImage>
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectCategory>{project.category}</ProjectCategory>
              <ProjectDescription>
                {project.description}
              </ProjectDescription>
              <ProjectTags>
                {project.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </ProjectTags>
              <ProjectLink 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Project →
              </ProjectLink>
              <ProjectStats>
                <Stat>
                  <StatValue>⭐ {project.stars}</StatValue>
                  <StatLabel>Stars</StatLabel>
                </Stat>
                <Stat>
                  <StatValue>🍴 {project.forks}</StatValue>
                  <StatLabel>Forks</StatLabel>
                </Stat>
                <Stat>
                  <StatValue>
                    {project.status === 'completed' ? '✅' : '🔄'}
                  </StatValue>
                  <StatLabel>
                    {project.status === 'completed' ? 'Done' : 'In Progress'}
                  </StatLabel>
                </Stat>
              </ProjectStats>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
};

export default Projects;