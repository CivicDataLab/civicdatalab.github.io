import React from 'react';
import styled from 'styled-components';
// import BackgroundWithImage from '../components/BackgroundWithImage';
import Layout from '../components/Layout';
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
  padding: 0 72px;
  min-height: 500px;

  h1 {
    font-family: 'Bungee', cursive;
    width: 70%;
    font-size: 32px;
    text-align: left;
    text-transform: uppercase;
    margin-bottom: 0;
  }

  @media (min-width: 550px) {
    h1 {
      font-size: 60px;
    }
  }

  @media (min-width: 1024px) {
    h1 {
      font-size: 120px;
    }
  }
`;

const Index = () => {
  return (
    <Layout>
      <HeroSection>
        {/* <h1>
          We are a collaborative compa<span></span>
        </h1> */}
        <TypeWriter messages={['free and open source solutions', 'open data platforms']} fixedText="We co-create" />
      </HeroSection>
      {/* <BackgroundSection title="we impact public finance" />
      <Section>
        <Grid>
          <div>
            <HeroText>The Team</HeroText>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
            </p>
          </div>
        </Grid>
      </Section>
      <Section background="rgba(71, 122, 181, 0.27)">
        <Grid>
          <div>
            <HeroText>Work with us!</HeroText>
          </div>
          <div>
            <p>Some text here</p>
          </div>
        </Grid>
      </Section>
      <Section background="hello">
        <Grid>
          <div>
            <HeroText>Come say hi!</HeroText>
          </div>
          <div>
            <p>Some text here</p>
          </div>
        </Grid>
      </Section> */}
    </Layout>
  );
};

export default Index;
