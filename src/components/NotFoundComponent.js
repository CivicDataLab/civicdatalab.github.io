import React from 'react';
import ContactStyle from '../styles/Contact';
import HeroText from '../styles/HeroText';
import MainContainer from '../styles/MainContainer';
import { Link } from 'gatsby';

const NotFoundComponent = () => {
  return (
    <MainContainer>
      <ContactStyle>
        <div className={'content upper-content-section'}>
          <HeroText className={'main-part'}>Not found </HeroText>
          <hr className={'contact-page-line'}></hr>
        </div>
        <div className={'content lower-content-section'}>
          <p>No page found at this url.</p>
          <p>
            {' '}
            Please go back to the <Link to="/">homepage.</Link>
          </p>
        </div>
      </ContactStyle>
    </MainContainer>
  );
};

export default NotFoundComponent;
