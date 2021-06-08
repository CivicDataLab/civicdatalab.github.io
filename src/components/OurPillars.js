import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import HeroText from '../styles/HeroText';
import OurPillarsStyle from '../styles/OurPillars';
import MainContainer from '../styles/MainContainer';

export const PillarImages = () => {
  const imageData = useStaticQuery(graphql`
    query {
      dataPillar: file(relativePath: { eq: "data.png" }) {
        childImageSharp {
          fluid(maxHeight: 400, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      technologyPillar: file(relativePath: { eq: "technology.png" }) {
        childImageSharp {
          fluid(maxHeight: 400, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      designPillar: file(relativePath: { eq: "design.png" }) {
        childImageSharp {
          fluid(maxHeight: 400, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      socialPillar: file(relativePath: { eq: "social.png" }) {
        childImageSharp {
          fluid(maxHeight: 400, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <>
      <div className={'image-container'}>
        <h3>Data</h3>
        <Image fluid={imageData.dataPillar.childImageSharp.fluid} />
      </div>
      <div className={'image-container'}>
        <h3>Tech</h3>
        <Image fluid={imageData.technologyPillar.childImageSharp.fluid} />
      </div>
      <div className={'image-container'}>
        <h3>Design</h3>
        <Image fluid={imageData.designPillar.childImageSharp.fluid} />
      </div>
      <div className={'image-container'}>
        <h3>Social Science</h3>
        <Image fluid={imageData.socialPillar.childImageSharp.fluid} />
      </div>
    </>
  );
};

const OurPillars = () => {
  return (
    <MainContainer>
      <OurPillarsStyle>
        <HeroText className={'sectors-heading'}>Our Pillars</HeroText>
        <p>
          We believe in building holistic solutions that take our four pillars into equal consideration when trying to
          address complex societal challenges.
        </p>
        <div className={'pillars-container'}>
          <PillarImages />
        </div>
      </OurPillarsStyle>
    </MainContainer>
  );
};

export default OurPillars;
