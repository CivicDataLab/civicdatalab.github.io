import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
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

  @media (min-width: 1024px) {
    padding: 0 16px;
  }

  @media (min-width: 1440px) {
    padding: 0 32px;
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

const PartnersContainer = styled.div``;

const Sectors = ({ data }) => {
  const projects = data.allMarkdownRemark.nodes;

  return (
    <Layout>
      <MainGrid>
        <TitleContainer>
          <HeroText>Our Work</HeroText>
        </TitleContainer>
        <ProjectsContent>
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
