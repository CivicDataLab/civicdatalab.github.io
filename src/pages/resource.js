import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import MainContainer from '../styles/MainContainer';
import ImageEventItem from '../components/ImageEventItem';
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

export const EventsContent = styled.div`
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

export const EventsContainer = styled.div`
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

const HeroText = styled.h1`
  font-family: 'Bungee', cursive;
  font-size: 32px;
  line-height: 32px;
  color: ${(props) => (props.light ? 'white' : 'black')};
  text-transform: uppercase;
  margin: 0;
  text-align: left;
  width: min-content;

  @media (min-width: 1024px) {
    font-size: 50px;
    line-height: 60px;
  }
`;

const Resources = ({ data }) => {
  const nodes = data.allMarkdownRemark.nodes;

  const [allResources, setAllResources] = React.useState([]);

  const processNodes = () => {
    nodes.forEach((node) => {
      const sector = node.frontmatter.sector;
      const resources = node.frontmatter.resources;

      if (resources) {
        const resourcesWithSector = resources.map((resource) => ({
          ...resource,
          sector: sector
        }));
        setAllResources((prevResources) => [...prevResources, ...resourcesWithSector]);
      }
    });
  };

  React.useEffect(() => {
    processNodes();
  }, [nodes]);

  const leftContainerRef = React.useRef(null);
  const rightContainerRef = React.useRef(null);

  useFixedScroll(leftContainerRef, rightContainerRef);

  return (
    <Layout>
      <Seo title="Our Event" />
      <MainContainer>
        <StandardGrid>
          <TitleContainer ref={leftContainerRef}>
            <HeroText>Our Resources</HeroText>
            <SocialLinks />
          </TitleContainer>
          <EventsContent ref={rightContainerRef}>
            <EventsContainer>
              {allResources.length > 0 ? (
                allResources.map((res) => (
                  <ImageEventItem boldText url={res.link} text={res.title} eventName={res.sector} />
                ))
              ) : (
                 null
              )}
            </EventsContainer>
          </EventsContent>
        </StandardGrid>
      </MainContainer>
    </Layout>
  );
};

export default Resources;

export const pageQuery = graphql`
  query ResourceCompQuery {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "project" } } }, sort: { fields: frontmatter___name }) {
      nodes {
        id

        fields {
          slug
        }
        frontmatter {
          name
          resources {
            title
            link
            type
          }
          sector
        }
      }
    }
  }
`;
