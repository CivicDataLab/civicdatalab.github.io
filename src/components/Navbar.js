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
  padding: 22px;

  .gatsby-image-wrapper {
    min-width: 90px;
  }

  @media (min-width: 1024px) {
    padding: 0 72px 22px 72px;

    .mobile-nav {
      display: none;
    }

    .gatsby-image-wrapper {
      margin-top: 14px;
    }
  }
`;

const LinksContainer = styled.ul`
  position: absolute;
  right: 0;
  top: 0;
  width: 275px;
  display: ${(props) => (props.displayMobile ? 'flex' : 'none')};
  flex-direction: column;
  background-color: black;
  color: white;
  padding: 22px 0;
  margin: 0;

  li {
    list-style: none;
    padding: 0 22px;
    &:hover {
      background-color: white;
      color: black;
    }
  }

  @media (min-width: 1024px) {
    position: static;
    width: auto;
    display: flex;
    flex-direction: row;
    height: 80px;
    margin: 0;
    padding: 0 0 8px 0;
    border-bottom: 4px solid black;
    background-color: transparent;

    li {
      padding: 0;
      margin: 0 32px;
      height: 100%;
    }

    li:first-of-type {
      margin-left: 0;
    }

    li:last-of-type {
      margin-right: 0;
    }
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  @media (min-width: 1024px) {
    color: black;
    height: 100%;
    text-transform: capitalize;
    display: flex;
    align-items: flex-end;

    &.active-link {
      color: white;
      background-color: black;
    }
  }
`;

const Navbar = () => {
  const [displayMobileNav, setDisplayMobileNav] = React.useState(false);

  const data = useStaticQuery(graphql`
    query LogoQuery {
      logo: file(relativePath: { eq: "cdl_logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 100, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const logo = data?.logo?.childImageSharp?.fluid;

  return (
    <StyledNav>
      <Link to="/">
        <Image fluid={logo} />
      </Link>
      <h5 style={{ cursor: 'pointer' }} onClick={() => setDisplayMobileNav(true)} className="mobile-nav">
        Open Nav
      </h5>
      <LinksContainer displayMobile={displayMobileNav}>
        <li>
          <StyledLink to="/" activeClassName="active-link">
            Home
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/sectors" activeClassName="active-link">
            Sectors
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/team" activeClassName="active-link">
            Team
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/blogs" activeClassName="active-link">
            Blogs
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/playbook" activeClassName="active-link">
            Playbook
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/contact" activeClassName="active-link">
            Contact
          </StyledLink>
        </li>
      </LinksContainer>
    </StyledNav>
  );
};

export default Navbar;
