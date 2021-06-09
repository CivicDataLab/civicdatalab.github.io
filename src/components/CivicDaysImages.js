import React from 'react';
import Image from 'gatsby-image';
import BackgroundImage from 'gatsby-background-image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const StyledCarousel = styled(Carousel)`
  height: 380px;
  margin-bottom: 36px;

  ul > * {
    height: 260px;
    width: 260px;
  }

  .gatsby-image-wrapper {
    height: 100%;
    width: 100%;
  }

  @media (min-width: 1280px) {
    margin-bottom: 80px;

    li {
      margin-right: 20px;
    }
  }

  @media (min-width: 2000px) {
    height: 480px;

    ul > * {
      height: 350px;
      width: 350px;
    }
  }
`;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2000 },
    items: 8
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const CivicDaysImages = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "reel.png" }) {
        childImageSharp {
          fluid(maxWidth: 2000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      civicdayimages: allFile(
        filter: { relativePath: { regex: "/civicdays/" }, extension: { in: ["jpg", "jpeg", "png"] } }
        sort: { fields: name }
      ) {
        nodes {
          id
          name
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  return (
    <BackgroundImage fluid={data.file.childImageSharp.fluid}>
      <StyledCarousel infinite autoPlay autoPlaySpeed={2000} responsive={responsive}>
        {data.civicdayimages.nodes?.map((image) => {
          return <Image key={image.id} fluid={image.childImageSharp.fluid} />;
        })}
      </StyledCarousel>
    </BackgroundImage>
  );
};

export default CivicDaysImages;
