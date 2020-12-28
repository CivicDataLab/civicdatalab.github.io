import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import HeroText from '../styles/HeroText';
import Button from '../styles/Button';

const BackgroundSection = ({ title }) => {
  const data = useStaticQuery(graphql`
    query BackgroundQuery {
      background: file(relativePath: { eq: "background.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `);

  const image = data?.background?.childImageSharp?.fluid;

  return (
    <BackgroundImage fluid={image} Tag="section">
      <HeroText light>{title}</HeroText>
      <Button light>read more</Button>
    </BackgroundImage>
  );
};

const StyledBackgroundSection = styled(BackgroundSection)`
  width: 100%;
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover;
  height: 80vh;
`;

export default StyledBackgroundSection;
