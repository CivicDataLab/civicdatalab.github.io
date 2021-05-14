import React from 'react';
import HeroText from '../styles/HeroText';
import OurPartnersStyle from '../styles/OurPartners';
import Image from 'gatsby-image';
import ScrollContainer from 'react-indiana-drag-scroll';

const OurPartners = ({ partners }) => {
  return (
    <OurPartnersStyle>
      <div className={'content'}>
        <HeroText className={'section-heading'}>Our Partners</HeroText>
      </div>
      <ScrollContainer className="partners-container" vertical={false}>
        {partners.map((partner) => (
          <a key={partner.id} href={`https://${partner.name}`} target="_blank" rel="noreferrer noopener">
            <Image fixed={partner.childImageSharp.fixed} />
          </a>
        ))}
      </ScrollContainer>
    </OurPartnersStyle>
  );
};

export default OurPartners;
