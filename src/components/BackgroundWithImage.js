import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import BackgroundImage from 'gatsby-background-image';

const BackgroundSection = ({ children }) => {
  const data = useStaticQuery(graphql`
    query BackgroundImageQuery {
      background: file(relativePath: { eq: "landing-image.jpeg" }) {
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
    <BackgroundImage Tag="section" fluid={image}>
      {children}
    </BackgroundImage>
  );
};

const StyledBackgroundSection = styled(BackgroundSection)`
  width: 100%;
  background-position: top center;
  background-repeat: repeat-y;
  background-size: cover;
`;

export default StyledBackgroundSection;
