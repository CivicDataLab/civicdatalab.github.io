import React from 'react';
import styled from 'styled-components';
import TeamHomePageStyle from '../styles/TeamHomePage';
import MainContainer from '../styles/MainContainer';
import HeroText from '../styles/HeroText';
import StandardGrid from '../styles/StandardGrid';
import { MiniTeam } from '../components/MiniTeamSection';

const PoliciesStyle = styled(MiniTeam)`
  a {
    display: block;
    font-weight: 500;
    color: #0da3b7;
    text-decoration: none;
    padding-bottom: 8px;
    border-bottom: 1px solid #0da3b7;
    margin: 20px 0;

    &:hover {
      color: #1dcccc;
    }
  }

  .upper-content-section {
    max-width: 100%;
  }

  h1 {
    overflow-wrap: break-word;
    max-width: 100%;
  }

  @media (min-width: 1280px) {
    width: 80%;
  }
`;

const PoliciesStyleAbout = styled(TeamHomePageStyle)`
  a {
    display: block;
    font-weight: 500;
    color: #0da3b7;
    text-decoration: none;
    padding-bottom: 8px;
    border-bottom: 1px solid #0da3b7;
    margin: 20px 0;

    &:hover {
      color: #1dcccc;
    }
  }

  .upper-content-section {
    max-width: 100%;
  }

  h1 {
    overflow-wrap: break-word;
    max-width: 100%;
  }
`;

const Policies = ({ policies }) => {
  return (
    <>
      <PoliciesStyle>
        <h3>Policies</h3>
        <div>
          {policies?.map((resource) => (
            <a key={resource?.link} href={resource?.link} target="_blank" rel="noopener noreferrer">
              {resource?.title}
            </a>
          ))}
        </div>
      </PoliciesStyle>
    </>
  );
};

export const PoliciesAbout = ({ policies }) => {
  return (
    <MainContainer>
      <PoliciesStyleAbout>
        <StandardGrid>
          <div className={'content upper-content-section'}>
            <HeroText className={'section-heading'}>policies</HeroText>
          </div>
          <div className={'content lower-content-section'}>
            <hr />
            {policies?.map((resource) => (
              <a key={resource?.link} href={resource?.link} target="_blank" rel="noopener noreferrer">
                {resource?.title}
              </a>
            ))}
          </div>
        </StandardGrid>
      </PoliciesStyleAbout>
    </MainContainer>
  );
};

export default Policies;
