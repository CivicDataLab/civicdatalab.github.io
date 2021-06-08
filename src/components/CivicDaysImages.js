import React from 'react';
import Image from 'gatsby-image';
import BackgroundImage from 'gatsby-background-image';
import ScrollContainer from 'react-indiana-drag-scroll';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import useHorizontalAutoScroll from '../hooks/useHorizontalAutoScroll';

const StyledScrollContainer = styled(ScrollContainer)`
  display: flex;
  align-items: center;
  overflow-x: auto;
  height: 380px;
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

  @media (min-width: 2000px) {
    height: 480px;

    > * {
      height: 350px;
      width: 350px;
    }
  }
`;

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

  const scrollContainer = React.useRef(null);

  useHorizontalAutoScroll(scrollContainer);

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
