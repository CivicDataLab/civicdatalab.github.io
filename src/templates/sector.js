import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { TitleContainer, ProjectsContainer, ProjectsContent } from '../pages/sectors';
import SectorNav from '../components/SectorNav';
import MainGrid from '../styles/MainGrid';
import HeroText from '../styles/HeroText';
import ImageItem from '../components/ImageItem';
import WorkHomePage from '../components/WorkHomePage';
import SliderHomePage from '../components/SliderHomePage';
import MiniTeamSection from '../components/MiniTeamSection';

const SectorInfo = styled.div`
  a {
    display: inline-block;
    color: #1eb0d3;
    width: 200px;
  }

  @media (min-width: 1024px) {
    a {
      width: 200px;
      font-size: 18px;
      line-height: 27px;
      margin-top: 20px;
    }
  }
`;

const SectorLabel = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: block;
    background-color: #fa7fe7;
    width: max-content;
    padding: 15px 26px;
    font-size: 25px;
    font-weight: 500;
  }
`;

const SectorTemplate = ({ data }) => {
  const members = data.members.nodes;
  const projects = data.projects.nodes;

  return (
    <Layout>
      <MainGrid>
        <TitleContainer>
          <HeroText>Our Work</HeroText>
          <SectorInfo>
            <SectorLabel>{data.markdownRemark.frontmatter.name}</SectorLabel>
            <a href="#">View All {data.markdownRemark.frontmatter.name} Case Studies</a>
          </SectorInfo>
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
              />
            ))}
          </ProjectsContainer>
          <MiniTeamSection members={members} />
        </ProjectsContent>
      </MainGrid>
      <div
        className="slider-wrapper"
        style={{ width: '100%', display: 'flex', overflow: 'auto', marginTop: '18px', marginBottom: '60px' }}
      >
        {data.markdownRemark.frontmatter.events?.map((event, index) => (
          <SliderHomePage
            key={event.title}
            dark={index % 2 !== 0}
            theme="true"
            project={event.project}
            title={event.title}
            link={event.url}
          />
        ))}
      </div>
      <WorkHomePage />
    </Layout>
  );
};

export default SectorTemplate;

export const pageQuery = graphql`
  query SectorQuery($id: String!, $nameRegex: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        name
        description
        color
        events {
          url
          title
          type
          project
        }
      }
    }
    members: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/team/" }, frontmatter: { sectors: { regex: $nameRegex } } }
      sort: { fields: frontmatter___name }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          name
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
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" }, frontmatter: { sector: { regex: $nameRegex } } }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          name
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
