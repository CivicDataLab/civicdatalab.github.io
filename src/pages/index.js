import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
// import BackgroundWithImage from '../components/BackgroundWithImage';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../theme/theme';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import TypeWriter from '../components/TypeWriter';

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
