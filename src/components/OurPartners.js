import React from 'react';
import HeroText from '../styles/HeroText';
import OurPartnersStyle from '../styles/OurPartners';
import Image from 'gatsby-image';
import ScrollContainer from 'react-indiana-drag-scroll';
// import HorizontalScroller from './HorizontalScroller';

const OurPartners = ({ partners }) => {
  return (
    <OurPartnersStyle>
      <div className={'partners-section-wraper'}>
        <div className={'content'}>
          <HeroText className={'section-heading'}>Our Partners</HeroText>
        </div>
        {/* <HorizontalScroller className="partners-container">
          {partners.map((partner) => (
            <a key={partner.id} href={`https://${partner.name}`} target="_blank" rel="noreferrer noopener">
              <Image fixed={partner.childImageSharp.fixed} />
            </a>
          ))}
        </HorizontalScroller> */}
        <ScrollContainer className="partners-container" vertical={false}>
          {partners.map((partner) => (
            <a key={partner.id} href={`https://${partner.name}`} target="_blank" rel="noreferrer noopener">
              <Image fixed={partner.childImageSharp.fixed} />
            </a>
          ))}
        </ScrollContainer>
      </div>
    </OurPartnersStyle>
  );
};

export default OurPartners;
