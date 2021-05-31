import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout/Layout';
import MemberImageBox from '../components/MemberImageBox';
import SectionHeading from '../styles/SectionHeading';
import MainGrid from '../styles/MainGrid';
import { FixedTitleContainer } from './work';
import Seo from '../components/Seo/Seo';
import CivicDaysImages from '../components/CivicDaysImages';
import useFixedScroll from '../hooks/useFixedScroll';
import MainContainer from '../styles/MainContainer';

const Section = styled.section`
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 20px;
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

  @media (min-width: 768px) {
    .section-text {
      max-width: 500px;
    }
  }

  @media (min-width: 1280px) {
    padding: 0px 32px;
    .heading-border-bottom {
      width: 78px;
      margin-top: 12px;
      margin-bottom: 18px;
      border: 8px solid #000000;
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
    row-gap: 60px;
  }
`;

const StickyBox = styled.div`
  padding: 32px 22px;
  background: #000000;
  width: 100%;
  border-radius: 12px;
  display: ${(props) => (props.mobile ? 'block' : 'none')};
  min-height: 230px;
  box-sizing: border-box;

  h1 {
    font-family: 'Bungee';
    font-size: 34px;
    width: 100%;
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

  @media (min-width: 1280px) {
    display: ${(props) => (props.mobile ? 'none' : 'block')};
    position: absolute;
    left: 0px;
    margin-top: 240px;
    width: 250px;

    h1 {
      font-size: 28px;
      width: 220px;
    }

    a {
      font-size: 18px;
    }
  }

  @media (min-width: 1440px) {
    top: 10%;
  }
`;

const CivicDaysSection = styled.div`
  display: grid;
  margin: 30px 0;

  .placeholder-container {
    padding: 48px 18px 0;
    display: none;
  }

  .section-text {
    line-height: 1.4em;
  }

  h1 {
    padding: 0 32px;
    font-family: Bungee;
    width: 50%;
  }

  @media (min-width: 1280px) {
    padding: 0;
    margin: 80px auto;
    grid-template-columns: 1fr 3fr;

    .heading-border-top {
      width: 94px;
      border: 8px solid #000000;
      margin-bottom: 45px;
    }

    p {
      width: 60%;
      line-height: 1.5em;
    }
  }

  @media (min-width: 1440px) {
    margin: 80px auto;

    p {
      width: 45%;
      font-size: 20px;
      line-height: 1.5em;
    }
  }
`;

const Unique = styled.div`
  background-color: black;
  padding: 14px 18px;
  color: white;
  width: max-content;
  font-weight: 500;
  margin: 20px 0;

  @media (min-width: 1440px) {
    font-size: 20px;
  }
`;

export const CivicDays = ({ home }) => {
  return (
    <>
      {home || (
        <MainContainer>
          <CivicDaysSection>
            <SectionHeading>Civic Days</SectionHeading>
            <Section>
              <div className="heading-border-top"></div>
              <p>
                Our bandhus come together for a week to co-live and co-work and co-create. Check out how we do this CDL
                style
              </p>
            </Section>
          </CivicDaysSection>
        </MainContainer>
      )}
      <Unique>Check our unique Civic Days</Unique>
      <CivicDaysImages />
    </>
  );
};

const Team = ({ data }) => {
  const members = data.allMarkdownRemark.nodes;

  const membersContainerRef = React.useRef(null);
  const teamTitleContainerRef = React.useRef(null);

  useFixedScroll(teamTitleContainerRef, membersContainerRef);

  return (
    <Layout>
      <Seo title="Team" />
      <MainContainer>
        <MainGrid>
          <FixedTitleContainer ref={teamTitleContainerRef}>
            <SectionHeading>The Team</SectionHeading>
            <div className="heading-border-bottom"></div>
            <p className="section-text">Meet our Bandhus</p>
            <div style={{ position: 'relative', height: '80%' }}>
              <StickyBox>
                <h1>Current Job Openings</h1>
                <Link to="/openings">browse jobs</Link>
              </StickyBox>
            </div>
          </FixedTitleContainer>
          <MemberCardsContainer ref={membersContainerRef}>
            {members.map((member) => (
              <MemberImageBox
                key={member.fields.slug}
                link={member.fields.slug}
                name={member.frontmatter.name}
                role={member.frontmatter.role.split(',')[0]}
                image={member.frontmatter.image?.childImageSharp.fluid}
              />
            ))}
          </MemberCardsContainer>
        </MainGrid>
      </MainContainer>
      <div style={{ position: 'relative' }}>
        <StickyBox mobile>
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
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`;
