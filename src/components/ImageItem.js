import React from 'react';
import styled from 'styled-components';
import Image from 'gatsby-image';
import { Link } from 'gatsby';

const ImageItemContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  text-decoration: none;

  div {
    width: 100%;
    height: 180px;
    background-color: #eee;
  }

  p {
    color: #585050;
  }

  @media (min-width: 1024px) {
    div {
      height: 270px;
    }
  }

  @media (min-width: 1600px) {
    p {
      font-size: 18px;
      line-height: 30px;
    }
  }
`;

const ImageItem = ({ url, image, text }) => {
  return (
    <ImageItemContainer to={url || '/'}>
      {image ? <Image fluid={image} /> : <div />} <p>{text}</p>
    </ImageItemContainer>
  );
};

export default ImageItem;
