import React from 'react';
import { Link } from 'gatsby';
import TeamHomePageStyle from '../styles/TeamHomePage';
import MainContainer from '../styles/MainContainer';
import HeroText from '../styles/HeroText';

const TeamHomePage = (props) => {
  return (
    <MainContainer>
      <TeamHomePageStyle>
        <div className={'content'}>
          <HeroText className={'section-heading'}>our team</HeroText>
        </div>
        <div className={'content lower-content-section'}>
          <hr></hr>
          <p>
            CivicDataLab works across sectors to increase access to information. We follow responsible and ethical
            practices to drive civic engagement and advocacy in the country. Meet the individuals who work behind the
            scenes to make it all happen!
          </p>
          <Link to="/team" className={'meet-the-team'}>
            Meet the team {'>>'}
          </Link>
        </div>
      </TeamHomePageStyle>
    </MainContainer>
  );
};
export default TeamHomePage;
