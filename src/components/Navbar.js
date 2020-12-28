import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Image from 'gatsby-image';

const StyledNav = styled.nav`
  font-size: 2em;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 0 72px;

  ul {
    display: flex;
    padding: 0;
    border-bottom: 1px solid black;
  }

  li {
    list-style: none;
    margin: 0 32px;
  }

  li:first-of-type {
    margin-left: 0;
  }

  li:last-of-type {
    margin-right: 0;
  }

  a {
    text-decoration: none;
    color: black;
    text-transform: lowercase;
  }
`;

const Navbar = () => {
  const data = useStaticQuery(graphql`
    query LogoQuery {
      logo: file(relativePath: { eq: "cdl_logo.png" }) {
        childImageSharp {
          fixed(width: 112) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  console.log(data);

  const logo = data?.logo?.childImageSharp?.fixed;

  return (
    <StyledNav>
      <Image fixed={logo} />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/team">The Team</Link>
        </li>
        <li>
          <Link to="/team">What we do</Link>
        </li>
        <li>
          <Link to="/">Blogs</Link>
        </li>
        <li>
          <Link to="/contact">Contact us</Link>
        </li>
      </ul>
    </StyledNav>
  );
};

export default Navbar;
