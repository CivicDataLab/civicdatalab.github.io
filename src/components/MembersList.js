import React from 'react';
import styled from 'styled-components';

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Member = (image, name) => (
  <MemberContainer>
    <div></div>
    <p>{name}</p>
  </MemberContainer>
);

const MembersListContainer = styled.div``;

const MembersList = () => {
  return (
    <MembersListContainer>
      {Array.apply(null, Array(5)).map((item, index) => (
        <Member key={index} />
      ))}
    </MembersListContainer>
  );
};

export default MembersList;
