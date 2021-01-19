import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import HeroText from '../styles/HeroText';
import SectorsCard from '../components/SectorsCard';
import TeamHomePage from '../components/TeamHomePage';
import WorkHomePage from '../components/WorkHomePage';
import Contact from '../components/Contact';
import SliderHomePage from '../components/SliderHomePage';
import BackgroundImage from 'gatsby-background-image';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../theme/theme';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import TypeWriter from '../components/TypeWriter';
import OurPillars from '../components/OurPillars';
import OurPartners from '../components/OurPartners';

const Section = styled.section`
  padding: 0 72px;
  background-color: ${(props) => (props.background ? props.background : 'white')};

  p {
    font-size: 2em;
    line-height: 36px;
  }
`;

const HeroSection = styled(Section)`
  height: 30vh;
  color: white;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: rgb(0, 0, 0, 0.5);

  h1 {
    font-family: 'Bungee', cursive;
    font-size: 32px;
    text-align: left;
  }

  @media (min-width: 550px) {
    height: 50vh;
    h1 {
      font-size: 60px;
    }
  }

  @media (min-width: 1024px) {
    padding-top: 40px;
    padding-left: 72px;
    height: 80vh;

    h1 {
      width: 80%;
      font-size: 120px;
    }
  }
`;

const Sectors = styled.section`
  margin-top: 24px;
  .sectors-heading {
    padding-left: 20px;
    margin-bottom: 20px;
  }
  .container-sectors {
    padding-left: 20px;
    padding-right: 19px;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
  }
  @media (min-width: 768px) {
    .container-sectors {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      row-gap: 30px;
    }
  }

  @media (min-width: 900px){
    .sectors-heading{
      font-size: 70px;
      line-height: 67px;
    }
  }

  @media (min-width: 1440px) {
    .container-sectors {
      display: flex;
      // gap: 106px;
    }
    .sectors-heading {
      font-size: 120px;
      line-height: 120px;
      padding-left: 73px;
    }
    .container-sectors {
      margin-left: 53px;
      margin-right: 55px;
      margin-top: 38px;
    }
  }
  @media (min-width: 1800px) {
    .section-heading {
      font-size: 120px;
    }
  }
`;

const Index = ({ data }) => {
  const image = data?.background?.childImageSharp?.fluid;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <main>
        <BackgroundImage fluid={image}>
          <Navbar dark />
          <HeroSection>
            <TypeWriter messages={['free and open source solutions', 'open data platforms']} fixedText="We co-create" />
          </HeroSection>
        </BackgroundImage>
        <Sectors>
          <HeroText className={'sectors-heading'}>Our Sectors</HeroText>
          <div className={'container-sectors'}>
            <SectorsCard />

            <SectorsCard />

            <SectorsCard />
          </div>
        </Sectors>
        <div
          className={'slider-wrapper'}
          style={{ width: '100%', display: 'flex', overflow: 'auto', marginTop: '30px' }}
        >
          {[1, 1, 1, 1].map((element, index) => {
            return <SliderHomePage key={index} dark={index % 2 !== 0} theme="true" />;
          })}
        </div>
        <OurPartners />
        <OurPillars />

        <TeamHomePage />
        <WorkHomePage />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default Index;

export const pageQuery = graphql`
  query BackgroundQuery {
    background: file(relativePath: { eq: "landing-image.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;
