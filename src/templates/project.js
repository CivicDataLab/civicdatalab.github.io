import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import { FaTwitter, FaLinkedinIn, FaGithubAlt } from 'react-icons/fa';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Layout from '../components/Layout';
import MainGrid from '../styles/MainGrid';
import HeroText from '../styles/HeroText';
import { TitleContainer } from '../pages/sectors';

const ProjectContent = styled.div`
  grid-area: right;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    padding: 0 16px;
  }

  @media (min-width: 1440px) {
    padding: 0 32px;
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
  font-size: 25px;
  width: 75%;
  position: absolute;
  bottom: -100px;
  padding: 50px 32px;
  box-sizing: border-box;

  @media (min-width: 1024px) {
    left: -32px;
  }

  @media (min-width: 1440px) {
    font-size: 60px;
    left: -90px;
    padding: 90px;
  }
`;

const ProjectText = styled.div`
  padding: 0 32px;
  margin: 30px 0;

  a {
    display: inline-block;
    color: #05b7be;
    text-decoration: none;
    margin-top: 4px;
  }

  p:first-of-type {
    font-weight: 700;
    margin-bottom: 0;
  }

  p:last-of-type {
    margin-top: 8px;
  }

  @media (min-width: 1024px) {
    padding: 0;
    font-size: 25px;
  }

  @media (min-width: 1440px) {
    width: 50%;
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  margin-top: 20px;

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
`;

const ProjectJoinUs = styled.div`
  padding: 0 32px;
  margin: 40px 0 80px;

  p {
    margin-top: 0;
  }

  h3 {
    font-family: Bungee;
    font-size: 32px;
    width: 60px;
    display: inline-block;
    text-align: left;
    margin-bottom: 16px;
    padding-top: 16px;
    border-top: 10px solid black;
  }

  @media (min-width: 1024px) {
    padding: 0;
    width: 50%;
    font-size: 25px;

    h3 {
      font-size: 44px;
      width: max-content;
    }
  }
`;

const JoinUsButton = styled(Link)`
  display: inline-block;
  background-color: #080808;
  padding: 8px 20px;
  color: white;
  border-radius: 45px;
  cursor: pointer;
  text-decoration: none;
`;

const StyledCarousel = styled(Carousel)`
  li > div {
    max-height: 300px;
  }

  @media (min-width: 1024px) {
    li > div {
      max-height: 600px;
      margin-left: 4px;
      margin-right: 4px;
    }
  }
`;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const ProjectTemplate = ({ data }) => {
  const project = data.markdownRemark;

  return (
    <Layout>
      <MainGrid>
        <TitleContainer>
          <HeroText>{project.frontmatter.name}</HeroText>
        </TitleContainer>
        <ProjectContent>
          <ImageSection>
            <Image fluid={project.frontmatter.image.childImageSharp.fluid} />
            <SummaryText>{project.frontmatter.summary}</SummaryText>
          </ImageSection>
          <ProjectText>
            <p>Context:</p>
            <p>{project.frontmatter.context}</p>
          </ProjectText>
          <ProjectText>
            <p>Our solution:</p>
            <p>{project.frontmatter.solution}</p>
          </ProjectText>
        </ProjectContent>
      </MainGrid>
      <StyledCarousel responsive={responsive}>
        <Image fluid={project.frontmatter.image.childImageSharp.fluid} />
        <Image fluid={project.frontmatter.image.childImageSharp.fluid} />
        <Image fluid={project.frontmatter.image.childImageSharp.fluid} />
        <Image fluid={project.frontmatter.image.childImageSharp.fluid} />
      </StyledCarousel>
      <MainGrid>
        <ProjectContent>
          <ProjectText>
            <p>Check us here:</p>
            <a target="_blank" href={`https://${project.frontmatter.url}`}>
              {project.frontmatter.url}
            </a>
            <SocialLinksContainer>
              <a href="https://twitter.com" target="_blank" rel="noreferrer noopener">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener">
                <FaLinkedinIn />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer noopener">
                <FaGithubAlt />
              </a>
            </SocialLinksContainer>
          </ProjectText>
          <ProjectJoinUs>
            <h3>Join Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
            <JoinUsButton to="/openings">read more</JoinUsButton>
          </ProjectJoinUs>
        </ProjectContent>
      </MainGrid>
    </Layout>
  );
};

export default ProjectTemplate;

export const pageQuery = graphql`
  query ProjectQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        name
        summary
        context
        solution
        url
        image {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
