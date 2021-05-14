import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

const Card = styled.div`
  position: relative;
  padding: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.29);
  height: 100%;
  transition-duration: 0.5s;
  border-radius: 12px;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 4px;
    background-color: ${(props) => (props.color ? props.color : 'black')};
    transition: width 0.3s ease-in-out;
  }

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);

    &:after {
      width: 100%;
    }
  }

  .gatsby-image-wrapper {
    height: 180px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  @media (min-width: 1200px) {
    .gatsby-image-wrapper {
      height: 300px;
    }
  }
`;

const CardContent = styled.div`
  box-sizing: border-box;
  padding: 18px 20px;
  position: relative;
  min-height: 280px;

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

  hr {
    border: 4px solid #000000;
    width: 60px;
    margin-left: 0px;
  }

  p {
    text-align: left;
    line-height: 1.4em;
    color: #585050;
    min-height: 260px;
  }

  @media (min-width: 1200px) {
    padding: 30px;
    min-height: 375px;
  }

  @media (min-width: 1440px) {
    height: 500px;
    h4 {
      font-size: 32px;
      line-height: 56px;
    }
    hr {
      width: 98px;
    }
    p {
      line-height: 27px;
    }
  }

  @media (min-width: 1600px) {
    height: 400px;
  }
`;

const CardLink = styled(Link)`
  text-align: left;
  font: normal normal medium;
  font-size: 16px;
  line-height: 45px;
  font-family: Montserrat;
  letter-spacing: 0px;
  color: #168cd6;
  opacity: 1;
  text-decoration: none;
  display: flex;
  justify-content: flex-end;
  padding-right: 23px;
  position: absolute;
  right: 18px;
  bottom: 20px;

  @media (min-width: 1440px) {
    font-size: 20px;
    line-height: 78px;
    bottom: 0px;
  }
`;

const SectorCard = ({ name, description, link, color, image, about }) => {
  return (
    <Card color={color}>
      <Image fluid={image} />
      <CardContent>
        <h4 style={{ color: color }} className={'sector-name'}>
          {name}
        </h4>
        <hr></hr>
        <p>{description}</p>
        <CardLink to={link}>
          {about ? 'Find them here ' : 'Read more '}
          &gt;&gt;
        </CardLink>
      </CardContent>
    </Card>
  );
};

export default SectorCard;
