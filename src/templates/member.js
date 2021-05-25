import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import styled from 'styled-components';
import Image from 'gatsby-image';
import { FaTwitter, FaLinkedinIn, FaGithubAlt } from 'react-icons/fa';
import BlogCard from '../components/BlogCard';
import { getCoverImageUrlFromMediumPost } from '../utils/helpers';
import useMediumFeed from '../hooks/useMediumFeed';
import Seo from '../components/Seo/Seo';
// import MemberImage from '../components/MemberImage';

const MemberContainer = styled.div`
  padding-top: 50px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'bio'
    'picture'
    'blogs';

  @media (min-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'picture bio'
      'blogs blogs';
  }

  @media (min-width: 1024px) {
    grid-column-gap: 100px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'picture bio bio'
      'picture blogs blogs';
  }

  @media (min-width: 1440px) {
    grid-column-gap: 180px;
  }
`;

export const Bio = styled.div`
  padding: 0 32px;
  box-sizing: border-box;
  margin-bottom: 80px;
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

  p {
    margin: 18px 0;
    line-height: 28px;
  }

  li {
    line-height: 28px;
  }

  @media (min-width: 1024px) {
    padding: 0 20px;
    width: 600px;
    min-height: 500px;
    p {
      font-size: 18px;
      line-height: 27px;
      margin: 44px 0;
    }
    h2 {
      font-size: 50px;
      margin-bottom: 12px;
    }
    h5 {
      font-size: 20px;
    }
  }

  @media (min-width: 1440px) {
    width: 720px;
    min-height: 300px;
  }
`;

const PictureContainer = styled.div`
  grid-area: picture;
  height: 600px;
  box-sizing: border-box;
  width: 100%;
  max-width: 540px;

  div:last-of-type {
    position: relative;
    background-color: #1dcccc;
    padding-bottom: 20px;
  }

  .gatsby-image-wrapper {
    max-width: 275px;
    height: 410px;
    position: absolute;
    bottom: 70px;
    margin: auto;
  }

  p {
    line-height: 28px;
    font-weight: 300;
    font-style: italic;
    position: relative;
    width: 75%;
    margin: 0 auto;
    padding-bottom: 75px;

    span {
      font-size: 200px;
      text-align: left;
      color: rgb(0, 0, 0, 0.26);
      display: inline-block;
      position: absolute;
      top: 84px;
    }

    span:first-of-type {
      transform: translate(-40px, -80px);
    }

    span:last-of-type {
      transform: rotate(-180deg) translate(10px, -50px);
    }
  }

  @media (min-width: 768px) {
    .gatsby-image-wrapper {
      margin-right: -10px;
    }
  }

  @media (min-width: 1024px) {
    div:last-of-type {
      width: 400px;
      position: relative;
      background-color: #1dcccc;
      padding-bottom: 0;
      margin-bottom: -40px;
    }

    .gatsby-image-wrapper {
      max-width: 330px;
      height: 500px;
      position: absolute;
    }

    p {
      padding-bottom: 100px;
      padding-top: 60px;

      span:first-of-type {
        padding-top: 60px;
      }

      span:last-of-type {
        margin-top: 40px;
        transform: rotate(-180deg) translate(10px, -10px);
      }
    }
  }

  @media (min-width: 1440px) {
    margin-bottom: 600px;

    .gatsby-image-wrapper {
      left: 40px;
    }

    p {
      padding-bottom: 100px;
      width: 50%;

      span:last-of-type {
        transform: rotate(-180deg) translate(10px, -60px);
      }
    }
  }
`;

export const SocialLinksContainer = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-bottom: 100px;
    margin-left: 20px;

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
      margin: 0 4px;
    }

    a > * {
      width: 50%;
      height: 50%;
    }
  }

  @media (min-width: 1440px) {
    margin-left: 100px;
  }
`;

const BlogContainer = styled.div`
  grid-area: blogs;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 80px;
  margin-bottom: 20px;

  > h2 {
    display: inline-block;
    text-transform: uppercase;
    padding-top: 20px;
    font-weight: bold;
    border-top: 8px solid black;
  }

  @media (min-width: 550px) {
    margin-top: 80px;
  }

  @media (min-width: 768px) {
    margin-top: 200px;
  }

  @media (min-width: 1024px) {
    margin-top: 400px;
    > h2 {
      font-size: 40px;
    }
  }

  @media (min-width: 1280px) {
    margin-top: 100px;
    width: 95%;
  }
`;

const BlogPostGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px;
  }
`;

const MemberTemplate = ({ data }) => {
  const member = data.markdownRemark;
  const [blogPosts] = useMediumFeed(member.frontmatter.medium);

  return (
    <Layout>
      <Seo title={member.frontmatter.name} />
      <MemberContainer>
        <Bio>
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
          {member.frontmatter.description?.split(';').map((d) => (
            <p key={d}>{d}</p>
          ))}
          {member.html && <div dangerouslySetInnerHTML={{ __html: member.html }}></div>}
        </Bio>
        <PictureContainer>
          <SocialLinksContainer>
            <a href={member.frontmatter.twitter} target="_blank" rel="noreferrer noopener">
              <FaTwitter />
            </a>
            <a href={member.frontmatter.linkedin} target="_blank" rel="noreferrer noopener">
              <FaLinkedinIn />
            </a>
            <a href={member.frontmatter.github} target="_blank" rel="noreferrer noopener">
              <FaGithubAlt />
            </a>
          </SocialLinksContainer>
          <div style={{ backgroundColor: member.frontmatter.accentcolor }}>
            <Image fluid={member.frontmatter.image.childImageSharp.fluid} />
            <p>
              <span>“</span>
              {member.frontmatter.quote}
              <span>“</span>
            </p>
          </div>
        </PictureContainer>
        <BlogContainer>
          <h2>Blogs</h2>
          <BlogPostGrid>
            {blogPosts.length ? (
              blogPosts.map((post) => {
                return (
                  <BlogCard
                    key={post.guid}
                    title={post.title}
                    imageUrl={getCoverImageUrlFromMediumPost(post['content:encoded'])}
                    postUrl={post.link}
                  />
                );
              })
            ) : (
              <p style={{ fontSize: 17 }}>No blogs found for the member.</p>
            )}
          </BlogPostGrid>
        </BlogContainer>
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
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        medium
        github
        linkedin
        twitter
        accentcolor
      }
    }
  }
`;
