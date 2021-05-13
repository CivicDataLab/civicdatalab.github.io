import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { FaTwitter, FaLinkedinIn, FaGithubAlt } from 'react-icons/fa';
import styled from 'styled-components';
import Image from 'gatsby-image';

const FooterContainer = styled.div`
  display: grid;
  font-size: 16px;
  background-color: #000000;
  color: white;
  padding: 40px 22px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'address address'
    'navigate header'
    'bottom bottom';

  @media (min-width: 768px) {
    padding-bottom: 0px;
    grid-template-columns: auto 1fr 1fr 3fr;
    grid-gap: 30px;
    grid-template-areas:
      'address navigate header empty'
      'bottom bottom bottom bottom';
  }

  @media (min-width: 1280px) {
    grid-template-columns: 2.5fr 1fr 1fr 3fr;
    padding-left: 52px;
    padding-right: 52px;
  }

  @media (min-width: 1440px) {
    font-size: 18px;
  }
`;

const AddressContainer = styled.div`
  grid-area: address;
  max-width: 600px;
  width: 100%;


  p {
    line-height: 22px;
  }

  @media (min-width: 768px) {
    max-width: 320px;
    padding-right: 32px;
  }

  @media (min-width: 1024px) {
    max-width: 450px;

    h3 {
      margin-top: 10px;
    }
  }
`;

const NavigationContainer = styled.div`
  margin-top: 30px;
  h2 {
    font-size: 22px;
    text-transform: uppercase;
    display: inline-block;
    padding-bottom: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    border-bottom: 1px solid white;
  }

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const NavLinksContainer = styled.ul`
  padding: 0;
  margin-top: 0;
  li {
    list-style: none;
    margin: 6px 0;
    a {
      color: white;
      text-decoration: none;
    }
  }
`;

const BottomContainer = styled.div`
  grid-area: bottom;
  margin-top: 80px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: baseline;
    position: relative;
    top: -30%;
    margin-top: 0;
  }
`;

const ExternalLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 18px;

  @media (min-width: 768px) {
    width: 320px;
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 118px;
  width: 100%;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background-color: white;
    width: 34px;
    height: 34px;
    border-radius: 100%;
    color: black;
  }
`;

const footerNavLinks = [
  { path: '/home', name: 'Home' },
  { path: '/sectors', name: 'Sectors' },
  { path: '/team', name: 'Team' },
  { path: '/blogs', name: 'Blogs' },
  { path: '/about', name: 'About' }
];

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterLogoQuery {
      logo: file(relativePath: { eq: "cdl_logo_dark.png" }) {
        childImageSharp {
          fixed(width: 85) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const cdlLogo = data?.logo?.childImageSharp?.fixed;

  return (
    <FooterContainer>
      <AddressContainer>
        <h3>We are remote, but if you want to write to us:</h3>
        <p>CivicDataLab Pvt Ltd, 301-A, 296/2 Lord Shiva Residency, Bholaram Ustad Marg Indore, MP - 452001, India.</p>
      </AddressContainer>
      <NavigationContainer>
        <h2>Navigate</h2>
        <NavLinksContainer>
          {footerNavLinks.map((navLink) => (
            <li key={navLink.path}>
              <Link to={navLink.path}>{navLink.name}</Link>
            </li>
          ))}
        </NavLinksContainer>
      </NavigationContainer>
      <NavigationContainer>
        <h2>Header</h2>
        <NavLinksContainer>
          {footerNavLinks.map((navLink) => (
            <li key={navLink.path}>
              <Link to={navLink.path}>{navLink.name}</Link>
            </li>
          ))}
        </NavLinksContainer>
      </NavigationContainer>
      <BottomContainer>
        <Link to="/">
          <Image fixed={cdlLogo} />
        </Link>
        <ExternalLinksContainer>
          <SocialLinksContainer>
            <a href="https://twitter.com/civicdatalab" target="_blank" rel="noreferrer noopener">
              <FaTwitter />
            </a>
            <a href="https://in.linkedin.com/company/civicdatalab" target="_blank" rel="noreferrer noopener">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/CivicDataLab" target="_blank" rel="noreferrer noopener">
              <FaGithubAlt />
            </a>
          </SocialLinksContainer>
          <div>License | Site Map</div>
        </ExternalLinksContainer>
      </BottomContainer>
    </FooterContainer>
  );
};

export default Footer;