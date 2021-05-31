import React from 'react';
import WorkHomePageStyle from '../styles/WorkHomePage';
import { Link, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import HeroText from '../styles/HeroText';
import MainContainer from '../styles/MainContainer';

const WorkHomePage = () => {
  const data = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "pattern.png" }) {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  );

  return (
    <BackgroundImage fluid={data.file.childImageSharp.fluid}>
      <MainContainer>
        <WorkHomePageStyle>
          <div className={'content'}>
            <HeroText light className={'work-part'}>
              Work{' '}
            </HeroText>
            <HeroText light className={'sub-text'}>
              {' '}
              With Us!
            </HeroText>
            <hr className={'work-home-page'}></hr>
            <p className={'first-text-block'}>
              Let’s co-create the next solution enabling sustainable social change in your area of work
            </p>
          </div>
          <div className={'circle-wrapper'}>
            <Link to="/contact" className={'content-circle'} id="first-circle">
              <div className={'circle'}>
                <img src={require('../images/join-icon.png')} alt="Join us" />
              </div>
              <div className={'below-text'}>
                <p>Partner With Us</p>
              </div>
            </Link>
            <Link to="/openings" className={'content-circle'}>
              <div className={'circle'}>
                <img src={require('../images/partner-icon.png')} alt="Partner with us" />
              </div>
              <div className={'below-text'}>
                <p>Join Us</p>
              </div>
            </Link>
          </div>
        </WorkHomePageStyle>
      </MainContainer>
    </BackgroundImage>
  );
};

export default WorkHomePage;
