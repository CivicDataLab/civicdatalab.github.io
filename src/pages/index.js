import React from 'react';
import styled from 'styled-components';
import BackgroundSection from '../components/BackgroundSection';
import Layout from '../components/Layout';
import Grid from '../styles/Grid';
import HeroText from '../styles/HeroText';
import SectorsCard from '../components/SectorsCard';
import TeamHomePage from '../components/TeamHomePage';
import WorkHomePage from '../components/WorkHomePage';
import Contact from "../components/Contact";
import SliderHomePage from "../components/SliderHomePage";
import { graphql } from 'gatsby';

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

const Sectors = styled.section`
  .sectors-heading{
    padding-left: 20px;
    margin-bottom: 20px;
  }
  .container-sectors{
    padding-left:20px;
    padding-right:19px;
  }
  @media (min-width: 1440px) {
    .container-sectors {
      display: flex;
      gap: 106px;
    }
    .sectors-heading {
      font-size: 120px;
      line-height: 120px;
      padding-left: 73px;
    }
    .container-sectors{
      margin-left: 53px;
      margin-right: 55px;
      margin-top: 38px;
    }
  }
`;

const Index = () => {
  return (
    <>
      <Sectors>
        <HeroText className={'sectors-heading'}>Our Sectors</HeroText>
        <div className={'container-sectors'}>
          <div className={'left'}>
            <SectorsCard />
          </div>
          <div className={'center'}>
            <SectorsCard />
          </div>
          <div className={'right'}>
            <SectorsCard />
          </div>
        </div>
      </Sectors>
      <TeamHomePage />
      <WorkHomePage />
      <Contact />
      <div>
      <SliderHomePage theme={"true"}/>
      <SliderHomePage theme={"true"}/>
      <SliderHomePage theme={"true"}/>
      <SliderHomePage theme={"true"}/>
      </div>
      {/* <HeroSection>
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
      </Section> */}
    </>
  );
};

export default Index;
