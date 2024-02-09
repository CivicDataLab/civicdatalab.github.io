import React from 'react';
import styled from 'styled-components';
import Image from 'gatsby-image';

const ImageBox = styled.button`
  display: flex;
  flex-direction: column;
  background: transparent;
  position: relative;
  text-decoration: none;
  height: 220px;
  cursor: pointer;
  border-color: transparent;
  padding: 0;
  position: relative;

  .cross {
    position: absolute;
    width: 320px;
    height: 320px;
    top: 0;
    right: 0;
    display: none;
  }

  &[aria-checked='true'] {
    .profile-image {
      filter: grayscale(100%);
    }

    .cross {
      display: block;
    }
  }

  .gatsby-image-wrapper {
    height: 100%;
    width: 100%;
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
    width: 100%;
    height: 400px;
    grid-column: span 3;

    .member-name {
      font-size: 20px;
    }
    .member-desg {
      font-size: 14px;
    }
  }

  @media (min-width: 1440px) {
    .member-details {
      padding: 21px 0 28px;
    }
  }
`;

const MemberImageBox = ({ name, role, image }) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <ImageBox
      role="checkbox"
      aria-checked={checked}
      onClick={() => {
        setChecked((e) => !e);
      }}
    >
      {image && <Image className="profile-image" fluid={image} />}
      <img className="cross" src="/cross.png" />
      <span className="member-details">
        <span className="member-name">{name.split(' ')[0]}</span>
        <span className="member-desg">{role}</span>
      </span>
    </ImageBox>
  );
};

export default MemberImageBox;
