import React from 'react';
import HeroText from '../styles/HeroText';
import OurPartnersStyle from '../styles/OurPartners';
const OurPartners = (props) => {
  return (
    <OurPartnersStyle>
        <div className={"partners-section-wraper"}>
      <div className={'content'}>
        <HeroText className={'section-heading'}>Our Partners</HeroText>
      </div>
      <div className={'partners-container'}>
        <div className={'partners-image-container'}>
          <div className={'partners-image-placeholder'}></div>
        </div>
        <div className={'partners-image-container'}>
          <div className={'partners-image-placeholder'}></div>
        </div>
        <div className={'partners-image-container'}>
          <div className={'partners-image-placeholder'}></div>
        </div>
        <div className={'partners-image-container'}>
          <div className={'partners-image-placeholder'}></div>
        </div>
        <div className={'partners-image-container'}>
          <div className={'partners-image-placeholder'}></div>
        </div>
        <div className={'partners-image-container'}>
          <div className={'partners-image-placeholder'}></div>
        </div>
      </div>
      </div>
    </OurPartnersStyle>
  );
};

export default OurPartners;
