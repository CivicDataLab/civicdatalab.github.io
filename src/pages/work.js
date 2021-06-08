import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SectorNav from '../components/SectorNav';
import MainContainer from '../styles/MainContainer';
import HeroText from '../styles/HeroText';
import ImageItem from '../components/ImageItem';
import Seo from '../components/Seo/Seo';
import useFixedScroll from '../hooks/useFixedScroll';
import StandardGrid from '../styles/StandardGrid';
import { SocialLinks } from '../components/Contact';

export const TitleContainer = styled.div`
  padding: 0;
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 40px;

  h1,
  h3 {
    text-align: left;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 10px solid black;
  }

  @media (min-width: 1024px) {
    h1 {
      border-bottom: none;
      margin-top: 16px;
    }
  }

  @media (min-width: 1280px) {
    grid-column: 1/4;
    padding-left: 0;
    padding-right: 0;

    h1 {
      padding-bottom: 0;
    }
  }
`;

export const ProjectsContent = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    padding: 0;
  }

  @media (min-width: 1280px) {
    grid-column: 4/13;
  }
`;

export const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
  margin-top: 16px;
  padding: 0;

  @media (min-width: 1024px) {
    grid-gap: 24px;
    grid-template-columns: 1fr 1fr;
    margin-top: 20px;
    margin-bottom: 150px;
  }

  @media (min-width: 2000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

// add social links below our link

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
        <StandardGrid>
          <TitleContainer ref={leftContainerRef}>
            <HeroText>Our Work</HeroText>
            <SocialLinks />
          </TitleContainer>
          <ProjectsContent ref={rightContainerRef}>
            <SectorNav />
            <ProjectsContainer>
              {projects.map((project) => (
                <ImageItem
                  key={project.id}
                  url={project.fields.slug}
                  image={project.frontmatter.image.childImageSharp.fluid}
                  text={project.frontmatter.name}
                  sectorName={project.frontmatter.sector}
                  boldText
                />
              ))}
            </ProjectsContainer>
          </ProjectsContent>
        </StandardGrid>
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
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
