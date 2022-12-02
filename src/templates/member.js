import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import styled from 'styled-components';
import Image from 'gatsby-image';
import { FaTwitter, FaLinkedinIn, FaGithubAlt, FaBehance } from 'react-icons/fa';
import BlogCard from '../components/BlogCard';
import { getCoverImageUrlFromMediumPost } from '../utils/helpers';
import useMediumFeed from '../hooks/useMediumFeed';
import Seo from '../components/Seo/Seo';
import StandardGrid from '../styles/StandardGrid';
import MainContainer from '../styles/MainContainer';
// import MemberImage from '../components/MemberImage';

const MemberContainer = styled(MainContainer)`
  margin-top: 20px;

  @media (min-width: 1280px) {
    margin-top: 80px;
  }
`;

const PictureContainer = styled.div`
  box-sizing: border-box;

  .gatsby-image-wrapper {
    height: 400px;
    margin: auto;
  }

  @media (min-width: 1024px) {
    .gatsby-image-wrapper {
      height: 500px;
    }
  }

  @media (min-width: 1280px) {
    grid-column: 1/6;
    .gatsby-image-wrapper {
      height: 600px;
    }
  }

  @media (min-width: 1440px) {
    .gatsby-image-wrapper {
      height: 700px;
    }
  }

  @media (min-width: 1920px) {
    .gatsby-image-wrapper {
      height: 900px;
    }
  }
`;

export const QuoteContainer = styled.div`
  background-color: ${(props) => (props.background ? props.background : '#1DCCCC')};
  color: ${(props) => (props.text ? 'white' : 'black')};
  z-index: -1;
  padding: 40px 0;

  p {
    line-height: 28px;
    font-weight: 300;
    font-style: italic;
    position: relative;
    width: 80%;
    margin: 0 auto;

    span {
      display: inline-block;
    }

    span:first-of-type,
    span:last-of-type {
      font-size: 120px;
      color: rgb(0, 0, 0, 0.26);
    }

    span:first-of-type {
      transform: translate(-10px, 20px);
    }

    span:last-of-type {
      transform: rotate(-180deg) translate(-80px);
    }
  }

  @media (min-width: 1280px) {
    position: absolute;
    left: 0;
    top: 50%;
    height: 780px;
    width: 400px;

    p {
      margin-top: 485px;
      font-size: 20px;
      line-height: 1.4em;

      span:first-of-type,
      span:last-of-type {
        font-size: 140px;
      }
    }
  }

  @media (min-width: 1440px) {
    width: 460px;
    height: 860px;
    top: 55%;

    p {
      margin-top: 480px;
      font-size: 25px;
    }
  }

  @media (min-width: 1920px) {
    height: 960px;
    width: 600px;
    top: 45%;

    p {
      margin-top: 700px;
    }
  }

  @media (min-width: 2000px) {
    left: 5%;
    top: 40%;
    height: 900px;

    p {
      margin-top: 650px;
    }
  }
`;

export const Bio = styled.div`
  box-sizing: border-box;
  margin-bottom: 80px;

  p {
    margin: 18px 0;
    line-height: 28px;
  }

  a {
    color: #168cd6;

    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }

  li {
    line-height: 28px;
  }

  @media (min-width: 1024px) {
    min-height: 500px;
    p {
      font-size: 18px;
      line-height: 27px;
      margin: 44px 0;
    }
  }

  @media (min-width: 1280px) {
    grid-column: 6/12;
    min-height: 1000px;
  }

  @media (min-width: 1440px) {
    min-height: 1180px;
  }

  @media (min-width: 1920px) {
    min-height: 1280px;
  }
`;

export const SocialLinksContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-bottom: 25px;

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
      margin-left: 8px;
    }

    a > * {
      width: 50%;
      height: 50%;
    }
  }
`;

const BlogContainer = styled.div`
  box-sizing: border-box;
  margin-top: 80px;
  margin-bottom: 20px;

  > h2 {
    display: inline-block;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 40px;
  }

  @media (min-width: 1024px) {
    > h2 {
      font-size: 40px;
    }
  }
`;

const BlogPostGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 25px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1280px) {
    grid-column: 6/12;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 25px;
  }

  @media (min-width: 1440px) {
    column-gap: 30px;
    row-gap: 45px;
  }

  @media (min-width: 1920px) {
    column-gap: 45px;
  }
`;

const MemberDetails = styled.div`
  display: ${(props) => (props.mobile ? 'block' : 'none')};
  h2 {
    text-transform: uppercase;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 12px;
    width: 50%;
  }

  h5 {
    font-weight: 700;
    margin: 3px 0;
  }

  @media (min-width: 1280px) {
    display: ${(props) => (props.mobile ? 'none' : 'block')};
    h2 {
      font-size: 50px;
      margin-bottom: 12px;
    }
    h5 {
      font-size: 20px;
    }
  }
`;

const MemberTemplate = ({ data }) => {
  const member = data.markdownRemark;
  const [blogPosts] = useMediumFeed(member.frontmatter.medium);

  return (
    <Layout>
      <Seo title={member.frontmatter.name} />
      <MemberContainer>
        <StandardGrid>
          <MemberDetails mobile>
            <h2>{member.frontmatter.name}</h2>
            <h5>
              {member.frontmatter.role.split(',').map((role, index) => {
                if (index === member.frontmatter.role.split(',').length - 1) {
                  return <span key={role}>{role}</span>;
                }
                return (
                  <span key={role}>
                    {role}
                    {' - '}
                  </span>
                );
              })}
            </h5>
          </MemberDetails>
          <PictureContainer>
            <SocialLinksContainer>
              {member.frontmatter.twitter && (
                <a href={member.frontmatter.twitter} target="_blank" rel="noreferrer noopener">
                  <FaTwitter />
                </a>
              )}
              {member.frontmatter.linkedin && (
                <a href={member.frontmatter.linkedin} target="_blank" rel="noreferrer noopener">
                  <FaLinkedinIn />
                </a>
              )}
              {member.frontmatter.github && (
                <a href={member.frontmatter.github} target="_blank" rel="noreferrer noopener">
                  <FaGithubAlt />
                </a>
              )}
              {member.frontmatter.behance && (
                <a href={member.frontmatter.behance} target="_blank" rel="noreferrer noopener">
                  <FaBehance />
                </a>
              )}
            </SocialLinksContainer>
            <Image
              imgStyle={{
                objectFit: 'contain',
                objectPosition: 'top',
                maxHeight: '600px'
              }}
              fluid={member.frontmatter.image?.childImageSharp.fluid}
            />
            {member.frontmatter.quote && (
              <QuoteContainer background={member.frontmatter.accentcolor} text={member.frontmatter.text}>
                <p>
                  <span>“</span>
                  <span>{member.frontmatter.quote}</span>
                  <span>“</span>
                </p>
              </QuoteContainer>
            )}
          </PictureContainer>
          <Bio>
            <MemberDetails>
              <h2>{member.frontmatter.name}</h2>
              <h5>
                {member.frontmatter.role.split(',').map((role, index) => {
                  if (index === member.frontmatter.role.split(',').length - 1) {
                    return <span key={role}>{role}</span>;
                  }
                  return (
                    <span key={role}>
                      {role}
                      {' - '}
                    </span>
                  );
                })}
              </h5>
            </MemberDetails>
            {member.frontmatter.description?.split(';').map((d) => (
              <p key={d}>{d}</p>
            ))}
            {member.html && <div dangerouslySetInnerHTML={{ __html: member.html }}></div>}
            {blogPosts?.length ? (
              <BlogContainer>
                <h2>Blogs</h2>
                <BlogPostGrid>
                  {blogPosts.map((post) => {
                    return (
                      <BlogCard
                        key={post.guid}
                        title={post.title}
                        imageUrl={getCoverImageUrlFromMediumPost(post['content'])}
                        postUrl={post.link}
                      />
                    );
                  })}
                </BlogPostGrid>
              </BlogContainer>
            ) : null}
          </Bio>
        </StandardGrid>
      </MemberContainer>
    </Layout>
  );
};

export default MemberTemplate;

export const pageQuery = graphql`
  query TeamMemberQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
        role
        description
        quote
        image {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        medium
        github
        linkedin
        twitter
        behance
        accentcolor
        text
      }
    }
  }
`;
