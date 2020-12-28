import React from 'react';
import styled from 'styled-components';
import BackgroundSection from '../components/BackgroundSection';
import Layout from '../components/Layout';
import Grid from '../styles/Grid';
import HeroText from '../styles/HeroText';

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
  position: relative;
  height: 88.5vh;

  h1 {
    font-family: 'Bungee', cursive;
    width: 50%;
    font-size: 120px;
    text-align: left;
    text-transform: uppercase;
    margin: 0;
    position: absolute;
    top: 20%;

    span {
      display: inline-block;
      width: 150px;
      margin-left: 20px;
      border-bottom: 10px solid black;
    }
  }
`;

const Index = () => {
  return (
    <Layout>
      <HeroSection>
        <h1>
          We are a collaborative compa<span></span>
        </h1>
      </HeroSection>
      <BackgroundSection title="we impact public finance" />
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
      </Section>
    </Layout>
  );
};

export default Index;
