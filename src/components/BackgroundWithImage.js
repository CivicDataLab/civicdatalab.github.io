import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import BackgroundImage from 'gatsby-background-image';

const BackgroundSectionWithImage = ({ children }) => {
  const data = useStaticQuery(graphql`
    query BackgroundImageQuery {
      background: file(relativePath: { eq: "landing-image.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const image = data?.background?.childImageSharp?.fluid;

  return (
    <BackgroundImage Tag="section" fluid={image}>
      {children}
    </BackgroundImage>
  );
};

const StyledBackgroundSectionWithImage = styled(BackgroundSectionWithImage)`
  width: 100%;
  background-position: top center;
  background-repeat: repeat-y;
  background-size: cover;
`;

export default StyledBackgroundSectionWithImage;
