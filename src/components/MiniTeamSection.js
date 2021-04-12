import React from 'react';
import styled from 'styled-components';
import Image from 'gatsby-image';

const MiniTeam = styled.div`
  h3 {
    font-family: Bungee;
    font-size: 32px;
    width: 60px;
    display: inline-block;
    text-align: left;
    margin-bottom: 16px;
  }

  @media (min-width: 1024px) {
    h3 {
      font-size: 44px;
      width: max-content;
    }
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 16px;
    font-weight: 500;
  }afsdf
  asdfasf
  asdfasdf
  asdfasdf
    }
  }
`;

const Member = ({ image, name }) => {
  return (
    <MemberContainer>
      <Image fluid={image} />
      <p>{name}</p>
    </MemberContainer>
  );
};

const MiniTeamSection = ({ members }) => {
  return (
    <MiniTeam>
      <h3>Team</h3>
      <TeamGrid>
        {/* {members.map((member) => (
          <Member
            key={member.id}
            image={member.frontmatter.image.childImageSharp.fluid}
            name={member.frontmatter.name}
          />
        ))} */}
      </TeamGrid>
    </MiniTeam>
  );
};

export default MiniTeamSection;
