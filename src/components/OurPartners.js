import React from 'react';
import HeroText from '../styles/HeroText';
import OurPartnersStyle from '../styles/OurPartners';
import Image from 'gatsby-image';
import ScrollContainer from 'react-indiana-drag-scroll';
import MainContainer from '../styles/MainContainer';
import useHorizontalAutoScroll from '../hooks/useHorizontalAutoScroll';

const OurPartners = ({ partners }) => {
  const scrollContainer = React.useRef(null);

  useHorizontalAutoScroll(scrollContainer);

  return (
    <MainContainer>
      <OurPartnersStyle>
        <div className={'content'}>
          <HeroText className={'section-heading'}>Our Partners</HeroText>
        </div>
        <ScrollContainer className="partners-container" vertical={false} innerRef={scrollContainer}>
          {partners.map((partner) => (
            <a key={partner.id} href={`https://${partner.name}`} target="_blank" rel="noreferrer noopener">
              <Image fixed={partner.childImageSharp.fixed} />
            </a>
          ))}
        </ScrollContainer>
      </OurPartnersStyle>
    </MainContainer>
  );
};

export default OurPartners;
