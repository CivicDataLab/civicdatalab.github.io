import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import styled from 'styled-components';
import BlogCard from '../components/BlogCard';
import { getCoverImageUrlFromMediumPost } from '../utils/helpers';
import useMediumFeed from '../hooks/useMediumFeed';
// import MemberImage from '../components/MemberImage';

const MemberContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'bio'
    'picture'
    'blogs';

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'picture bio'
      'blogs blogs';
  }

  @media (min-width: 1024px) {
    grid-gap: 32px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'picture bio bio'
      'picture blogs blogs';
  }
`;

const Bio = styled.div`
  padding: 0 32px;
  box-sizing: border-box;
  h2 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.6em;
    margin: 3px 0;
  }

  h5 {
    font-size: 1.2em;
    font-weight: 700;
    margin: 3px 0;
  }

  p {
    font-size: 1.6em;
    margin: 12px 0;
    line-height: 28px;
  }

  @media (min-width: 768px) {
    p {
      margin: 44px 0;
    }
  }
`;

const PictureContainer = styled.div`
  grid-area: picture;
  padding: 0 32px;
  height: 600px;
  box-sizing: border-box;
  width: 100%;
  max-width: 540px;

  div:last-of-type {
    background-color: #1dcccc;
  }

  p {
    font-size: 1.6em;
    line-height: 28px;
    font-weight: 300;
    font-style: italic;
    position: relative;

    span {
      font-size: 200px;
      text-align: left;
      color: rgb(0, 0, 0, 0.26);
      display: inline-block;
      position: absolute;
      top: 84px;
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
      <MemberContainer>
        <Bio>
          <h2>{member.frontmatter.name}</h2>
          <h5>{member.frontmatter.role}</h5>
          <p>{member.frontmatter.description}</p>
        </Bio>
        <PictureContainer>
          <div>Social media icons</div>
          <div>
            <img src="" alt="profile" />
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
            {blogPosts.map((post) => {
              return (
                <BlogCard
                  key={post.guid}
                  title={post.title}
                  imageUrl={getCoverImageUrlFromMediumPost(post['content:encoded'])}
                  postUrl={post.link}
                />
              );
            })}
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
      }
    }
  }
`;
