import React from 'react';
import ContactStyle from '../styles/Contact';
import HeroText from '../styles/HeroText';
import styled from 'styled-components';
import { FaTwitter, FaLinkedinIn, FaGithubAlt } from 'react-icons/fa';
import MainContainer from '../styles/MainContainer';

const SocialLinksContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background-color: black;
    width: 34px;
    height: 34px;
    border-radius: 100%;
    color: white;
    margin: 0 8px;
  }

  a > * {
    width: 70%;
    height: 70%;
  }

  @media (min-width: 768px) {
    a {
      width: 45px;
      height: 45px;
    }
  }

  @media (min-width: 1280px) {
    margin-top: 100px;
  }

  @media (min-width: 2000px) {
    margin-top: 150px;
    margin-bottom: 150px;
  }
`;

export const SocialLinks = () => {
  return (
    <SocialLinksContainer>
      <a href="https://twitter.com/civicdatalab" target="_blank" rel="noreferrer noopener">
        <FaTwitter />
      </a>
      <a href="https://www.linkedin.com/company/civicdatalab" target="_blank" rel="noreferrer noopener">
        <FaLinkedinIn />
      </a>
      <a href="https://github.com/CivicDataLab" target="_blank" rel="noreferrer noopener">
        <FaGithubAlt />
      </a>
    </SocialLinksContainer>
  );
};

const Contact = () => {
  return (
    <MainContainer>
      <ContactStyle>
        <div className={'content upper-content-section'}>
          <HeroText className={'main-part'}>Come </HeroText>
          <HeroText className={'sub-text'}> Say Hi!</HeroText>
          <hr className={'contact-page-line'}></hr>
          <SocialLinks />
        </div>
        <div className={'content lower-content-section'}>
          <p>
            We love discussing project ideas and challenges. Drop us a line here:{' '}
            <a href="mailto:info@civicdatalab.in">info@civicdatalab.in</a>
          </p>
          <p>
            For all hiring related queries, please write to us at{' '}
            <a href="mailto:careers@civicdatalab.in">careers@civicdatalab.in</a>. Do check out our{' '}
            <a href="https://jobs.civicdatalab.in" target="_blank" rel="noreferrer">
              openings
            </a>{' '}
            page to know more about the roles we're hiring for.{' '}
          </p>
          <p>
            We're also on{' '}
            <a href="https://twitter.com/civicdatalab" target="_blank" rel="noreferrer noopener">
              Twitter
            </a>
            . Sure, you can DM us there as well!
          </p>
        </div>
      </ContactStyle>
    </MainContainer>
  );
};

export default Contact;
