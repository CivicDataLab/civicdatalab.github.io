import React from 'react';
import styled from 'styled-components';
import Image from 'gatsby-image';
import { Link } from 'gatsby';

const ImageItemContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  text-decoration: none;
  position: relative;

  div {
    width: 100%;
    height: 180px;
    background-color: #eee;
  }

  p {
    color: #585050;
    font-weight: ${(props) => (props.boldText ? '700' : 'normal')};
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

const SectorLabel = styled.p`
  padding: 4px 10px;
  color: black !important;
  background-color: #fa7fe7;
  position: absolute;
  z-index: 500;
  top: 120px;
  right: 0;
  font-weight: 500;

  @media (min-width: 1280px) {
    top: 60%;
  }
`;

const ImageItem = ({ url, image, text, sector, boldText }) => {
  return (
    <ImageItemContainer boldText={boldText} to={url || '/'}>
      {sector ? <SectorLabel>{sector}</SectorLabel> : null}
      {image ? <Image fluid={image} /> : <div />} <p>{text}</p>
    </ImageItemContainer>
  );
};

export default ImageItem;
