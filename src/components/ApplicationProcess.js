import React from 'react';
import styled from 'styled-components';

const ProcessItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  box-sizing: border-box;

  .perk-logo {
    width: 184px;
    height: 184px;
    background-color: black;
    border-radius: 100%;
  }

  p {
    margin-top: 16px;
  }

  @media (min-width: 1440px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 90%;

    .perk-logo {
      width: 250px;
      height: 250px;
    }

    p {
      width: 65%;
    }
  }
`;

const ApplicationProcess = ({ description }) => {
  return (
    <ProcessItem>
      <div className="perk-logo"></div>
      <p>{description}</p>
    </ProcessItem>
  );
};

export default ApplicationProcess;
