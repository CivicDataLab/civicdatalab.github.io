import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import Image from 'gatsby-image';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../theme/theme';
import { Section } from './index';
import { CivicDays } from './team';
import Footer from '../components/Layout/Footer';
import Navbar from '../components/Layout/Navbar';
import TeamHomePage from '../components/TeamHomePage';
import WorkHomePage from '../components/WorkHomePage';
import HeroText from '../styles/HeroText';
import MainContainer from '../styles/MainContainer';
import Value from '../components/Value';
import Seo from '../components/Seo/Seo';
import StandardGrid from '../styles/StandardGrid';
import OurPillars from '../components/OurPillars';

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

const StorySection = styled.div`
  background-color: rgba(178, 201, 220, 0.27);
  padding: 48px 0;

  p {
    line-height: 1.5em;
  }

  .description-text {
    margin-top: 40px;
  }

  @media (min-width: 1280px) {
    padding: 80px 0;

    .description-text {
      margin-top: 60px;
      width: 60%;
    }
  }

  @media (min-width: 1440px) {
    padding: 100px 0;
  }
`;

const ThreeGrid = styled(StandardGrid)`
  @media (min-width: 1280px) {
    padding: 40px 0;
    > * {
      grid-column: span 4;
    }
  }
`;

const TwoGrid = styled(StandardGrid)`
  .gatsby-image-wrapper {
    height: 100%;
    width: 60%;
    margin: auto;
  }

  @media (min-width: 1280px) {
    padding: 40px 0;
    > * {
      grid-column: span 6;
    }

    .gatsby-image-wrapper {
      height: 83%;
      width: 50%;
      margin: auto;
    }
  }
`;

const ValuesSection = styled.div`
  @media (min-width: 1280px) {
    padding-top: 80px;
  }

  @media (min-width: 1440px) {
    padding-top: 100px;
  }
`;

const About = ({ data }) => {
  const values = data.allMarkdownRemark.edges;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Seo title="About" />
      <main>
        <BackgroundImage style={{ zIndex: 999 }} fluid={data.landingImage.childImageSharp.fluid}>
          <Navbar dark />
          <HeroSection />
        </BackgroundImage>
        <StorySection>
          <MainContainer>
            <div>
              <HeroText>About Us</HeroText>
              <ThreeGrid>
                <p>
                  We are a research lab working on the intersection use data, tech, design and social science to
                  strengthen the course of civic engagements in India.
                </p>
                <p>
                  We work to harness the potential of open knowledge movements and better enable citizens to engage in
                  matters of public reform.
                </p>
                <p>
                  We aim to grow data and tech literacy of governments, non-profits, think-tanks, media houses,
                  universities, and more to enable data-driven decision making at scale.
                </p>
              </ThreeGrid>
            </div>
          </MainContainer>
        </StorySection>
        <OurPillars />
        <StorySection>
          <MainContainer>
            <div>
              <HeroText>Open by default</HeroText>
              <p class="description-text">
                One of our key beliefs is to ensure all our work is open and free for everyone to use, build on and
                share.
              </p>
              <TwoGrid>
                <Image fluid={data.openData.childImageSharp.fluid} />
                <Image fluid={data.openSource.childImageSharp.fluid} />
              </TwoGrid>
            </div>
          </MainContainer>
        </StorySection>
        <MainContainer>
          <ValuesSection>
            <div>
              <HeroText>Our Values</HeroText>
            </div>
            <ThreeGrid>
              {values.map((value) => (
                <Value
                  key={value.node.id}
                  number={value.node.frontmatter.number}
                  title={value.node.frontmatter.title}
                  bodyHTML={value.node.html}
                />
              ))}
            </ThreeGrid>
          </ValuesSection>
        </MainContainer>
        <TeamHomePage />
        <WorkHomePage />
        <CivicDays />
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
    openData: file(relativePath: { eq: "opendata.png" }) {
      childImageSharp {
        fluid(maxWidth: 700, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    openSource: file(relativePath: { eq: "opensource.png" }) {
      childImageSharp {
        fluid(maxWidth: 700, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;
