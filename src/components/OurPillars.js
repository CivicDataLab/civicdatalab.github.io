import React from 'react';
import HeroText from '../styles/HeroText';
import OurPillarsStyle from '../styles/OurPillars';
const OurPillars = (props) => {
  return (
    <OurPillarsStyle>
      <div className={'pillars-container'}>
        <div className={'image-container'}>
          <HeroText>Data</HeroText>
          <div className={'image-placeholder'}></div>
        </div>
        <div className={'image-container'}>
          <HeroText>Tech</HeroText>
          <div className={'image-placeholder'}></div>
        </div>
        <div className={'image-container'}>
          <HeroText>Design</HeroText>

          <div className={'image-placeholder'}></div>
        </div>
        <div className={'image-container'}>
          <HeroText>Social Science</HeroText>
          <div className={'image-placeholder'}></div>
        </div>
      </div>
    </OurPillarsStyle>
  );
};

export default OurPillars;
