import React from 'react';
import styled from 'styled-components';

const ImageBox = styled.a`
  display: inline-block;
  width: 138px;
  height: 207px;
  background: #f2f2f2;
  position: relative;

  img{
    width: 100%;
    height: 100%;
  }

  .member-details{
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

  .member-name{
    font-size: 20px;
    font-family: Montserrat;
    color: #FFFFFF;
  }
  .member-desg{
    font-style: italic;
    font-size: 15px;
    font-family: Montserrat;
    color: #FFFFFF;
  }
  
  @media(min-width: 768px){
    width: 167px;
    height: 250px;
  }

  @media(min-width: 1280px){
    width: 200px;
    height: 300px;
  }
  @media(min-width: 1600px){
    width: 276px;
    height: 414px;
    
    .member-details{
      padding: 21px 0 28px;
    }
  }
`;

const MemberImageBox = () => {
  return <ImageBox>
            <img src="" alt="Member Image"/>
            <span className="member-details">
                <span className="member-name">Shreya</span>
                <span className="member-desg">Technologist</span>
            </span>
        </ImageBox>;
};

export default MemberImageBox;
