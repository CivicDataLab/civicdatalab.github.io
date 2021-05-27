import React from 'react';
import Image from 'gatsby-image';
import BackgroundImage from 'gatsby-background-image';
import ScrollContainer from 'react-indiana-drag-scroll';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const StyledScrollContainer = styled(ScrollContainer)`
  display: flex;
  align-items: center;
  overflow-x: auto;
  height: 340px;
  margin-bottom: 60px;

  > * {
    height: 260px;
    width: 260px;
    margin-right: 20px;
    flex-shrink: 0;
  }

  @media (min-width: 1280px) {
    margin-bottom: 90px;
  }
`;

const CivicDaysImages = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "reel.png" }) {
        childImageSharp {
          fluid(maxWidth: 2000, quality: 100) {
            ...GatsbyImageSharpFluid_noBase64
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
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  `);

  const scrollContainer = React.useRef(null);

  React.useEffect(() => {
    let scrollInterval;
    if (scrollContainer.current) {
      let scrollWidth = 0;
      scrollInterval = setInterval(() => {
        if (scrollWidth > scrollContainer.current.scrollWidth) {
          scrollWidth = 0;
        } else {
          scrollWidth = scrollWidth + 1;
          scrollContainer.current.scrollTo(scrollWidth, 0);
        }
      }, 20);
    }

    return () => {
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <BackgroundImage fluid={data.file.childImageSharp.fluid}>
      <StyledScrollContainer innerRef={scrollContainer} vertical={false}>
        {data.civicdayimages.nodes?.map((image) => {
          return <Image key={image.id} fluid={image.childImageSharp.fluid} />;
        })}
      </StyledScrollContainer>
    </BackgroundImage>
  );
};

export default CivicDaysImages;
