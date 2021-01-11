import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const ImageBox = styled(Link)`
  display: inline-block;
  width: 138px;
  height: 207px;
  background: #f2f2f2;
  position: relative;

  .member-details {
    position: absolute;
    padding: 15px 0;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #000000;
    opacity: 0.76;
  }

  .member-name {
    font-size: 20px;
    font-family: Montserrat;
    color: #ffffff;
  }
  .member-desg {
    font-style: italic;
    font-size: 15px;
    font-family: Montserrat;
    color: #ffffff;
  }

  @media (min-width: 768px) {
    width: 167px;
    height: 250px;
  }

  @media (min-width: 1280px) {
    width: 200px;
    height: 300px;
  }
  @media (min-width: 1600px) {
    width: 276px;
    height: 414px;

    .member-details {
      padding: 21px 0 28px;
    }
  }
`;

const MemberImageBox = ({ link, name, role }) => {
  return (
    <ImageBox to={link}>
      <span className="member-details">
        <span className="member-name">{name}</span>
        <span className="member-desg">{role}</span>
      </span>
    </ImageBox>
  );
};

export default MemberImageBox;
