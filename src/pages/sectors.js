import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SectorNav from '../components/SectorNav';
import MainGrid from '../styles/MainGrid';
import HeroText from '../styles/HeroText';
import ImageItem from '../components/ImageItem';

export const TitleContainer = styled.div`
  grid-area: left;
  padding: 0 32px;
  font-size: 16px;
  margin-bottom: 10px;

  h1, h3 {
    text-align: left;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 10px solid black;
  }

  @media (min-width: 1024px) {
    width: 60%;

    h1 {
      border-bottom: none;
      margin-top: 16px;
    }
  }

  @media (min-width: 1280px) {
    padding-left: 72px;
    padding-right: 72px;
  }
`;

export const ProjectsContent = styled.div`
  grid-area: right;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;
  margin-bottom: 80px;

  @media(min-width: 1024px) {
    padding: 0 16px;
  }

  @media(min-width: 1440px) {
    padding: 0 32px;
  }
`;

export const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
  margin-top: 16px;
  padding: 0 16px;

  @media(min-width: 1024px) {
    grid-gap: 24px;
    grid-template-columns: 1fr 1fr;
    margin-top: 56px;
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
      {/* <MainGrid>
        <TitleContainer>
          <h3>Partners</h3>
        </TitleContainer>
        <PartnersContainer>

        </PartnersContainer>
      </MainGrid> */}
    </Layout>
  );
};

export default Sectors;
