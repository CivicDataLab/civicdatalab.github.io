import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
`;

const Card = styled.div`
  height: 360px;
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
      <h2>{title}</h2>
    </StyledLink>
  );
};

export default BlogCard;
