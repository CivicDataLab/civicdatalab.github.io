import React from 'react';
import styled from 'styled-components';
import Image from 'gatsby-image';
import { Link } from 'gatsby';
import fileImg from '../images/cdl_logo.png';

const ImageEventContainer = styled(Link)`
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
    font-weight: ${(props) => (props.boldtext ? '700' : 'normal')};
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

const EventLabel = styled.span`
  padding: 4px 10px;
  color: white !important;
  background-color: ${(props) => (props.color ? props.color : '#fa7fe7')};
  position: absolute;
  z-index: 500;
  top: 60%;
  right: 0;
  font-weight: 500 !important;

  @media(max-width:1024px) {
    top:50%;
  }
  @media (min-width: 1280px) {
    top: 55%;
  }
`;

const IconBackground = styled.div`
  background-image: ${(props) => (props.iconImg ? `url(${props.iconImg})` : `url(${fileImg})`)};
  background-size: 60% 60%;
  background-position: center;
  background-repeat: no-repeat;
`;

const sectors = [
  { name: 'Digital Public Goods', color: '#74719e' },
  { name: 'Law & Justice', color: '#4b4140' },
  { name: 'Public Finance', color: '#525568' },
  { name: 'Urban Development', color: '#4b4140' },
  { name: 'Open Contracting', color: '#076775' }
];

const sectorLabelColorGenerator = (eventName) => {
  return sectors.find((sector) => sector.name === eventName)?.color;
};

const ImageEvent = ({ url, image, text, eventName, boldText, openInNewTab, iconImg }) => {
  return (
    <ImageEventContainer boldtext={boldText.toString()} to={url || '/'} target={openInNewTab ? '_blank' : '_self'}>
      {eventName ? <EventLabel color={sectorLabelColorGenerator(eventName)}>{eventName}</EventLabel> : null}
      {image ? <Image fluid={image} /> : iconImg ? <IconBackground iconImg={iconImg} /> : <div />} <p>{text}</p>
    </ImageEventContainer>
  );
};

export default ImageEvent;
