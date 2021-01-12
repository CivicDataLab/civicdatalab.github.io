import React from 'react';
import TeamHomePageStyle from '../styles/TeamHomePage';
import HeroText from '../styles/HeroText';
import { Link } from 'gatsby';
const TeamHomePage = (props) => {
  return (
    <TeamHomePageStyle>
      <div className={'container-team-section'}>
        <div className={'content'}>
          <HeroText className={"section-heading"}>the team</HeroText>
        </div>
        <div className={'content lower-content-section'}>
          <hr></hr>
          <p>
            CivicDataLab works across sectors to increase access to information. We use free and open source tools to
            collaborate and co-create with social change makers. We follow responsible and ethical practices to drive
            civic engagement and advocacy in the country. Meet the individuals who work behind the scenes to make it all
            happen!
          </p>
          <Link to="#" className={'meet-the-team'}>
            Meet the team >>
          </Link>
        </div>
      </div>
    </TeamHomePageStyle>
  );
};
export default TeamHomePage;
