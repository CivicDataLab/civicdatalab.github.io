import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
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
import { PillarImages } from '../components/OurPillars';
import { ResourcesAbout } from '../components/Resources';
import AboutBackground from '../components/AboutBackground';

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
  margin-top: 100px;

  p {
    line-height: 1.5em;
  }

  .description-text {
    margin-top: 40px;
  }

  @media (min-width: 1024px) {
    margin-top: 120px;
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
  @media (min-width: 1280px) {
    padding: 40px 0;
    > * {
      grid-column: span 6;
    }
  }
`;

const FourGrid = styled(StandardGrid)`
  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: -1;

    h3 {
      margin-top: 0;
      min-height: 40px;
    }
  }

  .gatsby-image-wrapper {
    height: 100%;
    width: 80%;
  }

  grid-template-columns: repeat(2, 1fr);
  > * {
    grid-column: span 1;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(12, 1fr);
    > * {
      grid-column: span 3;
    }
    .gatsby-image-wrapper {
      height: 100%;
      width: 50%;
    }

    > * {
      grid-column: span 3;
    }
  }
`;

const ValuesSection = styled.div`
  padding-top: 40px;

  @media (min-width: 1280px) {
    padding-top: 80px;
  }

  @media (min-width: 1440px) {
    padding-top: 100px;
  }
`;

const resources = [
  {
    link: 'https://medium.com/civicdatalab/the-many-lives-of-open-data-1eb44becc261',
    title: 'The Many Lives of Open Data'
  },
  {
    link: 'https://medium.com/civicdatalab/work-in-the-time-of-coronavirus-8663bb6e3908',
    title: 'Work in the time of Coronavirus'
  },
  {
    link: 'https://medium.com/civicdatalab/the-scrumji-experiment-44b25fe60b55',
    title: 'The ScrumJi Experiment!'
  },
  {
    link: 'https://medium.com/civicdatalab/baithak-f2afc1b23e69',
    title: 'Baithak'
  },
  {
    link: 'https://medium.com/civicdatalab/civic-days-with-peanut-5e433d216b8c',
    title: 'Civic Days with Peanut'
  }
];

const About = ({ data }) => {
  const values = data.allMarkdownRemark.edges;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Seo title="About" />
      <main>
        <AboutBackground>
          <Navbar dark />
          {/* <HeroSection /> */}
        </AboutBackground>
        <StorySection>
          <MainContainer>
            <HeroText>About Us</HeroText>
            <TwoGrid>
              <div>
                <p>
                  We are a research lab working at the intersection of data, technology, design and social science to
                  strengthen the course of civic engagements in India.
                </p>
                <p>
                  We work to harness the potential of open knowledge movements and better enable citizens to engage in
                  matters of public reform.
                </p>
                <p>
                  We aim to grow data and tech capacity of governments, non-profits, think-tanks, media houses,
                  universities, and more to enable data-driven decision making at scale.
                </p>
              </div>
              <FourGrid>
                <PillarImages />
              </FourGrid>
            </TwoGrid>
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
        <ResourcesAbout resources={resources} />
        <TeamHomePage />
        <WorkHomePage />
        <CivicDays />
      </main>
      <Footer />
    </ThemeProvider>
  );
};

// TODO add more images on the header section for the about us

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
    landingImage: file(relativePath: { eq: "about.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1025, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    openData: file(relativePath: { eq: "opendata.png" }) {
      childImageSharp {
        fluid(maxWidth: 700, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    openSource: file(relativePath: { eq: "opensource.png" }) {
      childImageSharp {
        fluid(maxWidth: 700, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
