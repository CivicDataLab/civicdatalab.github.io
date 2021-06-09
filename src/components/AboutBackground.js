import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

const AboutBackground = ({ children }) => {
  const data = useStaticQuery(graphql`
    query BackgroundImagesQuery {
      allFile(filter: { relativePath: { regex: "/backgrounds/" } }) {
        nodes {
          id
          childImageSharp {
            fluid(maxWidth: 2000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  const [currentImage, setCurrentImage] = React.useState(data.allFile.nodes[0].childImageSharp.fluid);

  React.useEffect(() => {
    let currentIndex = 0;
    const transitionInterval = setInterval(() => {
      setCurrentImage(data.allFile.nodes[currentIndex].childImageSharp.fluid);
      currentIndex = currentIndex === 2 ? 0 : currentIndex + 1;
    }, 4000);

    return () => {
      clearInterval(transitionInterval);
    };
  }, [data.allFile.nodes]);

  return (
    <BackgroundImage style={{ zIndex: 999 }} fluid={currentImage}>
      {children}
    </BackgroundImage>
  );
};

export default AboutBackground;
