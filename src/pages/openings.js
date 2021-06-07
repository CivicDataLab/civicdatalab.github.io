import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout/Layout';
import JobRow from '../components/JobRow';
import Seo from '../components/Seo/Seo';
import MainContainer from '../styles/MainContainer';
import StandardGrid from '../styles/StandardGrid';
import { TitleContainer } from './work';
import HeroText from '../styles/HeroText';

const OpeningsTitleContainer = styled(TitleContainer)`
  p {
    line-height: 1.5em;
    margin-top: 50px;
    width: 250px;
    font-size: 16px;
  }

  @media (min-width: 1440px) {
    font-size: 18px;
  }
`;

const OpeningListContainer = styled.div`
  font-size: 18px;
  margin: 32px 0;

  div:nth-of-type(odd) {
    background-color: #0000001a;
  }

  @media (min-width: 1280px) {
    margin-top: 40px;
    grid-column: 4/13;
    min-height: 55vh;
  }
`;

const Openings = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/openings/" } }) {
        edges {
          node {
            id
            frontmatter {
              title
              url
            }
          }
        }
      }
    }
  `);

  const openings = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Seo title="Join Us" />
      <MainContainer>
        <StandardGrid>
          <OpeningsTitleContainer>
            <HeroText>Join us</HeroText>
            <p>CivicDataLab works across sectors to increase access to information.</p>
          </OpeningsTitleContainer>
          <OpeningListContainer>
            {openings.map((opening) => (
              <JobRow
                key={opening.node.id}
                title={opening.node.frontmatter.title}
                link={opening.node.frontmatter.url}
              />
            ))}
          </OpeningListContainer>
        </StandardGrid>
      </MainContainer>
    </Layout>
  );
};

export default Openings;
