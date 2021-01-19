import React from 'react';
import ContactStyle from '../styles/Contact';
import HeroText from '../styles/HeroText';
import styled from 'styled-components';
import { FaTwitter, FaInstagram, FaGithubAlt } from 'react-icons/fa';

const SocialLinksContainer = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 100px;

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
      margin: 0 4px;
    }
  }
`;

const Contact = (props) => {
  return (
    <ContactStyle>
      <div className={'container-contact-section'}>
        <div className={'content'}>
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
            <a href="https://instagram.com" target="_blank" rel="noreferrer noopener">
              <FaInstagram />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer noopener">
              <FaGithubAlt />
            </a>
          </SocialLinksContainer>
        </div>
        <div className={'content lower-content-section'}>
          <form action="/action_page.php">
            <input type="name" id="name" name="name" placeholder="Name" />
            <br></br>

            <input type="email" id="email" name="email" placeholder="Email" />
            <br></br>
            <input type="write" id="write" name="write" placeholder="Write" className={'write-input-type'} />
            <br></br>
            <div className={'send-button-container'}>
              <button type="submit" className="send-button">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </ContactStyle>
  );
};

export default Contact;
