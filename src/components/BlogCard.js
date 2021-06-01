import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  text-decoration: none;
  color: #535151 !important;

  @media (min-width: 1280px) {
    grid-column: span 3;
  }
`;

const Card = styled.div`
  height: 300px;
  box-shadow: 7px 3px 4px rgba(0, 0, 0, 0.29);

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const BlogCard = ({ title, imageUrl, postUrl }) => {
  return (
    <StyledLink href={postUrl} target="_blank" rel="noopener noreferrer">
      <Card>
        <img src={imageUrl} alt={title} />
      </Card>
      <h3>{title}</h3>
    </StyledLink>
  );
};

export default BlogCard;
