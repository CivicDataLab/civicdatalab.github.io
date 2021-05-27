import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../theme/theme';
import { Section } from './index';
import Footer from '../components/Layout/Footer';
import Navbar from '../components/Layout/Navbar';
import TeamHomePage from '../components/TeamHomePage';
import WorkHomePage from '../components/WorkHomePage';
import HeroText from '../styles/HeroText';
import Value from '../components/Value';
import SectorCard from '../components/SectorCard';
import Seo from '../components/Seo/Seo';

const AboutSection = styled.div`
  padding: 48px 20px;

  @media (min-width: 1280px) {
    padding: 48px 86px;
  }
`;

const HeroSection = styled(Section)`
  height: 40vh;
  color: white;
  padding-top: 100px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: transparent;

  @media (min-width: 550px) {
    height: 50vh;
  }

  @media (min-width: 1024px) {
    padding-top: 140px;
    height: 60vh;
  }
`;

const StorySection = styled(AboutSection)`
  background-color: rgba(178, 201, 220, 0.27);
  padding: 48px 20px;

  div:first-of-type {
    max-width: 480px;
  }

  .image {
    display: none;
  }

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 50% 50%;

    .image {
      width: 500px;
      height: 400px;
    }
  }

  @media (min-width: 1280px) {
    padding: 48px 86px;
  }
`;

const ValuesSection = styled(AboutSection)`
  display: flex;
  flex-direction: column;
`;

const AboutCardsSection = styled(AboutSection)`
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 1fr;
  row-gap: 45px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 24px;
  }

  @media (min-width: 1280px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 85px;
  }
`;

const About = ({ data }) => {
  const values = data.allMarkdownRemark.edges;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Seo title="About" />
      <main>
        <BackgroundImage fluid={data.landingImage.childImageSharp.fluid}>
          <Navbar dark />
          <HeroSection />
        </BackgroundImage>
        <StorySection>
          <div>
            <HeroText>Our Story</HeroText>
            <p>
              CivicDataLab works with the goal of harnessing data, tech, design and social science to strengthen the
              course of civic engagements in India.
            </p>
            <p>
              We believe in sowing seeds of change, trust and opportunities to enable citizens to engage better with
              public reforms.
            </p>
          </div>
          <div className="image story-image"></div>
        </StorySection>
        <ValuesSection>
          <div>
            <HeroText>Our Values</HeroText>
          </div>
          <div>
            {values.map((value) => (
              <Value
                key={value.node.id}
                number={value.node.frontmatter.number}
                title={value.node.frontmatter.title}
                bodyHTML={value.node.html}
              />
            ))}
          </div>
        </ValuesSection>
        <TeamHomePage />
        <WorkHomePage />
        {/* <AboutCardsSection>
          <SectorCard
            name="Brand Assets"
            image={data.assetsCover.childImageSharp.fluid}
            description="Looking for our logo and official colours?"
            color="#000"
            link=""
            about
          />
          <SectorCard
            name="Blogs"
            image={data.blogsCover.childImageSharp.fluid}
            description="Want to know of our experiences and insights on work and life?"
            color="#000"
            link=""
            about
          />
        </AboutCardsSection> */}
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default About;

export const pageQuery = graphql`
  query AboutPageQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/values/" } }, sort: { fields: frontmatter___number }) {
      edges {
        node {
          id
          frontmatter {
            number
            title
          }
          html
        }
      }
    }
    blogsCover: file(relativePath: { eq: "blogs.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    assetsCover: file(relativePath: { eq: "assets.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    landingImage: file(relativePath: { eq: "about.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1025, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;
