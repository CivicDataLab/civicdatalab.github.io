import React from 'react';
import WorkHomePageStyle from '../styles/WorkHomePage';
import { Link } from 'gatsby';
import HeroText from '../styles/HeroText';

const WorkHomePage = () => {
  return (
    <WorkHomePageStyle>
      <div className={'container-work-section'}>
        <div className={'content'}>
          <HeroText className={'work-part'}>Work </HeroText>
          <HeroText className={'sub-text'}> With Us!</HeroText>
          <hr className={'work-home-page'}></hr>
          <p className={'first-text-block'}>
            Let’s co-create the next solution enabling sustainable social change in your area of work
          </p>
        </div>
        <div className={'circle-wrapper'}>
          <div className={'content-circle'} id="first-circle">
            <div className={'circle'}>
              <img src={require('../images/join-icon.svg')} alt="Join us" />
            </div>
            <div className={'below-text'}>
              <p>Partner With Us</p>
            </div>
          </div>
          <div className={'content-circle'}>
            <div className={'circle'}>
              <img src={require('../images/partner-icon.svg')} alt="Partner with us" />
            </div>
            <Link to="/openings" className={'below-text'}>
              <p>Join Us</p>
            </Link>
          </div>
        </div>
      </div>
    </WorkHomePageStyle>
  );
};

export default WorkHomePage;
