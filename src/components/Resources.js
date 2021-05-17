import React from 'react';
import styled from 'styled-components';
import ImageItem from './ImageItem';

const ResourcesContainer = styled.div`
  padding: 0 30px;
  h3 {
    font-family: Bungee;
    font-size: 32px;
    width: 60px;
    display: inline-block;
    text-align: left;
    margin-bottom: 16px;
  }

  @media (min-width: 1024px) {
    padding: 0;
    margin-bottom: 50px;
    h3 {
      font-size: 44px;
      width: max-content;
      margin-bottom: 35px;
    }
  }
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
  margin-top: 16px;

  @media (min-width: 1024px) {
    grid-gap: 24px;
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 2000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Resources = ({ resources }) => {
  return (
    <ResourcesContainer>
      <h3>Resources</h3>
      <ResourcesGrid>
        {resources.map((resource) => (
          <ImageItem
            key={resource.url}
            url={resource.url}
            image={resource.image.childImageSharp.fluid}
            text={resource.title}
          />
        ))}
      </ResourcesGrid>
    </ResourcesContainer>
  );
};

export default Resources;
