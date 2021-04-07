import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { TitleContainer, ProjectsContainer, ProjectsContent } from '../pages/sectors';
import SectorNav from '../components/SectorNav';
import MainGrid from '../styles/MainGrid';
import HeroText from '../styles/HeroText';
import ImageItem from '../components/ImageItem';
import WorkHomePage from '../components/WorkHomePage';
import SliderHomePage from '../components/SliderHomePage';

const SectorTemplate = ({ data }) => {
  const teamMembers = data.allMarkdownRemark.edges;

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
      <div
        className="slider-wrapper"
        style={{ width: '100%', display: 'flex', overflow: 'auto', marginTop: '18px', marginBottom: '60px' }}
      >
        {[1, 1, 1].map((element, index) => {
          return <SliderHomePage key={index} dark={index % 2 !== 0} theme="true" />;
        })}
      </div>
      <WorkHomePage />
    </Layout>
  );
};

export default SectorTemplate;

export const pageQuery = graphql`
  query SectorQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        name
        description
        color
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/team/" }, frontmatter: { sectors: { regex: "/Education/" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            name
            description
          }
        }
      }
    }
  }
`;
