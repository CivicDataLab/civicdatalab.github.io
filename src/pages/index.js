import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
// import BackgroundImage from 'gatsby-background-image';
// import Fade from 'react-reveal/Fade';
import HeroText from '../styles/HeroText';
import MainContainer from '../styles/MainContainer';
import SectorsCard from '../components/SectorCard';
import TeamHomePage from '../components/TeamHomePage';
import WorkHomePage from '../components/WorkHomePage';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../theme/theme';
import { CivicDays } from './team';
import Footer from '../components/Layout/Footer';
import Navbar from '../components/Layout/Navbar';
import TypeWriter from '../components/TypeWriter';
import OurPartners from '../components/OurPartners';
import Seo from '../components/Seo/Seo';
import BlogStrip from '../components/BlogStrip';
import StandardGrid from '../styles/StandardGrid';

export const Section = styled.section`
  padding: 0;
  background-color: ${(props) => (props.background ? props.background : 'white')};

  p {
    font-size: 2em;
    line-height: 36px;
  }
`;

const HeroSection = styled(Section)`
  height: 60vh;
  color: black;
  padding-top: 100px;
  background-color: rgb(0, 0, 0, 0.1);

  h1 {
    font-family: 'Bungee';
    font-size: 32px;
    text-align: left;
    margin-top: 80px;
    color: black;
    width: 100%;
    line-height: 1.4em;
  }

  .animated-text {
    color: #1dcccc;
  }

  @media (min-width: 550px) {
    h1 {
      font-size: 40px;
    }
  }

  @media (min-width: 1024px) {
    padding-top: 120px;
    height: 75vh;

    h1 {
      text-align: center;
      width: 80%;
      font-size: 60px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 50px;
    }
  }

  @media (min-width: 1280px) {
    h1 {
      margin-top: 100px;
    }
  }

  @media (min-width: 1440px) {
    h1 {
      margin-top: 150px;
    }
  }

  @media (min-width: 1920px) {
    height: 65vh;
  }
`;

const Sectors = styled.section`
  margin-top: 24px;
  z-index: 1;

  .sectors-heading {
    margin-bottom: 20px;
  }
  .container-sectors {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    column-gap: 60px;
    row-gap: 24px;
    justify-items: center;
  }

  @media (min-width: 1280px) {
    margin-top: 100px;
    margin-bottom: 80px;

    padding: 0;

    .sectors-heading {
      font-size: 70px;
      line-height: 67px;
    }

    .container-sectors {
      row-gap: 60px;
    }
  }

  @media (min-width: 1440px) {
    margin-top: 120px;
    margin-bottom: 100px;

    .sectors-heading {
      font-size: 60px;
      line-height: 60px;
    }
    .container-sectors {
      margin-top: 38px;
      column-gap: 20px;
      grid-template-columns: repeat(3, minmax(320px, 1fr));
    }
  }

  @media (min-width: 1600px) {
    padding: 0;

    .container-sectors {
      column-gap: 35px;
    }
  }
`;

const Index = ({ data }) => {
  // const image = data?.landingBackground?.childImageSharp?.fluid;

  const sectors = data.allMarkdownRemark.nodes;
  const partners = data.partners.nodes;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Seo title="CivicDataLab" />
      <main>
        <>
          <Navbar />
          <HeroSection>
            <MainContainer>
              <TypeWriter messages={['data.', 'tech.', 'design.', 'social science.']} />
            </MainContainer>
          </HeroSection>
        </>
        {/* <Fade bottom> */}
        <Sectors>
          <MainContainer>
            <HeroText className="sectors-heading">Our Work</HeroText>
            <StandardGrid>
              {sectors.map((sector) => (
                <SectorsCard
                  key={sector.fields.slug}
                  name={sector.frontmatter.name}
                  description={sector.frontmatter.description}
                  image={sector.frontmatter.image.childImageSharp.fluid}
                  color={sector.frontmatter.color}
                  link={sector.fields.slug}
                />
              ))}
            </StandardGrid>
          </MainContainer>
        </Sectors>
        <BlogStrip />
        <OurPartners partners={partners} />

        <TeamHomePage />
        <WorkHomePage />
        <CivicDays home />
        {/* </Fade> */}
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default Index;

export const pageQuery = graphql`
  query HomepageQuery {
    landingBackground: file(relativePath: { eq: "landing-image.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    partners: allFile(
      filter: { relativePath: { regex: "/partners/" }, extension: { in: ["jpg", "jpeg", "png"] } }
      sort: { fields: name }
    ) {
      nodes {
        id
        name
        childImageSharp {
          fixed(width: 160, quality: 100) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
    }
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "sector" } } }, sort: { fields: frontmatter___name }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          name
          description
          image {
            childImageSharp {
              fluid(maxWidth: 600, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          color
        }
      }
    }
  }
`;
