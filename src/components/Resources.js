import React from 'react';
import styled from 'styled-components';
import TeamHomePageStyle from '../styles/TeamHomePage';
import MainContainer from '../styles/MainContainer';
import HeroText from '../styles/HeroText';
import StandardGrid from '../styles/StandardGrid';
import { MiniTeam } from '../components/MiniTeamSection';

const ResourcesStyle = styled(MiniTeam)`
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

const ResourcesStyleAbout = styled(TeamHomePageStyle)`
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

const Resources = ({ resources }) => {
  return (
    <>
      <ResourcesStyle>
        <h3>Resources</h3>
        <div>
          {resources?.map((resource) => (
            <a key={resource.link} href={resource.link} target="_blank" rel="noopener noreferrer">
              {resource.title}
            </a>
          ))}
        </div>
      </ResourcesStyle>
    </>
  );
};

export const ResourcesAbout = ({ resources }) => {
  return (
    <MainContainer>
      <ResourcesStyleAbout>
        <StandardGrid>
          <div className={'content upper-content-section'}>
            <HeroText className={'section-heading'}>blogs</HeroText>
          </div>
          <div className={'content lower-content-section'}>
            <hr />
            {resources?.map((resource) => (
              <a key={resource.link} href={resource.link} target="_blank" rel="noopener noreferrer">
                {resource.title}
              </a>
            ))}
          </div>
        </StandardGrid>
      </ResourcesStyleAbout>
    </MainContainer>
  );
};

export default Resources;
