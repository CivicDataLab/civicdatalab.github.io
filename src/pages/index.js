import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import HeroText from '../styles/HeroText';
import SectorsCard from '../components/SectorCard';
import TeamHomePage from '../components/TeamHomePage';
import WorkHomePage from '../components/WorkHomePage';
import Contact from '../components/Contact';
import SliderHomePage from '../components/SliderHomePage';
import BackgroundImage from 'gatsby-background-image';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../theme/theme';
import { CivicDays } from './team';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import TypeWriter from '../components/TypeWriter';
import OurPillars from '../components/OurPillars';
import OurPartners from '../components/OurPartners';

export const Section = styled.section`
  padding: 0 72px;
  background-color: ${(props) => (props.background ? props.background : 'white')};

  p {
    font-size: 2em;
    line-height: 36px;
  }
`;

const HeroSection = styled(Section)`
  height: 45vh;
  color: white;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: rgb(0, 0, 0, 0.5);

  h1 {
    font-family: 'Bungee', cursive;
    font-size: 32px;
    text-align: left;
    margin-top: -20px;
  }

  @media (min-width: 550px) {
    height: 50vh;
    h1 {
      font-size: 40px;
    }
  }

  @media (min-width: 1024px) {
    padding-top: 40px;
    padding-left: 72px;
    height: 80vh;

    h1 {
      width: 50%;
      font-size: 60px;
      margin-top: 40px;
    }
  }
`;

const Sectors = styled.section`
  margin-top: 24px;
  padding: 0 20px;
  .sectors-heading {
    margin-bottom: 20px;
  }
  .container-sectors {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    column-gap: 60px;
    row-gap: 24px;
    justify-items: center;
    align-items: stretch;
  }

  @media (min-width: 1280px) {
    margin-top: 100px;
    margin-bottom: 80px;

    padding: 0 52px;
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
      padding-left: 20px;
    }
    .container-sectors {
      margin-top: 38px;
      column-gap: 20px;
      grid-template-columns: repeat(4, minmax(320px, 1fr));
    }
  }
`;

const Index = ({ data }) => {
  const image = data?.landingBackground?.childImageSharp?.fluid;

  const sectors = data.allMarkdownRemark.nodes;
  const partners = data.partners.nodes;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <main>
        <BackgroundImage fluid={image}>
          <Navbar dark overlay />
          <HeroSection>
            <TypeWriter
              messages={[
                'We co-create free and open source solutions for social change.',
                'We collaborate with the community on social innovation projects.',
                'We empower civic participation through access to information.'
              ]}
            />
          </HeroSection>
        </BackgroundImage>
        {/* <Fade bottom> */}
        <Sectors>
          <HeroText className={'sectors-heading'}>Our Work</HeroText>
          <div className="container-sectors">
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
          </div>
        </Sectors>
        <div className={'slider-wrapper'} style={{ width: '100%', display: 'flex', overflow: 'auto' }}>
          {[1, 1, 1, 1].map((element, index) => {
            return <SliderHomePage key={index} dark={index % 2 !== 0} theme="true" />;
          })}
        </div>
        <OurPartners partners={partners} />
        <OurPillars />

        <TeamHomePage />
        <WorkHomePage />
        <Contact />
        <CivicDays />
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
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/sectors/" } }, sort: { fields: frontmatter___name }) {
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