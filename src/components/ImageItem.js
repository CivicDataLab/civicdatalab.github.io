import React from 'react';
import styled from 'styled-components';

const ImageItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;

  div {
    width: 100%;
    height: 180px;
    background-color: #eee;
  }

  p {
    color: #585050;
  }

  @media(min-width: 1024px) {
    div {
      height: 270px;
    }

    p {
      font-size: 25px;
      line-height: 30px;
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
