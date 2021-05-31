import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SectorNav from '../components/SectorNav';
import MainGrid from '../styles/MainGrid';
import MainContainer from '../styles/MainContainer';
import HeroText from '../styles/HeroText';
import ImageItem from '../components/ImageItem';
import Seo from '../components/Seo/Seo';
import useFixedScroll from '../hooks/useFixedScroll';

export const TitleContainer = styled.div`
  grid-area: left;
  padding: 0 32px;
  font-size: 16px;
  margin-bottom: 10px;

  h1,
  h3 {
    text-align: left;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 10px solid black;
  }

  @media (min-width: 1024px) {
    max-width: 60%;

    h1 {
      border-bottom: none;
      margin-top: 16px;
    }
  }

  @media (min-width: 1280px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const FixedTitleContainer = styled(TitleContainer)`
  @media (min-width: 1280px) {
    position: fixed;
  }
`;

export const ProjectsContent = styled.div`
  grid-area: right;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;
  margin-bottom: 80px;

  @media (min-width: 1024px) {
    padding: 0 16px;
  }

  @media (min-width: 1280px) {
    padding: 0;
  }
`;

export const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
  margin-top: 16px;
  padding: 0 16px;

  @media (min-width: 1024px) {
    grid-gap: 24px;
    grid-template-columns: 1fr 1fr;
    margin-top: 56px;
    margin-bottom: 150px;
  }

  @media (min-width: 2000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

// const PartnersContainer = styled.div``;

const Sectors = ({ data }) => {
  const projects = data.allMarkdownRemark.nodes;

  const leftContainerRef = React.useRef(null);
  const rightContainerRef = React.useRef(null);

  useFixedScroll(leftContainerRef, rightContainerRef);

  return (
    <Layout>
      <Seo title="Our Work" />
      <MainContainer>
        <MainGrid>
          <FixedTitleContainer ref={leftContainerRef}>
            <HeroText>Our Work</HeroText>
          </FixedTitleContainer>
          <ProjectsContent ref={rightContainerRef}>
            <SectorNav />
            <ProjectsContainer>
              {projects.map((project) => (
                <ImageItem
                  key={project.id}
                  url={project.fields.slug}
                  image={project.frontmatter.image.childImageSharp.fluid}
                  text={project.frontmatter.name}
                  sector={project.frontmatter.sector}
                  boldText
                />
              ))}
            </ProjectsContainer>
          </ProjectsContent>
        </MainGrid>
      </MainContainer>
    </Layout>
  );
};

export default Sectors;

export const pageQuery = graphql`
  query ProjectsQuery {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "project" } } }, sort: { fields: frontmatter___name }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          name
          sector
          image {
            childImageSharp {
              fluid(maxWidth: 800, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`;
