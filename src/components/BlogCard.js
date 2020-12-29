import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 318px;
  height: 360px;
  box-shadow: 7px 3px 4px rgba(0, 0, 0, 0.29);
`;

const BlogCard = ({ title, imageUrl }) => {
  return (
    <div>
      <Card>
        <img src={imageUrl} alt={title} />
      </Card>
      <h2>{title}</h2>
    </div>
  );
};

export default BlogCard;
