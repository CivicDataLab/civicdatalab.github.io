import React from 'react';
import styled from 'styled-components';

const OpeningRow = styled.div`
  padding: 8px 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  padding: 12px;
  width: max-content;
  text-decoration: none;
  border-radius: 45px;
  justify-self: end;

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
