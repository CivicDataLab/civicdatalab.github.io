import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SectorNav from '../components/SectorNav';
import MainGrid from '../styles/MainGrid';
import HeroText from '../styles/HeroText';
import ImageItem from '../components/ImageItem';

const TitleContainer = styled.div`
  grid-area: left;
  padding: 0 32px;
  font-size: 16px;

  h1, h3 {
    width: 100%;
    text-align: center;
    margin-bottom: 16px;
  }

  @media (min-width: 768px) {
    h1 {
      margin-top: 96px;
    }
  }

  @media (min-width: 1024px) {
    width: 60%;
  }
`;

const ProjectsContent = styled.div`
  grid-area: right;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;
  padding: 0 8px;

  @media(min-width: 1024px) {
    padding: 0 16px;
  }

  @media(min-width: 1440px) {
    padding: 0 32px;
  }
`;

const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  margin-top: 16px;

  @media(min-width: 1024px) {
    grid-gap: 24px;
  }
`;

const PartnersContainer = styled.div`

`

const Sectors = () => {
  return (
    <Layout>
      <MainGrid>
        <TitleContainer>
          <HeroText>Our Work</HeroText>
        </TitleContainer>
        <ProjectsContent>
          <SectorNav />
          <ProjectsContainer>
            {Array.apply(null, Array(8)).map((item, index) => (
              <ImageItem key={index} image="" text="Hello this is a sample text for images" />
            ))}
          </ProjectsContainer>
        </ProjectsContent>
      </MainGrid>
      <MainGrid>
        <TitleContainer>
          <h3>Partners</h3>
        </TitleContainer>
        <PartnersContainer>

        </PartnersContainer>
      </MainGrid>
    </Layout>
  );
};

export default Sectors;
