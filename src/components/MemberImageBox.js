import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

const ImageBox = styled(Link)`
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
  position: relative;
  text-decoration: none;

  width: 125px;
  height: 200px;

  .gatsby-image-wrapper {
    height: 100%;
  }

  .member-details {
    position: absolute;
    bottom: 0;
    padding: 15px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    background: #000000;
    opacity: 0.76;
  }

  .member-name {
    font-size: 16px;
    font-family: Montserrat;
  }

  .member-desg {
    font-style: italic;
    font-size: 12px;
    font-family: Montserrat;
    text-align: center;
  }

  @media (min-width: 1280px) {
    width: 250px;
    height: 380px;

    .member-name {
      font-size: 20px;
    }
    .member-desg {
      font-size: 14px;
    }
  }

  @media (min-width: 1440px) {
    width: 280px;
    height: 400px;
    .member-details {
      padding: 21px 0 28px;
    }
  }
`;

const MemberImageBox = ({ link, name, role, image }) => {
  return (
    <ImageBox to={link}>
      <Image fluid={image} />
      <span className="member-details">
        <span className="member-name">{name.split(' ')[0]}</span>
        <span className="member-desg">{role}</span>
      </span>
    </ImageBox>
  );
};

export default MemberImageBox;
