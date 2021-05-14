import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import Layout from '../components/Layout';
import JobRow from '../components/JobRow';
import MainGrid from '../styles/MainGrid';

const DescriptionContainer = styled.div`
  grid-area: left;
  padding: 0 32px;
  font-size: 16px;

  h1 {
    font-family: Bungee;
    font-size: 2em;
    width: 80px;
    display: inline-block;
    padding-bottom: 10px;
    border-bottom: 8px solid black;
  }

  p {
    font-size: 18px;
    line-height: 28px;
  }

  @media (min-width: 1024px) {
    width: 60%;
    padding-left: 72px;
    h1 {
      font-size: 60px;
      display: block;
      padding: 0;
      border: none;
      width: 200px;
      margin-top: 20px;
    }
  }
`;
const OpeningListContainer = styled.div`
  grid-area: bottom;
  font-size: 18px;
  margin: 32px 0;

  div:nth-of-type(odd) {
    background-color: #0000001a;
  }

  @media (min-width: 1024px) {
    margin-right: 106px;
  }
`;

const PictureContainer = styled.div`
  grid-area: right;
  margin: 32px 0;

  .gatsby-image-wrapper {
    max-height: 500px;
  }
`;

const Openings = () => {
  const data = useStaticQuery(graphql`
    query {
      jobsPicture: file(relativePath: { eq: "landing-image.jpeg" }) {
        childImageSharp {
          fluid(maxHeight: 1375, quality: 100) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }

      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/openings/" } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const openings = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <MainGrid>
        <DescriptionContainer>
          <h1>Join us</h1>
          <p>CivicDataLab works across sectors to increase access to information.</p>
        </DescriptionContainer>
        <OpeningListContainer>
          {openings.map((opening) => (
            <JobRow
              key={opening.node.fields.slug}
              title={opening.node.frontmatter.title}
              link={opening.node.fields.slug}
            />
          ))}
        </OpeningListContainer>
        <PictureContainer>
          <Image fluid={data.jobsPicture.childImageSharp.fluid} />
        </PictureContainer>
      </MainGrid>
    </Layout>
  );
};

export default Openings;
