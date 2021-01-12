import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import Layout from '../components/Layout';
import JobRow from '../components/JobRow';

const OpeningsContainer = styled.div`
  padding-top: 50px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'description'
    'openings'
    'picture';

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'description picture picture'
      'description openings openings';
  }
`;

const DescriptionContainer = styled.div`
  grid-area: description;
  padding: 0 32px;
  font-size: 16px;

  h1 {
    font-family: Bungee;
    font-size: 2em;
    display: inline-block;
    padding-bottom: 10px;
    border-bottom: 8px solid black;
  }

  p {
    line-height: 28px;
  }

  @media (min-width: 1024px) {
    width: 60%;
    h1 {
      font-size: 6em;
      display: block;
      padding: 0;
      border: none;
    }
    p {
      font-size: 2em;
      line-height: 36px;
    }
  }
`;
const OpeningListContainer = styled.div`
  grid-area: openings;
  font-size: 16px;
  margin: 32px 0;

  div:nth-of-type(odd) {
    background-color: #0000001a;
  }

  @media (min-width: 1024px) {
    font-size: 28px;
    margin-right: 106px;
  }
`;

const PictureContainer = styled.div`
  grid-area: picture;
  margin: 32px 0;
`;

const Openings = () => {
  const data = useStaticQuery(graphql`
    query {
      jobsPicture: file(relativePath: { eq: "landing-image.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 1375, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      allMarkdownRemark(filter: { frontmatter: { template: { eq: "job" } } }) {
        edges {
          node {
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
      <OpeningsContainer>
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
      </OpeningsContainer>
    </Layout>
  );
};

export default Openings;
