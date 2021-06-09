import React from 'react';
import HeroText from '../styles/HeroText';
import Image from 'gatsby-image';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MainContainer from '../styles/MainContainer';
import useHorizontalAutoScroll from '../hooks/useHorizontalAutoScroll';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2000 },
    items: 12
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 8
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

const PartnersContainer = styled(MainContainer)`
  overflow-x: hidden;
  margin-top: 69px;

  p {
    height: 70px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  @media (min-width: 900px) {
    .partners-container {
      margin-right: 18px;
    }
  }

  @media (min-width: 1280px) {
    margin-top: 100px;
    padding-left: 0;

    .section-heading {
      font-size: 70px;
      line-height: 67px;
    }
  }

  @media (min-width: 1280px) {
    padding: 0 46px;
  }

  @media (min-width: 1440px) {
    padding: 0 72px;
    .section-heading {
      font-size: 60px;
      line-height: 60px;
    }
  }

  @media (min-width: 1920px) {
    padding: 0;
  }
`;

const StyledCarousel = styled(Carousel)`
  margin: 30px auto;
  ul {
    display: flex;
    align-items: center;
  }

  li {
    margin: 0 4px;
  }

  @media (min-width: 1280px) {
    margin: 54px auto;

    li {
      margin: 0 30px;
    }
  }
`;

const OurPartners = ({ partners }) => {
  const scrollContainer = React.useRef(null);

  useHorizontalAutoScroll(scrollContainer);

  return (
    <PartnersContainer>
      <HeroText className={'section-heading'}>Our Partners</HeroText>
      <StyledCarousel responsive={responsive} autoPlay infinite>
        {partners.map((partner) => (
          <a key={partner.id} href={`https://${partner.name}`} target="_blank" rel="noreferrer noopener">
            <Image fixed={partner.childImageSharp.fixed} />
          </a>
        ))}
      </StyledCarousel>
    </PartnersContainer>
  );
};

export default OurPartners;
