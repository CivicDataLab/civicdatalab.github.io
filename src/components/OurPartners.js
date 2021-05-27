import React from 'react';
import HeroText from '../styles/HeroText';
import OurPartnersStyle from '../styles/OurPartners';
import Image from 'gatsby-image';
import ScrollContainer from 'react-indiana-drag-scroll';

const OurPartners = ({ partners }) => {
  const scrollContainer = React.useRef(null);

  React.useEffect(() => {
    if (scrollContainer.current) {
      let scrollWidth = 0;
      setInterval(() => {
        if (scrollWidth > scrollContainer.current.scrollWidth + 1000) {
          scrollWidth = 0;
        } else {
          scrollWidth = scrollWidth + 2;
          scrollContainer.current.scrollTo(scrollWidth, 0);
        }
      }, 20);
    }
  }, []);

  return (
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
  );
};

export default OurPartners;
