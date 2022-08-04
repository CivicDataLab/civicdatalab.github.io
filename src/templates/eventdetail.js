import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { FaTwitter, FaLinkedinIn, FaGithubAlt, FaYoutube, FaFacebook } from 'react-icons/fa';

import Layout from '../components/Layout/Layout';
import HeroText from '../styles/HeroText';
import { TitleContainer } from '../pages/events';
import MiniTeamSection from '../components/MiniTeamSection';
import Seo from '../components/Seo/Seo';
import useFixedScroll from '../hooks/useFixedScroll';
import MainContainer from '../styles/MainContainer';
import StandardGrid from '../styles/StandardGrid';
import Resources from '../components/Resources';
import MarkdownView from 'react-showdown';

const EventDetailTitleContainer = styled(TitleContainer)`
  @media (min-width: 1280px) {
    h1 {
      overflow-wrap: break-word;
      font-size: 45px;
      line-height: 1em;
      width: 380px;
    }
  }

  @media (min-width: 1920px) {
    h1 {
      font-size: 45px;
      font-weight: 1em;
      min-width: 350px;
    }
  }
`;

const EventDetailContent = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    padding: 0 16px;
  }

  @media (min-width: 1280px) {
    grid-column: 5/13;
  }

  @media (min-width: 1440px) {
    padding: 0;
  }

  @media (min-width: 1920px) {
    grid-column: 4/13;
  }
`;

const ImageSection = styled.div`
  position: relative;
  margin-bottom: 80px;

  .gatsby-image-wrapper {
    max-height: 400px;
  }

  @media (min-width: 1280px) {
    .gatsby-image-wrapper {
      max-height: 750px;
    }
  }
`;

const SummaryText = styled.div`
  background-color: #dded1b;
  font-weight: 500;
  font-size: 20px;
  width: 85%;
  position: absolute;
  bottom: -100px;
  padding: 20px 24px;
  box-sizing: border-box;

  @media (min-width: 834px) {
    left: 0px;
    font-size: 24px;
    bottom: -50px;
  }

  @media (min-width: 1024px) {
    left: -32px;
  }

  @media (min-width: 1280px) {
    font-size: 35px;
  }

  @media (min-width: 1440px) {
    line-height: 1.5em;
    left: -30px;
    bottom: -100px;
    padding: 45px;
  }

  @media (min-width: 1600px) {
    font-size: 45px;
    padding: 60px;
  }
`;

const EventDetailText = styled.div`
  padding: 0;
  margin: 30px 0;

  a {
    display: inline-block;
    color: #05b7be;
    text-decoration: none;
    margin-top: 4px;
  }

  p {
    line-height: 1.5em;
    font-size: 18px;
  }

  > p {
    font-weight: 700;
    margin-bottom: 0;
  }

  > div p {
    margin-top: 8px;
  }

  @media (min-width: 1024px) {
    padding: 0;
    margin: 40px 0;
  }

  @media (min-width: 1440px) {
    width: 50%;

    p {
      font-size: 20px;
    }
  }
`;

const LeftText = styled.div`
  margin: 30px 0;
  padding: ${(props) => (props.mobile ? '0 32px' : '0')};
  display: ${(props) => (props.mobile ? 'block' : 'none')};
  text-align: ${(props) => (props.mobile ? 'center' : 'left')};

  a {
    display: inline-block;
    color: #05b7be;
    text-decoration: none;
    margin-top: 4px;
  }

  p {
    line-height: 1.5em;
    font-size: 18px;
  }

  p:first-of-type {
    font-weight: 700;
    margin-bottom: 0;
  }

  p:last-of-type {
    margin-top: 8px;
  }

  .btn-newsletter {
    margin-top: 12px;
    padding: 12px 18px;
    background-color: #1dcccc;
    color: black;
    font-weight: 500;
    border-radius: 12px;
  }

  @media (min-width: 1024px) {
    display: ${(props) => (props.mobile ? 'none' : 'block')};
    padding: 0;
    margin: 36px 0;

    a {
      max-width: 250px;
      word-wrap: break-word;
    }
  }

  @media (min-width: 1440px) {
    p {
      font-size: 20px;
    }
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: ${(props) => (props.mobile ? 'center' : 'start')};

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background-color: black;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    color: white;
    margin-right: 12px;
  }

  @media (min-width: 1024px) {
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

const EventDetailTemplate = ({ data }) => {
  const eventdetail = data.markdownRemark;

  const { twitter, linkedin, github, youtube, facebook, url, solution, aim, resources, newsletter } = eventdetail.frontmatter;

  const leftContainerRef = React.useRef(null);
  const rightContainerRef = React.useRef(null);

  useFixedScroll(leftContainerRef, rightContainerRef, 750);

  return (
    <Layout>
      <Seo title={eventdetail.frontmatter.name} />
      <MainContainer>
        <StandardGrid>
          <EventDetailTitleContainer ref={leftContainerRef}>
            <HeroText>
                {eventdetail.frontmatter.name}
            </HeroText>

            <LeftText>
              {url && (
                <>
                  <p>Check our event here:</p>
                  <a target="_blank" rel="noreferrer noopener" href={url}>
                    {url}
                  </a>
                </>
              )}
              <SocialLinksContainer>
                {twitter && (
                  <a href={twitter} target="_blank" rel="noreferrer noopener">
                    <FaTwitter />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noreferrer noopener">
                    <FaLinkedinIn />
                  </a>
                )}
                {facebook && (
                  <a href={facebook} target="_blank" rel="noreferrer noopener">
                    <FaFacebook />
                  </a>
                )}
                {github && (
                  <a href={github} target="_blank" rel="noreferrer noopener">
                    <FaGithubAlt />
                  </a>
                )}
                {youtube && (
                  <a href={youtube} target="_blank" rel="noreferrer noopener">
                    <FaYoutube />
                  </a>
                )}
              </SocialLinksContainer>
            </LeftText>

            {newsletter && (
              <LeftText>
                <p>Subscribe to our newsletter:</p>
                <a className="btn-newsletter" href={newsletter}>
                  Subscribe
                </a>
              </LeftText>
            )}
          </EventDetailTitleContainer>
          <EventDetailContent ref={rightContainerRef}>
            <ImageSection>
              <Image fluid={eventdetail.frontmatter.image.childImageSharp.fluid} />
              <SummaryText>{eventdetail.frontmatter.summary}</SummaryText>
            </ImageSection>
            <EventDetailText>
              <p>Context:</p>
              {eventdetail.frontmatter.context ? (
                <MarkdownView markdown={eventdetail.frontmatter.context} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: eventdetail.html }} />
              )}
            </EventDetailText>
            {aim && (
              <EventDetailText>
                <p>Aim:</p>
                <MarkdownView markdown={aim} />
              </EventDetailText>
            )}
            {solution && (
              <EventDetailText>
                <p>Our solution:</p>
                <MarkdownView markdown={solution} />
              </EventDetailText>
            )}

            <LeftText mobile>
              <p>Check our work here:</p>
              <a target="_blank" rel="noreferrer noopener" href={`https://${url}`}>
                {url}
              </a>
              <SocialLinksContainer mobile>
                {twitter && (
                  <a href={twitter} target="_blank" rel="noreferrer noopener">
                    <FaTwitter />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noreferrer noopener">
                    <FaLinkedinIn />
                  </a>
                )}
                {facebook && (
                  <a href={facebook} target="_blank" rel="noreferrer noopener">
                    <FaFacebook />
                  </a>
                )}
                {github && (
                  <a href={github} target="_blank" rel="noreferrer noopener">
                    <FaGithubAlt />
                  </a>
                )}
                {youtube && (
                  <a href={youtube} target="_blank" rel="noreferrer noopener">
                    <FaYoutube />
                  </a>
                )}
              </SocialLinksContainer>
            </LeftText>
          </EventDetailContent>
        </StandardGrid>
      </MainContainer>
      <MainContainer>
        <StandardGrid>
          <EventDetailContent>
            {resources && <Resources resources={resources} />}
          </EventDetailContent>
        </StandardGrid>
      </MainContainer>
    </Layout>
  );
};

export default EventDetailTemplate;

export const pageQuery = graphql`
  query EventDetailQuery($id: String!, $nameRegex: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
        summary
        context
        aim
        solution
        url
        github
        twitter
        linkedin
        youtube
        facebook
        newsletter
        resources {
          link
          title
          type
        }
        image {
          childImageSharp {
            fluid(maxWidth: 1200, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    partners: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projectpart/" }, frontmatter: { projects: { regex: $nameRegex } } }
      sort: { fields: frontmatter___name }
    ) {
      nodes {
        id
        frontmatter {
          name
          website
          logo {
            childImageSharp {
              fixed(width: 110) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
        }
      }
    }
  }
`;