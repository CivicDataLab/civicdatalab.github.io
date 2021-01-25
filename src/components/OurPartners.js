import React from 'react';
import HeroText from '../styles/HeroText';
import OurPartnersStyle from '../styles/OurPartners';
import Image from 'gatsby-image';

const OurPartners = ({ partners }) => {
  return (
    <OurPartnersStyle>
      <div className={'partners-section-wraper'}>
        <div className={'content'}>
          <HeroText className={'section-heading'}>Our Partners</HeroText>
        </div>
        <div className={'partners-container'}>
          {partners.map((partner) => (
            <Image key={partner.id} fixed={partner.childImageSharp.fixed} />
          ))}
        </div>
      </div>
    </OurPartnersStyle>
  );
};

export default OurPartners;
