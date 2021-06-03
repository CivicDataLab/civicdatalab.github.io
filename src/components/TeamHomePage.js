import React from 'react';
import { Link } from 'gatsby';
import TeamHomePageStyle from '../styles/TeamHomePage';
import MainContainer from '../styles/MainContainer';
import HeroText from '../styles/HeroText';
import StandardGrid from '../styles/StandardGrid';

const TeamHomePage = () => {
  return (
    <MainContainer>
      <TeamHomePageStyle>
        <StandardGrid>
          <div className={'content upper-content-section'}>
            <HeroText className={'section-heading'}>our team</HeroText>
          </div>
          <div className={'content lower-content-section'}>
            <hr></hr>
            <p>
              CivicDataLab works across sectors to increase access to information. We use free and open source tools to
              collaborate and co-create with social change makers. We follow responsible and ethical practices to drive
              civic engagement and advocacy in the country.
            </p>
            <p>Meet the multi-disciplinary team who work behind the scenes to make it all happen!</p>
            <Link to="/team" className={'meet-the-team'}>
              Meet the team {'>>'}
            </Link>
          </div>
        </StandardGrid>
      </TeamHomePageStyle>
    </MainContainer>
  );
};
export default TeamHomePage;
