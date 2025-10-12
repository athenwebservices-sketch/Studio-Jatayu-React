import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const AboutTitle = styled.h1`
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const AboutSubtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const AboutCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const AboutCardTitle = styled.h2`
  color: #667eea;
  margin-bottom: 1rem;
`;

const AboutCardText = styled.p`
  line-height: 1.6;
  color: #34495e;
`;

const TeamSection = styled.section`
  margin-top: 3rem;
`;

const TeamTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled.div`
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const TeamMemberAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
`;

const TeamMemberName = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const TeamMemberRole = styled.p`
  color: #667eea;
  margin-bottom: 1rem;
`;

const TeamMemberBio = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
`;

const About = () => {
  return (
    <AboutContainer>
      <AboutHeader>
        <AboutTitle>About Us</AboutTitle>
        <AboutSubtitle>
          We are passionate about delivering exceptional products and services to our customers worldwide.
        </AboutSubtitle>
      </AboutHeader>

      <AboutContent>
        <AboutCard>
          <AboutCardTitle>Our Mission</AboutCardTitle>
          <AboutCardText>
            To provide high-quality products at competitive prices while maintaining excellent customer service 
            and building lasting relationships with our clients. We strive to make online shopping a seamless 
            and enjoyable experience for everyone.
          </AboutCardText>
        </AboutCard>

        <AboutCard>
          <AboutCardTitle>Our Vision</AboutCardTitle>
          <AboutCardText>
            To become the most trusted e-commerce platform globally, known for our commitment to quality, 
            innovation, and customer satisfaction. We aim to continuously evolve and adapt to meet the 
            changing needs of our customers.
          </AboutCardText>
        </AboutCard>

        <AboutCard>
          <AboutCardTitle>Our Values</AboutCardTitle>
          <AboutCardText>
            Integrity, quality, innovation, and customer-centricity are at the core of everything we do. 
            We believe in transparency, ethical business practices, and creating value for all our stakeholders.
          </AboutCardText>
        </AboutCard>
      </AboutContent>

      <TeamSection>
        <TeamTitle>Meet Our Team</TeamTitle>
        <TeamGrid>
          <TeamMember>
            <TeamMemberAvatar>👨‍💼</TeamMemberAvatar>
            <TeamMemberName>John Doe</TeamMemberName>
            <TeamMemberRole>CEO & Founder</TeamMemberRole>
            <TeamMemberBio>
              With over 15 years of experience in e-commerce, John leads our team with vision and passion.
            </TeamMemberBio>
          </TeamMember>

          <TeamMember>
            <TeamMemberAvatar>👩‍💼</TeamMemberAvatar>
            <TeamMemberName>Jane Smith</TeamMemberName>
            <TeamMemberRole>COO</TeamMemberRole>
            <TeamMemberBio>
              Jane ensures smooth operations and exceptional customer service across all departments.
            </TeamMemberBio>
          </TeamMember>

          <TeamMember>
            <TeamMemberAvatar>👨‍💻</TeamMemberAvatar>
            <TeamMemberName>Mike Johnson</TeamMemberName>
            <TeamMemberRole>CTO</TeamMemberRole>
            <TeamMemberBio>
              Mike leads our technology team to deliver innovative solutions and seamless user experiences.
            </TeamMemberBio>
          </TeamMember>

          <TeamMember>
            <TeamMemberAvatar>👩‍🎨</TeamMemberAvatar>
            <TeamMemberName>Sarah Wilson</TeamMemberName>
            <TeamMemberRole>Creative Director</TeamMemberRole>
            <TeamMemberBio>
              Sarah brings creativity and design excellence to everything we create and present.
            </TeamMemberBio>
          </TeamMember>
        </TeamGrid>
      </TeamSection>
    </AboutContainer>
  );
};

export default About;