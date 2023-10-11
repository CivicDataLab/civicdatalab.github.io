import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

const Card = styled.div`
  position: relative;
  padding: 0;
  box-shadow: 0px 10px 20px #0000001a;
  height: 100%;
  transition-duration: 0.5s;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  .animated-strip {
    content: '';
    bottom: 0.5px;
    position: relative;
    width: 0;
    height: 5px;
    margin: auto;
    background-color: ${(props) => (props.color ? props.color : 'black')};
    transition: width 0.3s ease-in-out;
    border-radius: 20px;
  }

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);

    .animated-strip {
      width: 96%;
    }
  }

  .gatsby-image-wrapper {
    height: 180px;
  }

  @media (min-width: 1280px) {
    grid-column: span 4;
    .gatsby-image-wrapper {
      height: 220px;
    }
  }

  @media (min-width: 1440px) {
    .gatsby-image-wrapper {
      height: 290px;
    }
  }
`;

const CardContent = styled.div`
  box-sizing: border-box;
  padding: 18px 20px;
  position: relative;
  height: 375px;

  h4 {
    text-align: left;
    font-size: 24px;
    line-height: 34px;
    font-family: 'Bungee', cursive;
    color: #096c90;
    text-transform: uppercase;
    margin-bottom: 0px;
    margin-top: 0px;
  }

  p {
    text-align: left;
    line-height: 1.4em;
    color: #585050;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  @media (min-width: 1280px) {
    padding: 30px;
    height: 340px;
  }

  @media (min-width: 1440px) {
    height: 380px;
    h4 {
      font-size: 32px;
      line-height: 56px;
    }
    p {
      line-height: 27px;
    }
  }
`;

const CardLink = styled(Link)`
  font-size: 16px;
  line-height: 45px;
  font-weight: 500;
  color: #168cd6;
  text-decoration: none;
  display: flex;
  justify-content: flex-end;
  padding-right: 23px;
  position: absolute;
  left: 20px;
  bottom: 20px;

  @media (min-width: 1280px) {
    font-size: 20px;
    line-height: 78px;
    right: 18px;
    bottom: 0px;
  }
`;

const SectorCard = ({ name, description, link, color, image, about }) => {
  return (
    <Card color={color}>
      <Image fluid={image} objectFit="contain" />
      <CardContent>
        <h4 style={{ color: color }} className={'sector-name'}>
          {name === 'Digital Public Goods' ? 'Digital Public Goods (DPG)' : name}
        </h4>
        <p>{description}</p>
        <CardLink to={link}>
          {about ? 'Find them here ' : 'Learn more '}
          &gt;&gt;
        </CardLink>
      </CardContent>
      <div className="animated-strip" />
    </Card>
  );
};

export default SectorCard;
