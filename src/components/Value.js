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
    }

    div {
      flex: 1;
      margin-right: 40px;
    }

    div:last-of-type {
      flex: 2;
    }
  }

  @media (min-width: 1280px) {
    h2 {
      font-size: 48px;
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
      <div className="image-container"></div>
    </ValueContainer>
  );
};

export default Value;
