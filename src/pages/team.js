import React from 'react';
import styled, { css } from 'styled-components';
import Layout from '../components/Layout';
import MemberImageBox from '../components/MemberImageBox';
import SectionHeading from '../styles/SectionHeading';

const TeamPageContainer = styled.div`
  // padding: 48px 30px 0;
`;

const ResponsiveGrid = styled.div`
  display: grid;

  @media (min-width: 768px) {
    grid-template-columns: 20% 75%;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 20% 60%;
  }
  @media (min-width: 1600px) {
    grid-template-columns: 22% 58%;
    column-gap: 100px;
  }
`;

const Section = styled.section`
  padding: 48px 30px 0;
  .heading-border-bottom {
    width: 42px;
    margin-top: 12px;
    margin-bottom: 18px;
    border: 8px solid #000000;
  }

  .section-text {
    font-size: 17px;
    color: #000000;
    margin: 0;
  }

  .heading-border-top {
    display: none;
    width: 78px;
    border: 10px solid #000000;
    margin-bottom: 18px;
  }

  @media (min-width: 768px) {
    .section-text {
      max-width: 500px;
      font-size: 18px;
    }
  }

  @media (min-width: 1280px) {
    .section-text {
      font-size: 20px;
    }
    .heading-border-bottom {
      width: 78px;
      margin-top: 12px;
      margin-bottom: 18px;
      border: 8px solid #000000;
    }
  }
  @media (min-width: 1600px) {
    .heading-border-bottom {
      border: 10px solid #000000;
    }
    .civic-days-section .heading-border-bottom {
      display: none;
    }
    .civic-days-section .heading-border-top {
      display: block;
    }
    .section-text {
      font-size: 30px;
    }
    .heading-border-top {
      display: block;
    }
  }
`;

const MemberCardsContainer = styled.div`
  display: grid;
  grid-template-columns: 140px 140px;
  column-gap: 30px;
  row-gap: 25px;
  justify-content: space-around;

  margin-bottom: 54px;

  @media (min-width: 500px) {
    grid-template-columns: 140px 140px 140px;
  }
  @media(min-width: 1024px){
    justify-content: space-between;
  }
`;

const StickyBox = styled.div`
  padding: 32px 22px 34px 22px;
  background: #000000;

  h1 {
    font-family: 'Bungee';
    font-size: 34px;
    width: 255px;
    color: #ffffff;
    text-transform: uppercase;
    margin: 0;
  }

  a {
    display: inline-block;
    font-family: Montserrat;
    font-size: 20px;
    color: #000000;
    background: #ffffff;
    padding: 10px 26px;
    border-radius: 20px;
    margin-top: 40px;
  }

  @media (min-width: 1024px) {
    position: absolute;
    right: 0;

    h1 {
      font-size: 28px;
      width: 220px;
    }

    a {
      font-size: 18px;
    }
  }

  @media (min-width: 1280px) {
    h1 {
      font-size: 34px;
      width: 250px;
    }
    a {
      font-size: 20px;
    }
  }
`;

const FullWidthLink = styled.a`
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  padding: 22px 12px;
  background: #000000;
  color: #ffffff;
  font-size: 17px;
  font-family: 'Montserrat';
  font-weight: 600;
  outline: none;
  margin-top: 50px;

  @media (min-width: 768px) {
    width: 300px;
    margin-left: 30px;
  }
  @media (min-width: 1024px) {
    margin-left: 22%;
  }
  @media (min-width: 1280px) {
    width: auto;
    font-size: 20px;
    padding: 15px 20px;
    margin-top: 32px;
  }
  @media (min-width: 1600px) {
    margin-left: calc(24% + 100px);
  }
`;

const HorizontalImageScrollContainer = styled.div`
  display: flex;
  flex: auto;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  border-top: 8px solid #000000;
  border-bottom: 8px solid #000000;
  background: #ffffff;
  overflow-x: auto;
  margin-top: 14px;
  margin-bottom: 34px;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  div {
    min-width: 216px;
    height: 170px;
    background: #f2f2f2;
    // border: 1px solid red;
  }

  @media (min-width: 1280px) {
    margin-top: 38px;
    div {
      min-width: 280px;
      height: 280px;
      margin-right: 20px;
    }
  }
`;

const fs44 = css`
  @media (min-width: 1600px) {
    font-size: 44px;
  }
`;

const CivicDaysSection = styled.div`
  display: grid;

  @media (min-width: 1024px) {
    grid-template-columns: 20% 60%;
  }
  @media (min-width: 1600px) {
    grid-template-columns: 22% 58%;
    column-gap: 100px;
  }
  .placeholder-container {
    padding: 48px 30px 0;
    display: none;
  }

  @media (min-width: 1024px) {
    .placeholder-container {
      display: block;
    }
  }

  @media (min-width: 1600px) {
    .heading-border-bottom {
      display: none;
    }
    .civic-days-section .heading-border-top {
      display: block;
    }
  }
`;

const Team = () => {
  return (
    <Layout>
      <TeamPageContainer>
        <ResponsiveGrid>
          <Section>
            <SectionHeading>The Team</SectionHeading>
            <div className="heading-border-bottom"></div>
            <p className="section-text">Meet our Bandhus</p>
          </Section>
          <Section>
            <MemberCardsContainer>
              {[1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((image) => {
                return <MemberImageBox></MemberImageBox>;
              })}
            </MemberCardsContainer>
          </Section>
        </ResponsiveGrid>
        <StickyBox>
          <h1>Current Job Openings</h1>
          <a>browse jobs</a>
        </StickyBox>

        <CivicDaysSection className="civic-days-section">
          <div className="placeholder-container" />
          <Section>
            <div className="heading-border-top"></div>
            <SectionHeading addCSS={fs44}>Civic Days</SectionHeading>
            <div className="heading-border-bottom"></div>
            <p className="section-text">
              Our bandhu come together for a week to co-live and co-work and co-create. Check out how we do this CDL
              style
            </p>
          </Section>
        </CivicDaysSection>
        <FullWidthLink>Check our unique Civic Days &gt;&gt; </FullWidthLink>
        <HorizontalImageScrollContainer>
          {[1, 1, 1, 11, 1, 1, 1].map((item) => {
            return <div></div>;
          })}
        </HorizontalImageScrollContainer>
      </TeamPageContainer>
    </Layout>
  );
};

export default Team;
