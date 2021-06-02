import React from 'react';
import styled from 'styled-components';

const ValueContainer = styled.div`
  margin: 48px auto;

  .content {
    padding: 0 24px;
  }

  h2 {
    font-size: 25px;
  }

  .number {
    color: #1dcccc;
    margin: 0;
  }

  .title {
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 3rem;
  }

  .image-container {
    background-color: #ccc;
    height: 300px;
    width: 100%;
  }

  @media (min-width: 900px) {
    display: flex;

    .content {
      padding: 0;
      max-width: 480px;
    }
  }

  @media (min-width: 1280px) {
    padding-right: 20px;
  }

  @media (min-width: 1440px) {
    h2 {
      font-size: 40px;
    }
  }

  @media (min-width: 1920px) {
    h2 {
      font-size: 45px;
    }
  }
`;

const Value = ({ number, title, bodyHTML }) => {
  return (
    <ValueContainer>
      <div className="content">
        <h2 className="number">{number}</h2>
        <h2 className="title">{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />
      </div>
    </ValueContainer>
  );
};

export default Value;
