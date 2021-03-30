import React from 'react';
import styled from 'styled-components';

const ImageItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;

  div {
    width: 100%;
    height: 90px;
    background-color: #eee;
  }

  p {
    font-size: 14px;
  }

  @media (min-width: 768px) {
    div {
      height: 180px;
    }
  }

  @media (min-width: 1024px) {
    p {
      font-size: 18px;
    }
  }
`;

const ImageItem = ({ image, text }) => {
  return (
    <ImageItemContainer>
      <div /> <p>{text}</p>
    </ImageItemContainer>
  );
};

export default ImageItem;
