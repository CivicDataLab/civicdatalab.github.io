import React from 'react';
import ContactStyle from '../styles/Contact';
import HeroText from '../styles/HeroText';
import styled from 'styled-components';
import { FaTwitter, FaLinkedinIn, FaGithubAlt } from 'react-icons/fa';
import MainContainer from '../styles/MainContainer';

const SocialLinksContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
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
    margin-top: 110px;
  }
`;

const Contact = (props) => {
  return (
    <MainContainer>
      <ContactStyle>
        <div className={'content upper-content-section'}>
          <HeroText className={'main-part'}>Come </HeroText>
          <HeroText className={'sub-text'}> Say Hi!</HeroText>
          <hr className={'contact-page-line'}></hr>
          <p className={'first-text-block'}>
            Get in touch to learn more about CivicDataLab, our work and how we can collaborate!
          </p>
          <p className={'mail-text-block'}>info@civicdatalab.in</p>
          <SocialLinksContainer>
            <a href="https://twitter.com" target="_blank" rel="noreferrer noopener">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer noopener">
              <FaGithubAlt />
            </a>
          </SocialLinksContainer>
        </div>
        <div className={'content lower-content-section'}>
          <form>
            <input type="name" id="name" name="name" placeholder="Name" />
            <br></br>

            <input type="email" id="email" name="email" placeholder="Email" />
            <br></br>
            <textarea rows={8} id="write" name="write" placeholder="Write..." className={'write-input-type'}></textarea>
            <br></br>
            <div className="send-button-container">
              <button className="send-button">Submit</button>
            </div>
          </form>
        </div>
      </ContactStyle>
    </MainContainer>
  );
};

export default Contact;
