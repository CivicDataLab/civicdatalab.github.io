import React from 'react';
import styled from 'styled-components';

const OpeningRow = styled.div`
  padding: 8px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    text-transform: capitalize;
    font-weight: 600;
  }

  @media (min-width: 1024px) {
    padding: 27px 56px;
  }
`;

const OpeningLink = styled.a`
  color: white;
  background-color: black;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 45px;

  @media (min-width: 1024px) {
    padding: 10px 32px;
  }
`;

const JobRow = ({ title, link }) => {
  return (
    <OpeningRow>
      <p>{title}</p>
      <OpeningLink href={link} target="_blank" rel="noopener noreferrer">
        View opening
      </OpeningLink>
    </OpeningRow>
  );
};

export default JobRow;
