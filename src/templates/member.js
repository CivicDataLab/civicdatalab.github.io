import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Image from 'gatsby-image';
import BlogCard from '../components/BlogCard';
import { getCoverImageUrlFromMediumPost } from '../utils/helpers';
import useMediumFeed from '../hooks/useMediumFeed';
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
    grid-column-gap: 180px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'picture bio bio'
      'picture blogs blogs';
  }
`;

export const Bio = styled.div`
  padding: 0 32px;
  box-sizing: border-box;
  margin-bottom: 120px;
  h2 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.6em;
    margin-top: 0;
    margin-bottom: 12px;
    width: 50%;
  }

  h5 {
    font-size: 1.2em;
    font-weight: 700;
    margin: 3px 0;
  }

  p {
    font-size: 1.6em;
    margin: 18px 0;
    line-height: 28px;
  }

  @media (min-width: 1024px) {
    padding: 0 20px;
    p {
      font-size: 30px;
      line-height: 37px;
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
  }

  .gatsby-image-wrapper {
    max-width: 275px;
    height: 410px;
    position: absolute;
    bottom: 70px;
    margin: auto;
  }

  p {
    font-size: 1.6em;
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
      transform: rotate(-180deg) translate(-40px, 10px);
    }
  }

  @media (min-width: 768px) {
    .gatsby-image-wrapper {
      margin-right: -10px;
    }
  }

  @media (min-width: 1024px) {
    div:last-of-type {
      width: 589px;
      position: relative;
      background-color: #1dcccc;
    }

    .gatsby-image-wrapper {
      max-width: 500px;
      height: 780px;
      position: absolute;
    }
  }

  @media (min-width: 1440px) {
    .gatsby-image-wrapper {
      left: 40px;
    }

    p {
      padding-bottom: 100px;
    }
  }
`;

const SocialLinksContainer = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-bottom: 100px;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      background-color: black;
      width: 34px;
      height: 34px;
      border-radius: 100%;
      color: white;
      margin: 0 4px;
    }
  }
`;

const BlogContainer = styled.div`
  grid-area: blogs;
  padding: 0 20px;
  box-sizing: border-box;
  max-width: 1020px;
  width: 100%;

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
    margin-top: 140px;
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
  justify-content: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px;
  }
`;

const MemberTemplate = ({ data }) => {
  const member = data.markdownRemark;
  const [blogPosts] = useMediumFeed(member.frontmatter.medium);

  const image = data?.profilePicture?.childImageSharp?.fluid;

  return (
    <Layout>
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
          <p>{member.frontmatter.description}</p>
        </Bio>
        <PictureContainer>
          <SocialLinksContainer>
            <a href="https://twitter.com" target="_blank" rel="noreferrer noopener">
              T
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer noopener">
              I
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer noopener">
              F
            </a>
          </SocialLinksContainer>
          <div style={{ backgroundColor: member.frontmatter.accentcolor }}>
            <Image fluid={image} />
            {/* <img src="/assets/images/SA.jpeg" alt="profile" /> */}
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
              <p style={{fontSize: 17}}>No blogs found for the member.</p>
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
      frontmatter {
        name
        role
        description
        quote
        image
        medium
        accentcolor
      }
    }

    profilePicture: file(relativePath: { eq: "SA.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 800, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
