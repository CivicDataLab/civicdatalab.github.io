import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { FaTwitter, FaLinkedinIn, FaGithubAlt, FaFacebook } from 'react-icons/fa';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import Layout from '../components/Layout/Layout';
import HeroText from '../styles/HeroText';
import { TitleContainer } from '../pages/work';
import MiniTeamSection from '../components/MiniTeamSection';
import Seo from '../components/Seo/Seo';
// import Timeline from '../components/Timeline';
import useFixedScroll from '../hooks/useFixedScroll';
import MainContainer from '../styles/MainContainer';
import StandardGrid from '../styles/StandardGrid';
import Resources from '../components/Resources';

const ProjectTitleContainer = styled(TitleContainer)`
  @media (min-width: 1280px) {
    h1 {
      overflow-wrap: break-word;
      font-size: 45px;
      line-height: 1em;
      width: 380px;
    }
  }

  @media (min-width: 1920px) {
    h1 {
      font-size: 45px;
      font-weight: 1em;
      min-width: 350px;
    }
  }
`;

const ProjectContent = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    padding: 0 16px;
  }

  @media (min-width: 1280px) {
    grid-column: 5/13;
  }

  @media (min-width: 1440px) {
    padding: 0;
  }

  @media (min-width: 1920px) {
    grid-column: 4/13;
  }
`;

const ImageSection = styled.div`
  position: relative;
  margin-bottom: 80px;

  .gatsby-image-wrapper {
    max-height: 400px;
  }

  @media (min-width: 1280px) {
    .gatsby-image-wrapper {
      max-height: 750px;
    }
  }
`;

const SummaryText = styled.div`
  background-color: #dded1b;
  font-weight: 500;
  font-size: 20px;
  width: 75%;
  position: absolute;
  bottom: -100px;
  padding: 20px 32px;
  box-sizing: border-box;

  @media (min-width: 834px) {
    left: 0px;
    font-size: 24px;
    bottom: -50px;
  }

  @media (min-width: 1024px) {
    left: -32px;
  }

  @media (min-width: 1280px) {
    font-size: 35px;
  }

  @media (min-width: 1440px) {
    line-height: 1.5em;
    left: -30px;
    bottom: -100px;
    padding: 45px;
  }

  @media (min-width: 1600px) {
    font-size: 45px;
    padding: 60px;
  }
`;

const ProjectText = styled.div`
  padding: 0 32px;
  margin: 30px 0;

  a {
    display: inline-block;
    color: #05b7be;
    text-decoration: none;
    margin-top: 4px;
  }

  p {
    line-height: 1.5em;
    font-size: 18px;
  }

  p:first-of-type {
    font-weight: 700;
    margin-bottom: 0;
  }

  p:last-of-type {
    margin-top: 8px;
  }

  @media (min-width: 1024px) {
    padding: 0;
    margin: 40px 0;
  }

  @media (min-width: 1440px) {
    width: 50%;

    p {
      font-size: 20px;
    }
  }
`;

const LeftText = styled.div`
  margin: 30px 0;
  padding: ${(props) => (props.mobile ? '0 32px' : '0')};
  display: ${(props) => (props.mobile ? 'block' : 'none')};
  text-align: ${(props) => (props.mobile ? 'center' : 'left')};

  a {
    display: inline-block;
    color: #05b7be;
    text-decoration: none;
    margin-top: 4px;
  }

  p {
    line-height: 1.5em;
    font-size: 18px;
  }

  p:first-of-type {
    font-weight: 700;
    margin-bottom: 0;
  }

  p:last-of-type {
    margin-top: 8px;
  }

  .btn-newsletter {
    margin-top: 12px;
    padding: 12px 18px;
    background-color: #1dcccc;
    color: black;
    font-weight: 500;
    border-radius: 12px;
  }

  @media (min-width: 1024px) {
    display: ${(props) => (props.mobile ? 'none' : 'block')};
    padding: 0;
    margin: 36px 0;

    a {
      max-width: 250px;
      word-wrap: break-word;
    }
  }

  @media (min-width: 1440px) {
    p {
      font-size: 20px;
    }
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: ${(props) => (props.mobile ? 'center' : 'start')};

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background-color: black;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    color: white;
    margin-right: 12px;
  }

  @media (min-width: 1024px) {
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

const PartnersContainer = styled.div`
  a {
    display: block;
    margin-top: 20px;
  }

  @media (min-width: 1024px) {
    margin-bottom: 60px;
  }
`;

// const StyledCarousel = styled(Carousel)`
//   li > div {
//     max-height: 300px;
//   }

//   @media (min-width: 1024px) {
//     li > div {
//       max-height: 600px;
//       margin-left: 4px;
//       margin-right: 4px;
//     }
//   }
// `;

// const responsive = {
//   superLargeDesktop: {
//     breakpoint: { max: 4000, min: 3000 },
//     items: 5
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1
//   }
// };

const ProjectTemplate = ({ data }) => {
  const project = data.markdownRemark;
  const members = data.members.nodes;
  const partners = data.partners.nodes;

  const { twitter, linkedin, github, facebook, url, solution, aim, resources, newsletter } = project.frontmatter;

  const leftContainerRef = React.useRef(null);
  const rightContainerRef = React.useRef(null);

  useFixedScroll(leftContainerRef, rightContainerRef, 750);

  return (
    <Layout>
      <Seo title={project.frontmatter.name} />
      <MainContainer>
        <StandardGrid>
          <ProjectTitleContainer ref={leftContainerRef}>
            <HeroText>{project.frontmatter.name}</HeroText>

            <LeftText>
              {url && (
                <>
                  <p>Check us here:</p>
                  <a target="_blank" rel="noreferrer noopener" href={url}>
                    {url}
                  </a>
                </>
              )}
              <SocialLinksContainer>
                {twitter && (
                  <a href={twitter} target="_blank" rel="noreferrer noopener">
                    <FaTwitter />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noreferrer noopener">
                    <FaLinkedinIn />
                  </a>
                )}
                {facebook && (
                  <a href={facebook} target="_blank" rel="noreferrer noopener">
                    <FaFacebook />
                  </a>
                )}
                {github && (
                  <a href={github} target="_blank" rel="noreferrer noopener">
                    <FaGithubAlt />
                  </a>
                )}
              </SocialLinksContainer>
            </LeftText>

            {newsletter && (
              <LeftText>
                <p>Subscribe to our newsletter:</p>
                <a className="btn-newsletter" href={newsletter}>
                  Subscribe
                </a>
              </LeftText>
            )}

            {partners.length ? (
              <LeftText>
                <p>In partnership with:</p>
                <PartnersContainer>
                  {partners.map((partner) => (
                    <a key={partner.id} href={partner.frontmatter.website} target="_blank" rel="noreferrer noopener">
                      <Image fixed={partner.frontmatter.logo.childImageSharp.fixed} />
                    </a>
                  ))}
                </PartnersContainer>
              </LeftText>
            ) : null}
          </ProjectTitleContainer>
          <ProjectContent ref={rightContainerRef}>
            <ImageSection>
              <Image fluid={project.frontmatter.image.childImageSharp.fluid} />
              <SummaryText>{project.frontmatter.summary}</SummaryText>
            </ImageSection>
            <ProjectText>
              <p>Context:</p>
              <p>{project.frontmatter.context}</p>
            </ProjectText>
            {aim && (
              <ProjectText>
                <p>Aim:</p>
                <p>{aim}</p>
              </ProjectText>
            )}
            {solution && (
              <ProjectText>
                <p>Our solution:</p>
                <p>{solution}</p>
              </ProjectText>
            )}

            <LeftText mobile>
              <p>Check us here:</p>
              <a target="_blank" rel="noreferrer noopener" href={`https://${url}`}>
                {url}
              </a>
              <SocialLinksContainer mobile>
                {twitter && (
                  <a href={twitter} target="_blank" rel="noreferrer noopener">
                    <FaTwitter />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noreferrer noopener">
                    <FaLinkedinIn />
                  </a>
                )}
                {facebook && (
                  <a href={facebook} target="_blank" rel="noreferrer noopener">
                    <FaFacebook />
                  </a>
                )}
                {github && (
                  <a href={github} target="_blank" rel="noreferrer noopener">
                    <FaGithubAlt />
                  </a>
                )}
              </SocialLinksContainer>
            </LeftText>
            {partners && (
              <LeftText mobile>
                <p>In partnership with:</p>
                <PartnersContainer>
                  {partners.map((partner) => (
                    <a key={partner.id} href={partner.frontmatter.website} target="_blank" rel="noreferrer noopener">
                      <Image fixed={partner.frontmatter.logo.childImageSharp.fixed} />
                    </a>
                  ))}
                </PartnersContainer>
              </LeftText>
            )}
          </ProjectContent>
        </StandardGrid>
      </MainContainer>
      {/* {project.frontmatter.timeline && <Timeline timelineItems={project.frontmatter.timeline} />} */}
      {/* <StyledCarousel responsive={responsive}>
        <Image fluid={project.frontmatter.image.childImageSharp.fluid} />
        <Image fluid={project.frontmatter.image.childImageSharp.fluid} />
        <Image fluid={project.frontmatter.image.childImageSharp.fluid} />
        <Image fluid={project.frontmatter.image.childImageSharp.fluid} />
      </StyledCarousel> */}
      <MainContainer>
        <StandardGrid>
          <ProjectContent>
            <MiniTeamSection members={members} />
            {resources && <Resources resources={resources} />}
          </ProjectContent>
        </StandardGrid>
      </MainContainer>
    </Layout>
  );
};

export default ProjectTemplate;

export const pageQuery = graphql`
  query ProjectQuery($id: String!, $nameRegex: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        name
        summary
        context
        aim
        solution
        url
        github
        twitter
        linkedin
        facebook
        newsletter
        resources {
          link
          title
          type
        }
        image {
          childImageSharp {
            fluid(maxWidth: 1200, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    members: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/team/" }, frontmatter: { projects: { regex: $nameRegex } } }
      sort: { fields: frontmatter___name }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          name
          image {
            childImageSharp {
              fluid(maxWidth: 800, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    partners: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projectpart/" }, frontmatter: { projects: { regex: $nameRegex } } }
      sort: { fields: frontmatter___name }
    ) {
      nodes {
        id
        frontmatter {
          name
          website
          logo {
            childImageSharp {
              fixed(width: 110) {
                ...GatsbyImageSharpFixed_noBase64
              }
            }
          }
        }
      }
    }
  }
`;
