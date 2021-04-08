import React from 'react';
import styled, { css } from 'styled-components';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import MemberImageBox from '../components/MemberImageBox';
import SectionHeading from '../styles/SectionHeading';
import MainGrid from '../styles/MainGrid';
import { TitleContainer } from './sectors';

const Section = styled.section`
  padding: 48px 16px 0;
  max-width: 1140px;
  .heading-border-bottom {
    width: 42px;
    margin-top: 12px;
    margin-bottom: 18px;
    border: 8px solid #000000;
  }

  .section-text {
    font-size: 18px;
    line-height: 27px;
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
    }
  }

  @media (min-width: 1280px) {
    padding: 48px 32px;
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
    .heading-border-top {
      display: block;
    }
  }
`;

const MemberCardsContainer = styled.div`
  display: grid;
  grid-area: right;
  grid-template-columns: 1fr 1fr;
  row-gap: 25px;
  column-gap: 25px;
  padding: 0 32px;
  box-sizing: border-box;
  justify-content: space-around;
  margin-bottom: 54px;
  max-width: 1080px;

  @media (min-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    justify-content: space-between;
    row-gap: 50px;
    padding: 0 16px;
  }

  @media (min-width: 1440px) {
    padding: 0 32px;
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
    text-decoration: none;
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
  }    border-bottom: 10px solid black !important;
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
  padding: 22px 12px;
  background: #000000;
  color: #ffffff;
  font-size: 18px;
  font-family: 'Montserrat';
  font-weight: 600;
  outline: none;
  margin-top: 30px;

  @media (min-width: 1280px) {
    font-size: 20px;
    padding: 15px 20px;
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

  .placeholder-container {
    padding: 48px 18px 0;
    display: none;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 20% 60%;

    .placeholder-container {
      display: block;
    }
  }
  @media (min-width: 1600px) {
    grid-template-columns: 22% 58%;
    column-gap: 100px;

    .heading-border-bottom {
      display: none;
    }

    .section-text {
      margin-top: 20px;
    }

    .civic-days-section .heading-border-top {
      display: block;
    }
  }
`;

export const CivicDays = () => {
  return (
    <>
      <CivicDaysSection className="civic-days-section">
        <div className="placeholder-container" />
        <Section>
          <div className="heading-border-top"></div>
          <SectionHeading addCSS={fs44}>Civic Days</SectionHeading>
          <div className="heading-border-bottom"></div>
          <p className="section-text">
            Our bandhus come together for a week to co-live and co-work and co-create. Check out how we do this CDL
            style
          </p>
          <FullWidthLink>Check our unique Civic Days &gt;&gt; </FullWidthLink>
        </Section>
      </CivicDaysSection>
      <HorizontalImageScrollContainer>
        {[1, 1, 1, 11, 1, 1, 1].map((item, index) => {
          return <div key={index}></div>;
        })}
      </HorizontalImageScrollContainer>
    </>
  );
};

const Team = ({ data }) => {
  const members = data.allMarkdownRemark.nodes;

  return (
    <Layout>
      <MainGrid>
        <TitleContainer>
          <SectionHeading>The Team</SectionHeading>
          <div className="heading-border-bottom"></div>
          <p className="section-text">Meet our Bandhus</p>
        </TitleContainer>
        <MemberCardsContainer>
          {members.map((member) => (
            <MemberImageBox
              key={member.fields.slug}
              link={member.fields.slug}
              name={member.frontmatter.name}
              role={member.frontmatter.role.split(',')[0]}
              image={member.frontmatter.image.childImageSharp.fluid}
            />
          ))}
        </MemberCardsContainer>
      </MainGrid>
      <div style={{ position: 'relative' }}>
        <StickyBox>
          <h1>Current Job Openings</h1>
          <Link to="/openings">browse jobs</Link>
        </StickyBox>
      </div>
      <CivicDays />
    </Layout>
  );
};

export default Team;

export const pageQuery = graphql`
  query TeamQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/team/" } }, sort: { fields: frontmatter___name }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          name
          role
          image {
            childImageSharp {
              fluid(maxWidth: 800, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
