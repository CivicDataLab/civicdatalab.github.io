import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Image from 'gatsby-image';

const MiniTeam = styled.div`
  padding: 0 30px;
  h3 {
    font-family: Bungee;
    font-size: 32px;
    width: 60px;
    display: inline-block;
    text-align: left;
    margin-bottom: 16px;
  }

  @media (min-width: 1024px) {
    padding: 0;
    margin-bottom: 50px;
    h3 {
      font-size: 44px;
      width: max-content;
      margin-bottom: 35px;
    }
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 140px);
  grid-gap: 20px;

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 180px);
    column-gap: 60px;
    row-gap: 60px;
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 180px);
  }
`;

const MemberContainer = styled(Link)`
  text-decoration: none;

  .gatsby-image-wrapper {
    height: 200px;
  }

  p {
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    font-weight: 600;
    color: black;
  }

  @media (min-width: 1280px) {
    p {
      font-size: 18px;
    }

    .gatsby-image-wrapper {
      height: 240px;
      width: 100%;
    }
  }

  @media (min-width: 1440px) {
    .gatsby-image-wrapper {
      height: 300px;
      width: 100%;
    }
  }
`;

const Member = ({ image, name, link }) => {
  return (
    <MemberContainer to={link}>
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
        {members.map((member) => (
          <Member
            key={member.id}
            link={member.fields.slug}
            image={member.frontmatter.image.childImageSharp.fluid}
            name={member.frontmatter.name}
          />
        ))}
      </TeamGrid>
    </MiniTeam>
  );
};

export default MiniTeamSection;
