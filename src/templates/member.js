import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import styled from 'styled-components';
import BlogCard from '../components/BlogCard';
import Parser from 'rss-parser';
// import MemberImage from '../components/MemberImage';

const MemberContainer = styled.div``;

const Bio = styled.div`
  padding: 0 32px;
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
    margin: 3px 0;
    line-height: 28px;
  }
`;

const PictureContainer = styled.div`
  padding: 0 32px;
  height: 600px;
  box-sizing: border-box;
  width: 100%;
  max-width: 540px;
  background-color: ${(props) => (props.background ? props.background : '#1DCCCC')};

  p {
    font-size: 1.6em;
    line-height: 28px;
    font-weight: 300;
    font-style: italic;
  }
`;

const BlogContainer = styled.div`
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  width: 100%;

  > h2 {
    text-transform: uppercase;
    padding-top: 20px;
    font-weight: bold;
    border-top: 8px solid black;
  }
`;

const parser = new Parser();
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

const MemberTemplate = ({ data }) => {
  const member = data.markdownRemark;

  const [blogPosts, setBlogPosts] = React.useState([]);
  React.useEffect(() => {
    parser
      .parseURL(CORS_PROXY + `https://medium.com/feed/@${member.frontmatter.medium}`)
      .then((response) => setBlogPosts(response.items))
      .catch((error) => console.log(error));
  }, []);

  console.log(blogPosts);

  return (
    <Layout>
      <MemberContainer>
        <Bio>
          <h2>{member.frontmatter.name}</h2>
          <h5>{member.frontmatter.role}</h5>
          <p>{member.frontmatter.description}</p>
        </Bio>
        <PictureContainer>
          <div>image goes here</div>
          <p>{member.frontmatter.quote}</p>
        </PictureContainer>
        <BlogContainer>
          <h2>Blogs</h2>
          {blogPosts.map((post) => {
            return <BlogCard key={post.guid} title={post.title} />;
          })}
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
