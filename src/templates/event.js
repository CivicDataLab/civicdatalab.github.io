import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout/Layout';
import { TitleContainer, EventsContainer, EventsContent } from '../pages/events';
import EventNav from '../components/EventNav';
import HeroText from '../styles/HeroText';
import ImageEventItem from '../components/ImageEventItem';
import WorkHomePage from '../components/WorkHomePage';
import Seo from '../components/Seo/Seo';
import useFixedScroll from '../hooks/useFixedScroll';
import MainContainer from '../styles/MainContainer';
import StandardGrid from '../styles/StandardGrid';

const EventInfo = styled.div`
  a {
    display: inline-block;
    color: #1eb0d3;
    width: 200px;
  }

  .description {
    display: none;
  }

  @media (min-width: 1024px) {
    a {
      width: 200px;
      font-size: 18px;
      line-height: 27px;
      margin-top: 20px;
    }
  }

  @media (min-width: 1280px) {
    .description {
      display: block;
      line-height: 1.5em;
      margin-top: 50px;
      width: 250px;
      font-size: 16px;
    }
  }

  @media (min-width: 1440px) {
    .description {
      font-size: 18px;
    }
  }
`;

const EventLabel = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: block;
    background-color: ${(props) => (props.color ? props.color : '#fa7fe7')};
    max-width: 180px;
    padding: 15px 26px;
    font-size: 25px;
    font-weight: 500;
  }
`;


const EventTemplate = ({ data }) => {
  const events = data.events.nodes;

  const leftContainerRef = React.useRef(null);
  const rightContainerRef = React.useRef(null);

  useFixedScroll(leftContainerRef, rightContainerRef);

  return (
    <Layout>
      <Seo title={data.markdownRemark.frontmatter.name} />
      <MainContainer>
        <StandardGrid>
          <TitleContainer ref={leftContainerRef}>
            <HeroText>
                Our Event
            </HeroText>
            <EventInfo>
              <EventLabel color={data.markdownRemark.frontmatter.color}>
                {data.markdownRemark.frontmatter.name}
              </EventLabel>
              <p className="description">
                  {data.markdownRemark.frontmatter.description}
              </p>
            </EventInfo>
          </TitleContainer>
          <EventsContent ref={rightContainerRef}>
            <EventNav />
            <EventsContainer>
              {events.map((event) => (
                <ImageEventItem
                  key={event.id}
                  url={event.fields.slug}
                  image={event.frontmatter.image.childImageSharp.fluid}
                  text={event.frontmatter.name}
                  eventName={event.frontmatter.eventtype}
                  boldText
                />
              ))}
            </EventsContainer>
          </EventsContent>
        </StandardGrid>
      </MainContainer>
      <WorkHomePage />
    </Layout>
  );
};

export default EventTemplate;

export const pageQuery = graphql`
  query EventQuery($id: String!, $nameRegex: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        name
        description
        color
        events {
          url
          title
        }
      }
    }
    events: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "eventdetail" }, eventtype: { regex: $nameRegex } } }
      sort: { fields: frontmatter___name }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          name
          eventtype
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
