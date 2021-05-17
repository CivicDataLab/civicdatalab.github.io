import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { MdClose, MdMenu } from 'react-icons/md';
import { RiShareBoxFill } from 'react-icons/ri';
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

const StyledExternalLink = styled.a`
  color: inherit;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 22px;
  display: inline-block;

  span {
    margin-right: 4px;
  }

  svg {
    margin-bottom: 2px;
  }

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

const navLinks = [
  { path: '/home', name: 'Home' },
  { path: '/work', name: 'Work' },
  { path: '/team', name: 'Team' },
  { path: 'https://medium.com/@CivicDataLab', name: 'Blogs', external: true },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' }
];

const Navbar = ({ dark, overlay }) => {
  const [displayMobileNav, setDisplayMobileNav] = React.useState(false);

  const data = useStaticQuery(graphql`
    query LogoQuery {
      logo: file(relativePath: { eq: "cdl_logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 100, quality: 100) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `);

  const logo = data?.logo?.childImageSharp?.fluid;

  return (
    <StyledNav overlay={overlay}>
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
        {navLinks.map((link) => (
          <li key={link.path}>
            {!link.external ? (
              <StyledLink dark={dark} activeClassName="active-link" to={link.path}>
                {link.name}
              </StyledLink>
            ) : (
              <StyledExternalLink href={link.path} target="_blank" rel="noreferrer noopener">
                <span>{link.name}</span>
                <RiShareBoxFill />
              </StyledExternalLink>
            )}
          </li>
        ))}
      </LinksContainer>
    </StyledNav>
  );
};

export default Navbar;
