import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout/Layout';
import { FixedTitleContainer, ProjectsContainer, ProjectsContent } from '../pages/work';
import SectorNav from '../components/SectorNav';
import HeroText from '../styles/HeroText';
import ImageItem from '../components/ImageItem';
import WorkHomePage from '../components/WorkHomePage';
import SliderHomePage from '../components/SliderHomePage';
import MiniTeamSection from '../components/MiniTeamSection';
import Seo from '../components/Seo/Seo';
import useFixedScroll from '../hooks/useFixedScroll';
import MainContainer from '../styles/MainContainer';
import StandardGrid from '../styles/StandardGrid';

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

  const leftContainerRef = React.useRef(null);
  const rightContainerRef = React.useRef(null);

  useFixedScroll(leftContainerRef, rightContainerRef);

  return (
    <Layout>
      <Seo title={data.markdownRemark.frontmatter.name} />
      <MainContainer>
        <StandardGrid>
          <FixedTitleContainer ref={leftContainerRef}>
            <HeroText>Our Work</HeroText>
            <SectorInfo>
              <SectorLabel>{data.markdownRemark.frontmatter.name}</SectorLabel>
              {/* <a href="#">View All {data.markdownRemark.frontmatter.name} Case Studies</a> */}
            </SectorInfo>
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
                  boldText
                />
              ))}
            </ProjectsContainer>
            <MiniTeamSection members={members} />
          </ProjectsContent>
        </StandardGrid>
      </MainContainer>
      <div className="slider-wrapper" style={{ marginBottom: 150, width: '100%', display: 'flex', overflow: 'auto' }}>
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
      filter: { frontmatter: { type: { eq: "project" }, sector: { regex: $nameRegex } } }
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
  }
`;
