import React from 'react';
import styled from 'styled-components';

const PerkItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  padding-right: 32px;
  box-sizing: border-box;

  .perk-logo {
    width: 184px;
    height: 184px;
    background-color: black;
    border-radius: 100%;
  }

  h3 {
    margin-bottom: 0;
  }

  p {
    margin-top: 16px;
  }

  @media (min-width: 1440px) {
    align-items: center;
    text-align: center;
    padding-right: 80px;

    h3 {
      font-size: 30px;
      line-height: 40px;
    }

    .perk-logo {
      width: 284px;
      height: 284px;
    }
  }
`;

const Perk = ({ title, description }) => {
  return (
    <PerkItem>
      <div className="perk-logo"></div>
      <h3>{title}</h3>
      <p>{description}</p>
    </PerkItem>
  );
};

export default Perk;
