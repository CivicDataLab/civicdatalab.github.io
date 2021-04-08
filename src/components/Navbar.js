import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { MdClose, MdMenu } from 'react-icons/md';
import styled from 'styled-components';
import Image from 'gatsby-image';

const StyledNav = styled.nav`
  font-size: 2em;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px;
  background: ${(props) => (props.overlay ? 'rgb(0, 0, 0, 0.5)' : 'transparent')};
  height: 140px;

  .gatsby-image-wrapper {
    min-width: 80px;
  }

  .mobile-nav {
    cursor: pointer;
    color: black;
    transform: scale(2);
  }

  @media (min-width: 1024px) {
    padding: 0 72px 22px 72px;
    align-items: start;

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
  padding: 40px 0 22px 0;
  margin: 0;

  .close-icon {
    position: absolute;
    cursor: pointer;
    right: 14px;
    top: 8px;
    color: white;
  }

  li {
    list-style: none;
    display: flex;
    align-items: center;

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
    padding: 0 0 12px 0;
    border-bottom: ${(props) => (props.dark ? '4px solid white' : '4px solid black')};
    background-color: transparent;

    li {
      padding: 0;
      margin: 0 8px;
      height: 100%;

      &:hover {
        background: none;
      }
    }

    li:first-of-type {
      margin-left: 0;
    }

    li:last-of-type {
      margin-right: 0;
    }

    .mobile-nav {
      display: none;
    }
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 22px;
  display: inline-block;

  @media (min-width: 1024px) {
    color: ${(props) => (props.dark ? 'white' : 'black')};
    height: 100%;
    text-transform: capitalize;
    display: flex;
    align-items: flex-end;
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 16px;

    &:hover {
      color: ${(props) => (props.dark ? 'black' : 'white')};
      background-color: ${(props) => (props.dark ? 'white' : 'black')};
    }

    &.active-link {
      color: ${(props) => (props.dark ? 'black' : 'white')};
      background-color: ${(props) => (props.dark ? 'white' : 'black')};
    }
  }
`;

const Navbar = ({ dark }) => {
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
    <StyledNav overlay={dark}>
      <Link to="/">
        <Image fluid={logo} />
      </Link>
      <MdMenu onClick={() => setDisplayMobileNav(true)} className="mobile-nav" />
      <LinksContainer dark={dark} displayMobile={displayMobileNav}>
        <MdClose
          style={{ display: displayMobileNav ? 'block' : 'none' }}
          onClick={() => setDisplayMobileNav(false)}
          className="close-icon"
        />
        <li>
          <StyledLink dark={dark} to="/" activeClassName="active-link">
            Home
          </StyledLink>
        </li>
        <li>
          <StyledLink dark={dark} to="/sectors/" partiallyActive={true} activeClassName="active-link">
            Sectors
          </StyledLink>
        </li>
        <li>
          <StyledLink dark={dark} to="/team" activeClassName="active-link" partiallyActive>
            Team
          </StyledLink>
        </li>
        <li>
          <StyledLink dark={dark} to="/blogs" activeClassName="active-link">
            Blogs
          </StyledLink>
        </li>
        <li>
          <StyledLink dark={dark} to="/playbook" activeClassName="active-link">
            Playbook
          </StyledLink>
        </li>
        <li>
          <StyledLink dark={dark} to="/contact" activeClassName="active-link">
            Contact
          </StyledLink>
        </li>
      </LinksContainer>
    </StyledNav>
  );
};

export default Navbar;
