import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';

const SectorNavItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 8px 20px;
  border: 3px solid black;
  text-decoration: none;
  color: black;
  background-color: white;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 45px;
  font-weight: 500;

  &:hover {
    color: white;
    background-color: black;
  }

  @media (min-width: 1200px) {
    font-size: 16px;
    padding: 8px 16px;
  }

  @media (min-width: 1440px) {
    margin-right: 12px;
    padding: 8px 20px;
  }

  @media (min-width: 1600px) {
    font-size: 20px;
    padding: 6px 24px;
    margin-right: 24px;
  }
`;

const SectorNavContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  align-items: center;
  padding-left: 0;
  margin: 16px 0;
  max-width: 1200px;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  .active-sector {
    color: white;
    background-color: black;
  }

  @media (min-width: 1280px) {
    padding-left: 0;
  }

  @media (min-width: 1600px) {
    justify-content: flex-start;
  }
`;

const SectorNav = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allMarkdownRemark(filter: { frontmatter: { type: { eq: "sector" } } }, sort: { fields: frontmatter___name }) {
        edges {
          node {
            id
            frontmatter {
              name
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const sectorsData = data.allMarkdownRemark.edges;

  return (
    <SectorNavContainer>
      <SectorNavItem activeClassName="active-sector" to="/work/">
        All
      </SectorNavItem>
      {sectorsData.map((sector) => (
        <SectorNavItem activeClassName="active-sector" key={sector.node.id} to={sector.node.fields.slug}>
          {sector.node.frontmatter.name === 'Free & Open Source Software' ? 'FOSS' : sector.node.frontmatter.name}
        </SectorNavItem>
      ))}
    </SectorNavContainer>
  );
};

export default SectorNav;
