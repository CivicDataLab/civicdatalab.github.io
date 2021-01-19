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

  .member-details {
    position: absolute;
    bottom: 0;
    padding: 15px 0;
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
    text-align: center;
  }

  @media (min-width: 1600px) {
    .member-details {
      padding: 21px 0 28px;
    }
  }
`;

const MemberImageBox = ({ link, name, role, image }) => {
  const [displayInfo, setDisplayInfo] = React.useState(false);

  return (
    <ImageBox to={link} onMouseOver={() => setDisplayInfo(true)} onMouseLeave={() => setDisplayInfo(false)}>
      <Image fluid={image} />
      {displayInfo ? (
        <span className="member-details">
          <span className="member-name">{name.split(' ')[0]}</span>
          <span className="member-desg">{role}</span>
        </span>
      ) : null}
    </ImageBox>
  );
};

export default MemberImageBox;
