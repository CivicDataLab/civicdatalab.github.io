import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { FaTwitter, FaLinkedinIn, FaGithubAlt } from 'react-icons/fa';
import { RiShareBoxFill } from 'react-icons/ri';
import styled from 'styled-components';
import Image from 'gatsby-image';
import { navLinks } from './Navbar';
import MainContainer from '../../styles/MainContainer';

const FooterContainer = styled.div`
  display: grid;
  font-size: 16px;
  background-color: #000000;
  color: white;
  padding: 40px 0;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'address address'
    'navigate header'
    'logo logo';

  @media (min-width: 768px) {
    grid-template-columns: auto 1fr 1fr 3fr;
    grid-gap: 30px;
    grid-template-areas: 'address navigate header logo';
  }

  @media (min-width: 1280px) {
    padding: 54px 0;
    grid-template-columns: 2.5fr 1fr 1fr 3fr;
  }

  @media (min-width: 1440px) {
    font-size: 18px;
  }
`;

const AddressContainer = styled.div`
  grid-area: address;
  max-width: 600px;
  width: 100%;

  .email {
    color: white;
    text-decoration: none;
    font-weight: 700;
    font-size: 24px;
  }

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
  margin-top: 40px;
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
    margin-top: 0px;
  }
`;

const NavLinksContainer = styled.ul`
  padding: 0;
  margin-top: 0;
  li {
    list-style: none;
    margin: 14px 0;
    a {
      color: white;
      text-decoration: none;
    }
  }
`;

const BottomContainer = styled.div`
  grid-area: logo;
  margin-top: 40px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    justify-content: center;
    align-items: end;
    margin-right: 40px;
    margin-top: 0;
  }

  @media (min-width: 1280px) {
    margin-top: 40px;
    .gatsby-image-wrapper {
      height: 160px !important;
      width: 125px !important;
    }
  }
`;

const ExternalLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 20px;
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

const SiteMap = styled.div`
  display: ${(props) => (props.mobile ? 'block' : 'none')};
  margin-top: 40px;
  a {
    color: white;
    text-decoration: none;
  }

  @media (min-width: 1280px) {
    display: ${(props) => (props.mobile ? 'none' : 'block')};
  }
`;

// Change the address and

const workLinks = [
  { path: '/education', name: 'Education' },
  { path: '/dpg', name: 'Digital Public Goods' },
  { path: '/lawandjustice', name: 'Law & Justice' },
  { path: '/publicfinance', name: 'Public Finance' },
  { path: '/urbandevelopment', name: 'Urban Development' }
];

const ExternalLink = ({ url, name }) => (
  <a style={{ display: 'flex', alignItems: 'center' }} href={url} target="_blank" rel="noreferrer noopener">
    <span style={{ display: 'inline-block', marginRight: 4 }}>{name}</span>
    <RiShareBoxFill />
  </a>
);

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterLogoQuery {
      logo: file(relativePath: { eq: "cdl_logo_dark.png" }) {
        childImageSharp {
          fixed(width: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const cdlLogo = data?.logo?.childImageSharp?.fixed;

  return (
    <div style={{ width: '100%', backgroundColor: '#000' }}>
      <MainContainer>
        <FooterContainer>
          <AddressContainer>
            <h3>Write to us at:</h3>
            <a className="email" href="mailto:info@civicdatalab.in">
              info@civicdatalab.in
            </a>
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
              <SiteMap>
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer noopener">
                  License
                </a>{' '}
                |{' '}
                <a href="/sitemap/sitemap-0.xml" target="_blank">
                  Site Map
                </a>
              </SiteMap>
            </ExternalLinksContainer>
          </AddressContainer>
          <NavigationContainer>
            <h2>Navigate</h2>
            <NavLinksContainer>
              {navLinks.map((navLink) => (
                <li key={navLink.path}>
                  {!navLink.external ? (
                    <Link to={navLink.path}>{navLink.name}</Link>
                  ) : (
                    <ExternalLink url={navLink.path} name={navLink.name} />
                  )}
                </li>
              ))}
            </NavLinksContainer>
          </NavigationContainer>
          <NavigationContainer>
            <h2>Work</h2>
            <NavLinksContainer>
              {workLinks.map((navLink) => (
                <li key={navLink.path}>
                  {!navLink.external ? (
                    <Link to={`/work${navLink.path}`}>{navLink.name}</Link>
                  ) : (
                    <ExternalLink url={navLink.path} name={navLink.name} />
                  )}
                </li>
              ))}
            </NavLinksContainer>
          </NavigationContainer>
          <BottomContainer>
            <Link to="/">
              <Image fixed={cdlLogo} />
            </Link>
          </BottomContainer>
          <SiteMap mobile>License | Site Map</SiteMap>
        </FooterContainer>
      </MainContainer>
    </div>
  );
};

export default Footer;
